"use client";
import { useAuth } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({ club, children }: { club: string; children: React.ReactNode }) {
  const { club: loggedInClub } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loggedInClub !== club) router.replace("/restricted");
  }, [loggedInClub, club, router]);

  if (loggedInClub !== club) return null;
  return <>{children}</>;
}