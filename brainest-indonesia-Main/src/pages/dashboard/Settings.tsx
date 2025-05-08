import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default function Settings() {
  // State untuk setiap fitur
  const { user, logout } = useAuth();
  const [account, setAccount] = useState({ name: user?.name || "", email: user?.email || "", password: "" });
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteStep, setDeleteStep] = useState(1);
  const [deleteInput, setDeleteInput] = useState("");
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [timerPosition, setTimerPosition] = useState("atas");
  const [notif, setNotif] = useState({ skor: true, tryout: true, pengumuman: true });
  const [showEval, setShowEval] = useState(true);
  const [showAnswer, setShowAnswer] = useState(true);
  const [hideFinalScore, setHideFinalScore] = useState(false);
  const [autoLogout, setAutoLogout] = useState(true);
  const [autoLock, setAutoLock] = useState(true);
  const [twoFactor, setTwoFactor] = useState(false);
  const [lang, setLang] = useState(localStorage.getItem("lang") || "id");
  const [activeTab, setActiveTab] = useState("account");
  const [irtModel, setIrtModel] = useState("1PL");
  const [initialTheta, setInitialTheta] = useState(0.0);
  const [maxIterations, setMaxIterations] = useState(100);
  const [convergenceThreshold, setConvergenceThreshold] = useState(0.001);
  const [adaptiveEnabled, setAdaptiveEnabled] = useState(true);
  const [minItems, setMinItems] = useState(1);
  const [maxItems, setMaxItems] = useState(10);
  const [targetInformation, setTargetInformation] = useState(0.5);
  const [guessingParameter, setGuessingParameter] = useState(0.25);
  const [discriminationParameter, setDiscriminationParameter] = useState(1.0);
  const [difficultyParameter, setDifficultyParameter] = useState(0.5);

  // Simulasi riwayat tryout
  const tryoutHistory = [
    { id: "1", name: "Tryout Nasional 1", date: "2023-03-01", score: 650 },
    { id: "2", name: "Tryout Nasional 2", date: "2023-04-01", score: 680 },
  ];

  // Handler
  const handleAccountChange = (e: any) => setAccount({ ...account, [e.target.name]: e.target.value });
  const handleAccountSave = () => toast.success("Akun diperbarui");
  const handlePasswordSave = () => toast.success("Password diubah");
  const handleDeleteAccount = () => {
    if (deleteStep === 1) {
      setDeleteStep(2);
    } else if (deleteStep === 2 && deleteInput === account.email) {
      toast.success("Akun dihapus (simulasi)");
      setShowDeleteConfirm(false);
      setDeleteStep(1);
      setDeleteInput("");
      logout();
    } else {
      toast.error("Konfirmasi email salah");
    }
  };
  const handleThemeToggle = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };
  const handleLangChange = (val: string) => {
    setLang(val);
    localStorage.setItem("lang", val);
    toast.success("Bahasa disimpan");
  };
  const handleSaveIRT = () => {
    // Implementasi penyimpanan pengaturan IRT
    toast.success("Pengaturan IRT berhasil disimpan");
  };

  return (
    <div className="space-y-8 bg-gradient-to-br from-blue-3d via-blue-3d-light to-cyan/30 min-h-screen font-display px-4 md:px-12 py-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-4xl font-bold tracking-tight text-white drop-shadow">Pengaturan</h2>
          <p className="text-blue-200 text-lg mt-2">Atur preferensi akun, keamanan, tampilan, dan sistem IRT Anda.</p>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="3d" size="lg" className="rounded-full px-6" onClick={handleThemeToggle}>
            {theme === "light" ? "🌙" : "☀️"} {theme === "light" ? "Dark Mode" : "Light Mode"}
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-8 flex gap-2 bg-blue-3d/60 rounded-xl p-2">
          <TabsTrigger value="account">Akun</TabsTrigger>
          <TabsTrigger value="exam">Preferensi Ujian</TabsTrigger>
          <TabsTrigger value="evaluation">Evaluasi</TabsTrigger>
          <TabsTrigger value="irt">IRT</TabsTrigger>
        </TabsList>

        <TabsContent value="account">
          {/* 1. Pengaturan Akun */}
          <Card className="rounded-2xl shadow-3d bg-blue-3d/80 text-white hover:bg-blue-3d/90 transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-2xl font-bold drop-shadow flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-cyan">
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                Pengaturan Akun
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label className="text-white text-sm font-medium">Nama</Label>
                <Input name="name" value={account.name} onChange={handleAccountChange} className="shadow-3d bg-blue-3d-light/50 border-cyan/30" />
              </div>
              <div className="space-y-2">
                <Label className="text-white text-sm font-medium">Email</Label>
                <Input name="email" value={account.email} onChange={handleAccountChange} className="shadow-3d bg-blue-3d-light/50 border-cyan/30" />
              </div>
              <div className="space-y-2">
                <Label className="text-white text-sm font-medium">Password Baru</Label>
                <Input name="password" type="password" value={account.password} onChange={handleAccountChange} className="shadow-3d bg-blue-3d-light/50 border-cyan/30" />
              </div>
              <div className="flex gap-3 pt-2">
                <Button onClick={handleAccountSave} variant="3d" className="rounded-full px-6 flex-1">Simpan Perubahan</Button>
                <Button variant="destructive" onClick={() => setShowDeleteConfirm(true)} className="rounded-full px-6 flex-1">Hapus Akun</Button>
              </div>
              {showDeleteConfirm && (
                <div className="mt-4 p-6 border border-cyan/30 rounded-xl bg-blue-3d-light/40 backdrop-blur-sm">
                  {deleteStep === 1 ? (
                    <>
                      <p className="text-blue-200 mb-4">Ketik email Anda untuk konfirmasi hapus akun:</p>
                      <Input value={deleteInput} onChange={e => setDeleteInput(e.target.value)} placeholder="Email" className="shadow-3d bg-blue-3d-light/50 border-cyan/30 mb-4" />
                      <div className="flex gap-3">
                        <Button onClick={handleDeleteAccount} variant="3d" className="flex-1">Konfirmasi</Button>
                        <Button variant="outline" onClick={() => setShowDeleteConfirm(false)} className="flex-1">Batal</Button>
                      </div>
                    </>
                  ) : (
                    <>
                      <p className="text-blue-200 mb-4">Verifikasi dua langkah: Masukkan email lagi untuk hapus akun.</p>
                      <Input value={deleteInput} onChange={e => setDeleteInput(e.target.value)} placeholder="Email" className="shadow-3d bg-blue-3d-light/50 border-cyan/30 mb-4" />
                      <div className="flex gap-3">
                        <Button onClick={handleDeleteAccount} variant="destructive" className="flex-1">Hapus Akun</Button>
                        <Button variant="outline" onClick={() => setShowDeleteConfirm(false)} className="flex-1">Batal</Button>
                      </div>
                    </>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="exam">
          {/* 2. Preferensi Ujian */}
          <Card className="rounded-2xl shadow-3d bg-blue-3d/80 text-white hover:bg-blue-3d/90 transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-2xl font-bold drop-shadow flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-cyan">
                  <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
                Preferensi Ujian
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Label className="text-white text-sm font-medium">Posisi Timer</Label>
                <Select value={timerPosition} onValueChange={setTimerPosition}>
                  <SelectTrigger className="shadow-3d bg-blue-3d-light/50 border-cyan/30">
                    <SelectValue placeholder="Pilih posisi timer" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="atas">Atas</SelectItem>
                    <SelectItem value="bawah">Bawah</SelectItem>
                    <SelectItem value="kanan">Kanan</SelectItem>
                    <SelectItem value="kiri">Kiri</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-4">
                <Label className="text-white text-sm font-medium">Notifikasi</Label>
                <div className="grid gap-4">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-blue-3d-light/30">
                    <Checkbox checked={notif.skor} onCheckedChange={v => setNotif(n => ({ ...n, skor: !!v }))} className="border-cyan/30" />
                    <span>Skor</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-blue-3d-light/30">
                    <Checkbox checked={notif.tryout} onCheckedChange={v => setNotif(n => ({ ...n, tryout: !!v }))} className="border-cyan/30" />
                    <span>Tryout Baru</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-blue-3d-light/30">
                    <Checkbox checked={notif.pengumuman} onCheckedChange={v => setNotif(n => ({ ...n, pengumuman: !!v }))} className="border-cyan/30" />
                    <span>Pengumuman</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="evaluation">
          {/* 3. Evaluasi */}
          <Card className="rounded-2xl shadow-3d bg-blue-3d/80 text-white hover:bg-blue-3d/90 transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-2xl font-bold drop-shadow flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-cyan">
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                </svg>
                Evaluasi
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4">
                <div className="flex items-center justify-between p-3 rounded-lg bg-blue-3d-light/30">
                  <Label className="text-white text-sm font-medium">Tampilkan Evaluasi Otomatis</Label>
                  <Switch checked={showEval} onCheckedChange={setShowEval} />
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-blue-3d-light/30">
                  <Label className="text-white text-sm font-medium">Tampilkan Jawaban Benar</Label>
                  <Switch checked={showAnswer} onCheckedChange={setShowAnswer} />
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-blue-3d-light/30">
                  <Label className="text-white text-sm font-medium">Sembunyikan Skor Akhir (Latihan Mental)</Label>
                  <Switch checked={hideFinalScore} onCheckedChange={setHideFinalScore} />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="irt">
          {/* 4. Pengaturan IRT */}
          <Card className="rounded-2xl shadow-3d bg-blue-3d/80 text-white hover:bg-blue-3d/90 transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-2xl font-bold drop-shadow flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-cyan">
                  <path d="M9 17v-2a4 4 0 014-4h4m0 0V7m0 4l-4-4m0 0l-4 4" />
                </svg>
                Pengaturan IRT
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              <form className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label className="text-cyan-200">Model IRT</Label>
                    <Select
                      value={irtModel}
                      onValueChange={setIrtModel}
                    >
                      <SelectTrigger className="bg-white/10 border-cyan/20">
                        <SelectValue placeholder="Pilih model" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1PL">1PL (Rasch Model)</SelectItem>
                        <SelectItem value="2PL">2PL (Two-Parameter)</SelectItem>
                        <SelectItem value="3PL">3PL (Three-Parameter)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-cyan-200">Initial Theta</Label>
                    <Input
                      type="number"
                      value={initialTheta}
                      onChange={e => setInitialTheta(parseFloat(e.target.value))}
                      className="bg-white/10 border-cyan/20"
                    />
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label className="text-cyan-200">Max Iterations</Label>
                    <Input
                      type="number"
                      value={maxIterations}
                      onChange={e => setMaxIterations(parseInt(e.target.value))}
                      className="bg-white/10 border-cyan/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-cyan-200">Convergence Threshold</Label>
                    <Input
                      type="number"
                      step="0.001"
                      value={convergenceThreshold}
                      onChange={e => setConvergenceThreshold(parseFloat(e.target.value))}
                      className="bg-white/10 border-cyan/20"
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={adaptiveEnabled}
                    onCheckedChange={setAdaptiveEnabled}
                  />
                  <Label className="text-cyan-200">Aktifkan Adaptive Testing</Label>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label className="text-cyan-200">Min Items</Label>
                    <Input
                      type="number"
                      value={minItems}
                      onChange={e => setMinItems(parseInt(e.target.value))}
                      className="bg-white/10 border-cyan/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-cyan-200">Max Items</Label>
                    <Input
                      type="number"
                      value={maxItems}
                      onChange={e => setMaxItems(parseInt(e.target.value))}
                      className="bg-white/10 border-cyan/20"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-cyan-200">Target Information</Label>
                  <Input
                    type="number"
                    step="0.1"
                    value={targetInformation}
                    onChange={e => setTargetInformation(parseFloat(e.target.value))}
                    className="bg-white/10 border-cyan/20"
                  />
                </div>
                <Separator className="my-6 border-cyan/30" />
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label className="text-cyan-200">Guessing Parameter (c)</Label>
                    <Input
                      type="number"
                      step="0.01"
                      value={guessingParameter}
                      onChange={e => setGuessingParameter(parseFloat(e.target.value))}
                      className="bg-white/10 border-cyan/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-cyan-200">Discrimination Parameter (a)</Label>
                    <Input
                      type="number"
                      step="0.1"
                      value={discriminationParameter}
                      onChange={e => setDiscriminationParameter(parseFloat(e.target.value))}
                      className="bg-white/10 border-cyan/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-cyan-200">Difficulty Parameter (b)</Label>
                    <Input
                      type="number"
                      step="0.1"
                      value={difficultyParameter}
                      onChange={e => setDifficultyParameter(parseFloat(e.target.value))}
                      className="bg-white/10 border-cyan/20"
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button
                    onClick={handleSaveIRT}
                    className="bg-cyan-600 hover:bg-cyan-700 text-white px-8"
                  >
                    Simpan Pengaturan IRT
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 