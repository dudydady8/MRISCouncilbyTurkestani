import { supabaseServer } from "@/lib/supabase/server";

export default async function VolunteerPage() {
  const supabase = await supabaseServer();
  const { data: opportunities } = await supabase.from("opportunities").select("*").order("date");
  const { data: leaderboard } = await supabase.from("leaderboard").select("*").limit(10);
  const podium = leaderboard?.slice(0, 3) ?? [];

  return (
    <div className="max-w-5xl mx-auto px-4 py-14">
      <h2 className="text-4xl font-black uppercase text-blue-900 dark:text-blue-100">Volunteering</h2>
      <p className="mt-2 text-blue-700 dark:text-blue-300 max-w-xl">
        Opportunities are posted by staff. Hours are logged by staff after each event and reflected below.
      </p>

      <section className="mt-10 grid gap-4">
        {opportunities?.map((o) => (
          <div key={o.id} className="card bar-left before:bg-warn p-6">
            <h4 className="font-black">{o.title}</h4>
            <p className="text-[.7rem] font-extrabold uppercase tracking-widest text-blue-600 mt-1">{o.date}</p>
            <p className="text-sm text-blue-700 dark:text-blue-300 mt-2">{o.club_slug} · {o.location}</p>
            <p className="text-xs font-bold uppercase text-blue-700/70 mt-3">{o.slots} spots</p>
          </div>
        ))}
      </section>

      <section className="mt-16 card p-6">
        <h3 className="font-black uppercase text-blue-900 dark:text-blue-100">Leaderboard</h3>
        <p className="text-sm text-blue-700/70 dark:text-blue-300/70 mb-6">Top volunteers ranked by verified hours.</p>

        <div className="grid grid-cols-3 gap-2.5 items-end mb-6">
          {[podium[1], podium[0], podium[2]].map((p, i) => p && (
            <div key={p.student_name} className={`text-center border border-blue-100 dark:border-blue-900 rounded-2xl p-3.5 ${i === 1 ? "pt-5 pb-5 border-warn" : ""}`}>
              <div className={`mx-auto mb-2 rounded-full grid place-items-center font-black text-white bg-blue-600 ${i === 1 ? "w-[54px] h-[54px] bg-gradient-to-br from-[#f7b500] to-[#ff8a00]" : "w-11 h-11"}`}>
                {p.student_name[0]}
              </div>
              <div className="text-xs font-extrabold truncate">{p.student_name}</div>
              <div className="text-lg font-black text-blue-600">{p.hours}</div>
            </div>
          ))}
        </div>

        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-blue-700/60 dark:text-blue-300/60 text-[.68rem] uppercase tracking-widest border-b-2 border-blue-100 dark:border-blue-900">
              <th className="py-2.5">#</th><th>Name</th><th>Club</th><th>Hours</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard?.map((r, i) => (
              <tr key={r.student_name + r.club_slug} className="border-b border-blue-100 dark:border-blue-900">
                <td className="py-3">{i + 1}</td><td className="font-bold">{r.student_name}</td>
                <td className="text-blue-700 dark:text-blue-300">{r.club_slug}</td><td className="font-black text-blue-600">{r.hours}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}