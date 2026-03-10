"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

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
  const [loading, setLoading] = useState(false);

  function requestLocation() {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    setRequested(true);
    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const loc = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        };

        setLocation(loc);
        setLoading(false);
      },
      () => {
        setError("Location permission denied. Please enable it to continue.");
        setLoading(false);
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
        {loading ? (
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