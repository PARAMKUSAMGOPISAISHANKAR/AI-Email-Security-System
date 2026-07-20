import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '@/components/layout/Sidebar';
import AppTopbar from '@/components/layout/AppTopbar';

const TITLES: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/detect': 'Detect Spam',
  '/history': 'Detection History',
  '/analytics': 'Analytics',
  '/profile': 'Profile',
};

export default function DashboardLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { pathname } = useLocation();
  const title = TITLES[pathname] ?? 'SpamShield AI';

  return (
    <div className="flex min-h-screen bg-mist-50 dark:bg-ink-950">
      <Sidebar mobileOpen={mobileOpen} onCloseMobile={() => setMobileOpen(false)} />
      <div className="flex min-w-0 flex-1 flex-col">
        <AppTopbar title={title} onOpenSidebar={() => setMobileOpen(true)} />
        <main className="bg-grid flex-1 px-4 py-6 sm:px-6 lg:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
