import React, { useState } from "react";

const tabs = [
  { key: "general", label: "Umum" },
  { key: "irt", label: "IRT" },
];

type IrtSettings = {
  mode: string;
  theta: number;
  jumlahSoalAwal: number;
  maxSoal: number;
};

type IrtErrors = {
  jumlahSoalAwal?: string;
  maxSoal?: string;
};

const initialIrtSettings: IrtSettings = {
  mode: "3PL",
  theta: 0,
  jumlahSoalAwal: 5,
  maxSoal: 20,
};

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState("general");
  const [irtSettings, setIrtSettings] = useState<IrtSettings>(initialIrtSettings);
  const [saved, setSaved] = useState(false);
  const [errors, setErrors] = useState<IrtErrors>({});

  const handleIrtChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setIrtSettings({
      ...irtSettings,
      [name]: type === "number" || name === "theta" ? Number(value) : value,
    });
    setSaved(false);
  };

  const handleIrtSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let newErrors: IrtErrors = {};
    if (irtSettings.jumlahSoalAwal < 1) newErrors.jumlahSoalAwal = "Minimal 1";
    if (irtSettings.maxSoal < 1) newErrors.maxSoal = "Minimal 1";
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    setSaved(true);
    // TODO: Integrasi ke backend di sini
  };

  return (
    <div className="p-8 text-white">
      <h1 className="text-2xl font-bold mb-6">Pengaturan Admin</h1>
      <div className="flex gap-4 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 rounded-t-lg font-semibold transition-all duration-200 focus:outline-none ${
              activeTab === tab.key
                ? "bg-cyan-700 text-white shadow-lg"
                : "bg-cyan-900/40 text-cyan-200 hover:bg-cyan-800/60"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="bg-cyan-900/40 rounded-xl p-6 min-h-[200px] shadow-lg">
        {activeTab === "general" && (
          <div>
            <h2 className="text-xl font-bold mb-2">Pengaturan Umum</h2>
            <p>Silakan atur pengaturan umum admin di sini.</p>
          </div>
        )}
        {activeTab === "irt" && (
          <div>
            <h2 className="text-xl font-bold mb-2">Pengaturan IRT (Item Response Theory)</h2>
            <p className="mb-4 text-cyan-200 text-sm max-w-2xl">
              Atur parameter IRT untuk tryout adaptif. Mode IRT menentukan model perhitungan (1PL, 2PL, 3PL). Theta awal adalah estimasi kemampuan awal siswa. Jumlah soal awal dan batas maksimum soal menentukan panjang tes adaptif.
            </p>
            <form className="space-y-4 max-w-lg" onSubmit={handleIrtSubmit}>
              <div>
                <label className="block mb-1 font-medium">Mode IRT
                  <span className="ml-2 text-xs text-cyan-300" title="Model IRT yang digunakan: 1PL (Rasch), 2PL, atau 3PL.">?</span>
                </label>
                <select
                  name="mode"
                  value={irtSettings.mode}
                  onChange={handleIrtChange}
                  className="w-full rounded px-3 py-2 bg-cyan-950 text-white border border-cyan-700"
                >
                  <option value="1PL">1PL (Rasch)</option>
                  <option value="2PL">2PL</option>
                  <option value="3PL">3PL</option>
                </select>
              </div>
              <div>
                <label className="block mb-1 font-medium">Theta Awal
                  <span className="ml-2 text-xs text-cyan-300" title="Estimasi kemampuan awal siswa.">?</span>
                </label>
                <input
                  type="number"
                  step="0.01"
                  name="theta"
                  value={irtSettings.theta}
                  onChange={handleIrtChange}
                  className="w-full rounded px-3 py-2 bg-cyan-950 text-white border border-cyan-700"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Jumlah Soal Awal
                  <span className="ml-2 text-xs text-cyan-300" title="Jumlah soal pertama yang diberikan.">?</span>
                </label>
                <input
                  type="number"
                  min={1}
                  name="jumlahSoalAwal"
                  value={irtSettings.jumlahSoalAwal}
                  onChange={handleIrtChange}
                  className="w-full rounded px-3 py-2 bg-cyan-950 text-white border border-cyan-700"
                />
                {errors.jumlahSoalAwal && <span className="text-pink-400 text-xs">{errors.jumlahSoalAwal}</span>}
              </div>
              <div>
                <label className="block mb-1 font-medium">Batas Maksimum Soal
                  <span className="ml-2 text-xs text-cyan-300" title="Jumlah soal maksimum dalam satu sesi.">?</span>
                </label>
                <input
                  type="number"
                  min={1}
                  name="maxSoal"
                  value={irtSettings.maxSoal}
                  onChange={handleIrtChange}
                  className="w-full rounded px-3 py-2 bg-cyan-950 text-white border border-cyan-700"
                />
                {errors.maxSoal && <span className="text-pink-400 text-xs">{errors.maxSoal}</span>}
              </div>
              <button
                type="submit"
                className="mt-4 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold px-6 py-2 rounded shadow hover:scale-105 transition-all"
              >
                Simpan Pengaturan
              </button>
              {saved && (
                <div className="mt-2 text-green-400 font-semibold animate-pulse">Pengaturan IRT berhasil disimpan!</div>
              )}
            </form>
            <div className="mt-8">
              <h3 className="text-lg font-bold mb-2">Ringkasan Parameter Aktif</h3>
              <table className="w-full text-sm bg-cyan-950 rounded shadow overflow-hidden">
                <tbody>
                  <tr>
                    <td className="py-2 px-4 text-cyan-300">Mode IRT</td>
                    <td className="py-2 px-4">{irtSettings.mode}</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 text-cyan-300">Theta Awal</td>
                    <td className="py-2 px-4">{irtSettings.theta}</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 text-cyan-300">Jumlah Soal Awal</td>
                    <td className="py-2 px-4">{irtSettings.jumlahSoalAwal}</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 text-cyan-300">Batas Maksimum Soal</td>
                    <td className="py-2 px-4">{irtSettings.maxSoal}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 