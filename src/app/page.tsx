import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <span className="text-xs font-medium tracking-wide text-slate-500 uppercase mb-3">Interview Prep, Organized</span>
      <h1 className="text-4xl font-semibold max-w-xl mb-4">Prep for the role you're actually interviewing for.</h1>
      <p className="text-slate-500 max-w-md mb-8">Curated questions by role — SWE, AI/ML, and Product — with progress tracking so you know what to revisit.</p>
      <div className="flex gap-3">
        <Link href="/signup" className="bg-slate-900 text-white rounded-lg px-5 py-2.5 text-sm font-medium hover:bg-slate-800 transition">Get started</Link>
        <Link href="/login" className="border border-slate-300 rounded-lg px-5 py-2.5 text-sm font-medium hover:bg-slate-100 transition">Log in</Link>
      </div>
    </div>
  );
}