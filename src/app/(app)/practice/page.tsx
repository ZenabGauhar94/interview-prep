'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { RoleIcon } from '@/components/RoleIcon';

type Role = { id: string; name: string; description: string };

export default function PracticeIndex() {
  const [roles, setRoles] = useState<Role[]>([]);

  useEffect(() => {
    fetch('/api/roles').then((r) => r.json()).then(setRoles);
  }, []);

  return (
    <div className="px-8 py-8 max-w-5xl">
      <h1 className="text-[24px] font-semibold mb-1">Practice</h1>
      <p className="text-sm text-neutral-700/60 mb-6">Choose a role to see its question bank.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {roles.map((role) => (
          <Link key={role.id} href={`/practice/${role.id}`} className="bg-white border border-neutral-300/40 rounded-xl p-5 hover:border-primary/40 transition">
            <RoleIcon roleName={role.name} className="w-6 h-6 text-primary mb-3" />
            <p className="font-medium text-sm">{role.name}</p>
            <p className="text-xs text-neutral-700/50 mt-1">{role.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}