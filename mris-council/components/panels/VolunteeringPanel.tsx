"use client";
import { useState } from "react";
import { supabaseBrowser } from "@/lib/supabase/client";

export default function VolunteeringPanel() {
  const supabase = supabaseBrowser();
  const [opp, setOpp] = useState({ title: "", date: "", location: "", slots: "" });
  const [log, setLog] = useState({ studentId: "", hours: "", eventTitle: "" });
  const [msg, setMsg] = useState("");

  const addOpportunity = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.from("opportunities").insert({
      title: opp.title, date: opp.date, location: opp.location, slots: Number(opp.slots),
    });
    setMsg(error ? error.message : "Opportunity added.");
    if (!error) setOpp({ title: "", date: "", location: "", slots: "" });
  };

  const logHours = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data: { user } } = await supabase.auth.getUser();
    // student must already exist in `students` table - lookup fails loudly if the ID is wrong
    const { data: student } = await supabase.from("students").select("id").eq("id", log.studentId).single();
    if (!student) { setMsg("No student with that ID."); return; }
    const { error } = await supabase.from("volunteer_hours").insert({
      student_id: log.studentId, hours: Number(log.hours), event_title: log.eventTitle, logged_by: user?.id,
    });
    setMsg(error ? error.message : "Hours logged.");
    if (!error) setLog({ studentId: "", hours: "", eventTitle: "" });
  };

  return (
    <div className="space-y-10">
      <form onSubmit={addOpportunity} className="card p-6 space-y-3">
        <h3 className="font-black uppercase text-sm">Add opportunity</h3>
        <input placeholder="Title" value={opp.title} onChange={(e) => setOpp({ ...opp, title: e.target.value })} className="w-full border rounded-xl px-3 py-2 bg-transparent" />
        <input type="date" value={opp.date} onChange={(e) => setOpp({ ...opp, date: e.target.value })} className="w-full border rounded-xl px-3 py-2 bg-transparent" />
        <input placeholder="Location" value={opp.location} onChange={(e) => setOpp({ ...opp, location: e.target.value })} className="w-full border rounded-xl px-3 py-2 bg-transparent" />
        <input type="number" placeholder="Slots" value={opp.slots} onChange={(e) => setOpp({ ...opp, slots: e.target.value })} className="w-full border rounded-xl px-3 py-2 bg-transparent" />
        <button className="bg-blue-900 text-white px-5 py-2.5 rounded-xl font-bold text-sm">Add</button>
      </form>

      <form onSubmit={logHours} className="card p-6 space-y-3">
        <h3 className="font-black uppercase text-sm">Log hours</h3>
        <input placeholder="Student ID" value={log.studentId} onChange={(e) => setLog({ ...log, studentId: e.target.value })} className="w-full border rounded-xl px-3 py-2 bg-transparent" />
        <input type="number" placeholder="Hours" value={log.hours} onChange={(e) => setLog({ ...log, hours: e.target.value })} className="w-full border rounded-xl px-3 py-2 bg-transparent" />
        <input placeholder="Event" value={log.eventTitle} onChange={(e) => setLog({ ...log, eventTitle: e.target.value })} className="w-full border rounded-xl px-3 py-2 bg-transparent" />
        <button className="bg-blue-900 text-white px-5 py-2.5 rounded-xl font-bold text-sm">Log</button>
      </form>
      {msg && <p className="text-sm text-blue-700 dark:text-blue-300">{msg}</p>}
    </div>
  );
}