"use client";

import AuthProvider from "@/providers/auth-provider"
import { Toaster } from "@/components/ui/sonner";
import { GeoProvider } from "./geo-provider";

export default function WebappProvider({ children }: { children: React.ReactNode }) {
    return (
        <>
            <AuthProvider >
                <GeoProvider >
                    {children}
                </GeoProvider>
            </AuthProvider>
            <Toaster />
        </>
    );
}
