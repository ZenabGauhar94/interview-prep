'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await res.json();
    if (!res.ok) return setError(data.error);
    login(data.token, data.user);
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <div className="flex items-center gap-2 mb-6">
        <CheckCircle2 className="w-5 h-5 text-primary" />
        <span className="font-semibold text-lg">PrepTrack</span>
      </div>
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-sm border border-neutral-300/40 p-8">
        <h1 className="text-[20px] font-semibold text-center mb-1">Create your account</h1>
        <p className="text-sm text-neutral-700/60 text-center mb-6">Join PrepTrack and start your journey.</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-medium text-neutral-700/70 block mb-1">Full name</label>
            <input className="w-full border border-neutral-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Enter your full name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <label className="text-xs font-medium text-neutral-700/70 block mb-1">Email</label>
            <input className="w-full border border-neutral-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary" placeholder="you@example.com" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <label className="text-xs font-medium text-neutral-700/70 block mb-1">Password</label>
            <input className="w-full border border-neutral-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Create a password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          {error && <p className="text-sm text-hard">{error}</p>}
          <button className="w-full bg-primary text-white rounded-lg py-2.5 text-sm font-medium hover:bg-primary/90 transition">Sign Up</button>
        </form>
        <p className="text-sm text-neutral-700/60 text-center mt-4">
          Already have an account? <Link href="/login" className="text-primary font-medium">Log in</Link>
        </p>
      </div>
      <p className="text-xs text-neutral-700/50 mt-4 text-center max-w-xs">
        By signing up, you agree to our Terms of Service and Privacy Policy.
      </p>
    </div>
  );
}