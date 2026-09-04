'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, BookOpen, TrendingUp, Mic, StickyNote, User, Settings, LogOut, CheckCircle2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const NAV_ITEMS = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/practice', label: 'Practice', icon: BookOpen },
  { href: '/progress', label: 'Progress', icon: TrendingUp },
  { href: '/mock', label: 'Mock Interview', icon: Mic },
  { href: '/notes', label: 'Notes', icon: StickyNote },
  { href: '/profile', label: 'Profile', icon: User },
  { href: '/settings', label: 'Settings', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const { logout } = useAuth();

  return (
    <aside className="hidden md:flex flex-col w-60 bg-primary text-white min-h-screen py-6 px-4 shrink-0">
      <div className="flex items-center gap-2 px-2 mb-8">
        <CheckCircle2 className="w-5 h-5" />
        <span className="font-semibold text-lg">PrepTrack</span>
      </div>

      <nav className="flex-1 space-y-1">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + '/');
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition ${
                active ? 'bg-white text-primary font-medium' : 'text-white/80 hover:bg-white/10'
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </Link>
          );
        })}
      </nav>

      <button
        onClick={logout}
        className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-white/80 hover:bg-white/10 transition mt-4"
      >
        <LogOut className="w-4 h-4" />
        Log out
      </button>
    </aside>
  );
}