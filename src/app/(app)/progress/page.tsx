'use client';
import { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { useAuth } from '@/context/AuthContext';

type Role = { id: string; name: string };
type ProgressItem = { questionId: string; status: string; question: { roleId: string } };

export default function ProgressPage() {
  const { token } = useAuth();
  const [roles, setRoles] = useState<Role[]>([]);
  const [progress, setProgress] = useState<ProgressItem[]>([]);
  const [totalQuestions, setTotalQuestions] = useState(0);

  useEffect(() => {
    fetch('/api/roles').then((r) => r.json()).then(setRoles);
    fetch('/api/questions').then((r) => r.json()).then((qs) => setTotalQuestions(qs.length));
    if (token) {
      fetch('/api/progress', { headers: { Authorization: `Bearer ${token}` } })
        .then((r) => r.json()).then(setProgress);
    }
  }, [token]);

  const mastered = progress.filter((p) => p.status === 'mastered').length;
  const needsWork = progress.filter((p) => p.status === 'needs_work').length;
  const notStarted = Math.max(totalQuestions - mastered - needsWork, 0);
  const overallPct = totalQuestions ? Math.round((mastered / totalQuestions) * 100) : 0;

  const pieData = [
    { name: 'Mastered', value: mastered, color: '#16a34a' },
    { name: 'Needs Work', value: needsWork, color: '#d97706' },
    { name: 'Not Started', value: notStarted, color: '#9ca3af' },
  ];

  return (
    <div className="px-8 py-8 max-w-4xl">
      <h1 className="text-[24px] font-semibold mb-6">Progress</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Overall Completion', value: `${overallPct}%`, color: 'text-neutral-700' },
          { label: 'Mastered', value: mastered, color: 'text-mastered' },
          { label: 'Needs Work', value: needsWork, color: 'text-needswork' },
          { label: 'Not Started', value: notStarted, color: 'text-notstarted' },
        ].map((stat) => (
          <div key={stat.label} className="bg-white border border-neutral-300/40 rounded-xl p-4">
            <p className="text-xs text-neutral-700/50 mb-1">{stat.label}</p>
            <p className={`text-xl font-semibold ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white border border-neutral-300/40 rounded-xl p-5">
          <p className="text-sm font-medium mb-4">Progress by Role</p>
          <div className="space-y-3">
            {roles.map((role) => {
              const roleProgress = progress.filter((p) => p.question.roleId === role.id);
              const roleMastered = roleProgress.filter((p) => p.status === 'mastered').length;
              const pct = roleProgress.length ? Math.round((roleMastered / roleProgress.length) * 100) : 0;
              return (
                <div key={role.id}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-neutral-700/70">{role.name}</span>
                    <span className="text-neutral-700/50">{pct}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-neutral-300/40 rounded-full overflow-hidden">
                    <div className="h-full bg-primary-light rounded-full" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white border border-neutral-300/40 rounded-xl p-5">
          <p className="text-sm font-medium mb-4">Status Distribution</p>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={pieData} dataKey="value" innerRadius={50} outerRadius={75} paddingAngle={2}>
                {pieData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-4 mt-2">
            {pieData.map((d) => (
              <div key={d.name} className="flex items-center gap-1.5 text-xs text-neutral-700/60">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: d.color }} />
                {d.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}