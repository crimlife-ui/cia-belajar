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

// Helper: Shuffle array randomly
function shuffle<T>(array: T[]): T[] {
  const arr = [...array];
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
export const additionGenerators: QuestionGenerator[] = [
  // A1: 2-digit addition with carry
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
      category: 'Penjumlahan 2 Digit',
      question: `Berapakah hasil dari ${a} + ${b}?`,
      options: shuffle([correct, wrong1, wrong2, wrong3]),
      correctAnswer: correct,
      explanation: `Hitung satuan: ${a % 10} + ${b % 10} = ${(a % 10) + (b % 10)}. Hitung puluhan: ${Math.floor(a / 10)} + ${Math.floor(b / 10)} (ditambah simpanan jika ada). Hasil akhir: ${a} + ${b} = ${correct}.`,
    };
  },

  // A2: 3-digit addition with carry
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
      category: 'Penjumlahan Ratusan',
      question: `Hitunglah penjumlahan bersusun: ${a} + ${b} = ...`,
      options: shuffle([correct, wrong1, wrong2, wrong3]),
      correctAnswer: correct,
      explanation: `Susun kedua bilangan lurus ke bawah: satuan lurus satuan, puluhan lurus puluhan, ratusan lurus ratusan. ${a} + ${b} = ${correct}.`,
    };
  },

  // A3: 4-digit addition up to 10.000
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
      category: 'Penjumlahan Ribuan',
      question: `Hasil dari penjumlahan bersusun ${formatId(a)} + ${formatId(b)} adalah...`,
      options: shuffle([correct, wrong1, wrong2, wrong3]),
      correctAnswer: correct,
      explanation: `Jumlahkan dari kolom satuan lurus ke kiri: ${formatId(a)} + ${formatId(b)} = ${correct}. Ingat untuk menambahkan angka 1 simpanan jika hasil kolom ≥ 10.`,
    };
  },

  // A4: 3-number addition
  (idx) => {
    const a = randInt(120, 300);
    const b = randInt(110, 250);
    const c = randInt(80, 200);
    const sum = a + b + c;
    const correct = `${sum}`;
    const wrong1 = `${sum + 10}`;
    const wrong2 = `${sum - 10}`;
    const wrong3 = `${sum + 20}`;

    return {
      id: `add-3num-${idx}-${a}`,
      number: idx,
      chapterTitle: 'Khusus Penjumlahan (+)',
      category: 'Penjumlahan Tiga Bilangan',
      question: `Berapakah hasil dari ${a} + ${b} + ${c}?`,
      options: shuffle([correct, wrong1, wrong2, wrong3]),
      correctAnswer: correct,
      explanation: `Jumlahkan bertahap: ${a} + ${b} = ${a + b}, lalu (${a + b}) + ${c} = ${correct}.`,
    };
  },

  // A5: Word problem (Soal Cerita Penjumlahan)
  (idx) => {
    const items = ['butir telur', 'buah mangga', 'buku tulis', 'bibit pohon jati', 'kelereng'][randInt(0, 4)];
    const day1 = randInt(1250, 3200);
    const day2 = randInt(1100, 3100);
    const total = day1 + day2;
    const correct = `${formatId(total)} ${items}`;
    const wrong1 = `${formatId(total + 100)} ${items}`;
    const wrong2 = `${formatId(total - 100)} ${items}`;
    const wrong3 = `${formatId(total + 10)} ${items}`;

    return {
      id: `add-word-${idx}-${day1}`,
      number: idx,
      chapterTitle: 'Khusus Penjumlahan (+)',
      category: 'Soal Cerita Penjumlahan',
      question: `Paman memanen ${formatId(day1)} ${items} pada hari Sabtu, dan memanen lagi ${formatId(day2)} ${items} pada hari Minggu. Berapa total ${items} yang dipanen Paman seluruhnya?`,
      options: shuffle([correct, wrong1, wrong2, wrong3]),
      correctAnswer: correct,
      explanation: `Jumlahkan hasil panen kedua hari: ${formatId(day1)} + ${formatId(day2)} = ${correct}.`,
    };
  },

  // A6: Missing addend (Kotak misteri penjumlahan)
  (idx) => {
    const known = randInt(250, 600);
    const mystery = randInt(150, 400);
    const total = known + mystery;
    const correct = `${mystery}`;
    const wrong1 = `${mystery + 10}`;
    const wrong2 = `${mystery - 10}`;
    const wrong3 = `${total + known}`;

    return {
      id: `add-box-${idx}-${total}`,
      number: idx,
      chapterTitle: 'Khusus Penjumlahan (+)',
      category: 'Mencari Angka Penjumlahan',
      question: `Isilah nilai ⬜ pada persamaan berikut: ${known} + ⬜ = ${total}`,
      options: shuffle([correct, wrong1, wrong2, wrong3]),
      correctAnswer: correct,
      explanation: `Untuk mencari angka penambah yang hilang: ⬜ = ${total} - ${known} = ${correct}.`,
    };
  },
];

// =========================================================================
// 2. SUBTRACTION GENERATORS (KHUSUS PENGURANGAN)
// =========================================================================
export const subtractionGenerators: QuestionGenerator[] = [
  // S1: 2-digit subtraction with borrow
  (idx) => {
    const b = randInt(25, 48);
    const diff = randInt(18, 45);
    const a = b + diff; // ensures a > b
    const correct = `${diff}`;
    const wrong1 = `${diff + 10}`;
    const wrong2 = `${diff - 10}`;
    const wrong3 = `${diff + 2}`;

    return {
      id: `sub-2d-${idx}-${a}`,
      number: idx,
      chapterTitle: 'Khusus Pengurangan (-)',
      category: 'Pengurangan 2 Digit',
      question: `Berapakah hasil dari ${a} - ${b}?`,
      options: shuffle([correct, wrong1, wrong2, wrong3]),
      correctAnswer: correct,
      explanation: `Gunakan teknik meminjam jika satuan atas lebih kecil dari satuan bawah: ${a} - ${b} = ${correct}.`,
    };
  },

  // S2: 3-digit subtraction with borrow
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
      category: 'Pengurangan Ratusan',
      question: `Hitunglah pengurangan bersusun: ${a} - ${b} = ...`,
      options: shuffle([correct, wrong1, wrong2, wrong3]),
      correctAnswer: correct,
      explanation: `Kurangkan kolom demi kolom mulai dari satuan: ${a} - ${b} = ${correct}.`,
    };
  },

  // S3: 4-digit subtraction up to 10.000
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
      category: 'Pengurangan Ribuan',
      question: `Hasil dari pengurangan bersusun ${formatId(a)} - ${formatId(b)} adalah...`,
      options: shuffle([correct, wrong1, wrong2, wrong3]),
      correctAnswer: correct,
      explanation: `Kurangkan digit satuan ke ribuan: ${formatId(a)} - ${formatId(b)} = ${correct}. Pinjam 1 dari tetangga sebelah kiri jika angka atas lebih kecil.`,
    };
  },

  // S4: Subtraction from round thousands (1.000, 5.000, 10.000)
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
      category: 'Pengurangan Angka Bulat',
      question: `Berapakah hasil dari ${formatId(roundTotal)} - ${formatId(subtracted)}?`,
      options: shuffle([correct, wrong1, wrong2, wrong3]),
      correctAnswer: correct,
      explanation: `Gunakan trik meminjam beruntun: ${formatId(roundTotal)} - ${formatId(subtracted)} = ${correct}.`,
    };
  },

  // S5: Word problem (Soal Cerita Pengurangan)
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
      category: 'Soal Cerita Pengurangan',
      question: `Di sebuah gudang terdapat ${formatId(initial)} kg beras. Sebanyak ${formatId(used)} kg beras telah dikirim ke toko-toko. Berapa kg sisa beras di gudang sekarang?`,
      options: shuffle([correct, wrong1, wrong2, wrong3]),
      correctAnswer: correct,
      explanation: `Kurangkan stok awal dengan jumlah yang sudah dikirim: ${formatId(initial)} - ${formatId(used)} = ${correct}.`,
    };
  },

  // S6: Missing subtrahend (Kotak misteri pengurangan)
  (idx) => {
    const total = randInt(400, 800);
    const remain = randInt(120, 290);
    const mystery = total - remain;
    const correct = `${mystery}`;
    const wrong1 = `${mystery + 20}`;
    const wrong2 = `${mystery - 20}`;
    const wrong3 = `${total + remain}`;

    return {
      id: `sub-box-${idx}-${total}`,
      number: idx,
      chapterTitle: 'Khusus Pengurangan (-)',
      category: 'Mencari Angka Pengurang',
      question: `Tentukan nilai ⬜ yang tepat pada persamaan: ${total} - ⬜ = ${remain}`,
      options: shuffle([correct, wrong1, wrong2, wrong3]),
      correctAnswer: correct,
      explanation: `Untuk mencari angka pengurang: ⬜ = ${total} - ${remain} = ${correct}.`,
    };
  },
];

// =========================================================================
// 3. MULTIPLICATION GENERATORS (KHUSUS PERKALIAN)
// =========================================================================
export const multiplicationGenerators: QuestionGenerator[] = [
  // M1: Basic multiplication facts 1-10
  (idx) => {
    const a = randInt(3, 9);
    const b = randInt(4, 9);
    const prod = a * b;
    const correct = `${prod}`;
    const wrong1 = `${prod + a}`;
    const wrong2 = `${prod - b}`;
    const wrong3 = `${prod + 2}`;

    return {
      id: `mult-basic-${idx}-${a}x${b}`,
      number: idx,
      chapterTitle: 'Khusus Perkalian (×)',
      category: 'Tabel Perkalian Dasar',
      question: `Berapakah hasil dari ${a} × ${b}?`,
      options: shuffle([correct, wrong1, wrong2, wrong3]),
      correctAnswer: correct,
      explanation: `${a} × ${b} berarti angka ${b} dijumlahkan sebanyak ${a} kali. Hasilnya = ${correct}.`,
    };
  },

  // M2: 2-digit times 1-digit
  (idx) => {
    const a = randInt(12, 35);
    const b = randInt(3, 6);
    const prod = a * b;
    const correct = `${prod}`;
    const wrong1 = `${prod + 10}`;
    const wrong2 = `${prod - 10}`;
    const wrong3 = `${prod + b}`;

    return {
      id: `mult-2d1d-${idx}-${a}x${b}`,
      number: idx,
      chapterTitle: 'Khusus Perkalian (×)',
      category: 'Perkalian Puluhan',
      question: `Hitunglah hasil perkalian dari ${a} × ${b}:`,
      options: shuffle([correct, wrong1, wrong2, wrong3]),
      correctAnswer: correct,
      explanation: `Kalikan satuan: ${(a % 10)} × ${b} = ${(a % 10) * b}. Kalikan puluhan: ${Math.floor(a / 10)}0 × ${b} = ${Math.floor(a / 10) * 10 * b}. Jumlahkan: ${correct}.`,
    };
  },

  // M3: Multiplication by round thousands
  (idx) => {
    const mult = randInt(2, 5);
    const base = randInt(1, 4) * 1000;
    const res = mult * base;
    const correct = formatId(res);
    const wrong1 = formatId(res - 1000);
    const wrong2 = formatId(res + 1000);
    const wrong3 = formatId(res / 10);

    return {
      id: `mult-th-${idx}-${base}`,
      number: idx,
      chapterTitle: 'Khusus Perkalian (×)',
      category: 'Perkalian Kelipatan Ribuan',
      question: `Berapakah hasil dari ${mult} × ${formatId(base)}?`,
      options: shuffle([correct, wrong1, wrong2, wrong3]),
      correctAnswer: correct,
      explanation: `Trik angka nol: kalikan angka depan ${mult} × ${base / 1000} = ${mult * (base / 1000)}, lalu tambahkan 3 angka nol di belakangnya ➔ ${correct}.`,
    };
  },

  // M4: Repeated addition concept
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
      category: 'Konsep Perkalian',
      question: `Bentuk penjumlahan berulang yang tepat dari ${a} × ${b} adalah...`,
      options: shuffle([correct, wrong1, wrong2, wrong3]),
      correctAnswer: correct,
      explanation: `${a} × ${b} artinya ada ${a} kelompok yang masing-masing berisi ${b}. Jadi angka ${b} dijumlahkan sebanyak ${a} kali (${correct}).`,
    };
  },

  // M5: Word problem (Soal Cerita Perkalian)
  (idx) => {
    const boxes = randInt(4, 8);
    const itemsPerBox = randInt(5, 12);
    const total = boxes * itemsPerBox;
    const correct = `${total} buah`;
    const wrong1 = `${total + itemsPerBox} buah`;
    const wrong2 = `${total - itemsPerBox} buah`;
    const wrong3 = `${boxes + itemsPerBox} buah`;

    return {
      id: `mult-word-${idx}-${boxes}`,
      number: idx,
      chapterTitle: 'Khusus Perkalian (×)',
      category: 'Soal Cerita Perkalian',
      question: `Ibu membeli ${boxes} kotak donat. Setiap kotak berisi ${itemsPerBox} buah donat. Berapa total seluruh donat yang dibeli Ibu?`,
      options: shuffle([correct, wrong1, wrong2, wrong3]),
      correctAnswer: correct,
      explanation: `Ada ${boxes} kotak × ${itemsPerBox} buah donat per kotak = ${boxes * itemsPerBox} buah donat (${correct}).`,
    };
  },
];

// =========================================================================
// 4. DIVISION GENERATORS (KHUSUS PEMBAGIAN)
// =========================================================================
export const divisionGenerators: QuestionGenerator[] = [
  // D1: Basic division facts
  (idx) => {
    const divisor = randInt(3, 9);
    const quotient = randInt(3, 9);
    const dividend = divisor * quotient;
    const correct = `${quotient}`;
    const wrong1 = `${quotient + 1}`;
    const wrong2 = `${quotient - 1}`;
    const wrong3 = `${divisor}`;

    return {
      id: `div-basic-${idx}-${dividend}`,
      number: idx,
      chapterTitle: 'Khusus Pembagian (÷)',
      category: 'Tabel Pembagian Dasar',
      question: `Berapakah hasil dari ${dividend} ÷ ${divisor}?`,
      options: shuffle([correct, wrong1, wrong2, wrong3]),
      correctAnswer: correct,
      explanation: `Cari perkalian kebalikannya: ${divisor} × berapa yang menghasilkan ${dividend}? Karena ${divisor} × ${quotient} = ${dividend}, maka ${dividend} ÷ ${divisor} = ${correct}.`,
    };
  },

  // D2: Division of round hundreds and thousands
  (idx) => {
    const divisor = randInt(2, 4);
    const quotient = randInt(1, 3) * 1000;
    const dividend = divisor * quotient;
    const correct = formatId(quotient);
    const wrong1 = formatId(quotient + 500);
    const wrong2 = formatId(quotient - 500);
    const wrong3 = formatId(quotient * 2);

    return {
      id: `div-th-${idx}-${dividend}`,
      number: idx,
      chapterTitle: 'Khusus Pembagian (÷)',
      category: 'Pembagian Ribuan',
      question: `Berapakah hasil pembagian dari ${formatId(dividend)} ÷ ${divisor}?`,
      options: shuffle([correct, wrong1, wrong2, wrong3]),
      correctAnswer: correct,
      explanation: `Bagi angka depannya terlebih dahulu: ${dividend / 1000} ÷ ${divisor} = ${quotient / 1000}, lalu tempelkan tiga angka nol ➔ ${correct}.`,
    };
  },

  // D3: 2-digit divided by 1-digit without remainder
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
      category: 'Pembagian Puluhan',
      question: `Hitunglah hasil dari ${dividend} ÷ ${divisor}:`,
      options: shuffle([correct, wrong1, wrong2, wrong3]),
      correctAnswer: correct,
      explanation: `${dividend} ÷ ${divisor} = ${correct} (karena ${divisor} × ${correct} = ${dividend}).`,
    };
  },

  // D4: Division as repeated subtraction
  (idx) => {
    const divisor = randInt(3, 6);
    const quotient = randInt(3, 5);
    const dividend = divisor * quotient;
    const correct = `${quotient} kali`;
    const wrong1 = `${quotient + 1} kali`;
    const wrong2 = `${divisor} kali`;
    const wrong3 = `${quotient - 1} kali`;

    return {
      id: `div-concept-${idx}-${dividend}`,
      number: idx,
      chapterTitle: 'Khusus Pembagian (÷)',
      category: 'Konsep Pembagian',
      question: `Operasi pembagian ${dividend} ÷ ${divisor} artinya angka ${dividend} dikurangkan dengan ${divisor} secara terus-menerus hingga habis sebanyak...`,
      options: shuffle([correct, wrong1, wrong2, wrong3]),
      correctAnswer: correct,
      explanation: `Pembagian adalah pengurangan berulang sampai habis (hasil 0). Angka ${dividend} dikurangi ${divisor} sebanyak ${quotient} kali.`,
    };
  },

  // D5: Word problem (Soal Cerita Pembagian)
  (idx) => {
    const people = randInt(3, 6);
    const perPerson = randInt(4, 9);
    const total = people * perPerson;
    const correct = `${perPerson} butir`;
    const wrong1 = `${perPerson + 1} butir`;
    const wrong2 = `${perPerson - 1} butir`;
    const wrong3 = `${people} butir`;

    return {
      id: `div-word-${idx}-${total}`,
      number: idx,
      chapterTitle: 'Khusus Pembagian (÷)',
      category: 'Soal Cerita Pembagian',
      question: `Cia memiliki ${total} butir kelereng. Kelereng tersebut dibagikan sama rata kepada ${people} orang temannya. Berapa butir kelereng yang didapat tiap teman?`,
      options: shuffle([correct, wrong1, wrong2, wrong3]),
      correctAnswer: correct,
      explanation: `Bagikan sama rata: ${total} ÷ ${people} = ${correct}. Setiap anak mendapat ${perPerson} butir kelereng.`,
    };
  },
];

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
 * Generate exam questions based on selected category and count
 */
export function generateExamQuestions(
  count: number = 20,
  category: ExamCategory = 'all'
): ExamQuestion[] {
  const safeCount = Math.max(20, Math.min(100, count));
  const questions: ExamQuestion[] = [];

  let activePools: QuestionGenerator[][] = [];

  switch (category) {
    case 'addition':
      activePools = [additionGenerators];
      break;
    case 'subtraction':
      activePools = [subtractionGenerators];
      break;
    case 'multiplication':
      activePools = [multiplicationGenerators];
      break;
    case 'division':
      activePools = [divisionGenerators];
      break;
    case 'arithmetic':
      // 4 operations combined
      activePools = [
        additionGenerators,
        subtractionGenerators,
        multiplicationGenerators,
        divisionGenerators,
      ];
      break;
    case 'measurement':
      activePools = [measurementGenerators];
      break;
    case 'geometry_fraction':
      activePools = [geometryFractionGenerators];
      break;
    case 'all':
    default:
      // Mix of everything across chapters
      activePools = [
        additionGenerators,
        subtractionGenerators,
        multiplicationGenerators,
        divisionGenerators,
        measurementGenerators,
        geometryFractionGenerators,
        generalGenerators,
      ];
      break;
  }

  for (let i = 1; i <= safeCount; i++) {
    const poolIndex = (i - 1) % activePools.length;
    const currentPool = activePools[poolIndex];
    const generator = currentPool[randInt(0, currentPool.length - 1)];

    const q = generator(i);
    q.number = i;
    questions.push(q);
  }

  return questions;
}
