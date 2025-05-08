import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import * as XLSX from "xlsx";

export default function QuestionCreate() {
  const [draftSoal, setDraftSoal] = useState([]);
  const [subtest, setSubtest] = useState("");
  const [fileName, setFileName] = useState("");
  const [packageName, setPackageName] = useState("");

  const subtestList = [
    "Penalaran Matematika (PM)",
    "Literasi Bahasa Indonesia (LBI)",
    "Literasi Bahasa Inggris (LBE)",
    "Pengetahuan dan Pemahaman Umum (PPU)",
    "Penalaran Umum (PU)",
    "Pengetahuan Kuantitatif (PK)",
    "Pemahaman Bacaan dan Menulis (PBM)"
  ];

  function handleFile(e) {
    const file = e.target.files[0];
    if (!file) return;
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (evt) => {
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_json(ws, { defval: "" });
      setDraftSoal(data);
    };
    reader.readAsBinaryString(file);
  }

  function handleUpload() {
    // TODO: Kirim draftSoal, subtest, dan packageName ke backend
    toast.success(`Soal berhasil diupload ke bank soal pada paket "${packageName}"!`);
    setDraftSoal([]);
    setFileName("");
    setSubtest("");
    setPackageName("");
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Import Soal dari Excel</h2>
        <p className="text-muted-foreground mb-2">Satu file untuk satu subtest. Format kolom: pertanyaan, opsi_a, opsi_b, opsi_c, opsi_d, jawaban, pembahasan.</p>
        <input
          type="text"
          className="mb-2 px-3 py-2 rounded-md border bg-[#1e293b] text-white w-full"
          placeholder="Nama Paket UTBK (wajib)"
          value={packageName}
          onChange={e => setPackageName(e.target.value)}
        />
        <select
          className="mb-4 px-3 py-2 rounded-md border bg-[#1e293b] text-white"
          value={subtest}
          onChange={e => setSubtest(e.target.value)}
        >
          <option value="">Pilih Subtest</option>
          {subtestList.map((s, i) => (
            <option key={i} value={s}>{s}</option>
          ))}
        </select>
        <input
          type="file"
          accept=".xlsx,.csv"
          onChange={handleFile}
          className="block mb-4"
        />
        {fileName && <div className="text-cyan-300 mb-2">File: {fileName}</div>}
      </div>

      {draftSoal.length > 0 && (
        <div className="bg-[#1e293b] rounded-lg p-4 shadow space-y-4">
          <h3 className="text-xl font-bold mb-2 text-cyan-200">Preview Draft Soal</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-white">
              <thead>
                <tr className="bg-[#164e63]">
                  <th className="px-2 py-1">Pertanyaan</th>
                  <th className="px-2 py-1">A</th>
                  <th className="px-2 py-1">B</th>
                  <th className="px-2 py-1">C</th>
                  <th className="px-2 py-1">D</th>
                  <th className="px-2 py-1">Jawaban</th>
                  <th className="px-2 py-1">Pembahasan</th>
                </tr>
              </thead>
              <tbody>
                {draftSoal.map((row, i) => (
                  <tr key={i} className="border-b border-cyan-900">
                    <td className="px-2 py-1 max-w-[300px] truncate">{row.pertanyaan}</td>
                    <td className="px-2 py-1">{row.opsi_a}</td>
                    <td className="px-2 py-1">{row.opsi_b}</td>
                    <td className="px-2 py-1">{row.opsi_c}</td>
                    <td className="px-2 py-1">{row.opsi_d}</td>
                    <td className="px-2 py-1 font-bold text-cyan-300">{row.jawaban}</td>
                    <td className="px-2 py-1 max-w-[300px] truncate">{row.pembahasan}</td>
                  </tr>
                ))}
              </tbody>
            </table>
                  </div>
          <Button className="utbk-button-primary mt-4" onClick={handleUpload} disabled={!packageName || !subtest}>
            Upload ke Bank Soal
          </Button>
                    </div>
      )}
    </div>
  );
}
