import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";

// Mock data for tryout history
const tryoutHistory = [
  {
    id: "1",
    name: "Tryout Nasional 1",
    date: "2023-03-01",
    duration: "120",
    score: 650,
    questions: 100,
    correct: 65,
    incorrect: 35,
    percentile: 68,
  },
  {
    id: "2",
    name: "Tryout Nasional 2",
    date: "2023-04-01",
    duration: "120",
    score: 680,
    questions: 100,
    correct: 68,
    incorrect: 32,
    percentile: 75,
  },
  {
    id: "3",
    name: "Tryout Nasional 3",
    date: "2023-04-15",
    duration: "120",
    score: 720,
    questions: 100,
    correct: 72,
    incorrect: 28,
    percentile: 82,
  },
  {
    id: "4",
    name: "Tryout Nasional 4",
    date: "2023-05-01",
    duration: "120",
    score: 750,
    questions: 100,
    correct: 75,
    incorrect: 25,
    percentile: 85,
  },
];

const subtestMap: Record<string, string> = {
  "Matematika": "Penalaran Matematika (PM)",
  "B. Indonesia": "Literasi Bahasa Indonesia (LBI)",
  "B. Inggris": "Literasi Bahasa Inggris (LBE)",
  "Fisika": "Penalaran Umum (PU)",
  "Kimia": "Pengetahuan Kuantitatif (PK)",
  "Biologi": "Pemahaman Bacaan dan Menulis (PBM)",
  "Geografi": "Pengetahuan dan Pemahaman Umum (PPU)",
  "Ekonomi": "Pengetahuan Kuantitatif (PK)",
  "Sejarah": "Pemahaman Bacaan dan Menulis (PBM)",
  "Sosiologi": "Penalaran Umum (PU)"
};

// Mock data for subject performance
const subjectPerformance = [
  { subject: "Penalaran Matematika (PM)", score: 75 },
  { subject: "Literasi Bahasa Indonesia (LBI)", score: 85 },
  { subject: "Literasi Bahasa Inggris (LBE)", score: 80 },
  { subject: "Penalaran Umum (PU)", score: 70 },
  { subject: "Pengetahuan Kuantitatif (PK)", score: 65 },
  { subject: "Pemahaman Bacaan dan Menulis (PBM)", score: 90 },
  { subject: "Pengetahuan dan Pemahaman Umum (PPU)", score: 75 },
];

export default function History() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("date");

  // Filter history based on search
  const filteredHistory = tryoutHistory.filter(
    (item) => item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort history based on selection
  const sortedHistory = [...filteredHistory].sort((a, b) => {
    switch (sortBy) {
      case "date":
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      case "score":
        return b.score - a.score;
      case "name":
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  return (
    <div className="space-y-8 bg-gradient-to-br from-blue-3d via-blue-3d-light to-cyan/30 min-h-screen font-display px-4 md:px-12 py-8">
      <div>
        <h2 className="text-4xl font-bold tracking-tight text-white drop-shadow">Riwayat Tryout</h2>
        <p className="text-blue-200 text-lg">
          Lihat riwayat dan hasil tryout yang telah Anda kerjakan.
        </p>
      </div>

      <div className="grid gap-8">
        <Card className="rounded-2xl shadow-3d bg-blue-3d/80 text-white">
          <CardHeader className="pb-3">
            <CardTitle className="text-2xl font-bold drop-shadow">Ringkasan Performa</CardTitle>
            <CardDescription className="text-blue-200">
              Grafik skor tryout Anda dari waktu ke waktu
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={tryoutHistory}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="name" stroke="#cbd5e1" fontWeight={600} />
                <YAxis domain={[500, 1000]} stroke="#cbd5e1" fontWeight={600} />
                <Tooltip contentStyle={{ background: '#223a7a', color: '#fff', borderRadius: 12, border: '1px solid #3b82f6' }} />
                <Bar dataKey="score" fill="url(#barGradient)" name="Skor" radius={[8, 8, 0, 0]} isAnimationActive={true} />
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.9} />
                    <stop offset="100%" stopColor="#06b6d4" stopOpacity={0.7} />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-3d bg-blue-3d/80 text-white">
          <CardHeader className="pb-3">
            <CardTitle className="text-2xl font-bold drop-shadow">Riwayat Tryout</CardTitle>
            <CardDescription className="text-blue-200">
              Daftar lengkap tryout yang telah Anda kerjakan
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="w-full md:w-2/3">
                <Label htmlFor="search" className="text-white">Cari Tryout</Label>
                <Input
                  id="search"
                  placeholder="Cari berdasarkan nama..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full shadow-3d"
                />
              </div>
              <div className="w-full md:w-1/3">
                <Label htmlFor="sort" className="text-white">Urutkan Berdasarkan</Label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger id="sort" className="shadow-3d">
                    <SelectValue placeholder="Pilih urutan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="date">Tanggal (Terbaru)</SelectItem>
                    <SelectItem value="score">Skor (Tertinggi)</SelectItem>
                    <SelectItem value="name">Nama (A-Z)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="rounded-2xl shadow-3d border border-blue-3d bg-blue-3d-light/40 overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-lg">Nama Tryout</TableHead>
                    <TableHead className="text-lg">Tanggal</TableHead>
                    <TableHead className="hidden md:table-cell text-lg">Durasi</TableHead>
                    <TableHead className="text-lg text-center">Skor</TableHead>
                    <TableHead className="hidden md:table-cell text-lg text-center">Detail</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedHistory.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-6 text-blue-200">
                        Tidak ada riwayat tryout yang ditemukan
                      </TableCell>
                    </TableRow>
                  ) : (
                    sortedHistory.map((item) => (
                      <TableRow key={item.id} className="hover:bg-cyan/20 transition-all">
                        <TableCell className="font-semibold text-base">{item.name}</TableCell>
                        <TableCell>{new Date(item.date).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}</TableCell>
                        <TableCell className="hidden md:table-cell">{item.duration} menit</TableCell>
                        <TableCell className="text-center font-bold text-lg text-cyan">{item.score}</TableCell>
                        <TableCell className="hidden md:table-cell text-center">
                          <Button asChild variant="3d" size="sm" className="rounded-full px-4 py-1">
                            <Link to={`/dashboard/history/${item.id}`}>Detail</Link>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Performa Berdasarkan Mata Pelajaran</CardTitle>
            <CardDescription>
              Skor rata-rata Anda untuk setiap mata pelajaran
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {subjectPerformance.map((subject) => (
                <div key={subject.subject} className="space-y-1">
                  <div className="flex justify-between">
                    <span className="font-medium">{subject.subject}</span>
                    <span className="font-medium">{subject.score}/100</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2.5 overflow-hidden">
                    <div
                      className="bg-utbk-blue h-2.5 rounded-full"
                      style={{ width: `${subject.score}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
