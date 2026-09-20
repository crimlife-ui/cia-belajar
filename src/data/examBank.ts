export interface ExamQuestion {
  id: string;
  number: number;
  chapterTitle: string;
  category: string;
  question: string;
  illustration?: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  userAnswer?: string;
  isMarkedDoubtful?: boolean;
}

export type ExamCategory =
  | 'all'
  | 'addition'
  | 'subtraction'
  | 'multiplication'
  | 'division'
  | 'arithmetic'
  | 'measurement'
  | 'geometry_fraction';

export type DigitOption = 1 | 2 | 3 | 4;

export interface DigitOptionMeta {
  digit: DigitOption;
  label: string;
  name: string;
  rangeText: string;
  example: string;
  icon: string;
}

export const DIGIT_OPTIONS: DigitOptionMeta[] = [
  {
    digit: 1,
    label: '1 Digit',
    name: 'Satuan',
    rangeText: '1 – 9',
    example: 'Contoh: 7 + 8, 9 × 6',
    icon: '1️⃣',
  },
  {
    digit: 2,
    label: '2 Digit',
    name: 'Puluhan',
    rangeText: '10 – 99',
    example: 'Contoh: 45 + 38, 24 × 5',
    icon: '2️⃣',
  },
  {
    digit: 3,
    label: '3 Digit',
    name: 'Ratusan',
    rangeText: '100 – 999',
    example: 'Contoh: 345 + 280, 450 ÷ 5',
    icon: '3️⃣',
  },
  {
    digit: 4,
    label: '4 Digit',
    name: 'Ribuan',
    rangeText: '1.000 – 9.999',
    example: 'Contoh: 3.450 + 2.100, 6.000 ÷ 3',
    icon: '4️⃣',
  },
];

export interface ExamCategoryMeta {
  id: ExamCategory;
  name: string;
  badge: string;
  icon: string;
  description: string;
  color: string;
}

export const EXAM_CATEGORIES: ExamCategoryMeta[] = [
  {
    id: 'all',
    name: 'Semua Materi (Campuran Lengkap)',
    badge: 'Try Out Umum',
    icon: '🎓',
    description: 'Ujian komprehensif mencakup semua materi Kurikulum Merdeka Kelas 3 SD (Bab 1 s/d Bab 5).',
    color: 'from-amber-500 to-orange-500',
  },
  {
    id: 'addition',
    name: 'Khusus Penjumlahan (+)',
    badge: 'Fokus Tambah',
    icon: '➕',
    description: 'Penjumlahan 2 digit, 3 digit, susun ribuan hingga 10.000, teknik menyimpan, & soal cerita.',
    color: 'from-emerald-500 to-teal-600',
  },
  {
    id: 'subtraction',
    name: 'Khusus Pengurangan (-)',
    badge: 'Fokus Kurang',
    icon: '➖',
    description: 'Pengurangan bersusun meminjam, selisih angka ribuan, pengurangan kelipatan, & soal cerita.',
    color: 'from-rose-500 to-red-600',
  },
  {
    id: 'multiplication',
    name: 'Khusus Perkalian (×)',
    badge: 'Fokus Kali',
    icon: '✖️',
    description: 'Tabel perkalian dasar 1–10, perkalian puluhan/ribuan, penjumlahan berulang, & soal cerita.',
    color: 'from-indigo-500 to-blue-600',
  },
  {
    id: 'division',
    name: 'Khusus Pembagian (÷)',
    badge: 'Fokus Bagi',
    icon: '➗',
    description: 'Pembagian dasar tabel, pembagian ratusan/ribuan, pengurangan berulang, & pembagian adil.',
    color: 'from-purple-500 to-pink-600',
  },
  {
    id: 'arithmetic',
    name: 'Operasi Campuran (+, -, ×, ÷)',
    badge: '4 Operasi Hitung',
    icon: '⚡',
    description: 'Kombinasi seimbang antara penjumlahan, pengurangan, perkalian, dan pembagian.',
    color: 'from-amber-500 to-yellow-500',
  },
  {
    id: 'measurement',
    name: 'Pengukuran (Panjang, Berat, Waktu)',
    badge: 'Ukuran & Jam',
    icon: '📏',
    description: 'Konversi km-m-cm, kg-gram, jam analog, selisih durasi waktu, & soal cerita pengukuran.',
    color: 'from-cyan-500 to-blue-600',
  },
  {
    id: 'geometry_fraction',
    name: 'Pecahan & Bangun Datar',
    badge: 'Geometri & Pecahan',
    icon: '🍕',
    description: 'Mengenal pecahan sederhana, membandingkan pecahan, ciri bangun datar, & jenis sudut.',
    color: 'from-violet-500 to-indigo-600',
  },
];

// Helper: Shuffle array randomly while guaranteeing 4 unique options
function shuffle<T>(array: T[]): T[] {
  // Deduplicate using Set while preserving string/value uniqueness
  const uniqueSet = new Set<string>();
  const uniqueArr: T[] = [];

  for (const item of array) {
    const key = String(item).trim();
    if (!uniqueSet.has(key)) {
      uniqueSet.add(key);
      uniqueArr.push(item);
    }
  }

  // If there are duplicates, generate reasonable unique numeric or text fallback alternatives
  let offset = 1;
  while (uniqueArr.length < 4 && uniqueArr.length > 0) {
    const first = uniqueArr[0];
    const firstStr = String(first).trim();

    // Check if item has trailing unit (e.g. "12 kg", "20 buah", "5 kali")
    const unitMatch = firstStr.match(/^([0-9.,]+)\s*([a-zA-Z%]+)?$/);
    if (unitMatch) {
      const numPart = parseInt(unitMatch[1].replace(/\./g, ''), 10);
      const unit = unitMatch[2] ? ` ${unitMatch[2]}` : '';
      if (!isNaN(numPart)) {
        const candidate1 = `${numPart + offset}${unit}`;
        const candidate2 = `${Math.max(1, numPart - offset)}${unit}`;
        if (!uniqueSet.has(candidate1)) {
          uniqueSet.add(candidate1);
          uniqueArr.push(candidate1 as unknown as T);
        } else if (!uniqueSet.has(candidate2)) {
          uniqueSet.add(candidate2);
          uniqueArr.push(candidate2 as unknown as T);
        }
      } else {
        const candidate = `${firstStr} (${uniqueArr.length + 1})`;
        if (!uniqueSet.has(candidate)) {
          uniqueSet.add(candidate);
          uniqueArr.push(candidate as unknown as T);
        }
      }
    } else {
      const candidate = `${firstStr} (${uniqueArr.length + 1})`;
      if (!uniqueSet.has(candidate)) {
        uniqueSet.add(candidate);
        uniqueArr.push(candidate as unknown as T);
      }
    }
    offset++;
  }

  const arr = [...uniqueArr];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Helper: Format number with Indonesian dot thousand separator
function formatId(n: number): string {
  return n.toLocaleString('id-ID');
}

// Random int between min and max inclusive
function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

type QuestionGenerator = (index: number) => ExamQuestion;

// =========================================================================
// 1. ADDITION GENERATORS (KHUSUS PENJUMLAHAN)
// =========================================================================
export const additionGeneratorsByDigit: Record<DigitOption, QuestionGenerator[]> = {
  // 1 Digit (1 - 9)
  1: [
    (idx) => {
      const a = randInt(2, 9);
      const b = randInt(2, 9);
      const sum = a + b;
      const correct = `${sum}`;
      const wrong1 = `${sum + 1}`;
      const wrong2 = `${Math.max(1, sum - 1)}`;
      const wrong3 = `${sum + 2}`;
      return {
        id: `add-1d-${idx}-${a}+${b}`,
        number: idx,
        chapterTitle: 'Khusus Penjumlahan (+)',
        category: 'Penjumlahan 1 Digit (Satuan)',
        question: `Berapakah hasil dari ${a} + ${b}?`,
        options: shuffle([correct, wrong1, wrong2, wrong3]),
        correctAnswer: correct,
        explanation: `${a} ditambah ${b} adalah ${correct}.`,
      };
    },
    (idx) => {
      const a = randInt(1, 9);
      const total = randInt(a + 2, 16);
      const mystery = total - a;
      const correct = `${mystery}`;
      const wrong1 = `${mystery + 1}`;
      const wrong2 = `${mystery > 1 ? mystery - 1 : mystery + 3}`;
      const wrong3 = `${mystery + 2}`;
      return {
        id: `add-1d-box-${idx}-${total}`,
        number: idx,
        chapterTitle: 'Khusus Penjumlahan (+)',
        category: 'Kotak Misteri 1 Digit',
        question: `Tentukan angka pada kotak: ${a} + ⬜ = ${total}`,
        options: shuffle([correct, wrong1, wrong2, wrong3]),
        correctAnswer: correct,
        explanation: `Untuk mencari kotak yang hilang: ⬜ = ${total} - ${a} = ${correct}.`,
      };
    },
    (idx) => {
      const a = randInt(2, 8);
      const b = randInt(1, 8);
      const c = randInt(1, 6);
      const sum = a + b + c;
      const correct = `${sum}`;
      const wrong1 = `${sum + 1}`;
      const wrong2 = `${sum - 1}`;
      const wrong3 = `${sum + 2}`;
      return {
        id: `add-1d-3num-${idx}`,
        number: idx,
        chapterTitle: 'Khusus Penjumlahan (+)',
        category: 'Penjumlahan 3 Angka Satuan',
        question: `Hasil dari ${a} + ${b} + ${c} adalah...`,
        options: shuffle([correct, wrong1, wrong2, wrong3]),
        correctAnswer: correct,
        explanation: `Hitung bertahap: ${a} + ${b} = ${a + b}, lalu (${a + b}) + ${c} = ${correct}.`,
      };
    },
  ],

  // 2 Digit (10 - 99)
  2: [
    (idx) => {
      const a = randInt(25, 75);
      const b = randInt(18, 59);
      const sum = a + b;
      const correct = `${sum}`;
      const wrong1 = `${sum + 10}`;
      const wrong2 = `${sum - 10}`;
      const wrong3 = `${sum + 2}`;
      return {
        id: `add-2d-${idx}-${a}`,
        number: idx,
        chapterTitle: 'Khusus Penjumlahan (+)',
        category: 'Penjumlahan 2 Digit (Puluhan)',
        question: `Berapakah hasil dari ${a} + ${b}?`,
        options: shuffle([correct, wrong1, wrong2, wrong3]),
        correctAnswer: correct,
        explanation: `Hitung satuan: ${a % 10} + ${b % 10} = ${(a % 10) + (b % 10)}. Hitung puluhan: ${Math.floor(a / 10)} + ${Math.floor(b / 10)} (ditambah simpanan jika ada). Hasil akhir: ${a} + ${b} = ${correct}.`,
      };
    },
    (idx) => {
      const a = randInt(15, 45);
      const b = randInt(12, 35);
      const c = randInt(10, 25);
      const sum = a + b + c;
      const correct = `${sum}`;
      const wrong1 = `${sum + 10}`;
      const wrong2 = `${sum - 10}`;
      const wrong3 = `${sum + 5}`;
      return {
        id: `add-2d-3num-${idx}`,
        number: idx,
        chapterTitle: 'Khusus Penjumlahan (+)',
        category: 'Penjumlahan Tiga Bilangan Puluhan',
        question: `Berapakah hasil dari ${a} + ${b} + ${c}?`,
        options: shuffle([correct, wrong1, wrong2, wrong3]),
        correctAnswer: correct,
        explanation: `Jumlahkan bertahap: ${a} + ${b} = ${a + b}, lalu (${a + b}) + ${c} = ${correct}.`,
      };
    },
    (idx) => {
      const items = ['butir kelereng', 'buah apel', 'lembar stiker', 'buku gambar'][randInt(0, 3)];
      const day1 = randInt(25, 65);
      const day2 = randInt(18, 55);
      const total = day1 + day2;
      const correct = `${total} ${items}`;
      const wrong1 = `${total + 10} ${items}`;
      const wrong2 = `${total - 10} ${items}`;
      const wrong3 = `${total + 2} ${items}`;
      return {
        id: `add-2d-word-${idx}`,
        number: idx,
        chapterTitle: 'Khusus Penjumlahan (+)',
        category: 'Soal Cerita Puluhan',
        question: `Cia mengumpulkan ${day1} ${items} kemarin dan ${day2} ${items} hari ini. Berapa banyak ${items} Cia seluruhnya?`,
        options: shuffle([correct, wrong1, wrong2, wrong3]),
        correctAnswer: correct,
        explanation: `Jumlahkan kedua koleksi: ${day1} + ${day2} = ${correct}.`,
      };
    },
  ],

  // 3 Digit (100 - 999)
  3: [
    (idx) => {
      const a = randInt(150, 480);
      const b = randInt(160, 490);
      const sum = a + b;
      const correct = `${sum}`;
      const wrong1 = `${sum + 10}`;
      const wrong2 = `${sum - 100}`;
      const wrong3 = `${sum + 100}`;
      return {
        id: `add-3d-${idx}-${a}`,
        number: idx,
        chapterTitle: 'Khusus Penjumlahan (+)',
        category: 'Penjumlahan 3 Digit (Ratusan)',
        question: `Hitunglah penjumlahan bersusun: ${a} + ${b} = ...`,
        options: shuffle([correct, wrong1, wrong2, wrong3]),
        correctAnswer: correct,
        explanation: `Susun kedua bilangan lurus ke bawah: satuan lurus satuan, puluhan lurus puluhan, ratusan lurus ratusan. ${a} + ${b} = ${correct}.`,
      };
    },
    (idx) => {
      const known = randInt(250, 600);
      const mystery = randInt(150, 380);
      const total = known + mystery;
      const correct = `${mystery}`;
      const wrong1 = `${mystery + 10}`;
      const wrong2 = `${mystery - 10}`;
      const wrong3 = `${total + known}`;
      return {
        id: `add-3d-box-${idx}-${total}`,
        number: idx,
        chapterTitle: 'Khusus Penjumlahan (+)',
        category: 'Mencari Nilai Ratusan',
        question: `Isilah nilai ⬜ pada persamaan berikut: ${known} + ⬜ = ${total}`,
        options: shuffle([correct, wrong1, wrong2, wrong3]),
        correctAnswer: correct,
        explanation: `Untuk mencari angka penambah yang hilang: ⬜ = ${total} - ${known} = ${correct}.`,
      };
    },
  ],

  // 4 Digit (1000 - 9999)
  4: [
    (idx) => {
      const a = randInt(1500, 4500);
      const b = randInt(1200, 4800);
      const sum = a + b;
      const correct = formatId(sum);
      const wrong1 = formatId(sum + 10);
      const wrong2 = formatId(sum - 100);
      const wrong3 = formatId(sum + 100);
      return {
        id: `add-4d-${idx}-${a}`,
        number: idx,
        chapterTitle: 'Khusus Penjumlahan (+)',
        category: 'Penjumlahan 4 Digit (Ribuan)',
        question: `Hasil dari penjumlahan bersusun ${formatId(a)} + ${formatId(b)} adalah...`,
        options: shuffle([correct, wrong1, wrong2, wrong3]),
        correctAnswer: correct,
        explanation: `Jumlahkan dari kolom satuan lurus ke kiri: ${formatId(a)} + ${formatId(b)} = ${correct}. Ingat untuk menambahkan angka 1 simpanan jika hasil kolom ≥ 10.`,
      };
    },
    (idx) => {
      const items = ['butir telur', 'buah mangga', 'buku tulis', 'bibit pohon jati'][randInt(0, 3)];
      const day1 = randInt(1250, 3200);
      const day2 = randInt(1100, 3100);
      const total = day1 + day2;
      const correct = `${formatId(total)} ${items}`;
      const wrong1 = `${formatId(total + 100)} ${items}`;
      const wrong2 = `${formatId(total - 100)} ${items}`;
      const wrong3 = `${formatId(total + 10)} ${items}`;
      return {
        id: `add-4d-word-${idx}-${day1}`,
        number: idx,
        chapterTitle: 'Khusus Penjumlahan (+)',
        category: 'Soal Cerita Ribuan',
        question: `Paman memanen ${formatId(day1)} ${items} pada hari Sabtu, dan memanen lagi ${formatId(day2)} ${items} pada hari Minggu. Berapa total ${items} yang dipanen Paman seluruhnya?`,
        options: shuffle([correct, wrong1, wrong2, wrong3]),
        correctAnswer: correct,
        explanation: `Jumlahkan hasil panen kedua hari: ${formatId(day1)} + ${formatId(day2)} = ${correct}.`,
      };
    },
  ],
};

// =========================================================================
// 2. SUBTRACTION GENERATORS (KHUSUS PENGURANGAN)
// =========================================================================
export const subtractionGeneratorsByDigit: Record<DigitOption, QuestionGenerator[]> = {
  // 1 Digit (1 - 9)
  1: [
    (idx) => {
      const b = randInt(1, 8);
      const diff = randInt(1, 9 - b);
      const a = b + diff;
      const correct = `${diff}`;
      const wrong1 = `${diff + 1}`;
      const wrong2 = `${Math.max(0, diff - 1)}`;
      const wrong3 = `${diff + 2}`;
      return {
        id: `sub-1d-${idx}-${a}-${b}`,
        number: idx,
        chapterTitle: 'Khusus Pengurangan (-)',
        category: 'Pengurangan 1 Digit (Satuan)',
        question: `Berapakah hasil dari ${a} - ${b}?`,
        options: shuffle([correct, wrong1, wrong2, wrong3]),
        correctAnswer: correct,
        explanation: `${a} dikurangi ${b} adalah ${correct}.`,
      };
    },
    (idx) => {
      const total = randInt(4, 9);
      const remain = randInt(1, total - 1);
      const mystery = total - remain;
      const correct = `${mystery}`;
      const wrong1 = `${mystery + 1}`;
      const wrong2 = `${mystery > 1 ? mystery - 1 : mystery + 3}`;
      const wrong3 = `${mystery + 2}`;
      return {
        id: `sub-1d-box-${idx}`,
        number: idx,
        chapterTitle: 'Khusus Pengurangan (-)',
        category: 'Kotak Misteri Satuan',
        question: `Tentukan angka ⬜ pada: ${total} - ⬜ = ${remain}`,
        options: shuffle([correct, wrong1, wrong2, wrong3]),
        correctAnswer: correct,
        explanation: `⬜ = ${total} - ${remain} = ${correct}.`,
      };
    },
  ],

  // 2 Digit (10 - 99)
  2: [
    (idx) => {
      const b = randInt(25, 48);
      const diff = randInt(18, 45);
      const a = b + diff;
      const correct = `${diff}`;
      const wrong1 = `${diff + 10}`;
      const wrong2 = `${diff - 10}`;
      const wrong3 = `${diff + 2}`;
      return {
        id: `sub-2d-${idx}-${a}`,
        number: idx,
        chapterTitle: 'Khusus Pengurangan (-)',
        category: 'Pengurangan 2 Digit (Puluhan)',
        question: `Berapakah hasil dari ${a} - ${b}?`,
        options: shuffle([correct, wrong1, wrong2, wrong3]),
        correctAnswer: correct,
        explanation: `Gunakan teknik meminjam jika satuan atas lebih kecil dari satuan bawah: ${a} - ${b} = ${correct}.`,
      };
    },
    (idx) => {
      const total = randInt(50, 95);
      const remain = randInt(15, total - 15);
      const mystery = total - remain;
      const correct = `${mystery}`;
      const wrong1 = `${mystery + 10}`;
      const wrong2 = `${mystery - 10}`;
      const wrong3 = `${total + remain}`;
      return {
        id: `sub-2d-box-${idx}`,
        number: idx,
        chapterTitle: 'Khusus Pengurangan (-)',
        category: 'Mencari Pengurang Puluhan',
        question: `Tentukan nilai ⬜ pada persamaan: ${total} - ⬜ = ${remain}`,
        options: shuffle([correct, wrong1, wrong2, wrong3]),
        correctAnswer: correct,
        explanation: `Untuk mencari angka pengurang: ⬜ = ${total} - ${remain} = ${correct}.`,
      };
    },
  ],

  // 3 Digit (100 - 999)
  3: [
    (idx) => {
      const b = randInt(180, 390);
      const diff = randInt(140, 350);
      const a = b + diff;
      const correct = `${diff}`;
      const wrong1 = `${diff + 10}`;
      const wrong2 = `${diff - 10}`;
      const wrong3 = `${diff + 100}`;
      return {
        id: `sub-3d-${idx}-${a}`,
        number: idx,
        chapterTitle: 'Khusus Pengurangan (-)',
        category: 'Pengurangan 3 Digit (Ratusan)',
        question: `Hitunglah pengurangan bersusun: ${a} - ${b} = ...`,
        options: shuffle([correct, wrong1, wrong2, wrong3]),
        correctAnswer: correct,
        explanation: `Kurangkan kolom demi kolom mulai dari satuan: ${a} - ${b} = ${correct}.`,
      };
    },
  ],

  // 4 Digit (1000 - 9999)
  4: [
    (idx) => {
      const b = randInt(1500, 4200);
      const diff = randInt(1200, 3800);
      const a = b + diff;
      const correct = formatId(diff);
      const wrong1 = formatId(diff + 10);
      const wrong2 = formatId(diff - 10);
      const wrong3 = formatId(diff + 100);
      return {
        id: `sub-4d-${idx}-${a}`,
        number: idx,
        chapterTitle: 'Khusus Pengurangan (-)',
        category: 'Pengurangan 4 Digit (Ribuan)',
        question: `Hasil dari pengurangan bersusun ${formatId(a)} - ${formatId(b)} adalah...`,
        options: shuffle([correct, wrong1, wrong2, wrong3]),
        correctAnswer: correct,
        explanation: `Kurangkan digit satuan ke ribuan: ${formatId(a)} - ${formatId(b)} = ${correct}. Pinjam 1 dari tetangga sebelah kiri jika angka atas lebih kecil.`,
      };
    },
    (idx) => {
      const roundTotal = [1000, 2000, 5000, 10000][randInt(0, 3)];
      const subtracted = randInt(150, 480) * (roundTotal > 2000 ? 10 : 1);
      const diff = roundTotal - subtracted;
      const correct = formatId(diff);
      const wrong1 = formatId(diff + 10);
      const wrong2 = formatId(diff - 10);
      const wrong3 = formatId(diff + 100);
      return {
        id: `sub-round-${idx}-${roundTotal}`,
        number: idx,
        chapterTitle: 'Khusus Pengurangan (-)',
        category: 'Pengurangan Angka Bulat Ribuan',
        question: `Berapakah hasil dari ${formatId(roundTotal)} - ${formatId(subtracted)}?`,
        options: shuffle([correct, wrong1, wrong2, wrong3]),
        correctAnswer: correct,
        explanation: `Gunakan trik meminjam beruntun: ${formatId(roundTotal)} - ${formatId(subtracted)} = ${correct}.`,
      };
    },
    (idx) => {
      const initial = randInt(4500, 8500);
      const used = randInt(1200, 3200);
      const remain = initial - used;
      const correct = `${formatId(remain)} kg`;
      const wrong1 = `${formatId(remain + 100)} kg`;
      const wrong2 = `${formatId(remain - 100)} kg`;
      const wrong3 = `${formatId(remain + 50)} kg`;
      return {
        id: `sub-word-${idx}-${initial}`,
        number: idx,
        chapterTitle: 'Khusus Pengurangan (-)',
        category: 'Soal Cerita Ribuan',
        question: `Di sebuah gudang terdapat ${formatId(initial)} kg beras. Sebanyak ${formatId(used)} kg beras telah dikirim ke toko-toko. Berapa kg sisa beras di gudang sekarang?`,
        options: shuffle([correct, wrong1, wrong2, wrong3]),
        correctAnswer: correct,
        explanation: `Kurangkan stok awal dengan jumlah yang sudah dikirim: ${formatId(initial)} - ${formatId(used)} = ${correct}.`,
      };
    },
  ],
};

// =========================================================================
// 3. MULTIPLICATION GENERATORS (KHUSUS PERKALIAN)
// =========================================================================
export const multiplicationGeneratorsByDigit: Record<DigitOption, QuestionGenerator[]> = {
  // 1 Digit (1 - 9)
  1: [
    (idx) => {
      const a = randInt(2, 9);
      const b = randInt(2, 9);
      const prod = a * b;
      const correct = `${prod}`;
      const wrong1 = `${prod + a}`;
      const wrong2 = `${Math.max(1, prod - b)}`;
      const wrong3 = `${prod + 2}`;
      return {
        id: `mult-1d-${idx}-${a}x${b}`,
        number: idx,
        chapterTitle: 'Khusus Perkalian (×)',
        category: 'Tabel Perkalian Dasar (1 Digit)',
        question: `Berapakah hasil dari ${a} × ${b}?`,
        options: shuffle([correct, wrong1, wrong2, wrong3]),
        correctAnswer: correct,
        explanation: `${a} × ${b} berarti angka ${b} dijumlahkan sebanyak ${a} kali. Hasilnya = ${correct}.`,
      };
    },
    (idx) => {
      const a = randInt(3, 6);
      const b = randInt(4, 8);
      const correct = Array(a).fill(b).join(' + ');
      const wrong1 = Array(b).fill(a).join(' + ');
      const wrong2 = `${a} + ${b}`;
      const wrong3 = `${a} × ${b}`;
      return {
        id: `mult-concept-${idx}-${a}x${b}`,
        number: idx,
        chapterTitle: 'Khusus Perkalian (×)',
        category: 'Konsep Perkalian Berulang',
        question: `Bentuk penjumlahan berulang yang tepat dari ${a} × ${b} adalah...`,
        options: shuffle([correct, wrong1, wrong2, wrong3]),
        correctAnswer: correct,
        explanation: `${a} × ${b} artinya ada ${a} kelompok yang masing-masing berisi ${b}. Jadi angka ${b} dijumlahkan sebanyak ${a} kali (${correct}).`,
      };
    },
  ],

  // 2 Digit (10 - 99)
  2: [
    (idx) => {
      const a = randInt(12, 45);
      const b = randInt(2, 6);
      const prod = a * b;
      const correct = `${prod}`;
      const wrong1 = `${prod + 10}`;
      const wrong2 = `${prod - 10}`;
      const wrong3 = `${prod + b}`;
      return {
        id: `mult-2d-${idx}-${a}x${b}`,
        number: idx,
        chapterTitle: 'Khusus Perkalian (×)',
        category: 'Perkalian 2 Digit × 1 Digit',
        question: `Hitunglah hasil perkalian dari ${a} × ${b}:`,
        options: shuffle([correct, wrong1, wrong2, wrong3]),
        correctAnswer: correct,
        explanation: `Kalikan satuan: ${(a % 10)} × ${b} = ${(a % 10) * b}. Kalikan puluhan: ${Math.floor(a / 10)}0 × ${b} = ${Math.floor(a / 10) * 10 * b}. Jumlahkan: ${correct}.`,
      };
    },
    (idx) => {
      const boxes = randInt(4, 8);
      const itemsPerBox = randInt(12, 25);
      const total = boxes * itemsPerBox;
      const correct = `${total} buah`;
      const wrong1 = `${total + itemsPerBox} buah`;
      const wrong2 = `${total - itemsPerBox} buah`;
      const wrong3 = `${boxes + itemsPerBox} buah`;
      return {
        id: `mult-2d-word-${idx}`,
        number: idx,
        chapterTitle: 'Khusus Perkalian (×)',
        category: 'Soal Cerita Perkalian Puluhan',
        question: `Ibu membeli ${boxes} dus pensil warna. Tiap dus berisi ${itemsPerBox} batang pensil. Berapa total seluruh pensil?`,
        options: shuffle([correct, wrong1, wrong2, wrong3]),
        correctAnswer: correct,
        explanation: `${boxes} dus × ${itemsPerBox} pensil = ${boxes * itemsPerBox} batang (${correct}).`,
      };
    },
  ],

  // 3 Digit (100 - 999)
  3: [
    (idx) => {
      const mult = randInt(2, 5);
      const base = randInt(1, 4) * 100;
      const res = mult * base;
      const correct = `${res}`;
      const wrong1 = `${res - 100}`;
      const wrong2 = `${res + 100}`;
      const wrong3 = `${res / 10}`;
      return {
        id: `mult-3d-${idx}-${base}`,
        number: idx,
        chapterTitle: 'Khusus Perkalian (×)',
        category: 'Perkalian Kelipatan Ratusan',
        question: `Berapakah hasil dari ${mult} × ${base}?`,
        options: shuffle([correct, wrong1, wrong2, wrong3]),
        correctAnswer: correct,
        explanation: `Kalikan angka depannya: ${mult} × ${base / 100} = ${mult * (base / 100)}, lalu tambahkan 2 angka nol ➔ ${correct}.`,
      };
    },
    (idx) => {
      const a = randInt(105, 230);
      const b = randInt(2, 4);
      const prod = a * b;
      const correct = `${prod}`;
      const wrong1 = `${prod + 10}`;
      const wrong2 = `${prod - 20}`;
      const wrong3 = `${prod + 50}`;
      return {
        id: `mult-3d-vert-${idx}`,
        number: idx,
        chapterTitle: 'Khusus Perkalian (×)',
        category: 'Perkalian Ratusan Bersusun',
        question: `Hitunglah hasil dari ${a} × ${b} = ...`,
        options: shuffle([correct, wrong1, wrong2, wrong3]),
        correctAnswer: correct,
        explanation: `Kalikan bersusun: ${a} × ${b} = ${correct}.`,
      };
    },
  ],

  // 4 Digit (1000 - 9999)
  4: [
    (idx) => {
      const mult = randInt(2, 5);
      const base = randInt(1, 4) * 1000;
      const res = mult * base;
      const correct = formatId(res);
      const wrong1 = formatId(res - 1000);
      const wrong2 = formatId(res + 1000);
      const wrong3 = formatId(res / 10);
      return {
        id: `mult-4d-th-${idx}-${base}`,
        number: idx,
        chapterTitle: 'Khusus Perkalian (×)',
        category: 'Perkalian Kelipatan Ribuan',
        question: `Berapakah hasil dari ${mult} × ${formatId(base)}?`,
        options: shuffle([correct, wrong1, wrong2, wrong3]),
        correctAnswer: correct,
        explanation: `Trik angka nol: kalikan angka depan ${mult} × ${base / 1000} = ${mult * (base / 1000)}, lalu tambahkan 3 angka nol di belakangnya ➔ ${correct}.`,
      };
    },
  ],
};

// =========================================================================
// 4. DIVISION GENERATORS (KHUSUS PEMBAGIAN)
// =========================================================================
export const divisionGeneratorsByDigit: Record<DigitOption, QuestionGenerator[]> = {
  // 1 Digit (Dividen 1 Digit, max 9)
  1: [
    (idx) => {
      const divisor = randInt(2, 4);
      const quotient = randInt(2, Math.floor(9 / divisor));
      const dividend = divisor * quotient;
      const correct = `${quotient}`;
      const wrong1 = `${quotient + 1}`;
      const wrong2 = `${quotient > 1 ? quotient - 1 : quotient + 3}`;
      const wrong3 = `${quotient + 2}`;
      return {
        id: `div-1d-${idx}-${dividend}`,
        number: idx,
        chapterTitle: 'Khusus Pembagian (÷)',
        category: 'Pembagian 1 Digit (Satuan)',
        question: `Berapakah hasil dari ${dividend} ÷ ${divisor}?`,
        options: shuffle([correct, wrong1, wrong2, wrong3]),
        correctAnswer: correct,
        explanation: `Karena ${divisor} × ${quotient} = ${dividend}, maka ${dividend} ÷ ${divisor} = ${correct}.`,
      };
    },
    (idx) => {
      const divisor = randInt(2, 4);
      const quotient = randInt(2, Math.floor(9 / divisor));
      const dividend = divisor * quotient;
      const correct = `${quotient} kali`;
      const wrong1 = `${quotient + 1} kali`;
      const wrong2 = `${quotient > 1 ? quotient - 1 : quotient + 3} kali`;
      const wrong3 = `${quotient + 2} kali`;
      return {
        id: `div-1d-concept-${idx}`,
        number: idx,
        chapterTitle: 'Khusus Pembagian (÷)',
        category: 'Pengurangan Berulang 1 Digit',
        question: `Operasi pembagian ${dividend} ÷ ${divisor} sama artinya dengan ${dividend} dikurangi ${divisor} sebanyak...`,
        options: shuffle([correct, wrong1, wrong2, wrong3]),
        correctAnswer: correct,
        explanation: `Pembagian adalah pengurangan berulang hingga bernilai 0. ${dividend} dikurangi ${divisor} sebanyak ${quotient} kali.`,
      };
    },
  ],

  // 2 Digit (Dividen 10 - 99)
  2: [
    (idx) => {
      const divisor = randInt(3, 9);
      const quotient = randInt(3, 9);
      const dividend = divisor * quotient;
      const correct = `${quotient}`;
      const wrong1 = `${quotient + 1}`;
      const wrong2 = `${quotient - 1}`;
      const wrong3 = `${quotient + 2}`;
      return {
        id: `div-2d-basic-${idx}-${dividend}`,
        number: idx,
        chapterTitle: 'Khusus Pembagian (÷)',
        category: 'Tabel Pembagian Puluhan',
        question: `Berapakah hasil dari ${dividend} ÷ ${divisor}?`,
        options: shuffle([correct, wrong1, wrong2, wrong3]),
        correctAnswer: correct,
        explanation: `Cari perkalian kebalikannya: ${divisor} × berapa yang menghasilkan ${dividend}? Karena ${divisor} × ${quotient} = ${dividend}, maka ${dividend} ÷ ${divisor} = ${correct}.`,
      };
    },
    (idx) => {
      const divisor = randInt(2, 5);
      const quotient = randInt(12, 24);
      const dividend = divisor * quotient;
      const correct = `${quotient}`;
      const wrong1 = `${quotient + 2}`;
      const wrong2 = `${quotient - 2}`;
      const wrong3 = `${quotient + 5}`;
      return {
        id: `div-2d1d-${idx}-${dividend}`,
        number: idx,
        chapterTitle: 'Khusus Pembagian (÷)',
        category: 'Pembagian Puluhan Puluhan',
        question: `Hitunglah hasil dari ${dividend} ÷ ${divisor}:`,
        options: shuffle([correct, wrong1, wrong2, wrong3]),
        correctAnswer: correct,
        explanation: `${dividend} ÷ ${divisor} = ${correct} (karena ${divisor} × ${correct} = ${dividend}).`,
      };
    },
    (idx) => {
      const people = randInt(3, 6);
      const perPerson = randInt(4, 9);
      const total = people * perPerson;
      const correct = `${perPerson} butir`;
      const wrong1 = `${perPerson + 1} butir`;
      const wrong2 = `${perPerson - 1} butir`;
      const wrong3 = `${perPerson + 2} butir`;
      return {
        id: `div-word-${idx}-${total}`,
        number: idx,
        chapterTitle: 'Khusus Pembagian (÷)',
        category: 'Soal Cerita Pembagian',
        question: `Cia memiliki ${total} butir permen. Permen tersebut dibagikan sama rata kepada ${people} orang temannya. Berapa butir permen yang didapat tiap teman?`,
        options: shuffle([correct, wrong1, wrong2, wrong3]),
        correctAnswer: correct,
        explanation: `Bagikan sama rata: ${total} ÷ ${people} = ${correct}. Setiap anak mendapat ${perPerson} butir permen.`,
      };
    },
  ],

  // 3 Digit (Dividen 100 - 999)
  3: [
    (idx) => {
      const divisor = randInt(2, 6);
      const quotient = randInt(15, 60);
      const dividend = divisor * quotient;
      const correct = `${quotient}`;
      const wrong1 = `${quotient + 5}`;
      const wrong2 = `${quotient - 5}`;
      const wrong3 = `${quotient + 10}`;
      return {
        id: `div-3d-${idx}-${dividend}`,
        number: idx,
        chapterTitle: 'Khusus Pembagian (÷)',
        category: 'Pembagian 3 Digit (Ratusan)',
        question: `Berapakah hasil pembagian dari ${dividend} ÷ ${divisor}?`,
        options: shuffle([correct, wrong1, wrong2, wrong3]),
        correctAnswer: correct,
        explanation: `Gunakan bagi kurung atau porogapit: ${dividend} ÷ ${divisor} = ${correct}.`,
      };
    },
    (idx) => {
      const divisor = randInt(2, 5);
      const quotient = randInt(2, 8) * 100;
      const dividend = divisor * quotient;
      const correct = `${quotient}`;
      const wrong1 = `${quotient + 50}`;
      const wrong2 = `${quotient - 50}`;
      const wrong3 = `${quotient * 2}`;
      return {
        id: `div-3d-round-${idx}-${dividend}`,
        number: idx,
        chapterTitle: 'Khusus Pembagian (÷)',
        category: 'Pembagian Kelipatan Ratusan',
        question: `Berapakah hasil dari ${dividend} ÷ ${divisor}?`,
        options: shuffle([correct, wrong1, wrong2, wrong3]),
        correctAnswer: correct,
        explanation: `Bagi angka depannya: ${dividend / 100} ÷ ${divisor} = ${quotient / 100}, lalu tambahkan dua angka nol ➔ ${correct}.`,
      };
    },
  ],

  // 4 Digit (Dividen 1000 - 9999)
  4: [
    (idx) => {
      const divisor = randInt(2, 4);
      const quotient = randInt(1, 3) * 1000;
      const dividend = divisor * quotient;
      const correct = formatId(quotient);
      const wrong1 = formatId(quotient + 500);
      const wrong2 = formatId(quotient - 500);
      const wrong3 = formatId(quotient * 2);
      return {
        id: `div-4d-th-${idx}-${dividend}`,
        number: idx,
        chapterTitle: 'Khusus Pembagian (÷)',
        category: 'Pembagian Ribuan',
        question: `Berapakah hasil pembagian dari ${formatId(dividend)} ÷ ${divisor}?`,
        options: shuffle([correct, wrong1, wrong2, wrong3]),
        correctAnswer: correct,
        explanation: `Bagi angka depannya terlebih dahulu: ${dividend / 1000} ÷ ${divisor} = ${quotient / 1000}, lalu tempelkan tiga angka nol ➔ ${correct}.`,
      };
    },
  ],
};

// =========================================================================
// 5. MEASUREMENT GENERATORS (PENGUKURAN PANJANG, BERAT, WAKTU)
// =========================================================================
export const measurementGenerators: QuestionGenerator[] = [
  // M1: Meter to cm
  (idx) => {
    const m = randInt(2, 9);
    const cmExtra = randInt(1, 9) * 10;
    const totalCm = m * 100 + cmExtra;
    const correct = `${totalCm} cm`;
    const wrong1 = `${m * 10 + cmExtra} cm`;
    const wrong2 = `${totalCm + 100} cm`;
    const wrong3 = `${m * 1000 + cmExtra} cm`;

    return {
      id: `meas-mcm-${idx}-${m}`,
      number: idx,
      chapterTitle: 'Pengukuran (Panjang, Berat, Waktu)',
      category: 'Panjang (m & cm)',
      question: `Panjang pita hiasan kelas adalah ${m} meter ${cmExtra} cm. Panjang pita tersebut sama dengan...`,
      options: shuffle([correct, wrong1, wrong2, wrong3]),
      correctAnswer: correct,
      explanation: `1 meter = 100 cm. Maka ${m} m = ${m * 100} cm. Total panjang = ${m * 100} + ${cmExtra} = ${correct}.`,
    };
  },

  // M2: Km to meter
  (idx) => {
    const km = randInt(2, 6);
    const m = randInt(1, 9) * 50;
    const totalM = km * 1000 + m;
    const correct = `${formatId(totalM)} meter`;
    const wrong1 = `${formatId(km * 100 + m)} meter`;
    const wrong2 = `${formatId(totalM + 1000)} meter`;
    const wrong3 = `${formatId(totalM - 500)} meter`;

    return {
      id: `meas-kmm-${idx}-${km}`,
      number: idx,
      chapterTitle: 'Pengukuran (Panjang, Berat, Waktu)',
      category: 'Jarak (km & m)',
      question: `Jarak dari rumah Cia ke taman kota adalah ${km} km ${m} m. Jarak tersebut setara dengan...`,
      options: shuffle([correct, wrong1, wrong2, wrong3]),
      correctAnswer: correct,
      explanation: `1 kilometer = 1.000 meter. Maka ${km} km = ${formatId(km * 1000)} m. Total jarak = ${formatId(km * 1000)} + ${m} = ${correct}.`,
    };
  },

  // M3: Kg to gram
  (idx) => {
    const kg = randInt(2, 7);
    const gExtra = randInt(1, 5) * 100;
    const totalG = kg * 1000 + gExtra;
    const correct = `${formatId(totalG)} gram`;
    const wrong1 = `${formatId(kg * 100 + gExtra)} gram`;
    const wrong2 = `${formatId(totalG + 500)} gram`;
    const wrong3 = `${formatId(kg * 10000 + gExtra)} gram`;

    return {
      id: `meas-kgg-${idx}-${kg}`,
      number: idx,
      chapterTitle: 'Pengukuran (Panjang, Berat, Waktu)',
      category: 'Berat (kg & gram)',
      question: `Ibu membeli gula pasir seberat ${kg} kg ${gExtra} gram. Berat gula dalam satuan gram adalah...`,
      options: shuffle([correct, wrong1, wrong2, wrong3]),
      correctAnswer: correct,
      explanation: `1 kg = 1.000 gram. Maka ${kg} kg = ${formatId(kg * 1000)} gram. Total berat = ${formatId(kg * 1000)} + ${gExtra} = ${correct}.`,
    };
  },

  // M4: Reading clock duration
  (idx) => {
    const startHour = randInt(7, 10);
    const durationHours = randInt(1, 3);
    const endHour = startHour + durationHours;
    const correct = `${durationHours} jam`;
    const wrong1 = `${durationHours + 1} jam`;
    const wrong2 = `${durationHours * 30} jam`;
    const wrong3 = `${durationHours + 2} jam`;

    return {
      id: `meas-time-${idx}-${startHour}`,
      number: idx,
      chapterTitle: 'Pengukuran (Panjang, Berat, Waktu)',
      category: 'Waktu & Durasi',
      question: `Cia mulai belajar pukul 0${startHour}.00 dan selesai pada pukul ${endHour < 10 ? '0' + endHour : endHour}.00. Berapa lama Cia belajar?`,
      options: shuffle([correct, wrong1, wrong2, wrong3]),
      correctAnswer: correct,
      explanation: `Durasi = Jam selesai - Jam mulai = ${endHour}.00 - 0${startHour}.00 = ${correct} (${durationHours * 60} menit).`,
    };
  },
];

// =========================================================================
// 6. GEOMETRY & FRACTION GENERATORS (PECAHAN & BANGUN DATAR)
// =========================================================================
export const geometryFractionGenerators: QuestionGenerator[] = [
  // GF1: Fraction of cake / pizza
  (idx) => {
    const parts = [2, 4, 6, 8][randInt(0, 3)];
    const taken = 1;
    const correct = `${taken}/${parts}`;
    const wrong1 = `${parts}/${taken}`;
    const wrong2 = `${taken}/${parts + 1}`;
    const wrong3 = `${taken}/${parts - 1}`;

    return {
      id: `gf-frac-part-${idx}-${parts}`,
      number: idx,
      chapterTitle: 'Pecahan & Bangun Datar',
      category: 'Pecahan Sederhana',
      question: `Sebuah pizza dipotong menjadi ${parts} bagian sama besar. Cia memakan ${taken} potong pizza. Pecahan yang menyatakan pizza yang dimakan Cia adalah...`,
      options: shuffle([correct, wrong1, wrong2, wrong3]),
      correctAnswer: correct,
      explanation: `Pecahan menyatakan bagian dari keseluruhan. 1 potong dari ${parts} bagian sama besar bernilai ${correct}.`,
    };
  },

  // GF2: Comparing fractions with same denominator
  (idx) => {
    const denom = randInt(5, 9);
    const num1 = randInt(2, denom - 2);
    const num2 = num1 + randInt(1, 2);
    const correct = '< (lebih kecil)';
    const wrong1 = '> (lebih besar)';
    const wrong2 = '= (sama dengan)';
    const wrong3 = '>= (lebih dari)';

    return {
      id: `gf-frac-comp-${idx}-${denom}`,
      number: idx,
      chapterTitle: 'Pecahan & Bangun Datar',
      category: 'Membandingkan Pecahan',
      question: `Bandingkan nilai pecahan: ${num1}/${denom} ... ${num2}/${denom}. Tanda yang tepat adalah...`,
      options: [correct, wrong1, wrong2, wrong3],
      correctAnswer: correct,
      explanation: `Karena penyebutnya sama (${denom}), cukup bandingkan pembilang: ${num1} < ${num2}, sehingga ${num1}/${denom} < ${num2}/${denom}.`,
    };
  },

  // GF3: 2D Shape properties
  (idx) => {
    const shapes = [
      { name: 'persegi', desc: 'memiliki 4 sisi sama panjang dan 4 sudut siku-siku' },
      { name: 'persegi panjang', desc: 'memiliki 2 pasang sisi sejajar sama panjang dan 4 sudut siku-siku' },
      { name: 'segitiga', desc: 'memiliki 3 sisi dan 3 titik sudut' },
    ];
    const picked = shapes[randInt(0, 2)];
    const correct = picked.name;
    const distractors = shapes.map(s => s.name).filter(n => n !== correct);
    distractors.push('lingkaran');

    return {
      id: `gf-shape-${idx}`,
      number: idx,
      chapterTitle: 'Pecahan & Bangun Datar',
      category: 'Sifat Bangun Datar',
      question: `Bangun datar yang ${picked.desc} adalah...`,
      options: shuffle([correct, ...distractors]),
      correctAnswer: correct,
      explanation: `Ciri-ciri ${picked.desc} dimiliki oleh bangun ${picked.name}.`,
    };
  },

  // GF4: Angles
  (idx) => {
    const angles = [
      { name: 'Sudut Siku-siku', desc: 'berukuran tepat 90 derajat (membentuk huruf L tegak lurus)' },
      { name: 'Sudut Lancip', desc: 'berukuran lebih kecil dari 90 derajat (runcing/sempit)' },
      { name: 'Sudut Tumpul', desc: 'berukuran lebih besar dari 90 derajat (terbuka lebar)' },
    ];
    const picked = angles[randInt(0, 2)];
    const correct = picked.name;
    const distractors = angles.map(a => a.name).filter(n => n !== correct);
    distractors.push('Sudut Lurus');

    return {
      id: `gf-angle-${idx}`,
      number: idx,
      chapterTitle: 'Pecahan & Bangun Datar',
      category: 'Jenis Sudut',
      question: `Sudut yang ${picked.desc} disebut...`,
      options: shuffle([correct, ...distractors]),
      correctAnswer: correct,
      explanation: `${picked.name} adalah sudut yang ${picked.desc}.`,
    };
  },
];

// =========================================================================
// 7. GENERAL CURRICULUM GENERATORS (DATA, PATTERNS, ETC.)
// =========================================================================
export const generalGenerators: QuestionGenerator[] = [
  // G1: Data pictograph
  (idx) => {
    const scale = [2, 5, 10][randInt(0, 2)];
    const count = randInt(3, 7);
    const total = count * scale;
    const correct = `${total} buah`;
    const wrong1 = `${count} buah`;
    const wrong2 = `${total + scale} buah`;
    const wrong3 = `${total - scale} buah`;

    return {
      id: `gen-picto-${idx}-${total}`,
      number: idx,
      chapterTitle: 'Penyajian Data & Piktogram',
      category: 'Diagram Gambar',
      question: `Pada diagram gambar, 1 simbol ⭐ mewakili ${scale} buah apel. Jika terdapat ${count} simbol ⭐, berapa total buah apel yang ada?`,
      options: shuffle([correct, wrong1, wrong2, wrong3]),
      correctAnswer: correct,
      explanation: `Setiap simbol bernilai ${scale}. Hitung: ${count} × ${scale} = ${correct}.`,
    };
  },

  // G2: Number pattern
  (idx) => {
    const step = [5, 10, 25, 50][randInt(0, 3)];
    const start = randInt(20, 100);
    const n1 = start;
    const n2 = n1 + step;
    const n3 = n2 + step;
    const n4 = n3 + step;
    const correct = `${n4}`;
    const wrong1 = `${n4 + step}`;
    const wrong2 = `${n4 - 5}`;
    const wrong3 = `${n4 + 10}`;

    return {
      id: `gen-pat-${idx}-${start}`,
      number: idx,
      chapterTitle: 'Pola Bilangan',
      category: 'Pola Loncat',
      question: `Perhatikan pola bilangan: ${n1}, ${n2}, ${n3}, ... Bilangan berikutnya adalah...`,
      options: shuffle([correct, wrong1, wrong2, wrong3]),
      correctAnswer: correct,
      explanation: `Pola bilangan ini bertambah ${step} (+${step}) di setiap langkah. Suku berikutnya = ${n3} + ${step} = ${correct}.`,
    };
  },
];

/**
 * Helper to collect generators for a specific operation across selected digits
 */
function getGeneratorsForDigits(
  dict: Record<DigitOption, QuestionGenerator[]>,
  digits: DigitOption[]
): QuestionGenerator[] {
  const result: QuestionGenerator[] = [];
  digits.forEach(d => {
    if (dict[d]) {
      result.push(...dict[d]);
    }
  });
  return result;
}

/**
 * Generate exam questions based on selected category, count, and active digit choices
 */
export function generateExamQuestions(
  count: number = 20,
  category: ExamCategory = 'all',
  selectedDigits: DigitOption[] = [1, 2, 3, 4]
): ExamQuestion[] {
  const safeCount = Math.max(20, Math.min(100, count));
  const validDigits: DigitOption[] = selectedDigits.length > 0 ? selectedDigits : [1, 2, 3, 4];
  const questions: ExamQuestion[] = [];

  let activePools: QuestionGenerator[][] = [];

  const addPool = getGeneratorsForDigits(additionGeneratorsByDigit, validDigits);
  const subPool = getGeneratorsForDigits(subtractionGeneratorsByDigit, validDigits);
  const multPool = getGeneratorsForDigits(multiplicationGeneratorsByDigit, validDigits);
  const divPool = getGeneratorsForDigits(divisionGeneratorsByDigit, validDigits);

  switch (category) {
    case 'addition':
      activePools = [addPool];
      break;
    case 'subtraction':
      activePools = [subPool];
      break;
    case 'multiplication':
      activePools = [multPool];
      break;
    case 'division':
      activePools = [divPool];
      break;
    case 'arithmetic':
      // 4 operations combined according to chosen digits
      activePools = [addPool, subPool, multPool, divPool].filter(p => p.length > 0);
      break;
    case 'measurement':
      activePools = [measurementGenerators];
      break;
    case 'geometry_fraction':
      activePools = [geometryFractionGenerators];
      break;
    case 'all':
    default:
      // Mix of everything across chapters and operations
      activePools = [
        addPool,
        subPool,
        multPool,
        divPool,
        measurementGenerators,
        geometryFractionGenerators,
        generalGenerators,
      ].filter(p => p.length > 0);
      break;
  }

  // Safety fallback if no generators found
  if (activePools.length === 0) {
    activePools = [[
      (idx) => ({
        id: `fb-${idx}`,
        number: idx,
        chapterTitle: 'Matematika Dasar',
        category: 'Hitung Dasar',
        question: `Berapakah hasil dari 5 + 5?`,
        options: ['10', '9', '11', '12'],
        correctAnswer: '10',
        explanation: '5 + 5 = 10.',
      }),
    ]];
  }

  for (let i = 1; i <= safeCount; i++) {
    const poolIndex = (i - 1) % activePools.length;
    const currentPool = activePools[poolIndex];
    const generator = currentPool[randInt(0, currentPool.length - 1)];

    const q = generator(i);
    q.number = i;

    // Safety: ensure options have NO duplicates and include correctAnswer
    const optionSet = new Set<string>();
    const cleanOptions: string[] = [];
    for (const opt of q.options) {
      const clean = opt.trim();
      if (!optionSet.has(clean)) {
        optionSet.add(clean);
        cleanOptions.push(clean);
      }
    }
    // Ensure correct answer is in options
    if (!optionSet.has(q.correctAnswer.trim())) {
      cleanOptions[0] = q.correctAnswer.trim();
      optionSet.add(q.correctAnswer.trim());
    }
    // Pad to 4 options if necessary
    let pad = 1;
    while (cleanOptions.length < 4) {
      const fallback = `Opsi ${pad}`;
      if (!optionSet.has(fallback)) {
        optionSet.add(fallback);
        cleanOptions.push(fallback);
      }
      pad++;
    }
    q.options = cleanOptions;

    questions.push(q);
  }

  return questions;
}
