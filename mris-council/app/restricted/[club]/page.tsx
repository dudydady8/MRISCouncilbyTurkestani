import ProtectedRoute from "@/components/ProtectedRoute";
import { clubs } from "@/lib/clubs";
import HourLogForm from "@/components/HourLogForm";

export default function ClubDashboard({ params }: { params: { club: string } }) {
  const club = clubs.find((c) => c.slug === params.club);
  return (
    <ProtectedRoute club={params.club}>
      <div className="px-6 md:px-12 py-16 max-w-md">
        <h1 className="font-serif text-3xl">{club?.name} dashboard</h1>
        <p className="mt-2 text-slate">Log volunteer hours for your club's members.</p>
        <HourLogForm clubSlug={params.club} />
      </div>
    </ProtectedRoute>
  );
}