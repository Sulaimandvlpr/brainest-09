import { useEffect } from 'react';
import { Outlet, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { 
  BarChart2, 
  Database, 
  FileText, 
  FilePlus, 
  Settings, 
  Users,
  LogOut
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { useLocation } from 'react-router-dom';

export function AdminLayout() {
  const { user, isLoading, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isLoading && (!user || (user.role !== 'admin' && user.role !== 'editor'))) {
      toast.error('Anda tidak memiliki akses ke halaman ini');
      navigate('/login', { replace: true });
    }
  }, [user, isLoading, navigate]);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gradient-to-b from-[#0f172a] via-[#1e293b] to-[#164e63]">
      {/* Sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-col">
        <div className="flex flex-col flex-grow bg-[#0f172a] border-r border-cyan/20">
          <div className="flex items-center justify-center h-16 px-4 border-b border-cyan/20">
            <h2 className="text-2xl font-bold text-cyan-200 tracking-wide">Admin Panel</h2>
          </div>

          <div className="flex flex-col flex-1 overflow-y-auto">
            <nav className="flex-1 px-4 py-4 space-y-1">
              <Link to="/admin" className={cn(
                "admin-sidebar-link flex items-center gap-3 rounded-lg px-3 py-2 transition-all duration-300 relative hover:scale-105 hover:shadow-[0_0_16px_0_rgba(34,211,238,0.25)] hover:bg-cyan-900/20",
                location.pathname === "/admin" ?
                  "bg-gradient-to-r from-cyan-700/80 to-blue-700/80 text-white shadow-lg border-l-4 border-cyan-400 ring-2 ring-cyan-300/30" :
                  "text-cyan-100 hover:text-white"
              )}>
                <BarChart2 className="h-5 w-5" />
                <span>Dashboard</span>
              </Link>
              <Link to="/admin/questions" className={cn(
                "admin-sidebar-link flex items-center gap-3 rounded-lg px-3 py-2 transition-all duration-300 relative hover:scale-105 hover:shadow-[0_0_16px_0_rgba(34,211,238,0.25)] hover:bg-cyan-900/20",
                location.pathname === "/admin/questions" ?
                  "bg-gradient-to-r from-cyan-700/80 to-blue-700/80 text-white shadow-lg border-l-4 border-cyan-400 ring-2 ring-cyan-300/30" :
                  "text-cyan-100 hover:text-white"
              )}>
                <FileText className="h-5 w-5" />
                <span>Bank Soal</span>
              </Link>
              <Link to="/admin/questions/create" className={cn(
                "admin-sidebar-link flex items-center gap-3 rounded-lg px-3 py-2 transition-all duration-300 relative hover:scale-105 hover:shadow-[0_0_16px_0_rgba(34,211,238,0.25)] hover:bg-cyan-900/20",
                location.pathname === "/admin/questions/create" ?
                  "bg-gradient-to-r from-cyan-700/80 to-blue-700/80 text-white shadow-lg border-l-4 border-cyan-400 ring-2 ring-cyan-300/30" :
                  "text-cyan-100 hover:text-white"
              )}>
                <FilePlus className="h-5 w-5" />
                <span>Tambah Soal</span>
              </Link>
              <Link to="/admin/packages" className={cn(
                "admin-sidebar-link flex items-center gap-3 rounded-lg px-3 py-2 transition-all duration-300 relative hover:scale-105 hover:shadow-[0_0_16px_0_rgba(34,211,238,0.25)] hover:bg-cyan-900/20",
                location.pathname.startsWith("/admin/packages") ?
                  "bg-gradient-to-r from-cyan-700/80 to-blue-700/80 text-white shadow-lg border-l-4 border-cyan-400 ring-2 ring-cyan-300/30" :
                  "text-cyan-100 hover:text-white"
              )}>
                <Database className="h-5 w-5" />
                <span>Paket Tryout</span>
              </Link>
              <Link to="/admin/users" className={cn(
                "admin-sidebar-link flex items-center gap-3 rounded-lg px-3 py-2 transition-all duration-300 relative hover:scale-105 hover:shadow-[0_0_16px_0_rgba(34,211,238,0.25)] hover:bg-cyan-900/20",
                location.pathname.startsWith("/admin/users") ?
                  "bg-gradient-to-r from-cyan-700/80 to-blue-700/80 text-white shadow-lg border-l-4 border-cyan-400 ring-2 ring-cyan-300/30" :
                  "text-cyan-100 hover:text-white"
              )}>
                <Users className="h-5 w-5" />
                <span>Manajemen User</span>
              </Link>
              <Link to="/admin/statistics" className={cn(
                "admin-sidebar-link flex items-center gap-3 rounded-lg px-3 py-2 transition-all duration-300 relative hover:scale-105 hover:shadow-[0_0_16px_0_rgba(34,211,238,0.25)] hover:bg-cyan-900/20",
                location.pathname.startsWith("/admin/statistics") ?
                  "bg-gradient-to-r from-cyan-700/80 to-blue-700/80 text-white shadow-lg border-l-4 border-cyan-400 ring-2 ring-cyan-300/30" :
                  "text-cyan-100 hover:text-white"
              )}>
                <BarChart2 className="h-5 w-5" />
                <span>Statistik</span>
              </Link>
              <Link to="/admin/settings" className={cn(
                "admin-sidebar-link flex items-center gap-3 rounded-lg px-3 py-2 transition-all duration-300 relative hover:scale-105 hover:shadow-[0_0_16px_0_rgba(34,211,238,0.25)] hover:bg-cyan-900/20",
                location.pathname.startsWith("/admin/settings") ?
                  "bg-gradient-to-r from-cyan-700/80 to-blue-700/80 text-white shadow-lg border-l-4 border-cyan-400 ring-2 ring-cyan-300/30" :
                  "text-cyan-100 hover:text-white"
              )}>
                <Settings className="h-5 w-5" />
                <span>Pengaturan</span>
              </Link>
            </nav>
          </div>

          <div className="p-4 border-t border-cyan/20">
            <Button 
              variant="ghost" 
              className="admin-sidebar-logout w-full flex items-center justify-start text-red-500 hover:text-red-600 hover:bg-red-50 font-bold text-lg gap-2 py-3 px-4 rounded-xl transition-all"
              onClick={handleLogout}
            >
              <LogOut className="mr-3 h-5 w-5" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Header */}
        <header className="bg-[#0f172a] w-full">
          <div className="flex items-center justify-between h-16 px-6">
            <span className="text-base font-medium text-gray-400">
              {user?.name || 'Admin'}
            </span>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-4 bg-[#0f172a]">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
