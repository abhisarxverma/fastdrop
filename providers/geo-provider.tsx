"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

import { storage } from "@/lib/utils/browser"
import { Button } from "@/components/ui/button";

type GeoLocation = {
  lat: number;
  lng: number;
};

type GeoContextValue = {
  location: GeoLocation;
};

const GeoContext = createContext<GeoContextValue | null>(null);

export function GeoProvider({ children }: { children: ReactNode }) {
  const [location, setLocation] = useState<GeoLocation | null>(() => storage.get("fastdrop_location"));
  const [error, setError] = useState<string | null>(null);
  const [requested, setRequested] = useState(false);

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
        maximumAge: 60_000,
      }
    );
  }

  if (!location) {
    return (
      <div className="flex-1 flex items-center justify-center bg-base-100">
        <div className="max-w-md space-y-4 p-6 text-center">
          <h1 className="text-xl font-semibold">Enable Location</h1>
          <p className="text-sm opacity-70">
            Fastdrop uses your location to show and share files with nearby
            devices. This works without login and stays local.
          </p>

          {error && <p className="text-error">{error}</p>}

          <Button
            size="lg"
            onClick={requestLocation}
            disabled={requested}
          >
            Enable Location
          </Button>

          <p className="text-xs opacity-50">
            Location is only used for proximity filtering.
          </p>
        </div>
      </div>
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
