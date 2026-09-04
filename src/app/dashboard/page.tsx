'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

type Role = { id: string; name: string; description: string };
type Question = { id: string; text: string; difficulty: string; category: { name: string } };

export default function Dashboard() {
  const { user, token, logout } = useAuth();
  const router = useRouter();
  const [roles, setRoles] = useState<Role[]>([]);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    if (!token) { router.push('/login'); return; }
    fetch('/api/roles').then((r) => r.json()).then(setRoles);
  }, [token, router]);

  useEffect(() => {
    if (!selectedRole) return;
    fetch(`/api/questions?roleId=${selectedRole.id}`).then((r) => r.json()).then(setQuestions);
  }, [selectedRole]);

  const markProgress = async (questionId: string, status: string) => {
    await fetch('/api/progress', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ questionId, status }),
    });
  };

  if (!user) return null;

  return (
    <div className="min-h-screen max-w-3xl mx-auto px-4 py-10">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-xl font-semibold">Hey, {user.name.split(' ')[0]} 👋</h1>
          <p className="text-sm text-slate-500">Pick a role to start practicing.</p>
        </div>
        <button onClick={logout} className="text-sm text-slate-500 hover:text-slate-900">Log out</button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-10">
        {roles.map((role) => (
          <button
            key={role.id}
            onClick={() => setSelectedRole(role)}
            className={`text-left p-4 rounded-xl border transition ${selectedRole?.id === role.id ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-200 bg-white hover:border-slate-400'}`}
          >
            <p className="font-medium text-sm">{role.name}</p>
            <p className={`text-xs mt-1 ${selectedRole?.id === role.id ? 'text-slate-300' : 'text-slate-500'}`}>{role.description}</p>
          </button>
        ))}
      </div>

      {selectedRole && (
        <div className="space-y-3">
          <h2 className="text-sm font-medium text-slate-500 uppercase tracking-wide mb-3">{selectedRole.name} Questions</h2>
          {questions.map((q) => (
            <div key={q.id} className="bg-white border border-slate-200 rounded-xl p-4 flex justify-between items-start gap-4">
              <div>
                <p className="text-sm">{q.text}</p>
                <div className="flex gap-2 mt-2">
                  <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">{q.category.name}</span>
                  <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">{q.difficulty}</span>
                </div>
              </div>
              <div className="flex gap-2 shrink-0">
                <button onClick={() => markProgress(q.id, 'needs_work')} className="text-xs border border-amber-300 text-amber-700 bg-amber-50 rounded-lg px-2.5 py-1 hover:bg-amber-100">Needs work</button>
                <button onClick={() => markProgress(q.id, 'mastered')} className="text-xs border border-emerald-300 text-emerald-700 bg-emerald-50 rounded-lg px-2.5 py-1 hover:bg-emerald-100">Mastered</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}