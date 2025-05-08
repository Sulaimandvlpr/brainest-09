import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";

export default function Profile() {
  const { user } = useAuth();
  
  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "081234567890", // Mock data
    address: "Jl. Pendidikan No. 123", // Mock data
    city: "Jakarta", // Mock data
    province: "DKI Jakarta", // Mock data
    birthDate: "2000-01-01", // Mock data
    gender: "male", // Mock data
    school: "SMAN 1 Jakarta", // Mock data
    graduationYear: "2024", // Mock data
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to an API
    toast.success("Profil berhasil diperbarui");
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error("Konfirmasi password tidak cocok");
      return;
    }
    
    if (passwordForm.newPassword.length < 6) {
      toast.error("Password harus minimal 6 karakter");
      return;
    }
    
    // Here you would typically send the password data to an API
    toast.success("Password berhasil diubah");
    setPasswordForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  return (
    <div className="space-y-8 bg-gradient-to-br from-blue-3d via-blue-3d-light to-cyan/30 min-h-screen font-display px-4 md:px-12 py-8">
      <div>
        <h2 className="text-4xl font-bold tracking-tight text-white drop-shadow">Profil Pengguna</h2>
        <p className="text-blue-200 text-lg">
          Kelola informasi profil dan preferensi akun Anda.
        </p>
      </div>

      <div className="grid gap-8">
        <Card className="rounded-2xl shadow-3d bg-blue-3d/80 text-white">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-6">
              <Avatar className="h-24 w-24 border-4 border-cyan shadow-3d">
                <AvatarImage src="" />
                <AvatarFallback className="text-3xl bg-cyan text-white">
                  {user?.name?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-2xl font-bold drop-shadow">{user?.name || "Pengguna"}</CardTitle>
                <CardDescription className="text-blue-200 text-base">{user?.email || "user@example.com"}</CardDescription>
                <p className="text-sm mt-1">
                  <span className="inline-flex items-center rounded-full bg-green-700 px-3 py-1 text-xs font-medium text-white shadow-3d">
                    {user?.role === "admin" ? "Admin" : "Peserta"}
                  </span>
                </p>
              </div>
            </div>
          </CardHeader>
          <Separator />
          <form onSubmit={handleProfileSubmit}>
            <CardContent className="pt-6 pb-4">
              <div className="space-y-6">
                <div className="text-lg font-medium">Informasi Personal</div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-white">Nama Lengkap</Label>
                    <Input
                      id="name"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      className="shadow-3d"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-white">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      readOnly
                      disabled
                      className="shadow-3d"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-white">Nomor HP</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      className="shadow-3d"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="birthDate" className="text-white">Tanggal Lahir</Label>
                    <Input
                      id="birthDate"
                      name="birthDate"
                      type="date"
                      value={form.birthDate}
                      onChange={handleChange}
                      className="shadow-3d"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gender" className="text-white">Jenis Kelamin</Label>
                    <Select
                      value={form.gender}
                      onValueChange={(value) => handleSelectChange("gender", value)}
                    >
                      <SelectTrigger id="gender" className="shadow-3d">
                        <SelectValue placeholder="Pilih jenis kelamin" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Laki-laki</SelectItem>
                        <SelectItem value="female">Perempuan</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Separator />
                <div className="text-lg font-medium">Informasi Akademik</div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="school" className="text-white">Sekolah</Label>
                    <Input
                      id="school"
                      name="school"
                      value={form.school}
                      onChange={handleChange}
                      className="shadow-3d"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="graduationYear" className="text-white">Tahun Kelulusan</Label>
                    <Select
                      value={form.graduationYear}
                      onValueChange={(value) => handleSelectChange("graduationYear", value)}
                    >
                      <SelectTrigger id="graduationYear" className="shadow-3d">
                        <SelectValue placeholder="Pilih tahun kelulusan" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2023">2023</SelectItem>
                        <SelectItem value="2024">2024</SelectItem>
                        <SelectItem value="2025">2025</SelectItem>
                        <SelectItem value="2026">2026</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button type="submit" variant="3d" size="lg" className="rounded-full px-8">Simpan Perubahan</Button>
            </CardFooter>
          </form>
        </Card>

        <Card className="rounded-2xl shadow-3d bg-blue-3d/80 text-white">
          <CardHeader>
            <CardTitle className="text-2xl font-bold drop-shadow">Ubah Password</CardTitle>
            <CardDescription className="text-blue-200">Ganti password akun Anda secara berkala untuk keamanan.</CardDescription>
          </CardHeader>
          <form onSubmit={handlePasswordSubmit}>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="currentPassword" className="text-white">Password Saat Ini</Label>
                <Input
                  id="currentPassword"
                  name="currentPassword"
                  type="password"
                  value={passwordForm.currentPassword}
                  onChange={handlePasswordChange}
                  className="shadow-3d"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newPassword" className="text-white">Password Baru</Label>
                <Input
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  value={passwordForm.newPassword}
                  onChange={handlePasswordChange}
                  className="shadow-3d"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-white">Konfirmasi Password Baru</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={passwordForm.confirmPassword}
                  onChange={handlePasswordChange}
                  className="shadow-3d"
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button type="submit" variant="3d" size="lg" className="rounded-full px-8">Ubah Password</Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
