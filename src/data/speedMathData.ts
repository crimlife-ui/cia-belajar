export interface VisualStep {
  title: string;
  explanation: string;
  mathVisual: string;
  badgeColor?: string;
}

export interface InteractiveMiniPractice {
  question: string;
  hint: string;
  options: (string | number)[];
  correctAnswer: string | number;
  explanation: string;
}

export interface SpeedTrick {
  id: string;
  title: string;
  badge: string;
  tagline: string;
  childAnalogy: string;
  kikoHint: string;
  formula: string;
  explanation: string;
  visualHelperType?: 'friends-table' | 'number-line-jump' | 'finger-trick-9' | 'split-watermelon' | 'zero-cutter' | 'cross-star-3digit';
  exampleProblem: {
    question: string;
    normalWay: string;
    speedTrickWay: string;
    visualSteps: VisualStep[];
    result: string;
  };
  miniPractice: InteractiveMiniPractice;
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
  childStory: string;
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
  // =========================================================================
  // 1. PENJUMLAHAN CEPAT (+)
  // =========================================================================
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
      'Lupakan menghitung jari satu-satu yang lama! Dengan trik teman 10, pembulatan, dan pecah puluhan, menjumlahkan angka puluhan dan ratusan bisa selesai dalam 3 detik!',
    childStory:
      'Bayangkan angka-angka ini seperti kepingan puzzle lego. Kalau kita pasangkan balok yang pas, tingginya langsung genap 10 atau 100 tanpa perlu dihitung berulang-ulang!',
    tricks: [
      {
        id: 'add-trick-1',
        title: 'Trik Pasangan Sahabat "Teman 10" & "Teman 100"',
        badge: 'Sahabat Paling Karib',
        tagline: 'Cari angka sahabat yang kalau digabung langsung klik jadi 10 atau 100!',
        childAnalogy:
          'Sama seperti dua tangan kita (5 jari kiri + 5 jari kanan = 10 jari). Angka 7 sahabat sejatinya adalah 3, angka 8 sahabatnya adalah 2. Kalau ketemu sahabatnya, langsung jadi 10!',
        kikoHint:
          'Kiko selalu mencari angka yang pasangannya jadi 10 dulu! (1 pasang 9, 2 pasang 8, 3 pasang 7, 4 pasang 6, 5 pasang 5).',
        formula: '1+9=10 | 2+8=10 | 3+7=10 | 4+6=10 | 5+5=10',
        explanation:
          'Otak kita paling cepat menjumlahkan angka bulat berakhiran nol. Saat melihat deretan penjumlahan yang panjang, jangan hitung urut dari kiri ke kanan. Lompat dan pasangkan sahabatnya dulu!',
        visualHelperType: 'friends-table',
        exampleProblem: {
          question: 'Berapakah 7 + 8 + 3 + 2?',
          normalWay: '7 + 8 = 15, lalu 15 + 3 = 18, lalu 18 + 2 = 20 (Lama & melelahkan)',
          speedTrickWay: '(7 + 3) + (8 + 2) = 10 + 10 = 20 (Selesai 2 detik!)',
          visualSteps: [
            {
              title: 'Langkah 1: Temukan Pasangan Sahabat 10',
              explanation: 'Lihat angka 7 dan 3 berteman menghasilkan 10. Angka 8 dan 2 juga berteman menghasilkan 10.',
              mathVisual: '✨ (7 + 3 = 10) dan (8 + 2 = 10)',
              badgeColor: 'bg-emerald-100 text-emerald-800',
            },
            {
              title: 'Langkah 2: Gabungkan Dua Kantong 10',
              explanation: 'Tinggal jumlahkan dua angka bulat yang sudah didapat.',
              mathVisual: '✨ 10 + 10 = 20',
              badgeColor: 'bg-emerald-500 text-white',
            },
          ],
          result: '20',
        },
        miniPractice: {
          question: 'Hitung di kepala: 6 + 9 + 4 + 1 = ...',
          hint: 'Pasangkan 6 dengan 4, dan 9 dengan 1!',
          options: ['18', '20', '22', '24'],
          correctAnswer: '20',
          explanation: '(6 + 4 = 10) ditambah (9 + 1 = 10) ➔ 10 + 10 = 20!',
        },
      },
      {
        id: 'add-trick-2',
        title: 'Trik Pinjam 1 Dulu (Genapkan ke Puluhan Terdekat)',
        badge: 'Trik Angka 9 dan 8',
        tagline: 'Jika ada angka berakhiran 9 atau 8, pinjamkan angka biar bulat ke atas!',
        childAnalogy:
          'Bayangkan kamu punya 29 kelereng. Tinggal pinjam 1 kelereng dari temanmu, jadilah 30 kelereng bulat! Setelah selesai dihitung, kembalikan 1 kelereng tadi.',
        kikoHint:
          'Menjumlahkan dengan angka 30 jauh lebih santai daripada angka 29. Anggap 30 dulu, nanti di ujung tinggal dikurang 1!',
        formula: 'N + 29 = (N + 30) - 1   |   N + 19 = (N + 20) - 1',
        explanation:
          'Menghitung 47 + 30 sangat gampang di kepala (yaitu 77). Karena angka aslinya 29 (kurang 1 dari 30), maka hasil 77 tinggal dikurangi 1 menjadi 76.',
        exampleProblem: {
          question: 'Hitung cepat di kepala: 47 + 29 = ...',
          normalWay: '47 + 29 susun ke bawah: 7 + 9 = 16, tulis 6 simpan 1, 1+4+2=7 (Butuh coret kertas)',
          speedTrickWay: 'Ubah 29 jadi 30: 47 + 30 = 77, lalu 77 - 1 = 76!',
          visualSteps: [
            {
              title: 'Langkah 1: Genapkan Angka 29 Jadi 30',
              explanation: 'Angka 29 butuh 1 agar jadi 30 yang bulat.',
              mathVisual: '29 ➔ diubah sementara jadi (+ 30)',
              badgeColor: 'bg-amber-100 text-amber-900',
            },
            {
              title: 'Langkah 2: Jumlahkan ke Angka Puluhan',
              explanation: '47 ditambah 30 sangat mudah karena hanya puluhan yang bertambah (40+30=70).',
              mathVisual: '47 + 30 = 77',
              badgeColor: 'bg-sky-100 text-sky-900',
            },
            {
              title: 'Langkah 3: Kembalikan 1 yang Dipinjam',
              explanation: 'Karena tadi melebihkan 1, sekarang kurangi 1 dari 77.',
              mathVisual: '77 - 1 = 76 (Hasil Akhir)',
              badgeColor: 'bg-emerald-500 text-white',
            },
          ],
          result: '76',
        },
        miniPractice: {
          question: 'Hitung cepat: 54 + 19 = ...',
          hint: 'Anggap 19 adalah 20: 54 + 20 = 74, lalu kurangi 1!',
          options: ['71', '72', '73', '74'],
          correctAnswer: '73',
          explanation: '54 + 20 = 74. Lalu kembalikan 1: 74 - 1 = 73!',
        },
      },
      {
        id: 'add-trick-3',
        title: 'Trik Pecah Puluhan & Satuan (Hitung Kiri ke Kanan)',
        badge: 'Rahasia Mental Math',
        tagline: 'Di kepala, hitung puluhannya terlebih dahulu, baru satuannya!',
        childAnalogy:
          'Bayangkan koper besar isi uang ratusan dan kantong kecil isi uang receh. Kamu pasti menghitung koper uang besar dulu baru recehnya!',
        kikoHint:
          'Di sekolah diajarkan hitung dari kanan (satuan dulu). Tapi di kepala tanpa kertas, hitung puluhan di kiri jauh lebih mudah diingat!',
        formula: '(Puluhan + Puluhan) + (Satuan + Satuan)',
        explanation:
          'Ketika kamu menghitung 53 + 34, pecah menjadi (50 + 30) dan (3 + 4). Otakmu menyimpan angka 80, lalu tinggal tempel angka 7 jadi 87!',
        exampleProblem: {
          question: 'Hitung cepat di kepala: 63 + 25 = ...',
          normalWay: 'Membayangkan susun ke bawah 3+5=8, lalu 6+2=8',
          speedTrickWay: '(60 + 20 = 80) ditambah (3 + 5 = 8) ➔ 88!',
          visualSteps: [
            {
              title: 'Langkah 1: Gabungkan Nilai Puluhan (Kiri)',
              explanation: 'Ambil angka 60 dari 63 dan angka 20 dari 25.',
              mathVisual: '60 + 20 = 80',
              badgeColor: 'bg-blue-100 text-blue-900',
            },
            {
              title: 'Langkah 2: Gabungkan Nilai Satuan (Kanan)',
              explanation: 'Ambil sisa satuannya yaitu 3 dan 5.',
              mathVisual: '3 + 5 = 8',
              badgeColor: 'bg-purple-100 text-purple-900',
            },
            {
              title: 'Langkah 3: Satukan Keduanya',
              explanation: 'Satukan puluhan dan satuan yang sudah dihitung.',
              mathVisual: '80 + 8 = 88',
              badgeColor: 'bg-emerald-500 text-white',
            },
          ],
          result: '88',
        },
        miniPractice: {
          question: 'Hitung di kepala: 42 + 36 = ...',
          hint: '(40 + 30 = 70) dan (2 + 6 = 8)',
          options: ['76', '78', '80', '82'],
          correctAnswer: '78',
          explanation: 'Puluhan: 40 + 30 = 70. Satuan: 2 + 6 = 8. Gabung: 78!',
        },
      },
    ],
  },

  // =========================================================================
  // 2. PENGURANGAN CEPAT (-)
  // =========================================================================
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
      'Pengurangan sering bikin pusing karena harus pinjam angka ke sebelah. Dengan trik lompat katak dan trik semua 9 terakhir 10, kamu tidak perlu pinjam-meminjam lagi!',
    childStory:
      'Pengurangan itu sebenarnya bukan cuma soal memotong, tapi tentang mencari JARAK! Katak Kiko bisa melompat maju di atas batu-batu angka dengan sangat gembira!',
    tricks: [
      {
        id: 'sub-trick-1',
        title: 'Trik Lompat Katak di Garis Bilangan (Menghitung Maju)',
        badge: 'Pengganti Meminjam',
        tagline: 'Jangan mundur meminjam! Melompatlah maju dari angka kecil ke angka besar!',
        childAnalogy:
          'Katak Kiko berdiri di batu angka 48 dan ingin ke batu angka 73. Katak melompat dulu 2 langkah ke batu 50, lalu melompat 23 langkah ke batu 73. Total lompatan = 25 langkah!',
        kikoHint:
          'Daripada 73 - 48 pusing pinjam 1, hitung saja: dari 48 butuh berapa langkah ke 50? (2 langkah). Dari 50 ke 73 berapa? (23 langkah). 2 + 23 = 25!',
        formula: 'A - B = (B ke Puluhan) + (Puluhan ke A)',
        explanation:
          'Pengurangan adalah selisih jarak. Berangkat dari angka pengurang, lompat ke puluhan terdekat, lalu lompat ke angka tujuan. Jumlahkan lompatannya!',
        visualHelperType: 'number-line-jump',
        exampleProblem: {
          question: 'Berapakah selisih: 73 - 48?',
          normalWay: '3 kurangi 8 tidak bisa, pinjam 1 dari 7 jadi 13 - 8 = 5, sisa 6 - 4 = 2 (Mudah salah)',
          speedTrickWay: '48 lompat ke 50 (+2). Lalu 50 lompat ke 73 (+23). Hasilnya 2 + 23 = 25!',
          visualSteps: [
            {
              title: 'Lompatan 1: Dari 48 ke Puluhan Terdekat (50)',
              explanation: 'Dari 48 menuju batu 50 butuh 2 langkah kecil.',
              mathVisual: '🐸 48 ➔ 50 (+2 langkah)',
              badgeColor: 'bg-amber-100 text-amber-900',
            },
            {
              title: 'Lompatan 2: Dari 50 ke Angka Tujuan (73)',
              explanation: 'Dari 50 menuju batu tujuan 73 butuh 23 langkah besar.',
              mathVisual: '🐸 50 ➔ 73 (+23 langkah)',
              badgeColor: 'bg-sky-100 text-sky-900',
            },
            {
              title: 'Lompatan Total: Gabungkan Jarak',
              explanation: 'Jumlahkan kedua lompatan si katak.',
              mathVisual: '✨ 2 + 23 = 25 (Jarak / Selisih)',
              badgeColor: 'bg-emerald-500 text-white',
            },
          ],
          result: '25',
        },
        miniPractice: {
          question: 'Hitung dengan lompat katak: 82 - 59 = ...',
          hint: 'Dari 59 lompat ke 60 (+1), lalu 60 ke 82 (+22)!',
          options: ['21', '22', '23', '25'],
          correctAnswer: '23',
          explanation: '1 langkah ke 60 + 22 langkah ke 82 = 23!',
        },
      },
      {
        id: 'sub-trick-2',
        title: 'Trik Rahasia "Semua dari 9, Terakhir dari 10"',
        badge: 'Pengurangan 100 & 1.000',
        tagline: 'Trik ajaib mengurangi dari angka 1.000 atau 100 tanpa ribet mencoret nol!',
        childAnalogy:
          'Bayangkan mantra ajaib pembuka brankas: Semua angka di depan kamu kurangkan dari 9, dan HANYA angka paling ekor (belakang) yang kamu kurangkan dari 10!',
        kikoHint:
          'Angka nol beruntun di 1.000 sering bikin coretan jadi kotor. Pakai mantra Kiko: 9, 9, 10! Kurangkan tiap angka dengan mantra itu!',
        formula: '1.000 - ABC ➔ (9 - A) (9 - B) (10 - C)',
        explanation:
          'Saat mengurangi 1.000 dengan angka 3 digit (misal 364), kurangi ratusan dari 9 (9-3=6), puluhan dari 9 (9-6=3), dan satuan dari 10 (10-4=6). Hasilnya langsung 636!',
        exampleProblem: {
          question: 'Hitung kilat: 1.000 - 468 = ...',
          normalWay: 'Pinjam berantai: 1.000 coret jadi 990 jadi 999...',
          speedTrickWay: '(9 - 4 = 5), (9 - 6 = 3), (10 - 8 = 2) ➔ Langsung tulis 532!',
          visualSteps: [
            {
              title: 'Digit Ratusan: Kurangkan dari 9',
              explanation: 'Angka pertama 4 dikurangkan dari 9.',
              mathVisual: '9 - 4 = 5',
              badgeColor: 'bg-rose-100 text-rose-900',
            },
            {
              title: 'Digit Puluhan: Kurangkan dari 9',
              explanation: 'Angka kedua 6 dikurangkan dari 9.',
              mathVisual: '9 - 6 = 3',
              badgeColor: 'bg-amber-100 text-amber-900',
            },
            {
              title: 'Digit Terakhir: Kurangkan dari 10',
              explanation: 'Khusus angka paling belakang 8, kurangkan dari 10.',
              mathVisual: '10 - 8 = 2',
              badgeColor: 'bg-emerald-100 text-emerald-900',
            },
            {
              title: 'Gabungkan Semua Digit Menjadi Hasil',
              explanation: 'Tulis ketiga angka secara berjejer dari depan ke belakang.',
              mathVisual: '✨ 532 (Selesai tanpa mencoret nol!)',
              badgeColor: 'bg-emerald-500 text-white',
            },
          ],
          result: '532',
        },
        miniPractice: {
          question: 'Berapakah 1.000 - 325 menggunakan mantra 9-9-10?',
          hint: '(9-3=6), (9-2=7), (10-5=5)',
          options: ['675', '685', '775', '665'],
          correctAnswer: '675',
          explanation: '9-3=6, 9-2=7, 10-5=5. Hasilnya 675!',
        },
      },
      {
        id: 'sub-trick-3',
        title: 'Trik Geser Seimbang (Timbangan Kiri-Kanan)',
        badge: 'Trik Keseimbangan',
        tagline: 'Tambahkan angka yang sama di kedua bilangan agar pengurangnya jadi angka bulat!',
        childAnalogy:
          'Seperti bermain jungkat-jungkit bersama teman. Kalau kamu naikkan berat badanmu 1 kg dan temanmu juga naik 1 kg, selisih berat kalian tetap sama persis!',
        kikoHint:
          'Kalau melihat angka 29 atau 38 di bagian belakang, tambahkan 1 atau 2 biar jadi puluhan genap 30 atau 40. Tapi ingat, angka depan juga harus ditambah yang sama ya!',
        formula: 'A - B = (A + K) - (B + K)',
        explanation:
          'Daripada menghitung 83 - 29 (angka 29 tidak bulat), tambahkan 1 ke kedua bilangan: (83+1) - (29+1) = 84 - 30. Mengurangi 30 sangat mudah: hasilnya 54!',
        exampleProblem: {
          question: 'Hitung di kepala: 83 - 39 = ...',
          normalWay: '3 kurangi 9 pinjam 1... (Rentan keliru)',
          speedTrickWay: 'Tambah 1 ke dua-duanya: (83 + 1) - (39 + 1) = 84 - 40 = 44!',
          visualSteps: [
            {
              title: 'Langkah 1: Tambahkan 1 ke Pengurang (39 + 1 = 40)',
              explanation: 'Agar 39 berubah menjadi angka bulat yang ramah di kepala yaitu 40.',
              mathVisual: '39 + 1 = 40 (Angka bulat tercapai)',
              badgeColor: 'bg-indigo-100 text-indigo-900',
            },
            {
              title: 'Langkah 2: Tambahkan 1 juga ke Angka Depan (83 + 1 = 84)',
              explanation: 'Keseimbangan harus dijaga agar selisih tidak berubah.',
              mathVisual: '83 + 1 = 84',
              badgeColor: 'bg-sky-100 text-sky-900',
            },
            {
              title: 'Langkah 3: Kurangkan dengan Mudah',
              explanation: '84 dikurangi 40 tinggal kurangi puluhannya: 80 - 40 = 40, tempel 4 = 44.',
              mathVisual: '84 - 40 = 44',
              badgeColor: 'bg-emerald-500 text-white',
            },
          ],
          result: '44',
        },
        miniPractice: {
          question: 'Hitung cepat dengan geser seimbang: 75 - 28 = ...',
          hint: 'Tambah 2 ke dua-duanya: (75 + 2) - (28 + 2) = 77 - 30!',
          options: ['45', '47', '49', '51'],
          correctAnswer: '47',
          explanation: '(75 + 2) - (28 + 2) = 77 - 30 = 47!',
        },
      },
    ],
  },

  // =========================================================================
  // 3. PERKALIAN CEPAT (×)
  // =========================================================================
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
      'Perkalian tidak perlu dihafal mati seperti robot! Ada trik jari ajaib untuk angka 9, trik bagi dua untuk perkalian 5, dan trik sulap gandakan bagi dua yang seru banget!',
    childStory:
      'Di negeri matematika, angka 5 dan angka 9 punya kekuatan super. Jari tanganmu adalah kalkulator ajaib yang bisa menghitung perkalian 9 dalam sekejap!',
    tricks: [
      {
        id: 'mul-trick-1',
        title: 'Trik Jari Ajaib & Pasangan 9 (Sulap Angka 9)',
        badge: 'Kalkulator di Jarimu',
        tagline: 'Digit depan adalah (Angka - 1), digit belakang adalah pasangannya ke 9!',
        childAnalogy:
          'Bentangkan 10 jarimu di depan wajah! Kalau ingin 9 × 4, tekuk jari ke-4 dari kiri. Di sebelah kiri jari tekuk ada 3 jari (puluhan), di sebelah kanan ada 6 jari (satuan). Hasilnya = 36!',
        kikoHint:
          'Setiap hasil kali 9 pasti kalau digitnya dijumlahkan hasilnya 9! Contoh: 9×2=18 (1+8=9), 9×5=45 (4+5=9), 9×7=63 (6+3=9). Keren kan?',
        visualHelperType: 'finger-trick-9',
        formula: '9 × N ➔ Digit Puluhan = (N - 1), Digit Satuan = (9 - Puluhan)',
        explanation:
          'Untuk 9 × 7: kurangi 7 dengan 1 menjadi 6 (ini puluhan). Lalu cari berapa yang dibutuhkan angka 6 agar jadi 9? Jawabannya 3 (ini satuan). Gabung jadi 63!',
        exampleProblem: {
          question: 'Berapakah hasil dari: 9 × 7?',
          normalWay: 'Menjumlahkan 7 sebanyak 9 kali (7+7+7+7+7+7+7+7+7) yang memakan waktu',
          speedTrickWay: '7 dikurang 1 = 6. Pasangan 6 agar jadi 9 adalah 3. Hasilnya = 63!',
          visualSteps: [
            {
              title: 'Langkah 1: Kurangi Angka Pengali dengan 1',
              explanation: 'Ambil angka 7, lalu kurangkan 1 untuk mendapatkan digit kepala (puluhan).',
              mathVisual: '7 - 1 = 6 (Digit Puluhan)',
              badgeColor: 'bg-amber-100 text-amber-900',
            },
            {
              title: 'Langkah 2: Cari Teman 9 untuk Digit Ekor',
              explanation: 'Hitung berapa kekurangan dari angka 6 agar genap bernilai 9.',
              mathVisual: '9 - 6 = 3 (Digit Satuan)',
              badgeColor: 'bg-sky-100 text-sky-900',
            },
            {
              title: 'Langkah 3: Tempelkan Kedua Digit',
              explanation: 'Satukan angka kepala 6 dan ekor 3.',
              mathVisual: '✨ 63 (Selesai dalam 1 detik)',
              badgeColor: 'bg-emerald-500 text-white',
            },
          ],
          result: '63',
        },
        miniPractice: {
          question: 'Gunakan trik jari 9 untuk: 9 × 8 = ...',
          hint: 'Digit depan: 8 - 1 = 7. Digit belakang: 9 - 7 = 2!',
          options: ['63', '72', '81', '74'],
          correctAnswer: '72',
          explanation: '8 - 1 = 7, lalu pasangannya adalah 2. Jadi 72!',
        },
      },
      {
        id: 'mul-trick-2',
        title: 'Trik Perkalian 5 Kilat (Bagi 2 Lalu Tambah Nol)',
        badge: 'Trik Paling Cepat',
        tagline: 'Mengalikan 5 sama saja dengan mencari setengahnya lalu kali 10!',
        childAnalogy:
          'Bayangkan kamu punya uang Rp 500. Angka 5 itu kan separuh dari 10. Jadi kalau ada angka dikali 5, belah saja angkanya jadi dua (separuh), lalu beri nol di belakangnya!',
        kikoHint:
          'Jika angkanya genap, belah jadi dua! Contoh 24 × 5: separuh dari 24 adalah 12, lalu tempel 0 jadi 120. Cepat banget kan?',
        formula: 'N × 5 = (N ÷ 2) × 10',
        explanation:
          'Karena 5 = 10 ÷ 2, maka perkalian dengan angka genap cukup dibagi 2 terlebih dahulu, baru dikalikan 10 (cukup tempel angka nol).',
        exampleProblem: {
          question: 'Hitung cepat di kepala: 18 × 5 = ...',
          normalWay: 'Susun ke bawah: 8 × 5 = 40 simpan 4, 1 × 5 + 4 = 9 ➔ 90',
          speedTrickWay: 'Setengah dari 18 adalah 9. Tempelkan angka nol ➔ 90!',
          visualSteps: [
            {
              title: 'Langkah 1: Cari Setengah dari Angka (Bagi 2)',
              explanation: 'Ambil angka 18 lalu cari separuhnya.',
              mathVisual: '18 ÷ 2 = 9',
              badgeColor: 'bg-blue-100 text-blue-900',
            },
            {
              title: 'Langkah 2: Kalikan 10 (Tempelkan Nol)',
              explanation: 'Beri angka 0 di sebelah angka 9.',
              mathVisual: '9 ➔ tempel 0 ➔ 90',
              badgeColor: 'bg-emerald-500 text-white',
            },
          ],
          result: '90',
        },
        miniPractice: {
          question: 'Berapakah 26 × 5 di kepala?',
          hint: 'Bagi 2 angka 26 (jadi 13), lalu tempelkan 0!',
          options: ['120', '125', '130', '135'],
          correctAnswer: '130',
          explanation: 'Setengah dari 26 adalah 13. Tempel 0 menjadi 130!',
        },
      },
      {
        id: 'mul-trick-3',
        title: 'Trik Sulap Gandakan & Bagi Dua (Doubling & Halving)',
        badge: 'Trik Pesulap Angka',
        tagline: 'Kecilkan satu angka dengan bagi 2, besarkan angka lainnya dengan kali 2!',
        childAnalogy:
          'Sulap matematika! Ada dua kotak kelereng. Kamu ambil setengah dari kotak kiri, lalu gandakan isi kotak kanan. Jumlah keseluruhannya tetap sama, tapi sekarang jauh lebih mudah dihitung!',
        kikoHint:
          'Kalau ketemu angka belasan ketemu angka 5 atau 15 (seperti 16 × 15), langsung belah 16 jadi 8, dan gandakan 15 jadi 30. Tinggal hitung 8 × 30 = 240!',
        formula: 'A × B = (A ÷ 2) × (B × 2)',
        explanation:
          'Saat salah satu angka genap dan angka lainnya kelipatan 5, bagi dua angka genap tersebut dan kalikan dua angka yang lain sehingga menghasilkan angka bulat puluhan.',
        exampleProblem: {
          question: 'Hitung cepat: 14 × 15 = ...',
          normalWay: 'Perkalian bersusun dua tingkat yang panjang di kertas',
          speedTrickWay: 'Bagi dua 14 jadi 7. Gandakan 15 jadi 30. Hitung 7 × 30 = 210!',
          visualSteps: [
            {
              title: 'Langkah 1: Bagi Dua Angka Genap',
              explanation: 'Ambil angka 14 lalu bagi 2.',
              mathVisual: '14 ÷ 2 = 7',
              badgeColor: 'bg-amber-100 text-amber-900',
            },
            {
              title: 'Langkah 2: Kalikan Dua Angka Lainnya',
              explanation: 'Ambil angka 15 lalu kali 2 agar menjadi puluhan bulat.',
              mathVisual: '15 × 2 = 30',
              badgeColor: 'bg-sky-100 text-sky-900',
            },
            {
              title: 'Langkah 3: Kalikan Hasil Barunya',
              explanation: 'Sekarang tinggal hitung 7 dikali 30 (7 × 3 = 21 lalu beri nol).',
              mathVisual: '7 × 30 = 210',
              badgeColor: 'bg-emerald-500 text-white',
            },
          ],
          result: '210',
        },
        miniPractice: {
          question: 'Hitung cepat: 12 × 15 = ...',
          hint: 'Bagi dua 12 jadi 6, kali dua 15 jadi 30. Lalu 6 × 30!',
          options: ['160', '170', '180', '190'],
          correctAnswer: '180',
          explanation: '(12 ÷ 2) × (15 × 2) = 6 × 30 = 180!',
        },
      },
      {
        id: 'mul-trick-4',
        title: 'Trik Bintang Silang 5 Langkah: Perkalian 3 Digit Angka Sembarang (Edu-Vid)',
        badge: 'Trik Super Master 🌟',
        tagline: 'Perkalian 3 angka sembarang selesai dalam 1 baris saja dengan 5 formasi bintang!',
        childAnalogy:
          'Formasi 5 Jurus Bintang Ninja: 1. Lurus Kanan (|) ➔ 2. Silang Kecil Kanan (X) ➔ 3. Bintang Besar 6 Arah (*) ➔ 4. Silang Kecil Kiri (X) ➔ 5. Lurus Kiri (|)! Sekali jalan langsung dapat jawabannya!',
        kikoHint:
          'Kuncinya: hafalkan bentuk polanya (| ➔ X ➔ * ➔ X ➔ |). Hitung dari kanan ke kiri. Tulis digit satuannya, lalu simpan puluhannya untuk langkah berikutnya!',
        formula: 'Pola 5 Langkah: (|) Satuan | (X) Puluhan-Satuan | (*) Bintang 3 Digit | (X) Ratusan-Puluhan | (|) Ratusan',
        explanation:
          'Metode perkalian silang (Vedic Math) dari Edu-Vid untuk mengalikan dua bilangan 3 digit tanpa membuat susun 3 baris yang panjang. Cukup kerjakan 5 langkah dari kanan ke kiri.',
        visualHelperType: 'cross-star-3digit',
        exampleProblem: {
          question: 'Berapakah hasil dari: 213 × 124?',
          normalWay: 'Perkalian susun 3 tingkat yang panjang (213×4, lalu 213×20, lalu 213×100, dijumlahkan bertumpuk-tumpuk)',
          speedTrickWay: 'Pola (| X * X |): 3×4=12 (tulis 2 simpan 1) ➔ (1×4)+(3×2)+1=11 (tulis 1 simpan 1) ➔ (2×4)+(3×1)+(1×2)+1=14 (tulis 4 simpan 1) ➔ (2×2)+(1×1)+1=6 ➔ 2×1=2. Hasil: 26.412!',
          visualSteps: [
            {
              title: 'Jurus 1: (|) Lurus Kanan (Satuan × Satuan)',
              explanation: 'Kalikan angka paling belakang: 3 × 4 = 12. Tulis angka 2 di hasil paling belakang, lalu simpan 1 di kepala.',
              mathVisual: '3 × 4 = 12 ➔ Tulis [2], Simpan (1)',
              badgeColor: 'bg-emerald-100 text-emerald-900',
            },
            {
              title: 'Jurus 2: (X) Silang Kecil Kanan (Puluhan & Satuan)',
              explanation: 'Silangkan dua digit belakang: (1 × 4) + (3 × 2) = 4 + 6 = 10. Tambah simpanan 1 tadi ➔ 10 + 1 = 11. Tulis 1, simpan 1.',
              mathVisual: '(1×4) + (3×2) + (1) = 4 + 6 + 1 = 11 ➔ Tulis [1], Simpan (1)',
              badgeColor: 'bg-amber-100 text-amber-900',
            },
            {
              title: 'Jurus 3: (*) Bintang Besar 6 Arah (Ratusan-Satuan + Tengah)',
              explanation: 'Ujung kali ujung ditambah tengah kali tengah: (2 × 4) + (3 × 1) + (1 × 2) = 8 + 3 + 2 = 13. Tambah simpanan 1 ➔ 13 + 1 = 14. Tulis 4, simpan 1.',
              mathVisual: '(2×4) + (3×1) + (1×2) + (1) = 8 + 3 + 2 + 1 = 14 ➔ Tulis [4], Simpan (1)',
              badgeColor: 'bg-purple-100 text-purple-900',
            },
            {
              title: 'Jurus 4: (X) Silang Kecil Kiri (Ratusan & Puluhan)',
              explanation: 'Silangkan dua digit depan: (2 × 2) + (1 × 1) = 4 + 1 = 5. Tambah simpanan 1 ➔ 5 + 1 = 6. Tulis 6 (tidak ada simpanan).',
              mathVisual: '(2×2) + (1×1) + (1) = 4 + 1 + 1 = 6 ➔ Tulis [6]',
              badgeColor: 'bg-sky-100 text-sky-900',
            },
            {
              title: 'Jurus 5: (|) Lurus Kiri (Ratusan × Ratusan)',
              explanation: 'Kalikan angka paling depan: 2 × 1 = 2. Tulis angka 2 di hasil paling depan. Selesai!',
              mathVisual: '2 × 1 = 2 ➔ Tulis [2] ➔ Hasil Utuh: 26.412 ✨',
              badgeColor: 'bg-emerald-500 text-white',
            },
          ],
          result: '26.412',
        },
        miniPractice: {
          question: 'Hitung digit terakhir dari 232 × 124 menggunakan Jurus 1 (|): Satuan × Satuan (2 × 4) = ...',
          hint: 'Kalikan angka paling belakang: 2 × 4!',
          options: ['6', '8', '10', '12'],
          correctAnswer: '8',
          explanation: 'Lurus kanan: 2 × 4 = 8! Digit terakhir dari 232 × 124 adalah 8 (hasil lengkap 28.768).',
        },
      },
    ],
  },

  // =========================================================================
  // 4. PEMBAGIAN CEPAT (÷)
  // =========================================================================
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
      'Pembagian bukan hal yang menakutkan! Dengan trik belah dua kali (bagi 4), trik coret nol kembar, dan trik kali dua bagi 10, pembagian jadi semudah memotong kue ulang tahun!',
    childStory:
      'Membagi itu seperti berbagi kue donat dengan teman-temanmu secara adil. Kalau dibagi 4, kita potong kuenya jadi dua bagian dulu, lalu tiap bagian dipotong jadi dua lagi!',
    tricks: [
      {
        id: 'div-trick-1',
        title: 'Trik Belah Semangka Dua Kali (Pembagian dengan 4)',
        badge: 'Paling Sering Dipakai',
        tagline: 'Membagi 4 sama artinya dengan mencari separuh dari separuhnya!',
        childAnalogy:
          'Bayangkan kamu punya 1 buah semangka bulat besar. Potong jadi 2 (dapat 2 potong besar). Lalu masing-masing dipotong jadi 2 lagi. Taraa! Sekarang jadi 4 potong semangka yang pas!',
        kikoHint:
          'Daripada porogapit bersusun panjang dibagi 4, bagi 2 dulu angkanya di kepala, lalu hasilnya bagi 2 sekali lagi!',
        visualHelperType: 'split-watermelon',
        formula: 'N ÷ 4 = (N ÷ 2) ÷ 2',
        explanation:
          'Membagi 4 adalah melakukan pembagian dua sebanyak dua tahap. Otak kita sangat lincah membagi angka genap dengan dua.',
        exampleProblem: {
          question: 'Berapakah 92 ÷ 4 di kepala?',
          normalWay: 'Porogapit bersusun 92 dibagi 4: 9 bagi 4 dapat 2 sisa 1 turunkan 2 jadi 12...',
          speedTrickWay: 'Setengah dari 92 adalah 46. Setengah dari 46 adalah 23. Selesai!',
          visualSteps: [
            {
              title: 'Langkah 1: Bagi 2 Tahap Pertama (Belahan Pertama)',
              explanation: 'Cari separuh dari angka 92 (pecah: 90 jadi 45, 2 jadi 1 ➔ 46).',
              mathVisual: '92 ÷ 2 = 46',
              badgeColor: 'bg-amber-100 text-amber-900',
            },
            {
              title: 'Langkah 2: Bagi 2 Tahap Kedua (Belahan Kedua)',
              explanation: 'Cari separuh dari angka 46 (40 jadi 20, 6 jadi 3 ➔ 23).',
              mathVisual: '46 ÷ 2 = 23',
              badgeColor: 'bg-sky-100 text-sky-900',
            },
            {
              title: 'Hasil Akhir',
              explanation: 'Kamu sudah membagi dua kali, artinya sudah dibagi 4!',
              mathVisual: '✨ 23',
              badgeColor: 'bg-emerald-500 text-white',
            },
          ],
          result: '23',
        },
        miniPractice: {
          question: 'Hitung di kepala: 84 ÷ 4 = ...',
          hint: 'Separuh dari 84 adalah 42. Separuh dari 42 adalah ...?',
          options: ['20', '21', '22', '24'],
          correctAnswer: '21',
          explanation: '84 ÷ 2 = 42, lalu 42 ÷ 2 = 21!',
        },
      },
      {
        id: 'div-trick-2',
        title: 'Trik Pedang Pemotong Nol Kembar',
        badge: 'Angka Puluhan & Ratusan',
        tagline: 'Tebas jumlah nol yang sama di angka kiri dan kanan sebelum membagi!',
        childAnalogy:
          'Bayangkan kamu punya pedang sakti pemotong nol! Kalau angka di kiri punya satu nol dan angka di kanan punya satu nol, tebas kedua nol itu bersamaan agar angkanya jadi imut dan gampang dihitung!',
        kikoHint:
          'Kuncinya: harus adil! Kalau tebas 1 nol di kiri, tebas 1 nol juga di kanan. Jangan tebas lebih ya!',
        visualHelperType: 'zero-cutter',
        formula: 'A00 ÷ B0 = A0 ÷ B   |   A0 ÷ B0 = A ÷ B',
        explanation:
          'Ketika angka yang dibagi dan angka pembagi sama-sama memiliki angka 0 di belakangnya, kita bisa menyederhanakannya dengan menghilangkan nol dalam jumlah yang sama.',
        exampleProblem: {
          question: 'Berapakah 450 ÷ 50?',
          normalWay: 'Menghitung 450 dibagi 50 dengan porogapit besar',
          speedTrickWay: 'Coret 1 nol di 450 dan 50 ➔ Tersisa 45 ÷ 5 = 9!',
          visualSteps: [
            {
              title: 'Langkah 1: Tebas Nol Kembar di Kiri dan Kanan',
              explanation: 'Angka 450 punya satu 0 di ekor, angka 50 juga punya satu 0 di ekor. Coret keduanya!',
              mathVisual: '450 ÷ 50 ➔ Coret 0 jadi 45 ÷ 5',
              badgeColor: 'bg-rose-100 text-rose-900',
            },
            {
              title: 'Langkah 2: Bagi Angka Kecil yang Tersisa',
              explanation: 'Sekarang soalnya menjadi sangat sederhana, cukup hafalan dasar perkalian 5.',
              mathVisual: '45 ÷ 5 = 9',
              badgeColor: 'bg-emerald-500 text-white',
            },
          ],
          result: '9',
        },
        miniPractice: {
          question: 'Hitung kilat: 480 ÷ 60 = ...',
          hint: 'Coret nolnya sehingga tersisa 48 ÷ 6!',
          options: ['6', '7', '8', '9'],
          correctAnswer: '8',
          explanation: 'Coret nol kembar menjadi 48 ÷ 6 = 8!',
        },
      },
      {
        id: 'div-trick-3',
        title: 'Trik Pembagian 5 Kilat (Gandakan Lalu Buang Nol)',
        badge: 'Trik Super Pintar',
        tagline: 'Daripada bingung membagi 5, gandakan dulu angkanya (kali 2) lalu bagi 10!',
        childAnalogy:
          'Membagi 5 itu seperti membagi kado ke 5 teman. Sulapnya: gandakan dulu kadonya jadi dua kali lipat, lalu tinggal geser atau buang angka nolnya!',
        kikoHint:
          'Karena membagi 10 itu sangat gampang (tinggal buang nol), kita kalikan dua dulu angkanya! Contoh: 140 dikali 2 jadi 280, buang nolnya jadi 28!',
        formula: 'N ÷ 5 = (N × 2) ÷ 10',
        explanation:
          'Membagi dengan 5 sama dengan mengalikan dengan 2 lalu membaginya dengan 10. Menghitung dua kali lipat suatu angka di kepala jauh lebih mudah daripada membaginya dengan 5.',
        exampleProblem: {
          question: 'Hitung cepat: 130 ÷ 5 = ...',
          normalWay: 'Porogapit bersusun 130 dibagi 5',
          speedTrickWay: '130 dikali 2 = 260. Buang angka nol di belakang ➔ 26!',
          visualSteps: [
            {
              title: 'Langkah 1: Gandakan Angka (Kali 2)',
              explanation: 'Ambil angka 130 lalu lipatkan dua (100 jadi 200, 30 jadi 60 ➔ 260).',
              mathVisual: '130 × 2 = 260',
              badgeColor: 'bg-sky-100 text-sky-900',
            },
            {
              title: 'Langkah 2: Bagi 10 (Buang Nol Terakhir)',
              explanation: 'Hilangkan satu angka nol di paling belakang dari 260.',
              mathVisual: '260 buang nol ➔ 26',
              badgeColor: 'bg-emerald-500 text-white',
            },
          ],
          result: '26',
        },
        miniPractice: {
          question: 'Berapakah 120 ÷ 5 di kepala?',
          hint: 'Kalikan dua: 120 × 2 = 240, lalu buang nolnya!',
          options: ['22', '24', '25', '26'],
          correctAnswer: '24',
          explanation: '120 × 2 = 240. Buang nolnya menjadi 24!',
        },
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
    operationType: 'kali',
    question: 'Dengan Trik Bintang Silang 5 Langkah (Edu-Vid), berapakah digit terakhir dari 213 × 124?',
    options: ['1', '2', '3', '4'],
    correctAnswer: '2',
    mentalTrickName: 'Trik Bintang Silang (Jurus 1: Satuan × Satuan)',
    stepExplanation: 'Jurus 1 (|): Satuan × Satuan yaitu 3 × 4 = 12. Digit paling belakangnya adalah 2 (simpan 1). Hasil akhirnya adalah 26.412!',
    speedTip: 'Kalikan angka paling belakang: 3 × 4 = 12 ➔ digit akhirnya 2!',
  },
];
