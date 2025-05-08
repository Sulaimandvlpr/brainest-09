import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FilePlus, Search, Trash, Edit } from "lucide-react";
import { toast } from "sonner";

const subtestMap: Record<string, string> = {
  "Matematika": "Penalaran Matematika (PM)",
  "B. Indonesia": "Literasi Bahasa Indonesia (LBI)",
  "B. Inggris": "Literasi Bahasa Inggris (LBE)",
  "IPA": "Pengetahuan dan Pemahaman Umum (PPU)",
  "Fisika": "Penalaran Umum (PU)",
  "Kimia": "Pengetahuan Kuantitatif (PK)",
  "Biologi": "Pemahaman Bacaan dan Menulis (PBM)",
  "Geografi": "Pengetahuan dan Pemahaman Umum (PPU)",
  "Ekonomi": "Pengetahuan Kuantitatif (PK)",
  "Sejarah": "Pemahaman Bacaan dan Menulis (PBM)",
  "Sosiologi": "Penalaran Umum (PU)"
};

// Mock data for questions
const QUESTIONS = [
  {
    id: "1",
    question: "Jika 2x + 5 = 15, maka nilai x adalah...",
    subject: "Penalaran Matematika (PM)",
    category: "TPS",
    type: "pilihan_ganda",
    difficulty: "mudah",
  },
  {
    id: "2",
    question: "Bila x^2 - 2x + 1 = 0, maka nilai x adalah...",
    subject: "Penalaran Matematika (PM)",
    category: "TPS",
    type: "pilihan_ganda",
    difficulty: "sedang",
  },
  {
    id: "3",
    question: "Planet terbesar dalam tata surya kita adalah...",
    subject: "Pengetahuan dan Pemahaman Umum (PPU)",
    category: "TKA Saintek",
    type: "pilihan_ganda",
    difficulty: "mudah",
  },
  {
    id: "4",
    question: "Tokoh utama dalam novel 'Laskar Pelangi' adalah...",
    subject: "Literasi Bahasa Indonesia (LBI)",
    category: "TKA Soshum",
    type: "pilihan_ganda",
    difficulty: "sedang",
  },
  {
    id: "5",
    question: "The main idea of the passage is...",
    subject: "Literasi Bahasa Inggris (LBE)",
    category: "TPS",
    type: "pilihan_ganda",
    difficulty: "sulit",
  },
];

export default function Questions() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string | undefined>(undefined);
  const [subjectFilter, setSubjectFilter] = useState<string | undefined>(undefined);
  const [typeFilter, setTypeFilter] = useState<string | undefined>(undefined);

  const handleDelete = (id: string) => {
    // In a real application, this would be an API call
    toast.success(`Soal dengan ID ${id} berhasil dihapus`);
  };

  const filteredQuestions = QUESTIONS.filter((question) => {
    // Filter by search term
    if (
      searchTerm &&
      !question.question.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }

    // Filter by category
    if (categoryFilter && question.category !== categoryFilter) {
      return false;
    }

    // Filter by subject
    if (subjectFilter && question.subject !== subjectFilter) {
      return false;
    }

    // Filter by type
    if (typeFilter && question.type !== typeFilter) {
      return false;
    }

    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Bank Soal</h2>
        <Link to="/admin/questions/create">
          <Button className="flex gap-2">
            <FilePlus className="h-4 w-4" />
            Tambah Soal
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Cari soal..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Kategori" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Kategori</SelectLabel>
              <SelectItem value="TPS">TPS</SelectItem>
              <SelectItem value="TKA Saintek">TKA Saintek</SelectItem>
              <SelectItem value="TKA Soshum">TKA Soshum</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select value={subjectFilter} onValueChange={setSubjectFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Mata Pelajaran" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Mata Pelajaran</SelectLabel>
              <SelectItem value={subtestMap["Matematika"]}>Penalaran Matematika (PM)</SelectItem>
              <SelectItem value={subtestMap["B. Indonesia"]}>Literasi Bahasa Indonesia (LBI)</SelectItem>
              <SelectItem value={subtestMap["B. Inggris"]}>Literasi Bahasa Inggris (LBE)</SelectItem>
              <SelectItem value={subtestMap["IPA"]}>Pengetahuan dan Pemahaman Umum (PPU)</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Tipe Soal" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Tipe Soal</SelectLabel>
              <SelectItem value="pilihan_ganda">Pilihan Ganda</SelectItem>
              <SelectItem value="numerik">Numerik</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="bg-[#1e293b] rounded-md shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Pertanyaan</TableHead>
              <TableHead>Mata Pelajaran</TableHead>
              <TableHead>Kategori</TableHead>
              <TableHead>Tipe</TableHead>
              <TableHead>Kesulitan</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredQuestions.map((question) => (
              <TableRow key={question.id}>
                <TableCell className="max-w-[300px] truncate">
                  {question.question}
                </TableCell>
                <TableCell>{question.subject}</TableCell>
                <TableCell>{question.category}</TableCell>
                <TableCell>
                  {question.type === "pilihan_ganda"
                    ? "Pilihan Ganda"
                    : "Numerik"}
                </TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      question.difficulty === "mudah"
                        ? "bg-green-100 text-green-800"
                        : question.difficulty === "sedang"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {question.difficulty.charAt(0).toUpperCase() +
                      question.difficulty.slice(1)}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleDelete(question.id)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
