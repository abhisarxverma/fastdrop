"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

import { storage } from "@/lib/utils/browser";
import { GeoCenteredState } from "@/components/web/geo/geo-centered-state";
import { GeoLoadingContent } from "@/components/web/geo/geo-loading-content";
import { GeoEnableContent } from "@/components/web/geo/geo-enable-content";

type GeoLocation = {
  lat: number;
  lng: number;
};

type GeoContextValue = {
  location: GeoLocation;
};

const GeoContext = createContext<GeoContextValue | null>(null);

export function GeoProvider({ children }: { children: ReactNode }) {
  const [location, setLocation] = useState<GeoLocation | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [requested, setRequested] = useState(false);
  const [isCheckingStorage, setIsCheckingStorage] = useState(true);

  useEffect(() => {
    let cancelled = false;
    Promise.resolve().then(() => {
      if (cancelled) return;
      const loc: GeoLocation | null = storage.get("fastdrop_location");
      setLocation(loc);
      setIsCheckingStorage(false);
    });
    return () => { cancelled = true };
  }, []);


  function requestLocation() {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    setRequested(true);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const loc = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        };
        storage.set("fastdrop_location", loc);
        setLocation(loc);
      },
      () => {
        setError("Location permission denied. Please enable it to continue.");
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  }

  if (!location) {
    return (
      <GeoCenteredState>
        {isCheckingStorage ? (
          <GeoLoadingContent />
        ) : (
          <GeoEnableContent
            onRequest={requestLocation}
            requested={requested}
            error={error}
          />
        )}
      </GeoCenteredState>
    );
  }

  return (
    <GeoContext.Provider value={{ location }}>
      {children}
    </GeoContext.Provider>
  );
}

export function useGeo() {
  const ctx = useContext(GeoContext);
  if (!ctx) {
    throw new Error("useGeo must be used within GeoProvider");
  }
  return ctx;
}
