"use client";
import { useAuth } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import VolunteeringPanel from "@/components/panels/VolunteeringPanel";
import ClubsPanel from "@/components/panels/ClubsPanel";

export default function Dashboard() {
  const { department, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !department) router.replace("/council");
  }, [loading, department, router]);

  if (loading || !department) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 py-14">
      <h1 className="font-black uppercase text-3xl text-blue-900 dark:text-blue-100 mb-8">
        {department} panel
      </h1>
      {department === "volunteering" && <VolunteeringPanel />}
      {department === "clubs" && <ClubsPanel />}
      {department === "pr" && <p className="text-blue-700 dark:text-blue-300">PR tools coming soon.</p>}
      {department === "finance" && <p className="text-blue-700 dark:text-blue-300">Finance tools coming soon.</p>}
    </div>
  );
}