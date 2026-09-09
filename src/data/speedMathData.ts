export interface SpeedTrick {
  id: string;
  title: string;
  badge: string;
  tagline: string;
  formula: string;
  explanation: string;
  exampleProblem: {
    question: string;
    normalWay: string;
    speedTrickWay: string;
    stepExplanation: string[];
    result: string;
  };
  practicePrompt: string;
}

export interface SpeedOperationModule {
  operation: 'addition' | 'subtraction' | 'multiplication' | 'division';
  title: string;
  symbol: string;
  themeColor: {
    bg: string;
    border: string;
    text: string;
    badge: string;
    accent: string;
  };
  intro: string;
  tricks: SpeedTrick[];
}

export interface SpeedQuizQuestion {
  id: string;
  operationType: 'tambah' | 'kurang' | 'kali' | 'bagi' | 'campuran';
  question: string;
  options: (string | number)[];
  correctAnswer: string | number;
  mentalTrickName: string;
  stepExplanation: string;
  speedTip: string;
}

export const SPEED_MATH_MODULES: SpeedOperationModule[] = [
  // ================= 1. PENJUMLAHAN CEPAT (+) =================
  {
    operation: 'addition',
    title: 'Hitung Cepat Penjumlahan (+)',
    symbol: '➕',
    themeColor: {
      bg: 'bg-emerald-50',
      border: 'border-emerald-300',
      text: 'text-emerald-800',
      badge: 'bg-emerald-100 text-emerald-800',
      accent: 'bg-emerald-500 hover:bg-emerald-600',
    },
    intro:
      'Lupakan menghitung jari satu-satu yang lama! Dengan trik teman 10, pembulatan, dan hitung dari kiri, menjumlahkan angka ratusan bisa dilakukan dalam 3 detik di kepala!',
    tricks: [
      {
        id: 'add-trick-1',
        title: 'Trik Pasangan "Teman 10" & "Teman 100"',
        badge: 'Trik Paling Populer',
        tagline: 'Cari pasangan angka yang kalau digabung langsung membentuk angka bulat 10 atau 100!',
        formula: 'Pasangan 10: (1+9), (2+8), (3+7), (4+6), (5+5)',
        explanation:
          'Otak manusia paling cepat menjumlahkan angka bulat (10, 20, 100). Saat melihat banyak angka, jangan hitung berurutan! Cari dulu pasangan yang menghasilkan 10 atau 100.',
        exampleProblem: {
          question: 'Hitung cepat: 7 + 8 + 3 + 2 = ...',
          normalWay: '7 + 8 = 15, 15 + 3 = 18, 18 + 2 = 20 (Lambat dan bikin pusing)',
          speedTrickWay: '(7 + 3) + (8 + 2) = 10 + 10 = 20 (Cepat dalam 2 detik!)',
          stepExplanation: [
            'Lihat angka 7 berteman dengan 3 ➔ 7 + 3 = 10.',
            'Lihat angka 8 berteman dengan 2 ➔ 8 + 2 = 10.',
            'Gabungkan kedua teman 10: 10 + 10 = 20.',
          ],
          result: '20',
        },
        practicePrompt: 'Coba di kepala: 6 + 9 + 4 + 1 = ? (Pasangkan 6+4 dan 9+1)',
      },
      {
        id: 'add-trick-2',
        title: 'Trik Pembulatan (Pinjam 1 atau 2 Dulu)',
        badge: 'Trik Angka 9 dan 8',
        tagline: 'Jika ada angka berakhiran 9 atau 8, genapkan dulu ke puluhan terdekat!',
        formula: 'Angka berakhiran 9 ➔ Anggap 10 (lalu kurangi 1 di akhir)',
        explanation:
          'Menjumlahkan dengan 30 jauh lebih mudah daripada menjumlahkan dengan 29. Jadi, pinjam dulu 1 biar jadi 30, lalu di akhir jangan lupa kurangi 1!',
        exampleProblem: {
          question: 'Hitung cepat: 47 + 29 = ...',
          normalWay: '47 + 29 susun ke bawah: 7 + 9 simpan 1... (Butuh coretan kertas)',
          speedTrickWay: 'Ubah 29 jadi 30: 47 + 30 = 77, lalu 77 - 1 = 76!',
          stepExplanation: [
            '29 itu kurang 1 untuk jadi 30.',
            'Hitung mudah: 47 + 30 = 77.',
            'Kembalikan pinjaman: 77 - 1 = 76.',
          ],
          result: '76',
        },
        practicePrompt: 'Coba di kepala: 56 + 19 = ? (56 + 20 lalu kurangi 1)',
      },
      {
        id: 'add-trick-3',
        title: 'Trik Pecah Puluhan & Satuan (Dari Kiri ke Kanan)',
        badge: 'Mental Math Master',
        tagline: 'Hitung puluhannya dulu, baru tambahkan satuannya!',
        formula: '(Puluhan + Puluhan) + (Satuan + Satuan)',
        explanation:
          'Di sekolah diajarkan hitung dari kanan (satuan dulu). Tapi untuk hitung di kepala (tanpa pensil), menghitung PULUHAN DULU jauh lebih mudah diingat otak!',
        exampleProblem: {
          question: 'Hitung cepat di kepala: 54 + 35 = ...',
          normalWay: 'Susun ke bawah membayangkan angka di awang-awang',
          speedTrickWay: '(50 + 30) + (4 + 5) = 80 + 9 = 89!',
          stepExplanation: [
            'Pecah puluhannya: 50 + 30 = 80.',
            'Pecah satuannya: 4 + 5 = 9.',
            'Satukan: 80 + 9 = 89.',
          ],
          result: '89',
        },
        practicePrompt: 'Coba di kepala: 43 + 26 = ? ((40+20) + (3+6))',
      },
    ],
  },

  // ================= 2. PENGURANGAN CEPAT (-) =================
  {
    operation: 'subtraction',
    title: 'Hitung Cepat Pengurangan (-)',
    symbol: '➖',
    themeColor: {
      bg: 'bg-rose-50',
      border: 'border-rose-300',
      text: 'text-rose-800',
      badge: 'bg-rose-100 text-rose-800',
      accent: 'bg-rose-500 hover:bg-rose-600',
    },
    intro:
      'Pengurangan meminjam sering membuat anak bingung. Dengan trik lompat katak dan trik selisih ratusan, pengurangan angka besar jadi super gampang!',
    tricks: [
      {
        id: 'sub-trick-1',
        title: 'Trik Lompat Katak (Menghitung Maju)',
        badge: 'Pengganti Meminjam',
        tagline: 'Ubah pengurangan menjadi lompatan maju ke puluhan terdekat!',
        formula: 'A - B ➔ Hitung berapa langkah dari B maju sampai ke A',
        explanation:
          'Mengurangi itu sebenarnya mencari jarak/selisih. Daripada mundur meminjam, lebih mudah melompat maju dari angka kecil ke puluhan terdekat, lalu melompat ke angka tujuan.',
        exampleProblem: {
          question: 'Hitung cepat: 73 - 48 = ...',
          normalWay: '3 - 8 tidak bisa pinjam 1... (Sering salah hitung)',
          speedTrickWay: 'Dari 48 lompat ke 50 (+2), dari 50 lompat ke 73 (+23). Total = 2 + 23 = 25!',
          stepExplanation: [
            'Mulai dari 48: melompat 2 langkah ke angka bulat 50 (+2).',
            'Dari 50 melompat ke angka tujuan 73: butuh 23 langkah (+23).',
            'Gabungkan kedua lompatan: 2 + 23 = 25.',
          ],
          result: '25',
        },
        practicePrompt: 'Coba di kepala: 82 - 59 = ? (59 ke 60 lompat 1, 60 ke 82 lompat 22 ➔ 23)',
      },
      {
        id: 'sub-trick-2',
        title: 'Trik "Semua dari 9, Terakhir dari 10"',
        badge: 'Pengurangan Ratusan/Ribuan',
        tagline: 'Cara instan mengurangi dari angka 100 atau 1.000 tanpa meminjam berantai!',
        formula: 'Kurangkan ratusan dari 9, puluhan dari 9, dan satuan terakhir dari 10!',
        explanation:
          'Mengurangi 1.000 - 347 sering membuat pusing karena nolnya banyak. Trik saktinya: kurangkan tiap angka di depan dari 9, dan hanya angka paling belakang yang dikurangkan dari 10!',
        exampleProblem: {
          question: 'Hitung cepat: 1.000 - 468 = ...',
          normalWay: 'Pinjam berantai dari 1.000 jadi 990 jadi 999...',
          speedTrickWay: '(9 - 4) lalu (9 - 6) lalu (10 - 8) = 532!',
          stepExplanation: [
            'Digit pertama: 9 - 4 = 5.',
            'Digit kedua: 9 - 6 = 3.',
            'Digit terakhir: 10 - 8 = 2.',
            'Gabungkan: 532!',
          ],
          result: '532',
        },
        practicePrompt: 'Coba di kepala: 100 - 37 = ? ((9-3=6) dan (10-7=3) ➔ 63)',
      },
    ],
  },

  // ================= 3. PERKALIAN CEPAT (×) =================
  {
    operation: 'multiplication',
    title: 'Hitung Cepat Perkalian (×)',
    symbol: '✖️',
    themeColor: {
      bg: 'bg-sky-50',
      border: 'border-sky-300',
      text: 'text-sky-800',
      badge: 'bg-sky-100 text-sky-800',
      accent: 'bg-sky-500 hover:bg-sky-600',
    },
    intro:
      'Perkalian tidak melulu harus dihafal membabi buta. Ada rumus rahasia untuk perkalian 5, 9, 10, dan trik bagi dua kali dua yang bikin kamu serasa jenius matematika!',
    tricks: [
      {
        id: 'mul-trick-1',
        title: 'Trik Sakti Perkalian 9 (Kurang 1 & Pasangan 9)',
        badge: 'Trik Paling Ajaib',
        tagline: 'Digit pertama adalah angka dikurangi 1, digit kedua adalah pasangannya ke 9!',
        formula: 'Puluhan = (N - 1), Satuan = (9 - Puluhan)',
        explanation:
          'Setiap hasil perkalian 9 satu digit (9 × N), kedua angkanya kalau dijumlahkan hasilnya PASTI 9! Contoh: 9 × 4 = 36 (3 + 6 = 9).',
        exampleProblem: {
          question: 'Hitung cepat: 9 × 7 = ...',
          normalWay: 'Menghitung 7 + 7 + 7 + 7 + 7 + 7 + 7 (Lama)',
          speedTrickWay: '7 dikurang 1 = 6. Pasangan 6 agar jadi 9 adalah 3. Hasilnya = 63!',
          stepExplanation: [
            'Kurangi angka pengali dengan 1: 7 - 1 = 6 (ini angka depannya).',
            'Cari teman angka 6 agar bernilai 9: 9 - 6 = 3 (ini angka belakangnya).',
            'Satukan: 63.',
          ],
          result: '63',
        },
        practicePrompt: 'Coba di kepala: 9 × 8 = ? (8 - 1 = 7, pasangannya 2 ➔ 72)',
      },
      {
        id: 'mul-trick-2',
        title: 'Trik Perkalian 5 (Bagi 2 Lalu Tambah Nol)',
        badge: 'Trik Kilat',
        tagline: 'Mengalikan 5 sama artinya dengan membagi dua lalu mengalikan 10!',
        formula: 'N × 5 = (N ÷ 2) × 10',
        explanation:
          'Karena 5 adalah setengah dari 10, jika angkanya genap, cukup cari setengahnya (bagi 2) lalu tempelkan angka 0 di belakangnya!',
        exampleProblem: {
          question: 'Hitung cepat: 16 × 5 = ...',
          normalWay: '16 × 5 susun ke bawah: 6 × 5 = 30 simpan 3...',
          speedTrickWay: 'Bagi dua angka 16: 16 ÷ 2 = 8. Tambah nol = 80!',
          stepExplanation: [
            'Ambil angka 16, cari setengahnya: 16 ÷ 2 = 8.',
            'Tambahkan angka 0 di belakangnya: 80.',
          ],
          result: '80',
        },
        practicePrompt: 'Coba di kepala: 24 × 5 = ? (Setengah dari 24 adalah 12 ➔ 120)',
      },
      {
        id: 'mul-trick-3',
        title: 'Trik Gandakan & Bagi Dua (Doubling & Halving)',
        badge: 'Trik Master',
        tagline: 'Kecilkan satu angka dengan bagi 2, besarkan angka lainnya dengan kali 2!',
        formula: 'A × B = (A ÷ 2) × (B × 2)',
        explanation:
          'Jika kamu kesulitan menghitung 18 × 5, ubah saja: 18 dibagi 2 jadi 9, 5 dikali 2 jadi 10. Sekarang tinggal 9 × 10 = 90! Hasilnya tidak berubah.',
        exampleProblem: {
          question: 'Hitung cepat: 14 × 5 = ...',
          normalWay: 'Menghitung susun ke bawah',
          speedTrickWay: '(14 ÷ 2) × (5 × 2) = 7 × 10 = 70!',
          stepExplanation: [
            'Bagi dua angka kiri: 14 ÷ 2 = 7.',
            'Kalikan dua angka kanan: 5 × 2 = 10.',
            'Kalikan hasilnya: 7 × 10 = 70.',
          ],
          result: '70',
        },
        practicePrompt: 'Coba di kepala: 12 × 15 = ? (Bagi 2 jadi 6, kali 2 jadi 30 ➔ 6 × 30 = 180)',
      },
    ],
  },

  // ================= 4. PEMBAGIAN CEPAT (÷) =================
  {
    operation: 'division',
    title: 'Hitung Cepat Pembagian (÷)',
    symbol: '➗',
    themeColor: {
      bg: 'bg-amber-50',
      border: 'border-amber-300',
      text: 'text-amber-800',
      badge: 'bg-amber-100 text-amber-800',
      accent: 'bg-amber-500 hover:bg-amber-600',
    },
    intro:
      'Pembagian adalah kebalikan dari perkalian. Dengan trik pembagian 5, trik bagi dua bertahap (setengah dari setengah), pembagian jadi tidak menakutkan!',
    tricks: [
      {
        id: 'div-trick-1',
        title: 'Trik Pembagian dengan 4 (Bagi Dua, Lalu Bagi Dua Lagi)',
        badge: 'Trik Paling Praktis',
        tagline: 'Membagi 4 sama dengan mencari setengah dari setengahnya!',
        formula: 'N ÷ 4 = (N ÷ 2) ÷ 2',
        explanation:
          'Membagi angka besar langsung dengan 4 sering bikin ragu. Cukup cari setengahnya dulu, lalu cari setengahnya sekali lagi!',
        exampleProblem: {
          question: 'Hitung cepat: 68 ÷ 4 = ...',
          normalWay: 'Porogapit bersusun panjang 68 dibagi 4...',
          speedTrickWay: 'Setengah dari 68 adalah 34. Setengah dari 34 adalah 17. Selesai!',
          stepExplanation: [
            'Bagi dua tahap pertama: 68 ÷ 2 = 34.',
            'Bagi dua tahap kedua: 34 ÷ 2 = 17.',
            'Hasilnya adalah 17.',
          ],
          result: '17',
        },
        practicePrompt: 'Coba di kepala: 84 ÷ 4 = ? (Setengah 84 = 42, setengah 42 = 21)',
      },
      {
        id: 'div-trick-2',
        title: 'Trik Coret Nol Kembar',
        badge: 'Angka Puluhan & Ratusan',
        tagline: 'Coret jumlah nol yang sama di kedua sisi sebelum membagi!',
        formula: 'A0 ÷ B0 = A ÷ B',
        explanation:
          'Jika angka yang dibagi dan pembaginya sama-sama memiliki angka nol di belakang, coret nolnya dengan jumlah yang sama agar angkanya jadi kecil dan mudah dihitung.',
        exampleProblem: {
          question: 'Hitung cepat: 350 ÷ 50 = ...',
          normalWay: 'Membagi 350 dengan 50',
          speedTrickWay: 'Coret 1 nol di 350 dan 50 ➔ Tersisa 35 ÷ 5 = 7!',
          stepExplanation: [
            'Coret satu nol di 350 menjadi 35.',
            'Coret satu nol di 50 menjadi 5.',
            'Sekarang tinggal hitung: 35 ÷ 5 = 7.',
          ],
          result: '7',
        },
        practicePrompt: 'Coba di kepala: 480 ÷ 60 = ? (Coret nol jadi 48 ÷ 6 = 8)',
      },
      {
        id: 'div-trick-3',
        title: 'Trik Pembagian dengan 5 (Kali Dua Lalu Coret Nol)',
        badge: 'Trik Pintar',
        tagline: 'Daripada pusing membagi 5, gandakan dulu angkanya lalu bagi 10!',
        formula: 'N ÷ 5 = (N × 2) ÷ 10',
        explanation:
          'Membagi 5 itu sama saja dengan mengalikan 2 lalu membuang nolnya (dibagi 10). Jauh lebih cepat dikerjakan di kepala!',
        exampleProblem: {
          question: 'Hitung cepat: 140 ÷ 5 = ...',
          normalWay: 'Porogapit bersusun',
          speedTrickWay: '140 dikali 2 = 280. Buang nolnya ➔ 28!',
          stepExplanation: [
            'Gandakan angka 140: 140 × 2 = 280.',
            'Bagi 10 (hilangkan angka 0 terakhir): 280 ➔ 28.',
          ],
          result: '28',
        },
        practicePrompt: 'Coba di kepala: 45 ÷ 5 = ? (45 × 2 = 90 ➔ buang nol jadi 9)',
      },
    ],
  },
];

// ================= TEPAT 10 SOAL KUIS HITUNG CEPAT =================
export const SPEED_QUIZ_QUESTIONS: SpeedQuizQuestion[] = [
  {
    id: 'sq-1',
    operationType: 'tambah',
    question: 'Berapakah hasil dari penjumlahan cepat: 6 + 7 + 4 + 3?',
    options: ['18', '20', '22', '24'],
    correctAnswer: '20',
    mentalTrickName: 'Trik Teman 10',
    stepExplanation: 'Pasangkan teman 10: (6 + 4 = 10) dan (7 + 3 = 10). Total = 10 + 10 = 20!',
    speedTip: 'Cari angka yang kalau digabung jadi 10 dulu!',
  },
  {
    id: 'sq-2',
    operationType: 'tambah',
    question: 'Gunakan trik pembulatan untuk menghitung: 58 + 29 = ...',
    options: ['85', '87', '89', '77'],
    correctAnswer: '87',
    mentalTrickName: 'Trik Pembulatan (+30 lalu -1)',
    stepExplanation: 'Anggap 29 adalah 30: 58 + 30 = 88. Karena tadi kelebihan 1, kurangi 1: 88 - 1 = 87!',
    speedTip: 'Tambah 30 dulu di kepala, lalu mundur 1 langkah.',
  },
  {
    id: 'sq-3',
    operationType: 'kurang',
    question: 'Dengan trik lompat katak, hitung selisih dari: 63 - 38 = ...',
    options: ['23', '25', '27', '35'],
    correctAnswer: '25',
    mentalTrickName: 'Trik Lompat Katak',
    stepExplanation: 'Dari 38 lompat ke 40 (+2). Dari 40 lompat ke 63 (+23). Total lompatan = 2 + 23 = 25!',
    speedTip: 'Lompat ke puluhan terdekat dulu (38 ke 40).',
  },
  {
    id: 'sq-4',
    operationType: 'kurang',
    question: 'Gunakan trik "Semua dari 9, Terakhir dari 10" untuk: 1.000 - 365 = ...',
    options: ['635', '645', '735', '535'],
    correctAnswer: '635',
    mentalTrickName: 'Trik Semua 9 Terakhir 10',
    stepExplanation: '(9 - 3 = 6), (9 - 6 = 3), dan digit terakhir (10 - 5 = 5). Hasilnya = 635!',
    speedTip: 'Kurang 9 untuk angka depan, kurangi 10 hanya untuk angka paling belakang.',
  },
  {
    id: 'sq-5',
    operationType: 'kali',
    question: 'Gunakan trik sakti perkalian 9 untuk: 9 × 8 = ...',
    options: ['63', '72', '81', '74'],
    correctAnswer: '72',
    mentalTrickName: 'Trik Angka Pasangan 9',
    stepExplanation: 'Kurangi angka 8 dengan 1: 8 - 1 = 7. Pasangan 7 agar bernilai 9 adalah 2 (9 - 7 = 2). Gabungkan: 72!',
    speedTip: 'Digit pertama kurangi 1, digit kedua cari pasangannya ke 9.',
  },
  {
    id: 'sq-6',
    operationType: 'kali',
    question: 'Dengan trik bagi dua lalu tambah nol, hitung: 18 × 5 = ...',
    options: ['80', '85', '90', '95'],
    correctAnswer: '90',
    mentalTrickName: 'Trik Perkalian 5 (Separuh lalu Kali 10)',
    stepExplanation: 'Setengah dari 18 adalah 9 (18 ÷ 2 = 9). Tambahkan nol di belakangnya: 90!',
    speedTip: 'Cari setengah dari 18 dulu, lalu tempel 0.',
  },
  {
    id: 'sq-7',
    operationType: 'bagi',
    question: 'Hitung cepat pembagian 4: 92 ÷ 4 = ... (Gunakan trik separuh dari separuh)',
    options: ['21', '22', '23', '24'],
    correctAnswer: '23',
    mentalTrickName: 'Trik Bagi 4 (Setengah dari Setengah)',
    stepExplanation: 'Bagi dua pertama: 92 ÷ 2 = 46. Bagi dua kedua: 46 ÷ 2 = 23. Selesai!',
    speedTip: 'Bagi 2 dua kali berturut-turut.',
  },
  {
    id: 'sq-8',
    operationType: 'bagi',
    question: 'Gunakan trik coret nol kembar: 420 ÷ 70 = ...',
    options: ['5', '6', '7', '8'],
    correctAnswer: '6',
    mentalTrickName: 'Trik Coret Nol Kembar',
    stepExplanation: 'Coret 1 nol di kedua angka, tersisa: 42 ÷ 7 = 6!',
    speedTip: 'Hilangkan nolnya di kedua sisi agar angkanya kecil.',
  },
  {
    id: 'sq-9',
    operationType: 'campuran',
    question: 'Hitung di kepala: 25 × 4 - 30 = ...',
    options: ['60', '70', '80', '100'],
    correctAnswer: '70',
    mentalTrickName: 'Trik Uang Koin 25-an',
    stepExplanation: 'Ingat koin 25: ada 4 buah uang 25 bernilai 100 (25 × 4 = 100). Lalu 100 - 30 = 70!',
    speedTip: '25 × 4 itu 100!',
  },
  {
    id: 'sq-10',
    operationType: 'campuran',
    question: 'Berapakah hasil dari: (36 ÷ 6) × (50 ÷ 10)?',
    options: ['25', '30', '36', '40'],
    correctAnswer: '30',
    mentalTrickName: 'Kombinasi Bagi & Kali Cepat',
    stepExplanation: 'Kurung kiri: 36 ÷ 6 = 6. Kurung kanan: 50 ÷ 10 = 5. Sekarang kalikan keduanya: 6 × 5 = 30!',
    speedTip: 'Selesaikan kurung kiri dan kanan dulu baru kalikan.',
  },
];
