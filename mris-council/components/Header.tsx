import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/volunteer", label: "Volunteer" },
  { href: "/team", label: "Team" },
  { href: "/clubs", label: "Clubs" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/85 dark:bg-[#0a0f1e]/85 border-b border-blue-100 dark:border-blue-900">
      <div className="max-w-6xl mx-auto h-[68px] px-4 flex items-center justify-between">
        <Link href="/" className="font-black uppercase tracking-wide text-blue-900 dark:text-blue-100">
          MRIS Council
        </Link>
        <nav className="hidden md:flex gap-6 absolute left-1/2 -translate-x-1/2">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="text-xs font-bold uppercase tracking-wider text-blue-900 dark:text-blue-100 hover:text-blue-600">
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-1">
          <Link href="/restricted" className="w-9 h-9 rounded-lg grid place-items-center text-blue-900 dark:text-blue-100 hover:bg-blue-50 dark:hover:bg-blue-900/30" title="Club login">🔒</Link>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}