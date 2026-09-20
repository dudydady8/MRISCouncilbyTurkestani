import Link from "next/link";

export default function Home() {
  return (
    <div>
      <section className="min-h-[calc(100vh-68px)] flex items-center justify-center text-center px-4">
        <div className="max-w-3xl">
          <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tight text-blue-900 dark:text-blue-100 leading-[0.95]">
            MRIS Council
          </h1>
          <p className="mt-7 text-blue-700 dark:text-blue-300 text-lg max-w-xl mx-auto">
            The elected voice of every student on campus. We advocate, we organise, and we build the kind of school community you actually want to be part of.
          </p>
          <div className="mt-8 flex gap-3 justify-center flex-wrap">
            <Link href="/team" className="bg-blue-900 text-white px-8 py-3.5 rounded-xl font-bold text-sm uppercase tracking-wider hover:bg-blue-800">
              Meet your council
            </Link>
            <Link href="/volunteer" className="border-2 border-blue-900 dark:border-blue-100 text-blue-900 dark:text-blue-100 px-8 py-3.5 rounded-xl font-bold text-sm uppercase tracking-wider">
              View opportunities
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-20">
        <p className="text-center text-xs font-bold tracking-[.24em] uppercase text-blue-600 mb-3">Our Mandate</p>
        <h2 className="text-center text-3xl font-black uppercase text-blue-900 dark:text-blue-100 mb-12">What We Do</h2>
        <div className="grid md:grid-cols-3 gap-7">
          {[
            ["Student Advocacy", "We take your concerns straight to the administration, no filter, no delay."],
            ["Events & Activities", "Spirit weeks, cultural nights, sports days, charity drives — student designed and run."],
            ["Community Building", "We connect students across grades, clubs, and interests."],
          ].map(([title, body]) => (
            <div key={title} className="card p-9 text-center">
              <div className="w-[72px] h-[72px] mx-auto mb-5 rounded-full bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-900/40 dark:to-blue-900/10 grid place-items-center">
                <div className="w-[30px] h-[30px] rounded-full bg-blue-600" />
              </div>
              <h3 className="font-black uppercase text-blue-900 dark:text-blue-100 mb-2.5">{title}</h3>
              <p className="text-sm text-blue-700 dark:text-blue-300 leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}