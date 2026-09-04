'use client';
import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';

type ProgressItem = { status: string };

export default function ProfilePage() {
  const { user, token } = useAuth();
  const [progress, setProgress] = useState<ProgressItem[]>([]);

  useEffect(() => {
    if (!token) return;
    fetch('/api/progress', { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => r.json()).then(setProgress);
  }, [token]);

  const mastered = progress.filter((p) => p.status === 'mastered').length;
  const needsWork = progress.filter((p) => p.status === 'needs_work').length;
  const initials = user?.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);

  return (
    <div className="px-8 py-8 max-w-2xl">
      <h1 className="text-[24px] font-semibold mb-6">Profile</h1>

      <div className="bg-white border border-neutral-300/40 rounded-xl p-6 mb-4">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center text-lg font-semibold shrink-0">
            {initials}
          </div>
          <div>
            <p className="font-medium">{user?.name}</p>
            <p className="text-sm text-neutral-700/60">{user?.email}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-mastered-bg rounded-lg p-4">
            <p className="text-xs text-neutral-700/50 mb-1">Questions Mastered</p>
            <p className="text-xl font-semibold text-mastered">{mastered}</p>
          </div>
          <div className="bg-needswork-bg rounded-lg p-4">
            <p className="text-xs text-neutral-700/50 mb-1">Needs Work</p>
            <p className="text-xl font-semibold text-needswork">{needsWork}</p>
          </div>
        </div>
      </div>

      <div className="bg-white border border-neutral-300/40 rounded-xl p-6">
        <p className="text-sm font-medium mb-4">Account Details</p>
        <div className="space-y-3">
          <div>
            <label className="text-xs text-neutral-700/50 block mb-1">Full name</label>
            <input value={user?.name || ''} disabled className="w-full border border-neutral-300 rounded-lg px-3 py-2 text-sm bg-neutral-300/10 text-neutral-700/70" />
          </div>
          <div>
            <label className="text-xs text-neutral-700/50 block mb-1">Email</label>
            <input value={user?.email || ''} disabled className="w-full border border-neutral-300 rounded-lg px-3 py-2 text-sm bg-neutral-300/10 text-neutral-700/70" />
          </div>
        </div>
      </div>
    </div>
  );
}