export interface SpokExample {
  sentence: string;
  subjek: string;
  predikat: string;
  objek: string;
  keterangan: string;
  keteranganType: 'tempat' | 'waktu';
}

export interface WordPair {
  word: string;
  synonym: string;
  antonym: string;
  meaning: string;
}

export interface BahasaTopic {
  id: string;
  title: string;
  badge: string;
  icon: string;
  summary: string;
  keyPoints: {
    title: string;
    description: string;
    examples?: string[];
    icon?: string;
  }[];
  mimiTip: string;
  spokExamples?: SpokExample[];
  wordPairs?: WordPair[];
  storySnippet?: {
    title: string;
    author: string;
    text: string;
    characters: { name: string; trait: string }[];
    setting: string;
    moralMessage: string;
  };
}

export interface BahasaQuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  chapterTitle: string;
}

export interface BahasaChapter {
  id: string;
  chapterNumber: number;
  title: string;
  subtitle: string;
  badge: string;
  icon: string;
  themeColor: {
    bg: string;
    border: string;
    text: string;
    accent: string;
    gradient: string;
  };
  topics: BahasaTopic[];
}

export const BAHASA_CHAPTERS: BahasaChapter[] = [
  // =========================================================================
  // BAB 1: KOSAKATA, SINONIM & ANTONIM
  // =========================================================================
  {
    id: 'bahasa-bab-1',
    chapterNumber: 1,
    title: 'Kosakata, Sinonim & Antonim',
    subtitle: 'Mengenal Kosakata Baru, Kata Baku, Persamaan Kata & Lawan Kata',
    badge: 'Kaya Kosakata',
    icon: '📖',
    themeColor: {
      bg: 'bg-amber-50',
      border: 'border-amber-200',
      text: 'text-amber-900',
      accent: 'bg-amber-500',
      gradient: 'from-amber-500 to-yellow-600',
    },
    topics: [
      {
        id: 'sinonim-antonim-baku',
        title: 'Persamaan & Lawan Kata',
        badge: 'Kosakata Dasar',
        icon: '🔤',
        summary:
          'Kekayaan kata membuat kita dapat berbicara dan menulis cerita dengan lebih indah dan jelas. Kita belajar mengenal Sinonim (kata yang maknanya sama) dan Antonim (kata yang maknanya berlawanan).',
        keyPoints: [
          {
            title: 'Sinonim (Persamaan Kata)',
            description: 'Dua kata atau lebih yang memiliki arti atau makna yang serupa:',
            examples: [
              'Pandai = Pintar / Cerdas',
              'Gembira = Senang / Riang',
              'Lezat = Enak / Sedap',
              'Bohong = Dusta',
              'Cantik = Elok / Indah',
              'Berdiam = Tinggal',
            ],
            icon: '🤝',
          },
          {
            title: 'Antonim (Lawan Kata)',
            description: 'Dua kata yang memiliki arti berlawanan satu sama lain:',
            examples: [
              'Terang >< Gelap',
              'Tinggi >< Rendah',
              'Rajin >< Malas',
              'Kuat >< Lemah',
              'Tebal >< Tipis',
              'Luas >< Sempit',
              'Hemat >< Boros',
            ],
            icon: '↔️',
          },
          {
            title: 'Kata Baku vs Tidak Baku',
            description: 'Kata baku adalah kata yang sesuai dengan Kamus Besar Bahasa Indonesia (KBBI):',
            examples: [
              'Baku: apotek (bukan apotik)',
              'Baku: antre (bukan antri)',
              'Baku: izin (bukan ijin)',
              'Baku: nasihat (bukan nasehat)',
              'Baku: jadwal (bukan jadual)',
              'Baku: praktik (bukan praktek)',
            ],
            icon: '✅',
          },
        ],
        mimiTip:
          '🐱 Trik Pintar Mimi: Supaya mudah ingat: "SINONIM = SAMA artinya", sedangkan "ANTONIM = ANTI / LAWAN artinya"!',
        wordPairs: [
          { word: 'Pandai', synonym: 'Pintar', antonym: 'Bodoh', meaning: 'Cepat menangkap ilmu pelajaran.' },
          { word: 'Gembira', synonym: 'Senang', antonym: 'Sedih', meaning: 'Hati yang bersuka ria.' },
          { word: 'Rajin', synonym: 'Giat', antonym: 'Malas', meaning: 'Suka bekerja dan tidak mudah menyerah.' },
          { word: 'Lezat', synonym: 'Enak', antonym: 'Hambar', meaning: 'Rasa makanan yang sedap di lidah.' },
          { word: 'Besar', synonym: 'Raksasa', antonym: 'Kecil', meaning: 'Ukuran yang melebihi rata-rata.' },
          { word: 'Terang', synonym: 'Benderang', antonym: 'Gelap', meaning: 'Penuh dengan cahaya.' },
        ],
      },
    ],
  },

  // =========================================================================
  // BAB 2: STRUKTUR KALIMAT (S-P-O-K) & JENIS KALIMAT
  // =========================================================================
  {
    id: 'bahasa-bab-2',
    chapterNumber: 2,
    title: 'Struktur Kalimat (SPOK) & Jenis Kalimat',
    subtitle: 'Menyusun Kalimat Utuh: Subjek, Predikat, Objek, Keterangan & Ragam Kalimat',
    badge: 'Tata Bahasa',
    icon: '🧩',
    themeColor: {
      bg: 'bg-indigo-50',
      border: 'border-indigo-200',
      text: 'text-indigo-900',
      accent: 'bg-indigo-600',
      gradient: 'from-indigo-500 to-blue-600',
    },
    topics: [
      {
        id: 'pola-spok-dan-jenis-kalimat',
        title: 'Mengenal S-P-O-K & Jenis Kalimat',
        badge: 'Susunan Kalimat',
        icon: '📐',
        summary:
          'Kalimat yang baik dan lengkap memiliki pola S-P-O-K. Setiap kata dalam kalimat memiliki peran atau fungsi tersendiri.',
        keyPoints: [
          {
            title: 'Subjek (S) - Siapa pelakunya?',
            description: 'Orang, hewan, atau benda yang melakukan suatu perbuatan atau tindakan. Contoh: Cia, Ibu, Pak Tani, Kucing Mimi.',
            icon: '👤',
          },
          {
            title: 'Predikat (P) - Apa tindakannya?',
            description: 'Kata kerja atau perbuatan yang sedang dilakukan oleh Subjek. Contoh: membaca, memasak, menyiram, mengejar.',
            icon: '🏃',
          },
          {
            title: 'Objek (O) - Benda apa yang dikenai tindakan?',
            description: 'Hal atau benda yang menerima perbuatan dari Subjek. Contoh: buku cerita, sayur bayam, bunga mawar, bola.',
            icon: '📦',
          },
          {
            title: 'Keterangan (K) - Di mana / Kapan?',
            description: 'Penjelas tempat kejadian (di perpustakaan, di dapur) atau penjelas waktu (setiap pagi, kemarin sore).',
            icon: '📍',
          },
        ],
        spokExamples: [
          {
            sentence: 'Cia membaca buku cerita di perpustakaan.',
            subjek: 'Cia',
            predikat: 'membaca',
            objek: 'buku cerita',
            keterangan: 'di perpustakaan',
            keteranganType: 'tempat',
          },
          {
            sentence: 'Ibu memasak nasi goreng setiap pagi.',
            subjek: 'Ibu',
            predikat: 'memasak',
            objek: 'nasi goreng',
            keterangan: 'setiap pagi',
            keteranganType: 'waktu',
          },
          {
            sentence: 'Pak Tani menanam padi di sawah.',
            subjek: 'Pak Tani',
            predikat: 'menanam',
            objek: 'padi',
            keterangan: 'di sawah',
            keteranganType: 'tempat',
          },
          {
            sentence: 'Kucing Mimi mengejar tikus kemarin sore.',
            subjek: 'Kucing Mimi',
            predikat: 'mengejar',
            objek: 'tikus',
            keterangan: 'kemarin sore',
            keteranganType: 'waktu',
          },
        ],
        mimiTip:
          '🐱 Tips Mengurai SPOK Mimi: Tanyakan: "Siapa pelakunya? (S) -> Lagi ngapain? (P) -> Apa yang dipegang/dikerjakan? (O) -> Di mana / Kapan? (K)"',
      },
    ],
  },

  // =========================================================================
  // BAB 3: EJAAN & TANDA BACA (EBI)
  // =========================================================================
  {
    id: 'bahasa-bab-3',
    chapterNumber: 3,
    title: 'Ejaan & Tanda Baca (EBI)',
    subtitle: 'Aturan Huruf Kapital, Titik, Koma, Tanda Tanya, dan Tanda Seru',
    badge: 'Ejaan Tepat',
    icon: '✍️',
    themeColor: {
      bg: 'bg-emerald-50',
      border: 'border-emerald-200',
      text: 'text-emerald-900',
      accent: 'bg-emerald-500',
      gradient: 'from-emerald-500 to-teal-600',
    },
    topics: [
      {
        id: 'tanda-baca-kapital',
        title: 'Penggunaan Tanda Baca & Huruf Besar',
        badge: 'Aturan Menulis',
        icon: '🔤',
        summary:
          'Menulis dengan tanda baca dan huruf kapital yang benar membuat tulisan kita rapi, mudah dibaca, dan tidak menimbulkan salah paham.',
        keyPoints: [
          {
            title: 'Aturan Huruf Kapital (Huruf Besar)',
            description: 'Huruf kapital WAJIB digunakan pada:',
            examples: [
              'Huruf pertama di AWAL kalimat: "Hari ini cuaca sangat cerah."',
              'Nama ORANG: "Cia, Budi, Rina, Pak Joko."',
              'Nama TEMPAT / Kota / Negara: "Jakarta, Bali, Gunung Merapi, Indonesia."',
              'Nama HARI dan BULAN: "Senin, Jumat, Januari, Agustus."',
              'Nama AGAMA dan Kitab Suci: "Islam, Kristen, Al-Qur\'an, Alkitab."',
            ],
            icon: '🔠',
          },
          {
            title: 'Tanda Titik (.)',
            description: 'Dipakai pada akhir kalimat berita atau pernyataan yang selesai. Contoh: "Cia senang belajar matematika."',
            icon: '⏺️',
          },
          {
            title: 'Tanda Koma (,)',
            description: 'Dipakai di antara perincian atau pembagian hal. Contoh: "Ibu membeli mangga, apel, dan jeruk di pasar."',
            icon: '🪝',
          },
          {
            title: 'Tanda Tanya (?)',
            description: 'Dipakai di akhir kalimat tanya yang membutuhkan jawaban (5W1H). Contoh: "Kapan Cia pergi ke rumah nenek?"',
            icon: '❓',
          },
          {
            title: 'Tanda Seru (!)',
            description: 'Dipakai di akhir kalimat perintah, ajakan, atau seruan emosi. Contoh: "Tolong tutup pintunya, ya!" atau "Ayo kita belajar bersama!"',
            icon: '❗',
          },
        ],
        mimiTip:
          '🐱 Nasihat Mimi: Jangan lupa! Nama orang dan nama kota selalu berawalan huruf besar di mana pun letaknya dalam kalimat!',
      },
    ],
  },

  // =========================================================================
  // BAB 4: MEMBACA CERITA, FABEL & PESAN MORAL
  // =========================================================================
  {
    id: 'bahasa-bab-4',
    chapterNumber: 4,
    title: 'Membaca Cerita & Pesan Moral',
    subtitle: 'Mengenal Tokoh, Watak, Latar, Ide Pokok, dan Nilai Kebaikan Dongeng',
    badge: 'Gemar Membaca',
    icon: '🦊',
    themeColor: {
      bg: 'bg-rose-50',
      border: 'border-rose-200',
      text: 'text-rose-900',
      accent: 'bg-rose-500',
      gradient: 'from-rose-500 to-pink-600',
    },
    topics: [
      {
        id: 'fabel-dan-pesan-moral',
        title: 'Unsur Cerita & Dongeng Fabel',
        badge: 'Literasi Cerita',
        icon: '📚',
        summary:
          'Fabel adalah cerita dongeng di mana hewan-hewan dapat berbicara dan bertingkah laku seperti manusia. Setiap cerita mengandung pesan moral (amanat) yang baik untuk ditiru.',
        keyPoints: [
          {
            title: 'Unsur-Unsur Cerita Anak',
            description: 'Komponen yang membangun suatu kisah cerita yang seru:',
            examples: [
              'Tokoh: Pelaku dalam cerita (manusia atau hewan).',
              'Watak Tokoh: Sifat karakter (protagonis = sifat baik; antagonis = sifat jahat/sombong).',
              'Latar: Tempat kejadian (di hutan rimba, di tepi telaga) dan waktu (pagi hari yang cerah).',
              'Amanat / Pesan Moral: Nasihat kebaikan yang ingin disampaikan pengarang kepada pembaca.',
            ],
            icon: '🎭',
          },
          {
            title: 'Menemukan Gagasan / Ide Pokok',
            description: 'Ide pokok adalah inti atau topik utama yang sedang dibahas dalam sebuah paragraf. Biasanya terletak di kalimat pertama atau kalimat terakhir paragraf.',
            icon: '💡',
          },
        ],
        storySnippet: {
          title: 'Kisah Kancil, Kura-Kura & Mimi si Kucing Cerdas',
          author: 'Dongeng Edukasi Cia',
          text: 'Di sebuah hutan yang rindang, Kancil menertawakan Kura-Kura yang berjalan sangat lambat. Kura-Kura dengan sabar tetap tersenyum dan terus melangkah maju. Mimi si Kucing Cerdas mengingatkan Kancil bahwa kesombongan akan merugikan diri sendiri. Benar saja, saat lomba lari, Kancil tertidur pulas karena meremehkan lawan, sementara Kura-Kura berhasil mencapai garis akhir lebih dulu berkat ketekunannya.',
          characters: [
            { name: 'Kancil', trait: 'Cepat berlari tetapi sombong dan meremehkan orang lain.' },
            { name: 'Kura-Kura', trait: 'Penyabar, rendah hati, dan pantang menyerah.' },
            { name: 'Mimi Kucing', trait: 'Bijaksana dan suka menasihati kebaikan.' },
          ],
          setting: 'Di hutan rindang pada pagi hari yang cerah.',
          moralMessage: 'Jangan sombong dan meremehkan orang lain. Ketekunan dan kerja keras akan membuahkan hasil terbaik!',
        },
        mimiTip:
          '🐱 Hikmah Cerita Mimi: Orang yang sombong akan kalah oleh orang yang sabar dan gigih berusaha. Selalu rendah hati ya, kawan!',
      },
    ],
  },

  // =========================================================================
  // BAB 5: PUISI & PANTUN ANAK
  // =========================================================================
  {
    id: 'bahasa-bab-5',
    chapterNumber: 5,
    title: 'Puisi & Pantun Anak',
    subtitle: 'Mengenal Ciri Pantun, Rima a-b-a-b, Sampiran, dan Ungkapan Rasa Melalui Puisi',
    badge: 'Karya Sastra',
    icon: '🎋',
    themeColor: {
      bg: 'bg-teal-50',
      border: 'border-teal-200',
      text: 'text-teal-900',
      accent: 'bg-teal-600',
      gradient: 'from-teal-500 to-cyan-600',
    },
    topics: [
      {
        id: 'ciri-pantun-anak',
        title: 'Bermain Pantun & Menghayati Puisi',
        badge: 'Sajak & Rima',
        icon: '🎶',
        summary:
          'Pantun adalah puisi lama asli Indonesia yang memiliki aturan berima yang indah dan menyenangkan untuk dilantunkan bersama teman-teman.',
        keyPoints: [
          {
            title: 'Ciri-Ciri Pantun 4 Baris',
            description: 'Syarat sebuah pantun yang baik:',
            examples: [
              'Tiap bait terdiri dari 4 baris.',
              'Baris ke-1 dan ke-2 disebut SAMPIRAN (pengantar rima).',
              'Baris ke-3 dan ke-4 disebut ISI (maksud utama atau pesan nasihat).',
              'Memiliki pola rima akhir a-b-a-b.',
              'Tiap baris biasanya terdiri dari 8 hingga 12 suku kata.',
            ],
            icon: '📜',
          },
          {
            title: 'Contoh Pantun Nasihat Belajar',
            description: 'Perhatikan bunyi akhir baris yang bersajak a-b-a-b:',
            examples: [
              'Pergi ke pasar membeli kurma, (akhiran -ma [a])',
              'Beli juga sebungkus ragi. (akhiran -gi [b])',
              'Mari belajar bersama-sama, (akhiran -ma [a])',
              'Agar ilmu bertambah tinggi. (akhiran -gi [b])',
            ],
            icon: '⭐',
          },
          {
            title: 'Contoh Pantun Jenaka Anak',
            description: 'Pantun lucu yang menghibur hati gembira:',
            examples: [
              'Pohon mangga berbuah lebat, (akhiran -bat [a])',
              'Dipetik anak memakai tali. (akhiran -li [b])',
              'Kucing Mimi memang hebat, (akhiran -bat [a])',
              'Bisa berhitung berulang kali! (akhiran -li [b])',
            ],
            icon: '🐱',
          },
        ],
        mimiTip:
          '🐱 Pantun Mimi: "Jalan-jalan ke kota Blitar, jangan lupa membeli sukun. Kalau Cia ingin pintar, belajar harus rajin dan tekun!"',
      },
    ],
  },
];

// =========================================================================
// BANK KUIS BAHASA INDONESIA KELAS 3 SD (15 SOAL PILIHAN GANDA)
// =========================================================================
export const BAHASA_QUIZ_QUESTIONS: BahasaQuizQuestion[] = [
  {
    id: 'bahasa-q1',
    chapterTitle: 'Sinonim & Antonim',
    question: 'Sinonim (persamaan kata) dari kata "pandai" adalah...',
    options: ['Pintar', 'Malas', 'Bohong', 'Lambat'],
    correctAnswer: 'Pintar',
    explanation: 'Sinonim dari pandai adalah pintar, cerdas, atau pandai menguasai ilmu.',
  },
  {
    id: 'bahasa-q2',
    chapterTitle: 'Sinonim & Antonim',
    question: 'Antonim (lawan kata) dari kata "rajin" adalah...',
    options: ['Malas', 'Giat', 'Cerdas', 'Hemat'],
    correctAnswer: 'Malas',
    explanation: 'Rajin artinya suka bekerja giat, sedangkan lawan katanya adalah malas.',
  },
  {
    id: 'bahasa-q3',
    chapterTitle: 'Kata Baku',
    question: 'Manakah penulisan kata baku yang tepat menurut Kamus Besar Bahasa Indonesia (KBBI)?',
    options: ['Apotek', 'Apotik', 'Apoteg', 'Apoteek'],
    correctAnswer: 'Apotek',
    explanation: 'Kata baku yang benar adalah "apotek" (dengan huruf e), bukan "apotik".',
  },
  {
    id: 'bahasa-q4',
    chapterTitle: 'Kata Baku',
    question: 'Ibu guru meminta surat ... kepada murid yang tidak masuk sekolah karena sakit.',
    options: ['Izin', 'Ijin', 'Isin', 'Idjin'],
    correctAnswer: 'Izin',
    explanation: 'Kata baku yang tepat sesuai ejaan resmi adalah "izin" menggunakan huruf z.',
  },
  {
    id: 'bahasa-q5',
    chapterTitle: 'Struktur Kalimat SPOK',
    question: 'Perhatikan kalimat: "Cia membaca buku cerita di perpustakaan." Kata yang menduduki jabatan PREDIKAT (P) adalah...',
    options: ['Membaca', 'Cia', 'Buku cerita', 'Di perpustakaan'],
    correctAnswer: 'Membaca',
    explanation: 'Predikat adalah kata kerja atau tindakan yang dilakukan oleh subjek, yaitu "membaca".',
  },
  {
    id: 'bahasa-q6',
    chapterTitle: 'Struktur Kalimat SPOK',
    question: 'Pada kalimat: "Pak Tani menanam padi di sawah.", kata "di sawah" berfungsi sebagai keterangan...',
    options: ['Keterangan Tempat', 'Keterangan Waktu', 'Subjek', 'Objek'],
    correctAnswer: 'Keterangan Tempat',
    explanation: '"Di sawah" menerangkan lokasi atau tempat di mana peristiwa berlangsung.',
  },
  {
    id: 'bahasa-q7',
    chapterTitle: 'Struktur Kalimat SPOK',
    question: 'Pada kalimat: "Ibu memasak sup ayam kemarin sore.", kata yang berfungsi sebagai OBJEK (O) adalah...',
    options: ['Sup ayam', 'Ibu', 'Memasak', 'Kemarin sore'],
    correctAnswer: 'Sup ayam',
    explanation: 'Objek adalah hal yang dimasak atau dikenai perbuatan, yaitu "sup ayam".',
  },
  {
    id: 'bahasa-q8',
    chapterTitle: 'Jenis Kalimat',
    question: 'Kalimat berikut yang merupakan contoh KALIMAT TANYA adalah...',
    options: [
      'Di mana rumah tempat tinggalmu?',
      'Tolong ambilkan buku itu!',
      'Mimi adalah kucing yang cerdas.',
      'Ayo kita bermain di lapangan!',
    ],
    correctAnswer: 'Di mana rumah tempat tinggalmu?',
    explanation: '"Di mana rumah tempat tinggalmu?" menanyakan informasi lokasi dan diakhiri tanda tanya (?).',
  },
  {
    id: 'bahasa-q9',
    chapterTitle: 'Huruf Kapital',
    question: 'Penulisan huruf kapital yang paling benar pada kalimat berikut adalah...',
    options: [
      'Paman Budi berlibur ke kota Bandung pada hari Senin.',
      'paman Budi berlibur ke kota bandung pada hari senin.',
      'Paman budi berlibur ke kota Bandung pada Hari senin.',
      'Paman Budi Berlibur Ke Kota Bandung Pada Hari Senin.',
    ],
    correctAnswer: 'Paman Budi berlibur ke kota Bandung pada hari Senin.',
    explanation: 'Huruf kapital dipakai di awal kalimat (Paman), nama orang (Budi), nama kota (Bandung), dan nama hari (Senin).',
  },
  {
    id: 'bahasa-q10',
    chapterTitle: 'Tanda Baca',
    question: 'Tanda baca yang tepat untuk melengkapi kalimat perintah: "Tolong matikan lampu kamar sebelum tidur..." adalah...',
    options: ['Tanda seru (!)', 'Tanda tanya (?)', 'Tanda koma (,)', 'Tanda petik (")'],
    correctAnswer: 'Tanda seru (!)',
    explanation: 'Kalimat perintah atau permintaan bantuan yang tegas diakhiri dengan tanda seru (!).',
  },
  {
    id: 'bahasa-q11',
    chapterTitle: 'Unsur Cerita Fabel',
    question: 'Cerita dongeng yang tokoh-tokoh pelakunya diperankan oleh binatang yang bisa berbicara disebut...',
    options: ['Fabel', 'Mite', 'Legenda', 'Biografi'],
    correctAnswer: 'Fabel',
    explanation: 'Fabel adalah cerita rakyat atau dongeng tentang kehidupan binatang yang mengandung pesan budi pekerti luhur.',
  },
  {
    id: 'bahasa-q12',
    chapterTitle: 'Unsur Cerita',
    question: 'Nasihat atau pesan kebaikan yang dapat kita petik dari sebuah cerita disebut...',
    options: ['Amanat (Pesan Moral)', 'Latar Tempat', 'Watak Tokoh', 'Judul Bacaan'],
    correctAnswer: 'Amanat (Pesan Moral)',
    explanation: 'Amanat atau pesan moral adalah pesan kebaikan yang ingin disampaikan oleh penulis kepada pembaca.',
  },
  {
    id: 'bahasa-q13',
    chapterTitle: 'Pantun Anak',
    question: 'Dalam sebuah bait pantun, baris ke-1 dan ke-2 disebut...',
    options: ['Sampiran', 'Isi pantun', 'Amanat', 'Tema'],
    correctAnswer: 'Sampiran',
    explanation: 'Baris ke-1 dan ke-2 adalah sampiran, sedangkan baris ke-3 dan ke-4 adalah isi pantun.',
  },
  {
    id: 'bahasa-q14',
    chapterTitle: 'Pantun Anak',
    question: 'Pola sajak atau rima akhir yang benar pada sebuah pantun adalah...',
    options: ['a - b - a - b', 'a - a - b - b', 'a - b - b - a', 'a - a - a - b'],
    correctAnswer: 'a - b - a - b',
    explanation: 'Ciri utama pantun klasik Indonesia adalah bersajak akhir silang: a - b - a - b.',
  },
  {
    id: 'bahasa-q15',
    chapterTitle: 'Kalimat Penolakan Santun',
    question: 'Jika diajak teman bermain saat kamu harus belajar untuk ulangan besok, kalimat penolakan yang paling sopan adalah...',
    options: [
      'Maaf teman-teman, hari ini saya harus belajar untuk ulangan besok.',
      'Tidak mau ah, kalian mengganggu saja!',
      'Pergi saja sendiri, jangan ajak aku!',
      'Malas ah main sama kalian.',
    ],
    correctAnswer: 'Maaf teman-teman, hari ini saya harus belajar untuk ulangan besok.',
    explanation: 'Penolakan yang santun selalu diawali dengan kata "Maaf" dan memberikan alasan yang jelas tanpa menyakiti perasaan teman.',
  },
];
