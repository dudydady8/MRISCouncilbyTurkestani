"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { supabaseBrowser } from "./supabase/client";

type AuthCtx = {
  club: string | null;
  loading: boolean;
  login: (username: string, pass: string) => Promise<boolean>;
  logout: () => void;
};

const Ctx = createContext<AuthCtx | null>(null);
const supabase = supabaseBrowser();

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [club, setClub] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const resolveClub = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { setClub(null); setLoading(false); return; }
    const { data } = await supabase.from("club_members").select("club_slug").eq("user_id", user.id).single();
    setClub(data?.club_slug ?? null);
    setLoading(false);
  };

  useEffect(() => {
    resolveClub();
    const { data: sub } = supabase.auth.onAuthStateChange(() => resolveClub());
    return () => sub.subscription.unsubscribe();
  }, []);

  const login = async (username: string, pass: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email: `${username}@mris.internal`,
      password: pass,
    });
    return !error;
  };

  const logout = () => supabase.auth.signOut();

  return <Ctx.Provider value={{ club, loading, login, logout }}>{children}</Ctx.Provider>;
}

export const useAuth = () => {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
};