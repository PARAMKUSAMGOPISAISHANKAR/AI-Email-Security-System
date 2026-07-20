import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@/hooks/useTheme';
import { ToastProvider } from '@/hooks/useToast';
import { AuthProvider } from '@/hooks/useAuth';
import PublicLayout from '@/layouts/PublicLayout';
import AuthLayout from '@/layouts/AuthLayout';
import DashboardLayout from '@/layouts/DashboardLayout';

import Landing from '@/pages/Landing';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Dashboard from '@/pages/Dashboard';
import Detect from '@/pages/Detect';
import HistoryPage from '@/pages/HistoryPage';
import Analytics from '@/pages/Analytics';
import Profile from '@/pages/Profile';
import NotFound from '@/pages/NotFound';

export default function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route element={<PublicLayout />}>
                <Route path="/" element={<Landing />} />
              </Route>

              <Route element={<AuthLayout />}>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </Route>

              <Route element={<DashboardLayout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/detect" element={<Detect />} />
                <Route path="/history" element={<HistoryPage />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/profile" element={<Profile />} />
              </Route>

              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}
