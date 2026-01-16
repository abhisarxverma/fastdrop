"use client";

import { useEffect, useState, createContext, useContext } from "react";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";
import AuthLoading from "@/features/auth/components.tsx/loading";

type AuthContextType = {
  user: User | null;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();

    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        supabase.auth.signInAnonymously();
      } else {
        setUser(data.session.user);
      }
      setLoading(false);
    });

    const { data: subscription } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );
    
    return () => {
      subscription.subscription.unsubscribe();
    };
  }, []);

  if (loading) return (
    <AuthLoading />
  )

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  if (!ctx.user) throw new Error("Please use useStrictUser for getting guaranteed user.")
  return ctx;
}

export const useStrictUser = () => {
  const { user, loading } = useAuth();
  if (!loading && !user) {
    throw new Error("Authenticated user required.");
  }
  return user as User; 
};