"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { supabaseBrowser } from "./supabase/client";

type AuthCtx = {
  department: string | null;
  loading: boolean;
  login: (username: string, pass: string) => Promise<boolean>;
  logout: () => void;
};

const Ctx = createContext<AuthCtx | null>(null);
const supabase = supabaseBrowser();

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [department, setDepartment] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const resolve = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { setDepartment(null); setLoading(false); return; }
    const { data } = await supabase.from("staff_members").select("department_slug").eq("user_id", user.id).single();
    setDepartment(data?.department_slug ?? null);
    setLoading(false);
  };

  useEffect(() => {
    resolve();
    const { data: sub } = supabase.auth.onAuthStateChange(() => resolve());
    return () => sub.subscription.unsubscribe();
  }, []);

  const login = async (username: string, pass: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email: `${username}@mris.internal`, password: pass });
    return !error;
  };

  const logout = () => supabase.auth.signOut();

  return <Ctx.Provider value={{ department, loading, login, logout }}>{children}</Ctx.Provider>;
}

export const useAuth = () => {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
};