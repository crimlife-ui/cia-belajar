import type { ChapterId, ManipulativeType } from '../types';

export interface BimbelSection {
  id: string;
  title: string;
  badge?: string;
  content: string; // Markdown / formatted explanation
  subsections?: {
    subtitle: string;
    description: string;
    bulletPoints?: string[];
    formulaBox?: string;
    tableData?: {
      headers: string[];
      rows: string[][];
    };
  }[];
  bimbelTips?: string[];
  workedExamples: {
    question: string;
    conceptApplied: string;
    stepByStep: string[];
    finalAnswer: string;
  }[];
  manipulative?: ManipulativeType;
  manipulativeInitialValue?: any;
}

export interface BimbelChapterModule {
  chapterId: ChapterId;
  chapterNumber: number;
  title: string;
  subtitle: string;
  themeColor: {
    bg: string;
    border: string;
    text: string;
    accent: string;
    badge: string;
  };
  overview: string;
  learningCompetencies: string[]; // Capaian Pembelajaran (CP)
  sections: BimbelSection[];
  examSummaryPoints: string[]; // Rangkuman Kilat Ulangan Harian
}

export const BIMBEL_MODULES: BimbelChapterModule[] = [
  // ==================== BAB 1 ====================
  {
    chapterId: 'bab-1',
    chapterNumber: 1,
    title: 'Bilangan Cacah sampai 1.000',
    subtitle: 'Modul Bimbingan Belajar: Nilai Tempat, Operasi Hitung Susun, dan Perkalian',
    themeColor: {
      bg: 'bg-emerald-50',
      border: 'border-emerald-300',
      text: 'text-emerald-700',
      accent: 'bg-emerald-500 hover:bg-emerald-600',
      badge: 'bg-emerald-100 text-emerald-800',
    },
    overview:
      'Pada bab ini, anak dibimbing untuk memahami bilangan cacah hingga 1.000 secara konkret hingga simbolik, menguasai konsep nilai tempat ratusan-puluhan-satuan, membandingkan angka, teknik penjumlahan menyimpan, pengurangan meminjam, serta fondasi perkalian dan pembagian.',
    learningCompetencies: [
      'Membaca dan menulis lambang bilangan cacah sampai 1.000 dengan benar.',
      'Menentukan nilai tempat (ratusan, puluhan, satuan) dari suatu bilangan 3 digit.',
      'Membandingkan dua bilangan menggunakan tanda (<, =, >) dan mengurutkannya.',
      'Melakukan penjumlahan bersusun dengan teknik menyimpan hingga 1.000.',
      'Melakukan pengurangan bersusun dengan teknik meminjam hingga 1.000.',
      'Memahami perkalian sebagai penjumlahan berulang dan pembagian sebagai pengurangan berulang.',
    ],
    sections: [
      {
        id: 'b1-s1',
        title: '1. Mengenal Bilangan & Nilai Tempat (Ratusan, Puluhan, Satuan)',
        badge: 'Konsep Fondasi',
        content:
          'Setiap angka pada bilangan 3 angka memiliki nilai yang berbeda tergantung pada tempat posisinya. Posisi paling kanan adalah Satuan, posisi tengah adalah Puluhan, dan posisi paling kiri adalah Ratusan.',
        subsections: [
          {
            subtitle: 'Struktur Rumah Angka 3 Digit',
            description:
              'Mari kita bedah bilangan 475 sebagai contoh nyata penempatan nilai tempat:',
            tableData: {
              headers: ['Posisi', 'Nama Tempat', 'Angka', 'Nilai Sebenarnya', 'Bentuk Balok Dienes'],
              rows: [
                ['Paling Kiri', 'Ratusan', '4', '400', '4 lempeng besar (4 × 100)'],
                ['Tengah', 'Puluhan', '7', '70', '7 batang panjang (7 × 10)'],
                ['Paling Kanan', 'Satuan', '5', '5', '5 kubus kecil lepas (5 × 1)'],
              ],
            },
            formulaBox: 'Bentuk Panjang: 475 = 400 + 70 + 5 (Dibaca: Empat ratus tujuh puluh lima)',
          },
          {
            subtitle: 'Aturan Membaca Bilangan',
            description:
              'Perhatikan aturan khusus pada bilangan belasan dan puluhan yang sering membuat anak tertukar:',
            bulletPoints: [
              'Jika angka puluhan bernilai 1 (misal 14), dibaca "Empat belas", bukan "Sepuluh empat".',
              'Jika ada angka 0 di tengah (misal 508), dibaca "Lima ratus delapan" (puluhannya tidak perlu dibaca).',
              'Jika angka 100, dibaca "Seratus", bukan "Satu ratus".',
            ],
          },
        ],
        bimbelTips: [
          '🎯 Tips Kilat Bimbel: Ingat kata kunci "R-P-S" (Ratusan, Puluhan, Satuan) dari arah kiri ke kanan!',
          '🧱 Balok Dienes: 1 Lempeng = 10 Batang = 100 Kubus satuan.',
        ],
        workedExamples: [
          {
            question:
              'Sebuah perpustakaan sekolah memiliki buku bernomor 629. Berapakah nilai tempat dari angka 2, dan bagaimana bentuk panjangnya?',
            conceptApplied: 'Penguraian Nilai Tempat Bilangan Cacah',
            stepByStep: [
              'Identifikasi posisi setiap digit pada bilangan 629: Angka 6 di posisi Ratusan, Angka 2 di posisi Puluhan, Angka 9 di posisi Satuan.',
              'Karena angka 2 berada di tempat puluhan, maka nilainya adalah 2 × 10 = 20.',
              'Bentuk panjang dari 629 diuraikan menjadi: 600 + 20 + 9.',
            ],
            finalAnswer: 'Angka 2 menempati nilai PULUHAN (bernilai 20). Bentuk panjang: 600 + 20 + 9.',
          },
        ],
        manipulative: 'dienes',
        manipulativeInitialValue: { hundreds: 4, tens: 7, ones: 5 },
      },
      {
        id: 'b1-s2',
        title: '2. Membandingkan dan Mengurutkan Bilangan Ratusan',
        badge: 'Teknik Komparasi',
        content:
          'Untuk membandingkan dua bilangan yang terdiri dari 3 angka, jangan langsung menebak. Ikuti prosedur perbandingan sistematis dari nilai tempat tertinggi.',
        subsections: [
          {
            subtitle: 'Langkah Sistematis Membandingkan Dua Angka',
            description: 'Ikuti 3 tahapan berikut saat membandingkan bilangan:',
            bulletPoints: [
              'Tahap 1: Bandingkan angka RATUSAN-nya terlebih dahulu. Jika berbeda, angka dengan ratusan lebih besar langsung menang.',
              'Tahap 2: Jika angka ratusannya SAMA, bandingkan angka PULUHAN-nya.',
              'Tahap 3: Jika angka puluhannya juga SAMA, bandingkan angka SATUAN paling belakang.',
            ],
            formulaBox: 'Simbol Matematika: < (Lebih kecil dari) | > (Lebih besar dari) | = (Sama dengan)',
          },
        ],
        bimbelTips: [
          '🐊 Trik Mulut Buaya: Bayangkan tanda < dan > adalah mulut buaya lapar yang selalu membuka dan mencaplok angka yang LEBIH BESAR!',
          'Contoh: 350 < 420 (mulut buaya mengarah ke 420 yang lebih besar).',
        ],
        workedExamples: [
          {
            question: 'Urutkan bilangan-bilangan berikut dari yang TERKECIL ke TERBESAR: 542, 389, 524, 410',
            conceptApplied: 'Urutan Nilai Tempat Terendah ke Tertinggi',
            stepByStep: [
              'Langkah 1: Periksa angka ratusan dari tiap bilangan: 389 (ratusan 3), 410 (ratusan 4), 542 (ratusan 5), 524 (ratusan 5).',
              'Langkah 2: Angka 389 memiliki ratusan paling kecil (3) ➔ Letakkan di urutan ke-1.',
              'Langkah 3: Angka 410 memiliki ratusan 4 ➔ Letakkan di urutan ke-2.',
              'Langkah 4: Bandingkan 542 dan 524. Ratusannya sama (5), kita lihat puluhannya: 524 puluhannya 2, sedangkan 542 puluhannya 4. Maka 524 lebih kecil dari 542.',
            ],
            finalAnswer: 'Urutan dari terkecil: 389, 410, 524, 542.',
          },
        ],
      },
      {
        id: 'b1-s3',
        title: '3. Penjumlahan & Pengurangan Bersusun (Menyimpan & Meminjam)',
        badge: 'Operasi Inti',
        content:
          'Penjumlahan dan pengurangan bersusun pendek adalah metode paling efisien untuk menghitung angka ratusan tanpa membuat kesalahan hitung.',
        subsections: [
          {
            subtitle: 'A. Penjumlahan Bersusun dengan Teknik Menyimpan',
            description:
              'Aturan mutlak: Selalu mulai hitungan dari kolom paling kanan (SATUAN).',
            bulletPoints: [
              'Jika hasil penjumlahan satuan ≥ 10, tulis angka satuan di bawah, lalu simpan angka puluhan (angka 1) kecil di atas kolom puluhan.',
              'Saat menjumlahkan kolom puluhan, WAJIB menambahkan angka 1 simpanan tadi.',
            ],
            formulaBox: 'Contoh: 367 + 258\n• Satuan: 7 + 8 = 15 (Tulis 5, Simpan 1)\n• Puluhan: 1 (simpanan) + 6 + 5 = 12 (Tulis 2, Simpan 1)\n• Ratusan: 1 (simpanan) + 3 + 2 = 6\n➔ Hasil = 625',
          },
          {
            subtitle: 'B. Pengurangan Bersusun dengan Teknik Meminjam',
            description:
              'Jika angka atas lebih kecil dari angka bawah pada kolom yang sama, lakukan teknik pinjam ke tetangga kirinya.',
            bulletPoints: [
              'Jika satuan atas < satuan bawah: Pinjam 1 puluhan (bernilai 10) dari kolom puluhan di sebelahnya.',
              'Angka puluhan yang dipinjam berkurang 1, sedangkan satuan kita bertambah 10.',
            ],
          },
        ],
        bimbelTips: [
          '✏️ Tips Coret: Saat meminjam, langsung coret angka yang dipinjam dan tulis sisa barunya di atasnya agar tidak kelupaan saat menghitung kolom berikutnya!',
        ],
        workedExamples: [
          {
            question: 'Hitunglah pengurangan bersusun berikut: 532 - 178 = ...',
            conceptApplied: 'Pengurangan Bersusun Dua Kali Meminjam',
            stepByStep: [
              'Kolom Satuan: 2 - 8 (tidak bisa karena 2 < 8). Pinjam 1 puluhan dari 3. Angka 3 menjadi 2, sedangkan angka 2 menjadi 12 (10 + 2). Hitung: 12 - 8 = 4.',
              'Kolom Puluhan: Angka 3 tadi sudah menjadi 2. Hitung 2 - 7 (tidak bisa karena 2 < 7). Pinjam 1 ratusan dari 5. Angka 5 menjadi 4, sedangkan angka 2 menjadi 12. Hitung: 12 - 7 = 5.',
              'Kolom Ratusan: Angka 5 sudah menjadi 4. Hitung: 4 - 1 = 3.',
              'Gabungkan hasilnya: 354.',
            ],
            finalAnswer: '532 - 178 = 354',
          },
        ],
      },
      {
        id: 'b1-s4',
        title: '4. Konsep Perkalian & Pembagian Dasar',
        badge: 'Pengantar Aritmatika',
        content:
          'Perkalian dan pembagian bukanlah hafalan semata, melainkan konsep pengelompokan yang sangat teratur.',
        subsections: [
          {
            subtitle: 'Perkalian = Penjumlahan Berulang',
            description:
              'Rumus dasar: A × B artinya ada A kelompok yang masing-masing berisi B benda.',
            bulletPoints: [
              '3 × 4 artinya: 4 + 4 + 4 = 12 (Ada 3 kelompok angka 4).',
              'Beda arti: 3 × 4 ≠ 4 × 3 dalam konsep pengelompokan (walau hasilnya sama-sama 12). 3 × 4 = 4 + 4 + 4, sedangkan 4 × 3 = 3 + 3 + 3 + 3.',
            ],
          },
          {
            subtitle: 'Pembagian = Pengurangan Berulang Sampai Habis',
            description:
              'A ÷ B artinya: kurangkan A dengan B secara terus-menerus hingga hasilnya menjadi 0. Berapa kali pengurangan dilakukan, itulah jawabannya.',
            bulletPoints: [
              'Contoh: 15 ÷ 5 ➔ 15 - 5 - 5 - 5 = 0 (Terjadi 3 kali pengurangan dengan angka 5).',
              'Maka 15 ÷ 5 = 3.',
            ],
          },
        ],
        bimbelTips: [
          '⚡ Sifat Istimewa: Angka berapa pun jika dikali 0 hasilnya 0. Angka berapa pun jika dikali 1 hasilnya angka itu sendiri.',
        ],
        workedExamples: [
          {
            question:
              'Paman membawa 4 kantong plastik. Setiap kantong berisi 6 buah mangga. Berapa jumlah seluruh mangga yang dibawa Paman?',
            conceptApplied: 'Penerapan Konsep Perkalian Soal Cerita',
            stepByStep: [
              'Terdapat 4 kelompok (kantong).',
              'Setiap kelompok berisi 6 mangga.',
              'Bentuk matematika: 4 × 6 = 6 + 6 + 6 + 6.',
              'Hitung bertahap: 6 + 6 = 12; 12 + 6 = 18; 18 + 6 = 24.',
            ],
            finalAnswer: 'Jumlah seluruh mangga adalah 24 buah.',
          },
        ],
      },
    ],
    examSummaryPoints: [
      'Nilai Tempat 3 Angka berurutan dari kiri: Ratusan, Puluhan, Satuan.',
      'Bentuk panjang dari bilangan 782 adalah 700 + 80 + 2.',
      'Membandingkan dua bilangan selalu dimulai dari digit Ratusan paling kiri.',
      'Penjumlahan bersusun selalu dimulai dari SATUAN. Jika hasil ≥ 10, simpan puluhannya di kolom sebelah kiri.',
      'Perkalian A × B adalah penjumlahan berulang angka B sebanyak A kali.',
    ],
  },

  // ==================== BAB 2 ====================
  {
    chapterId: 'bab-2',
    chapterNumber: 2,
    title: 'Kalimat Matematika & Pola Bilangan',
    subtitle: 'Modul Bimbingan Belajar: Persamaan Dasar, Kotak Misteri, dan Pola Lompat',
    themeColor: {
      bg: 'bg-sky-50',
      border: 'border-sky-300',
      text: 'text-sky-700',
      accent: 'bg-sky-500 hover:bg-sky-600',
      badge: 'bg-sky-100 text-sky-800',
    },
    overview:
      'Pada bab ini, siswa diajak berpikir logis seperti detektif untuk menemukan nilai yang belum diketahui pada kalimat matematika, memahami prinsip keseimbangan tanda sama dengan (=), serta menganalisis pola barisan bilangan membesar dan mengecil.',
    learningCompetencies: [
      'Memahami arti tanda sama dengan (=) sebagai relasi kesetaraan / keseimbangan.',
      'Menentukan nilai yang belum diketahui dalam kalimat matematika penjumlahan dan pengurangan.',
      'Mengidentifikasi aturan pola bilangan loncat membesar (bertambah).',
      'Mengidentifikasi aturan pola bilangan loncat mengecil (berkurang).',
      'Melanjutkan pola barisan bilangan sampai 4 suku berikutnya.',
    ],
    sections: [
      {
        id: 'b2-s1',
        title: '1. Kalimat Matematika & Mencari Bilangan Misteri (⬜)',
        badge: 'Aljabar Dasar',
        content:
          'Tanda sama dengan (=) bukan hanya tanda untuk menuliskan hasil jawaban, tetapi menyatakan bahwa nilai di sebelah KIRI harus sama persis nilainya dengan sebelah KANAN (seperti neraca timbangan yang seimbang).',
        subsections: [
          {
            subtitle: 'Rumus Rahasia Mencari Kotak Misteri',
            description:
              'Gunakan operasi hitung kebalikan (invers) untuk membongkar isi kotak misteri:',
            bulletPoints: [
              'Kasus 1: Penjumlahan (A + ⬜ = C) ➔ ⬜ = C - A (Kurangkan hasil total dengan angka yang diketahui).',
              'Kasus 2: Pengurangan Depan (⬜ - B = C) ➔ ⬜ = C + B (Jumlahkan sisa dengan angka pengurang).',
              'Kasus 3: Pengurangan Belakang (A - ⬜ = C) ➔ ⬜ = A - C (Kurangkan angka awal dengan hasil sisa).',
            ],
            formulaBox: 'Rumus Cepat:\n• 150 + ⬜ = 350 ➔ ⬜ = 350 - 150 = 200\n• ⬜ - 40 = 110 ➔ ⬜ = 110 + 40 = 150\n• 200 - ⬜ = 130 ➔ ⬜ = 200 - 130 = 70',
          },
        ],
        bimbelTips: [
          '⚖️ Analogi Neraca: Bayangkan sebuah neraca. Jika lengan kanan punya beban 300 gram, dan lengan kiri baru ada 120 gram, maka beban misteri yang dibutuhkan adalah selisihnya: 300 - 120 = 180 gram!',
        ],
        workedExamples: [
          {
            question: 'Di toko buku ada persediaan pensil: ⬜ + 75 = 250. Berapakah nilai ⬜?',
            conceptApplied: 'Invers Penjumlahan pada Kalimat Matematika',
            stepByStep: [
              'Kalimat matematika: Suatu angka jika ditambah 75 menghasilkan 250.',
              'Gunakan kebalikan dari penjumlahan, yaitu pengurangan.',
              'Hitung: 250 - 75 bersusun:',
              'Satuan: 0 - 5 (pinjam 1 dari 5) ➔ 10 - 5 = 5.',
              'Puluhan: 4 - 7 (pinjam 1 dari 2) ➔ 14 - 7 = 7.',
              'Ratusan: 2 sisa 1 ➔ 1 - 0 = 1.',
              'Hasilnya: 175.',
            ],
            finalAnswer: 'Nilai ⬜ adalah 175.',
          },
        ],
        manipulative: 'balance',
        manipulativeInitialValue: { left: 75, right: 250, unknown: 'left' },
      },
      {
        id: 'b2-s2',
        title: '2. Analisis Pola Bilangan Loncat (Membesar & Mengecil)',
        badge: 'Logika Barisan',
        content:
          'Pola bilangan adalah susunan angka yang memiliki aturan lompatan teratur dari satu angka ke angka berikutnya.',
        subsections: [
          {
            subtitle: 'Cara Menentukan Aturan Pola',
            description:
              'Langkah pertama selalu mencari SELISIH antara dua angka pertama yang berdampingan:',
            bulletPoints: [
              'Jika angka semakin besar ➔ Pola Penjumlahan (+) atau Perkalian.',
              'Jika angka semakin kecil ➔ Pola Pengurangan (-) atau Pembagian.',
              'Uji aturan tersebut pada pasangan angka berikutnya untuk memastikan polanya konsisten.',
            ],
            tableData: {
              headers: ['Contoh Barisan', 'Arah Pola', 'Selisih / Aturan', '2 Angka Selanjutnya'],
              rows: [
                ['12, 16, 20, 24, ...', 'Membesar', 'Selalu Bertambah 4 (+4)', '28, 32'],
                ['105, 115, 125, ...', 'Membesar', 'Selalu Bertambah 10 (+10)', '135, 145'],
                ['90, 80, 70, 60, ...', 'Mengecil', 'Selalu Berkurang 10 (-10)', '50, 40'],
                ['300, 270, 240, ...', 'Mengecil', 'Selalu Berkurang 30 (-30)', '210, 180'],
              ],
            },
          },
        ],
        bimbelTips: [
          '🐸 Jembatan Keledai: Anggap angka seperti daun teratai di danau. Hitung berapa langkah katak melompat dari teratai ke-1 ke teratai ke-2!',
        ],
        workedExamples: [
          {
            question: 'Lengkapi dua angka berikutnya dari pola bilangan berikut: 210, 225, 240, ..., ...',
            conceptApplied: 'Mencari Beda Pola Barisan Aritmatika',
            stepByStep: [
              'Langkah 1: Hitung selisih antara suku pertama dan kedua: 225 - 210 = +15.',
              'Langkah 2: Uji ke suku ketiga: 225 + 15 = 240 (Cocok!). Jadi aturan polanya adalah "Bertambah 15".',
              'Langkah 3: Hitung suku keempat: 240 + 15 = 255.',
              'Langkah 4: Hitung suku kelima: 255 + 15 = 270.',
            ],
            finalAnswer: 'Dua angka berikutnya adalah 255 dan 270.',
          },
        ],
      },
    ],
    examSummaryPoints: [
      'Tanda sama dengan (=) menyatakan nilai sisi kiri harus sama dengan sisi kanan.',
      'Untuk mencari A + ⬜ = C, gunakan rumus ⬜ = C - A.',
      'Untuk mencari ⬜ - B = C, gunakan rumus ⬜ = C + B.',
      'Aturan pola bilangan dicari dengan menghitung selisih antara dua angka yang bersebelahan.',
    ],
  },

  // ==================== BAB 3 ====================
  {
    chapterId: 'bab-3',
    chapterNumber: 3,
    title: 'Pengukuran Panjang dan Berat',
    subtitle: 'Modul Bimbingan Belajar: Mistar Penggaris, Konversi Satuan, dan Timbangan',
    themeColor: {
      bg: 'bg-amber-50',
      border: 'border-amber-300',
      text: 'text-amber-700',
      accent: 'bg-amber-500 hover:bg-amber-600',
      badge: 'bg-amber-100 text-amber-800',
    },
    overview:
      'Pada bab ini, siswa mempelajari alat ukur baku yang digunakan dalam kehidupan sehari-hari, cara membaca skala mistar penggaris dengan akurat, tangga konversi satuan panjang (m, cm, mm), serta satuan berat (kg, gram) beserta pembacaan jarum timbangan.',
    learningCompetencies: [
      'Mengenal dan memilih alat ukur panjang dan berat yang sesuai dengan benda yang diukur.',
      'Membaca hasil pengukuran panjang menggunakan penggaris mulai dari titik 0 cm.',
      'Mengonversi satuan panjang baku: meter (m) ke sentimeter (cm) dan sebaliknya.',
      'Membaca skala jarum pada timbangan dapur dan timbangan badan.',
      'Mengonversi satuan berat baku: kilogram (kg) ke gram (g) dan sebaliknya.',
    ],
    sections: [
      {
        id: 'b3-s1',
        title: '1. Pengukuran Panjang (Mistar, Sentimeter, dan Milimeter)',
        badge: 'Pengukuran Nyata',
        content:
          'Pengukuran panjang yang akurat memerlukan alat ukur baku. Penggaris adalah alat ukur baku untuk benda-benda berukuran sedang hingga kecil.',
        subsections: [
          {
            subtitle: 'Kaidah Emas Menggunakan Penggaris',
            description:
              'Banyak anak membuat kesalahan dengan meletakkan benda di tepi ujung kayu penggaris. Ini salah!',
            bulletPoints: [
              'Aturan Wajib: Letakkan ujung pangkal benda tepat lurus di GARIS ANGKA 0, bukan di ujung fisik penggaris.',
              'Garis panjang dengan angka menandakan Sentimeter (cm).',
              'Garis-garis kecil di antara angka menandakan Milimeter (mm). Setiap 1 cm terdiri dari 10 mm.',
            ],
            formulaBox: 'Konversi Satuan Panjang Utama:\n• 1 meter (m) = 100 sentimeter (cm)\n• 1 sentimeter (cm) = 10 milimeter (mm)\n• 1 meter (m) = 1.000 milimeter (mm)',
          },
          {
            subtitle: 'Memilih Alat Ukur yang Tepat',
            description: 'Sesuaikan alat ukur dengan benda yang akan diukur:',
            tableData: {
              headers: ['Nama Alat Ukur', 'Benda yang Tepat Diukur', 'Karakteristik Alat'],
              rows: [
                ['Penggaris Mistar (30 cm)', 'Pensil, buku, penghapus, kotak pensil', 'Kaku, lurus, bahan plastik/besi'],
                ['Meteran Pita / Jahit', 'Lingkar pinggang, panjang kain, baju', 'Lentur, bisa ditekuk melingkar'],
                ['Meteran Rol Saku', 'Panjang meja, pintu, jendela kelas', 'Bisa ditarik panjang hingga 5 meter'],
              ],
            },
          },
        ],
        bimbelTips: [
          '📏 Jembatan Keledai: Dari METER ke SENTIMETER turun 2 tangga = KALIKAN 100 (tambahkan dua buah angka nol di belakangnya!). Misal 4 m = 400 cm.',
        ],
        workedExamples: [
          {
            question:
              'Ayah memotong kayu sepanjang 2 meter lebih 45 cm. Berapa sentimeter panjang kayu tersebut seluruhnya?',
            conceptApplied: 'Konversi Gabungan Satuan Meter dan Sentimeter',
            stepByStep: [
              'Kayu terdiri dari dua bagian: 2 meter dan 45 cm.',
              'Ubah bagian meter menjadi sentimeter: 2 m = 2 × 100 cm = 200 cm.',
              'Jumlahkan dengan sisa 45 cm: 200 cm + 45 cm = 245 cm.',
            ],
            finalAnswer: 'Panjang kayu seluruhnya adalah 245 cm.',
          },
        ],
        manipulative: 'ruler',
        manipulativeInitialValue: { lengthCm: 14, objectName: 'Pensil Kayu' },
      },
      {
        id: 'b3-s2',
        title: '2. Pengukuran Berat (Kilogram, Gram, dan Membaca Timbangan)',
        badge: 'Satuan Massa',
        content:
          'Berat benda menyatakan seberapa berat muatan suatu benda. Satuan baku berat yang paling sering digunakan adalah kilogram (kg) dan gram (g).',
        subsections: [
          {
            subtitle: 'Konversi Satuan Berat Baku',
            description:
              'Hubungan mendasar antara kilogram dan gram sangat mudah dipelajari:',
            formulaBox: 'Rumus Konversi Berat:\n• 1 kilogram (kg) = 1.000 gram (g)\n• 1/2 kilogram (kg) = 500 gram (g)\n• 1 kilogram (kg) = 10 ons (1 ons = 100 gram)',
          },
          {
            subtitle: 'Cara Membaca Jarum Timbangan Dapur',
            description:
              'Jarum timbangan bergerak memutar searah jarum jam saat diberi beban di atas wadahnya:',
            bulletPoints: [
              'Pastikan sebelum ditimbang jarum tepat menunjuk angka 0.',
              'Setiap strip garis kecil di antara 0 dan 100 g biasanya bernilai 10 g atau 20 g.',
              'Garis tengah di antara 500 g dan 600 g bernilai tepat 550 gram.',
            ],
          },
        ],
        bimbelTips: [
          '⚖️ Tips Bimbel: 1 kg itu seribu gram (ada 3 angka nol). Kalau belanja 3 kg gula pasir, berarti beratnya 3.000 gram!',
        ],
        workedExamples: [
          {
            question:
              'Ibu membuat kue. Ibu membutuhkan tepung terigu 1 kg 500 gram. Jika tepung ditimbang dalam satuan gram saja, berapa gram total tepung terigu tersebut?',
            conceptApplied: 'Konversi Gabungan Kilogram dan Gram',
            stepByStep: [
              'Ubah 1 kg menjadi gram: 1 kg = 1.000 gram.',
              'Tambahkan dengan 500 gram yang sudah ada: 1.000 g + 500 g = 1.500 gram.',
            ],
            finalAnswer: 'Total tepung terigu adalah 1.500 gram.',
          },
        ],
      },
    ],
    examSummaryPoints: [
      'Pengukuran dengan penggaris WAJIB dimulai dari garis angka 0 (nol).',
      '1 meter (m) = 100 sentimeter (cm).',
      '1 sentimeter (cm) = 10 milimeter (mm).',
      '1 kilogram (kg) = 1.000 gram (g).',
      'Nilai tengah antara 400 g dan 500 g pada timbangan adalah 450 gram.',
    ],
  },

  // ==================== BAB 4 ====================
  {
    chapterId: 'bab-4',
    chapterNumber: 4,
    title: 'Unsur-Unsur Bangun Datar',
    subtitle: 'Modul Bimbingan Belajar: Garis, Sudut, Sisi, dan Karakteristik Geometri',
    themeColor: {
      bg: 'bg-purple-50',
      border: 'border-purple-300',
      text: 'text-purple-700',
      accent: 'bg-purple-500 hover:bg-purple-600',
      badge: 'bg-purple-100 text-purple-800',
    },
    overview:
      'Pada bab ini, siswa diajak memahami geometri bidang datar: perbedaan garis dan ruas garis, macam-macam sudut (siku-siku, lancip, tumpul), serta menghitung unsur pembentuk bangun datar seperti jumlah sisi dan titik sudut.',
    learningCompetencies: [
      'Membedakan garis lurus, kurva lengkung, dan ruas garis.',
      'Mengidentifikasi dan mengelompokkan jenis sudut (siku-siku, lancip, tumpul).',
      'Menghitung jumlah sisi dan titik sudut pada bangun datar segitiga, segi empat, dan lingkaran.',
      'Membedakan ciri khas spesifik antara persegi dan persegi panjang.',
    ],
    sections: [
      {
        id: 'b4-s1',
        title: '1. Mengenal Jenis-Jenis Sudut',
        badge: 'Geometri Sudut',
        content:
          'Sudut terbentuk dari pertemuan dua ruas garis lurus pada satu titik persekutuan yang dinamakan titik sudut.',
        subsections: [
          {
            subtitle: 'Tiga Macam Sudut Utama',
            description:
              'Berdasarkan besar bukaannya dibandingkan dengan sudut siku-siku:',
            tableData: {
              headers: ['Jenis Sudut', 'Besar Sudut', 'Bentuk Visual', 'Contoh Benda Nyata'],
              rows: [
                ['Sudut Siku-Siku', 'Tepat 90° (Tegak lurus)', 'Membentuk huruf "L" tegak', 'Pojok buku, sudut pintu, bingkai foto'],
                ['Sudut Lancip', 'Kurang dari 90° (< 90°)', 'Lebih runcing / sempit', 'Ujung pensil, potongan pizza, ujung gunting'],
                ['Sudut Tumpul', 'Lebih dari 90° (> 90°)', 'Lebih terbuka / lebar', 'Atap rumah joglo, laptop terbuka lebar'],
              ],
            },
            formulaBox: 'Patokan Sudut: Sudut Siku-Siku (90°) adalah patokan utama. Lebih sempit = LANCIP, lebih lebar = TUMPUL.',
          },
        ],
        bimbelTips: [
          '📐 Uji Pojok Kertas: Anak bisa melipat kertas HVS menjadi siku-siku 90°. Tempelkan pada sudut meja atau buku untuk membuktikan sudut siku-siku!',
        ],
        workedExamples: [
          {
            question: 'Jarum jam dinding menunjukkan tepat pukul 09.00. Jenis sudut apakah yang terbentuk antara jarum pendek dan jarum panjang?',
            conceptApplied: 'Menentukan Jenis Sudut pada Jam Dinding',
            stepByStep: [
              'Pada pukul 09.00, jarum pendek menunjuk angka 9 (mendatar ke kiri).',
              'Jarum panjang menunjuk angka 12 (tegak lurus ke atas).',
              'Dua jarum tersebut saling tegak lurus membentuk huruf "L" terbalik dengan sudut tepat 90 derajat.',
            ],
            finalAnswer: 'Sudut yang terbentuk adalah SUDUT SIKU-SIKU (90°).',
          },
        ],
        manipulative: 'shape',
        manipulativeInitialValue: { shape: 'rectangle' },
      },
      {
        id: 'b4-s2',
        title: '2. Ciri-Ciri & Karakteristik Bangun Datar',
        badge: 'Sifat Bangun Datar',
        content:
          'Bangun datar adalah bangun dua dimensi yang dibatasi oleh garis lurus atau garis lengkung.',
        subsections: [
          {
            subtitle: 'Tabel Komparasi Unsur Bangun Datar',
            description: 'Pelajari perbedaan jumlah sisi, titik sudut, dan sifat khasnya:',
            tableData: {
              headers: ['Nama Bangun', 'Jumlah Sisi', 'Jumlah Titik Sudut', 'Sifat Khas Utama'],
              rows: [
                ['Segitiga', '3 sisi', '3 titik sudut', 'Dibatasi 3 garis lurus'],
                ['Persegi (Bujur Sangkar)', '4 sisi', '4 titik sudut', 'Semua 4 sisinya SAMA PANJANG dan 4 sudut siku-siku'],
                ['Persegi Panjang', '4 sisi', '4 titik sudut', 'Sisi yang berhadapan sama panjang dan 4 sudut siku-siku'],
                ['Lingkaran', '1 sisi lengkung', '0 (tidak ada)', 'Tidak memiliki titik sudut sama sekali'],
              ],
            },
            formulaBox: 'Perbedaan Utama Persegi vs Persegi Panjang:\n• Persegi: Sisi atas = bawah = kiri = kanan (semua sama).\n• Persegi Panjang: Sisi panjang (atas/bawah) beda ukuran dengan sisi lebar (kiri/kanan).',
          },
        ],
        bimbelTips: [
          '💡 Trik Hafalan Cepat: Jumlah sisi pada poligon selalu sama dengan jumlah titik sudutnya (Segitiga: 3 sisi & 3 sudut; Segi empat: 4 sisi & 4 sudut)!',
        ],
        workedExamples: [
          {
            question:
              'Sebuah taplak meja berbentuk segi empat dengan panjang setiap sisinya adalah 50 cm, dan keempat sudutnya siku-siku. Apa nama bangun datar taplak meja tersebut?',
            conceptApplied: 'Identifikasi Sifat Khusus Persegi',
            stepByStep: [
              'Bangun memiliki 4 sisi.',
              'Semua sisinya memiliki panjang yang sama yaitu 50 cm.',
              'Keempat sudutnya siku-siku (90°).',
              'Bangun segi empat dengan 4 sisi sama panjang dan 4 sudut siku-siku adalah persegi.',
            ],
            finalAnswer: 'Taplak meja tersebut berbentuk PERSEGI.',
          },
        ],
      },
    ],
    examSummaryPoints: [
      'Sudut siku-siku besarnya tepat 90 derajat (tegak lurus).',
      'Sudut lancip lebih kecil dari 90°, sudut tumpul lebih besar dari 90°.',
      'Segitiga memiliki 3 sisi dan 3 titik sudut.',
      'Persegi memiliki 4 sisi sama panjang dan 4 sudut siku-siku.',
      'Lingkaran hanya memiliki 1 sisi lengkung dan tidak memiliki titik sudut.',
    ],
  },

  // ==================== BAB 5 ====================
  {
    chapterId: 'bab-5',
    chapterNumber: 5,
    title: 'Penyajian Data dalam Tabel',
    subtitle: 'Modul Bimbingan Belajar: Turus (Tally Marks), Tabel Frekuensi, dan Piktogram',
    themeColor: {
      bg: 'bg-rose-50',
      border: 'border-rose-300',
      text: 'text-rose-700',
      accent: 'bg-rose-500 hover:bg-rose-600',
      badge: 'bg-rose-100 text-rose-800',
    },
    overview:
      'Pada bab ini, siswa diajak menjadi peneliti cilik yang mengumpulkan data di lingkungan sekitar, mencatat data menggunakan garis turus berikat 5, menyusun tabel frekuensi, serta membaca dan menginterpretasikan diagram gambar (piktogram).',
    learningCompetencies: [
      'Mengumpulkan data sederhana melalui pencatatan langsung atau wawancara.',
      'Menuliskan turus (tally marks) dengan aturan pengikatan kelompok 5.',
      'Menyajikan data mentah ke dalam tabel frekuensi yang rapi.',
      'Membaca informasi penting dari tabel (data terbanyak, tersedikit, selisih, dan total).',
      'Membaca diagram gambar (piktogram) dengan memperhatikan skala kunci per gambar.',
    ],
    sections: [
      {
        id: 'b5-s1',
        title: '1. Pengumpulan Data & Penulisan Turus (Tally Marks)',
        badge: 'Metode Pencatatan',
        content:
          'Turus adalah teknik kuno yang sangat efisien untuk menghitung barang secara langsung tanpa ada yang terlewat.',
        subsections: [
          {
            subtitle: 'Aturan Standar Menulis Garis Turus',
            description:
              'Turus dikelompokkan dalam ikatan lima agar memudahkan penjumlahan cepat loncat 5:',
            bulletPoints: [
              'Hitungan 1 sampai 4: Buat garis tegak lurus satu per satu ( | , || , ||| , |||| ).',
              'Hitungan ke-5: Tarik garis miring menyilang dari kiri atas ke kanan bawah mengikat keempat garis tegak tadi (menjadi 1 ikat penuh bernilai 5).',
              'Hitungan ke-6: Mulai ikatan baru di sampingnya dengan 1 garis tegak baru.',
            ],
            formulaBox: 'Cara Hitung Cepat:\nJika ada 3 ikat penuh + 2 garis tegak:\nTotal = (3 × 5) + 2 = 15 + 2 = 17!',
          },
        ],
        bimbelTips: [
          '⚡ Menghitung Cepat: Jangan hitung garis satu per satu! Hitung kelipatan 5 untuk setiap ikatan: 5, 10, 15, 20... lalu tambahkan sisanya.',
        ],
        workedExamples: [
          {
            question:
              'Hasil voting pemilihan ketua kelas menunjukkan data turus untuk Dika: terdapat 4 ikat penuh dan 3 garis tegak. Berapa suara yang diperoleh Dika?',
            conceptApplied: 'Penghitungan Nilai Turus Berikat 5',
            stepByStep: [
              '1 ikat penuh turus bernilai 5 suara.',
              '4 ikat penuh = 4 × 5 = 20 suara.',
              'Tambahkan 3 garis tegak lepas = 20 + 3 = 23 suara.',
            ],
            finalAnswer: 'Dika memperoleh 23 suara.',
          },
        ],
        manipulative: 'tally',
        manipulativeInitialValue: { count: 23 },
      },
      {
        id: 'b5-s2',
        title: '2. Membaca Tabel Frekuensi & Diagram Gambar (Piktogram)',
        badge: 'Interpretasi Data',
        content:
          'Setelah data dicatat dengan turus, data dipindahkan ke dalam tabel frekuensi dan piktogram agar mudah dibaca orang lain.',
        subsections: [
          {
            subtitle: 'Contoh Membaca Tabel Data Buah Favorit',
            description: 'Perhatikan contoh tabel data buah kegemaran 30 siswa kelas 3:',
            tableData: {
              headers: ['Nama Buah', 'Turus', 'Frekuensi (Jumlah Siswa)'],
              rows: [
                ['Apel', '4 ikat + 0', '8 anak'],
                ['Jeruk', '2 ikat + 2', '12 anak (Paling Banyak/Modus)'],
                ['Pisang', '1 ikat + 1', '6 anak (Paling Sedikit)'],
                ['Semangka', '0 ikat + 4', '4 anak'],
              ],
            },
          },
          {
            subtitle: 'Waspada Kunci Skala pada Piktogram (Diagram Gambar)',
            description:
              'Piktogram menggunakan gambar untuk mewakili jumlah data. SELALU periksa tulisan kunci di bawah diagram!',
            bulletPoints: [
              'Contoh Kunci: "1 gambar bintang mewakili 3 buku tulis".',
              'Jika ada 5 gambar bintang di baris Cia, maka buku Cia adalah 5 × 3 = 15 buku, BUKAN 5 buku!',
            ],
          },
        ],
        bimbelTips: [
          '🔍 Trik Ujian: Soal diagram gambar sering menjebak siswa yang lupa mengalikan dengan kunci gambar. Tandai tulisan "Kunci: 1 gambar = X" dengan stabilo atau lingkaran!',
        ],
        workedExamples: [
          {
            question:
              'Pada diagram gambar peminjaman buku perpustakaan: Hari Senin terdapat 6 gambar buku. Keterangan kunci: "1 gambar mewakili 5 buku yang dipinjam". Berapa banyak buku yang dipinjam pada hari Senin?',
            conceptApplied: 'Perhitungan Piktogram Berdasarkan Skala Kunci',
            stepByStep: [
              'Lihat jumlah simbol gambar: ada 6 simbol buku.',
              'Lihat nilai kunci: 1 simbol = 5 buku.',
              'Kalikan jumlah simbol dengan nilai kunci: 6 × 5 = 30.',
            ],
            finalAnswer: 'Buku yang dipinjam pada hari Senin adalah 30 buku.',
          },
        ],
      },
    ],
    examSummaryPoints: [
      '1 ikat penuh garis turus bernilai 5.',
      'Frekuensi adalah angka yang menunjukkan banyaknya data suatu kategori.',
      'Data terbanyak adalah data dengan angka frekuensi paling tinggi.',
      'Pada piktogram, wajib mengalikan jumlah gambar dengan keterangan kunci skala diagram.',
    ],
  },
];
