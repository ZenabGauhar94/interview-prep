'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { ProgressBar } from '@/components/ProgressBar';
import { RoleIcon } from '@/components/RoleIcon';

type Role = { id: string; name: string; description: string };
type ProgressItem = { questionId: string; status: string; question: { roleId: string } };

export default function Dashboard() {
  const { user, token } = useAuth();
  const [roles, setRoles] = useState<Role[]>([]);
  const [questionCounts, setQuestionCounts] = useState<Record<string, number>>({});
  const [progress, setProgress] = useState<ProgressItem[]>([]);

  useEffect(() => {
    fetch('/api/roles').then((r) => r.json()).then(async (roles: Role[]) => {
      setRoles(roles);
      const counts: Record<string, number> = {};
      for (const role of roles) {
        const qs = await fetch(`/api/questions?roleId=${role.id}`).then((r) => r.json());
        counts[role.id] = qs.length;
      }
      setQuestionCounts(counts);
    });
    if (token) {
      fetch('/api/progress', { headers: { Authorization: `Bearer ${token}` } })
        .then((r) => r.json()).then(setProgress);
    }
  }, [token]);

  const completionForRole = (roleId: string) => {
    const total = questionCounts[roleId] || 0;
    if (total === 0) return 0;
    const mastered = progress.filter((p) => p.question.roleId === roleId && p.status === 'mastered').length;
    return Math.round((mastered / total) * 100);
  };

  return (
    <div className="px-8 py-8 max-w-5xl">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-[24px] font-semibold">Good morning, {user?.name.split(' ')[0]} 👋</h1>
          <p className="text-sm text-neutral-700/60">Pick a role to start practicing.</p>
        </div>
        <Link href="/progress" className="text-sm border border-neutral-300 rounded-lg px-4 py-2 hover:bg-neutral-300/20 transition">View Progress</Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {roles.map((role) => {
          const pct = completionForRole(role.id);
          return (
            <Link
              key={role.id}
              href={`/practice/${role.id}`}
              className="bg-white border border-neutral-300/40 rounded-xl p-5 hover:border-primary/40 hover:shadow-sm transition"
            >
              <RoleIcon roleName={role.name} className="w-6 h-6 text-primary mb-3" />
              <p className="font-medium text-sm mb-1">{role.name}</p>
              <p className="text-xs text-neutral-700/50 mb-3">{questionCounts[role.id] ?? '—'} Questions</p>
              <ProgressBar percent={pct} />
              <p className="text-xs text-neutral-700/50 mt-1">{pct}% completed</p>
            </Link>
          );
        })}
      </div>

      <div className="bg-badge-ml-bg border border-accent/20 rounded-xl p-4 flex items-center gap-3">
        <span className="text-lg">🌱</span>
        <p className="text-sm text-neutral-700/80">Tip: Consistency beats intensity. Do a little every day.</p>
      </div>
    </div>
  );
}