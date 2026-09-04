'use client';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function SettingsPage() {
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <div className="px-8 py-8 max-w-2xl">
      <h1 className="text-[24px] font-semibold mb-6">Settings</h1>

      <div className="bg-white border border-neutral-300/40 rounded-xl p-6 mb-4">
        <p className="text-sm font-medium mb-4">Notifications</p>
        <div className="flex items-center justify-between py-2">
          <div>
            <p className="text-sm">Daily review reminders</p>
            <p className="text-xs text-neutral-700/50">Get notified when questions are due for review</p>
          </div>
          <div className="w-10 h-6 bg-primary rounded-full relative cursor-pointer">
            <div className="w-4 h-4 bg-white rounded-full absolute top-1 right-1" />
          </div>
        </div>
      </div>

      <div className="bg-white border border-hard/20 rounded-xl p-6">
        <p className="text-sm font-medium mb-1">Danger Zone</p>
        <p className="text-xs text-neutral-700/50 mb-4">Log out of your account on this device.</p>
        <button
          onClick={handleLogout}
          className="text-sm border border-hard/30 text-hard bg-hard-bg rounded-lg px-4 py-2 hover:bg-hard/10 transition"
        >
          Log out
        </button>
      </div>
    </div>
  );
}