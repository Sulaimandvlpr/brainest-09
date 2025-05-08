import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { ThemeProvider } from "@/hooks/useTheme";

import { MainLayout } from "./components/layout/MainLayout";
import { DashboardLayout } from "./components/layout/DashboardLayout";
import { AdminLayout } from "./components/layout/AdminLayout";

import Index from "./pages/Index";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";

import Dashboard from "./pages/dashboard/Dashboard";
import Packages from "./pages/dashboard/Packages";
import History from "./pages/dashboard/History";
import Profile from "./pages/dashboard/Profile";
import Settings from "./pages/dashboard/Settings";
import TryoutLive from "./pages/dashboard/TryoutLive";

import ExamInterface from "./components/exam/ExamInterface";
import ExamResult from "./components/exam/ExamResult";

// Admin Panel Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import Questions from "./pages/admin/Questions";
import QuestionCreate from "./pages/admin/QuestionCreate";
import TryoutPackages from "./pages/admin/TryoutPackages";
import PackageCreate from "./pages/admin/PackageCreate";
import UserManagement from "./pages/admin/UserManagement";
import Statistics from "./pages/admin/Statistics";
import AdminSettings from "./pages/admin/AdminSettings";

import SpaceBackground from "./components/three/SpaceBackground";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <SpaceBackground />
          <BrowserRouter>
            <Routes>
              <Route element={<MainLayout />}>
                <Route path="/" element={<Index />} />
                <Route path="/about" element={<About />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </Route>
              
              <Route path="/dashboard" element={<DashboardLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="packages" element={<Packages />} />
                <Route path="tryout-live" element={<TryoutLive />} />
                <Route path="history" element={<History />} />
                <Route path="profile" element={<Profile />} />
                <Route path="settings" element={<Settings />} />
              </Route>
              
              {/* Admin Panel Routes */}
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route path="questions" element={<Questions />} />
                <Route path="questions/create" element={<QuestionCreate />} />
                <Route path="packages" element={<TryoutPackages />} />
                <Route path="packages/create" element={<PackageCreate />} />
                <Route path="users" element={<UserManagement />} />
                <Route path="statistics" element={<Statistics />} />
                <Route path="settings" element={<AdminSettings />} />
              </Route>

              <Route path="/exam/:id" element={<ExamInterface />} />
              <Route path="/exam/result/:id" element={<ExamResult />} />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
