import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../../lib/utils';
import { Settings, Calculator } from 'lucide-react';

const AdminLayout: React.FC = () => {
  const location = window.location;

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 p-6 space-y-6">
        <div className="flex items-center gap-4">
          {/* Add your logo here */}
        </div>
        <nav className="space-y-2">
          <Link to="/admin/settings" className={cn(
            "admin-sidebar-link flex items-center gap-3 rounded-lg px-3 py-2 transition-all duration-300 relative hover:scale-105 hover:shadow-[0_0_16px_0_rgba(34,211,238,0.25)] hover:bg-cyan-900/20",
            location.pathname.startsWith("/admin/settings") ?
              "bg-gradient-to-r from-cyan-700/80 to-blue-700/80 text-white shadow-lg border-l-4 border-cyan-400 ring-2 ring-cyan-300/30" :
              "text-cyan-100 hover:text-white"
          )}>
            <Settings className="h-5 w-5" />
            <span>Pengaturan</span>
          </Link>
          <Link to="/admin/irt-settings" className={cn(
            "admin-sidebar-link flex items-center gap-3 rounded-lg px-3 py-2 transition-all duration-300 relative hover:scale-105 hover:shadow-[0_0_16px_0_rgba(34,211,238,0.25)] hover:bg-cyan-900/20",
            location.pathname.startsWith("/admin/irt-settings") ?
              "bg-gradient-to-r from-cyan-700/80 to-blue-700/80 text-white shadow-lg border-l-4 border-cyan-400 ring-2 ring-cyan-300/30" :
              "text-cyan-100 hover:text-white"
          )}>
            <Calculator className="h-5 w-5" />
            <span>Pengaturan IRT</span>
          </Link>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 space-y-6">
        {/* Add your main content here */}
      </main>
    </div>
  );
};

export default AdminLayout; 