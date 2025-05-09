import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  ResponsiveContainer 
} from 'recharts';
import { useAuth } from "@/hooks/useAuth";

// Mock data for the dashboard
const recentUsers = [
  { id: 1, name: "Budi Santoso", email: "budi@example.com", date: "2023-05-01" },
  { id: 2, name: "Siti Rahayu", email: "siti@example.com", date: "2023-05-02" },
  { id: 3, name: "Anwar Ibrahim", email: "anwar@example.com", date: "2023-05-03" },
  { id: 4, name: "Dewi Lestari", email: "dewi@example.com", date: "2023-05-04" },
];

const packageStats = [
  { name: 'TPS Batch 1', users: 120 },
  { name: 'TKA Saintek', users: 98 },
  { name: 'TKA Soshum', users: 86 },
  { name: 'UTBK Lengkap', users: 140 },
  { name: 'Kebumian', users: 40 },
];

export default function AdminDashboard() {
  const { user } = useAuth();
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Selamat Datang, {user?.name}</h2>
        <p className="text-muted-foreground">
          Kelola soal, paket tryout, dan pengguna dari dashboard admin
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Pengguna</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,274</div>
            <p className="text-xs text-muted-foreground">
              +56 dari bulan lalu
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Soal Tersedia</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">824</div>
            <p className="text-xs text-muted-foreground">
              +43 dari bulan lalu
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Paket Tryout</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">16</div>
            <p className="text-xs text-muted-foreground">
              +3 dari bulan lalu
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tryout Diselesaikan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,342</div>
            <p className="text-xs text-muted-foreground">
              +245 dari bulan lalu
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Chart */}
      <Card className="rounded-none bg-[#0f172a] shadow-none border-none">
        <CardHeader>
          <CardTitle>Statistik Penggunaan Paket</CardTitle>
        </CardHeader>
        <CardContent className="pt-2">
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={packageStats}>
                <CartesianGrid strokeDasharray="3 3" stroke="#fff4" />
                <XAxis dataKey="name" stroke="#e0e7ef" tick={{ fill: '#e0e7ef', fontSize: 14 }} />
                <YAxis stroke="#e0e7ef" tick={{ fill: '#e0e7ef', fontSize: 14 }} />
                <RechartsTooltip contentStyle={{ background: '#1e293b', border: 'none', color: '#fff' }} cursor={{ fill: '#0ea5e933' }} />
                <Bar dataKey="users" fill="#0ea5e9" radius={[6,6,0,0]} isAnimationActive={false} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Recent Users */}
      <Card>
        <CardHeader>
          <CardTitle>Pengguna Terbaru</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Nama</th>
                  <th className="text-left py-3 px-4">Email</th>
                  <th className="text-left py-3 px-4">Tanggal Daftar</th>
                </tr>
              </thead>
              <tbody>
                {recentUsers.map((user) => (
                  <tr key={user.id} className="border-b">
                    <td className="py-3 px-4">{user.name}</td>
                    <td className="py-3 px-4">{user.email}</td>
                    <td className="py-3 px-4">{user.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
