"use client";
import { useEffect, useState } from "react";
import { supabaseBrowser } from "@/lib/supabase/client";

export default function ClubsPanel() {
  const supabase = supabaseBrowser();
  const [clubs, setClubs] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");

  const refresh = async () => {
    const { data } = await supabase.from("clubs").select("*").order("name");
    setClubs(data ?? []);
  };
  useEffect(() => { refresh(); }, []);

  const add = async (e: React.FormEvent) => {
    e.preventDefault();
    await supabase.from("clubs").insert({ name, description: desc });
    setName(""); setDesc(""); refresh();
  };

  const remove = async (id: string) => {
    await supabase.from("clubs").delete().eq("id", id);
    refresh();
  };

  return (
    <div className="space-y-8">
      <form onSubmit={add} className="card p-6 space-y-3">
        <h3 className="font-black uppercase text-sm">Add club</h3>
        <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="w-full border rounded-xl px-3 py-2 bg-transparent" />
        <input placeholder="Description" value={desc} onChange={(e) => setDesc(e.target.value)} className="w-full border rounded-xl px-3 py-2 bg-transparent" />
        <button className="bg-blue-900 text-white px-5 py-2.5 rounded-xl font-bold text-sm">Add</button>
      </form>

      <div className="divide-y">
        {clubs.map((c) => (
          <div key={c.id} className="py-3 flex justify-between items-center">
            <div><p className="font-bold">{c.name}</p><p className="text-sm text-blue-700/70">{c.description}</p></div>
            <button onClick={() => remove(c.id)} className="text-bad text-sm font-bold">Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
}