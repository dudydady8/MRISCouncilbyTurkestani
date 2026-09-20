"use client";
import { useState } from "react";
import { supabaseBrowser } from "@/lib/supabase/client";

export default function HourLogForm({ clubSlug }: { clubSlug: string }) {
  const [name, setName] = useState("");
  const [hours, setHours] = useState("");
  const [msg, setMsg] = useState("");
  const supabase = supabaseBrowser();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data: { user } } = await supabase.auth.getUser();
    const { error } = await supabase.from("volunteer_hours").insert({
      student_name: name, club_slug: clubSlug, hours: Number(hours), logged_by: user?.id,
    });
    setMsg(error ? error.message : "Logged.");
    if (!error) { setName(""); setHours(""); }
  };

  return (
    <form onSubmit={submit} className="mt-6 space-y-3">
      <input placeholder="Student name" value={name} onChange={(e) => setName(e.target.value)} className="w-full border border-ink/20 px-3 py-2" />
      <input placeholder="Hours" type="number" value={hours} onChange={(e) => setHours(e.target.value)} className="w-full border border-ink/20 px-3 py-2" />
      <button className="bg-ink text-paper px-4 py-2 hover:bg-gold transition-colors">Log hours</button>
      {msg && <p className="text-sm text-slate">{msg}</p>}
    </form>
  );
}