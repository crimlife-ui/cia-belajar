export interface PknTopic {
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
  interactiveCards?: {
    label: string;
    symbol: string;
    meaning: string;
    attitudeInSchool: string;
    attitudeAtHome: string;
  }[];
}

export interface PknQuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  chapterTitle: string;
}

export interface PknChapter {
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
  topics: PknTopic[];
}

export const PKN_CHAPTERS: PknChapter[] = [
  // =========================================================================
  // BAB 1: MENGENAL PANCASILA & SIMBOL NEGARAKU
  // =========================================================================
  {
    id: 'pkn-bab-1',
    chapterNumber: 1,
    title: 'Pancasila Dasar Negaraku',
    subtitle: 'Mengenal 5 Sila, Lambang Garuda, dan Sikap Pengamalan Sehari-hari',
    badge: 'Fase B • Kelas 3 SD',
    icon: '🇮🇩',
    themeColor: {
      bg: 'bg-rose-50',
      border: 'border-rose-200',
      text: 'text-rose-900',
      accent: 'bg-rose-500',
      gradient: 'from-rose-500 to-red-600',
    },
    topics: [
      {
        id: 'sila-dan-simbol',
        title: '5 Sila Pancasila dan Lambangnya',
        badge: 'Simbol Garuda',
        icon: '⭐',
        summary:
          'Pancasila adalah dasar negara Republik Indonesia. Kata Pancasila berasal dari bahasa Sanskerta: Panca artinya lima, dan Sila artinya dasar atau aturan.',
        keyPoints: [
          {
            title: 'Sila ke-1: Ketuhanan Yang Maha Esa',
            description: 'Dilambangkan dengan BINTANG EMAS dengan latar belakang hitam perisai.',
            examples: [
              'Berdoa sebelum dan sesudah belajar di kelas.',
              'Menghormati teman yang sedang beribadah sesuai agamanya.',
              'Tidak memaksakan agama kita kepada orang lain.',
            ],
            icon: '⭐',
          },
          {
            title: 'Sila ke-2: Kemanusiaan yang Adil dan Beradab',
            description: 'Dilambangkan dengan RANTAI BAJA berbentuk lingkaran dan segi empat yang saling bertaut.',
            examples: [
              'Menolong teman yang terjatuh di halaman sekolah.',
              'Berbagi bekal makanan dengan teman yang membutuhkan.',
              'Menyayangi adik dan kakak di rumah.',
            ],
            icon: '⛓️',
          },
          {
            title: 'Sila ke-3: Persatuan Indonesia',
            description: 'Dilambangkan dengan POHON BERINGIN yang teduh dan memiliki akar yang kokoh menghujam ke tanah.',
            examples: [
              'Mau berteman dengan siapa saja tanpa membeda-bedakan suku.',
              'Bangga menggunakan produk dan pakaian buatan Indonesia (seperti batik).',
              'Rukun bermain bersama teman sekelas.',
            ],
            icon: '🌳',
          },
          {
            title: 'Sila ke-4: Kerakyatan yang Dipimpin oleh Hikmat Kebijaksanaan dalam Permusyawaratan/Perwakilan',
            description: 'Dilambangkan dengan KEPALA BANTENG yang melambangkan hewan sosial yang suka berkumpul.',
            examples: [
              'Musyawarah bersama untuk memilih ketua kelas 3 SD.',
              'Mendengarkan pendapat teman dan tidak memaksakan kehendak sendiri.',
              'Menerima hasil keputusan bersama dengan lapang dada.',
            ],
            icon: '🐂',
          },
          {
            title: 'Sila ke-5: Keadilan Sosial bagi Seluruh Rakyat Indonesia',
            description: 'Dilambangkan dengan PADI DAN KAPAS yang melambangkan kebutuhan dasar manusia (pangan dan sandang).',
            examples: [
              'Adil membagi tugas saat piket kebersihan kelas.',
              'Suka menabung dan tidak bersikap boros.',
              'Menghargai hasil karya dan pujian teman.',
            ],
            icon: '🌾',
          },
        ],
        mimiTip:
          '🐱 Tips Cerdas Mimi: Ingat urutan lambang Pancasila dengan singkatan: BINTANG - RANTAI - POHON - BANTENG - PADI KAPAS! Mudah kan, Cia?',
        interactiveCards: [
          {
            label: 'Sila 1',
            symbol: '⭐ Bintang Emas',
            meaning: 'Cahaya kerohanian dari Tuhan untuk setiap manusia.',
            attitudeInSchool: 'Berdoa khusyuk sebelum mulai belajar.',
            attitudeAtHome: 'Rajin beribadah bersama keluarga.',
          },
          {
            label: 'Sila 2',
            symbol: '⛓️ Rantai Emas',
            meaning: 'Hubungan manusia yang saling menyayangi dan membantu.',
            attitudeInSchool: 'Menjenguk teman kelas yang sedang sakit.',
            attitudeAtHome: 'Membantu adik yang kesulitan belajar.',
          },
          {
            label: 'Sila 3',
            symbol: '🌳 Pohon Beringin',
            meaning: 'Tempat berteduh dan persatuan seluruh rakyat Indonesia.',
            attitudeInSchool: 'Kompak bekerja sama saat upacara bendera.',
            attitudeAtHome: 'Menjaga kerukunan di dalam rumah.',
          },
          {
            label: 'Sila 4',
            symbol: '🐂 Kepala Banteng',
            meaning: 'Kekuatan musyawarah dan diskusi untuk mengambil mufakat.',
            attitudeInSchool: 'Menghargai suara terbanyak saat memilih ketua regu.',
            attitudeAtHome: 'Berdiskusi bersama orang tua menentukan tujuan liburan.',
          },
          {
            label: 'Sila 5',
            symbol: '🌾 Padi & Kapas',
            meaning: 'Kemakmuran, kecukupan makanan dan pakaian yang merata.',
            attitudeInSchool: 'Tidak pilih kasih saat meminjamkan alat tulis.',
            attitudeAtHome: 'Hemat menggunakan uang jajan dan listrik.',
          },
        ],
      },
    ],
  },

  // =========================================================================
  // BAB 2: AKU PATUH ATURAN: HAK DAN KEWAJIBAN ANAK
  // =========================================================================
  {
    id: 'pkn-bab-2',
    chapterNumber: 2,
    title: 'Aku Patuh Aturan: Hak & Kewajiban',
    subtitle: 'Memahami Hak dan Kewajiban di Rumah, Sekolah, dan Lingkungan Sekitar',
    badge: 'Karakter Disiplin',
    icon: '⚖️',
    themeColor: {
      bg: 'bg-emerald-50',
      border: 'border-emerald-200',
      text: 'text-emerald-900',
      accent: 'bg-emerald-500',
      gradient: 'from-emerald-500 to-teal-600',
    },
    topics: [
      {
        id: 'hak-kewajiban-anak',
        title: 'Perbedaan Hak dan Kewajiban',
        badge: 'Aturan & Tanggung Jawab',
        icon: '📋',
        summary:
          'Hak adalah segala sesuatu yang patut kita terima atau nikmati. Sedangkan kewajiban adalah segala sesuatu yang wajib kita lakukan dengan penuh tanggung jawab. Kewajiban harus dikerjakan terlebih dahulu sebelum menuntut hak!',
        keyPoints: [
          {
            title: 'Hak Anak di Rumah',
            description: 'Hal-hal yang berhak diterima anak dari keluarga tercinta:',
            examples: [
              'Mendapatkan kasih sayang dan perhatian dari ayah dan ibu.',
              'Mendapatkan makanan bergizi, pakaian bersih, dan tempat tinggal aman.',
              'Mendapatkan waktu istirahat dan bermain yang cukup.',
            ],
            icon: '🏠',
          },
          {
            title: 'Kewajiban Anak di Rumah',
            description: 'Tanggung jawab yang harus dilakukan anak di rumah:',
            examples: [
              'Menghormati orang tua dan berbicara santun.',
              'Merapikan tempat tidur dan mainan setelah digunakan.',
              'Belajar dan mengerjakan PR tepat waktu tanpa disuruh berkali-kali.',
            ],
            icon: '🧹',
          },
          {
            title: 'Hak Siswa di Sekolah',
            description: 'Hal-hal yang berhak diterima siswa kelas 3 di sekolah:',
            examples: [
              'Mendapatkan bimbingan dan ilmu yang bermanfaat dari bapak/ibu guru.',
              'Menggunakan fasilitas sekolah (seperti perpustakaan, ruang kelas bersih, UKS).',
              'Merasa aman dan nyaman saat belajar tanpa diganggu teman.',
            ],
            icon: '🏫',
          },
          {
            title: 'Kewajiban Siswa di Sekolah',
            description: 'Tugas yang wajib ditaati siswa di lingkungan sekolah:',
            examples: [
              'Datang ke sekolah tepat waktu sebelum bel berbunyi.',
              'Memakai seragam sekolah rapi sesuai jadwal.',
              'Melaksanakan piket kebersihan kelas dengan penuh tanggung jawab.',
              'Mendengarkan penjelasan guru saat pelajaran berlangsung.',
            ],
            icon: '🎒',
          },
        ],
        mimiTip:
          '🐱 Nasihat Bijak Mimi: Ingat rumus emas ini: Laksanakan KEWAJIBAN-mu dengan senang hati, maka HAK-mu akan kamu peroleh dengan sempurna!',
      },
    ],
  },

  // =========================================================================
  // BAB 3: BHINNEKA TUNGGAL IKA: INDAHNYA KEBERAGAMAN
  // =========================================================================
  {
    id: 'pkn-bab-3',
    chapterNumber: 3,
    title: 'Bhinneka Tunggal Ika',
    subtitle: 'Menghargai Keberagaman Suku, Agama, dan Budaya di Sekitar Kita',
    badge: 'Persatuan Bangsa',
    icon: '🤝',
    themeColor: {
      bg: 'bg-amber-50',
      border: 'border-amber-200',
      text: 'text-amber-900',
      accent: 'bg-amber-500',
      gradient: 'from-amber-500 to-orange-600',
    },
    topics: [
      {
        id: 'keberagaman-indonesia',
        title: 'Keragaman Budaya & Sikap Toleransi',
        badge: 'Toleransi & Kasih',
        icon: '🌈',
        summary:
          'Semboyan bangsa Indonesia adalah "Bhinneka Tunggal Ika", yang tertulis pada pita yang dicengkeram oleh burung Garuda Pancasila. Artinya: Berbeda-beda tetapi tetap satu jua.',
        keyPoints: [
          {
            title: '6 Agama Resmi di Indonesia',
            description: 'Masing-masing memiliki tempat ibadah dan kitab suci yang dihormati:',
            examples: [
              'Islam: Tempat ibadah di Masjid, Kitab Suci Al-Qur\'an.',
              'Kristen Protestan: Tempat ibadah di Gereja, Kitab Suci Alkitab.',
              'Katolik: Tempat ibadah di Gereja, Kitab Suci Alkitab.',
              'Hindu: Tempat ibadah di Pura, Kitab Suci Weda.',
              'Buddha: Tempat ibadah di Vihara, Kitab Suci Tripitaka.',
              'Khonghucu: Tempat ibadah di Klenteng, Kitab Suci Si Shu Wu Jing.',
            ],
            icon: '🕌',
          },
          {
            title: 'Keragaman Suku & Bahasa Daerah',
            description: 'Indonesia memiliki ratusan suku bangsa yang hidup rukun:',
            examples: [
              'Suku Jawa (bahasa Jawa), Sunda (bahasa Sunda), Batak, Minang, Dayak, Bugis, Papua, Asmat, dan lain-lain.',
              'Bahasa Indonesia digunakan sebagai BAHASA PERSATUAN agar kita bisa saling mengerti.',
            ],
            icon: '🗺️',
          },
          {
            title: 'Sikap Menghargai Perbedaan (Toleransi)',
            description: 'Cara menjaga persatuan di sekolah dan lingkungan bermain:',
            examples: [
              'Tidak mengejek logat bicara atau warna kulit teman (Stop Bullying!).',
              'Memberi kesempatan teman beribadah saat tiba waktunya.',
              'Mencicipi dan mengapresiasi makanan tradisional teman dari daerah lain.',
            ],
            icon: '🤝',
          },
        ],
        mimiTip:
          '🐱 Kata Mutiara Mimi: Perbedaan itu seperti pelangi. Jika semua warnanya sama, pelangi tidak akan indah. Keberagaman membuat Indonesia jadi bangsa yang sangat hebat!',
      },
    ],
  },

  // =========================================================================
  // BAB 4: SIMBOL NEGARA & SEMANGAT GOTONG ROYONG
  // =========================================================================
  {
    id: 'pkn-bab-4',
    chapterNumber: 4,
    title: 'Simbol Negaraku & Gotong Royong',
    subtitle: 'Garuda Pancasila, Bendera Merah Putih, dan Semangat Kerja Sama',
    badge: 'Cinta Tanah Air',
    icon: '🦅',
    themeColor: {
      bg: 'bg-indigo-50',
      border: 'border-indigo-200',
      text: 'text-indigo-900',
      accent: 'bg-indigo-500',
      gradient: 'from-indigo-500 to-blue-600',
    },
    topics: [
      {
        id: 'simbol-negara-gotong-royong',
        title: 'Identitas Negara & Kekuatan Bersama',
        badge: 'NKRI & Gotong Royong',
        icon: '🚩',
        summary:
          'Setiap negara memiliki identitas kebangsaan yang menjadi kebanggaan seluruh rakyatnya. Di Indonesia, kita bersatu dengan semangat gotong royong.',
        keyPoints: [
          {
            title: 'Arti Jumlah Bulu Garuda Pancasila',
            description: 'Melambangkan tanggal Proklamasi Kemerdekaan Indonesia (17 Agustus 1945):',
            examples: [
              '17 helai bulu pada masing-masing sayap (Tanggal 17).',
              '8 helai bulu pada ekor (Bulan 8 / Agustus).',
              '19 helai bulu di bawah perisai/pangkal ekor (Tahun 19xx).',
              '45 helai bulu pada leher (Tahun xx45).',
            ],
            icon: '🦅',
          },
          {
            title: 'Bendera Sang Saka Merah Putih',
            description: 'Bendera kebangsaan Indonesia memiliki dua warna sakral:',
            examples: [
              'Merah melambangkan KEBERANIAN jiwa raga bangsa.',
              'Putih melambangkan KESUCIAN niat dan hati rakyat Indonesia.',
            ],
            icon: '🇮🇩',
          },
          {
            title: 'Lagu Kebangsaan Indonesia Raya',
            description: 'Diciptakan oleh Wage Rudolf (W.R.) Supratman dan dinyanyikan dengan sikap tegap dan khidmat.',
            examples: [
              'Saat menyanyikan lagu Indonesia Raya, kita berdiri tegap dan tidak boleh bercanda.',
            ],
            icon: '🎵',
          },
          {
            title: 'Makna Gotong Royong',
            description: 'Bekerja bersama-sama untuk mencapai tujuan yang baik:',
            examples: [
              'Pekerjaan berat menjadi ringan jika dikerjakan bersama.',
              'Pekerjaan cepat selesai dan menghemat waktu.',
              'Menumbuhkan rasa persaudaraan dan kekeluargaan antar sesama.',
            ],
            icon: '💪',
          },
        ],
        mimiTip:
          '🐱 Cerita Mimi: Pepatah mengatakan: "Berat sama dipikul, ringan sama dijinjing!" Dengan gotong royong, tidak ada masalah yang terlalu berat!',
      },
    ],
  },
];

// =========================================================================
// BANK KUIS PKN KELAS 3 SD (15 SOAL PILIHAN GANDA BERKUALITAS)
// =========================================================================
export const PKN_QUIZ_QUESTIONS: PknQuizQuestion[] = [
  {
    id: 'pkn-q1',
    chapterTitle: 'Sila-Sila Pancasila',
    question: 'Apa arti kata "Panca" dan "Sila" yang berasal dari bahasa Sanskerta?',
    options: ['Lima dasar', 'Tiga aturan', 'Sepuluh perintah', 'Satu tekad'],
    correctAnswer: 'Lima dasar',
    explanation:
      'Panca artinya lima dan Sila artinya dasar atau aturan. Jadi Pancasila berarti lima dasar negara Indonesia.',
  },
  {
    id: 'pkn-q2',
    chapterTitle: 'Sila-Sila Pancasila',
    question: 'Lambang dari sila pertama Pancasila, "Ketuhanan Yang Maha Esa" adalah...',
    options: ['Bintang Emas', 'Rantai Baja', 'Pohon Beringin', 'Kepala Banteng'],
    correctAnswer: 'Bintang Emas',
    explanation:
      'Sila ke-1 dilambangkan dengan Bintang Emas bersudut lima yang memancarkan cahaya kerohanian bagi manusia.',
  },
  {
    id: 'pkn-q3',
    chapterTitle: 'Sila-Sila Pancasila',
    question: 'Cia dan teman-temannya selalu berdoa sebelum mulai belajar di kelas 3 SD. Sikap ini merupakan contoh pengamalan sila ke...',
    options: ['Sila ke-1', 'Sila ke-2', 'Sila ke-3', 'Sila ke-4'],
    correctAnswer: 'Sila ke-1',
    explanation:
      'Berdoa, beribadah, dan bersyukur kepada Tuhan Yang Maha Esa adalah wujud pengamalan sila ke-1.',
  },
  {
    id: 'pkn-q4',
    chapterTitle: 'Sila-Sila Pancasila',
    question: 'Saat bermain di halaman sekolah, Doni melihat Budi terjatuh dan segera menolongnya. Perilaku terpuji ini sesuai dengan pengamalan sila ke...',
    options: ['Sila ke-2', 'Sila ke-1', 'Sila ke-3', 'Sila ke-5'],
    correctAnswer: 'Sila ke-2',
    explanation:
      'Sila ke-2 "Kemanusiaan yang Adil dan Beradab" mengajarkan kita untuk saling menyayangi dan menolong sesama manusia.',
  },
  {
    id: 'pkn-q5',
    chapterTitle: 'Sila-Sila Pancasila',
    question: 'Lambang pohon beringin pada perisai burung Garuda melambangkan sila...',
    options: ['Persatuan Indonesia (Sila ke-3)', 'Keadilan Sosial (Sila ke-5)', 'Kemanusiaan yang Adil (Sila ke-2)', 'Ketuhanan Yang Maha Esa (Sila ke-1)'],
    correctAnswer: 'Persatuan Indonesia (Sila ke-3)',
    explanation:
      'Pohon beringin melambangkan tempat berteduh dan persatuan seluruh suku bangsa Indonesia yang dinaungi negara.',
  },
  {
    id: 'pkn-q6',
    chapterTitle: 'Sila-Sila Pancasila',
    question: 'Di kelas 3, murid-murid bermusyawarah untuk memilih ketua kelas baru secara adil. Musyawarah ini mencerminkan sila yang dilambangkan oleh...',
    options: ['Kepala Banteng', 'Bintang', 'Rantai', 'Pohon Beringin'],
    correctAnswer: 'Kepala Banteng',
    explanation:
      'Sila ke-4 dilambangkan dengan Kepala Banteng yang mencerminkan semangat bermusyawarah dan berkumpul untuk mengambil keputusan bersama.',
  },
  {
    id: 'pkn-q7',
    chapterTitle: 'Hak dan Kewajiban',
    question: 'Berikut ini yang merupakan contoh HAK seorang anak di rumah adalah...',
    options: [
      'Mendapatkan kasih sayang dan makanan bergizi dari orang tua',
      'Merapikan tempat tidur setiap pagi',
      'Membantu ibu menyapu lantai',
      'Mengerjakan PR sekolah tepat waktu',
    ],
    correctAnswer: 'Mendapatkan kasih sayang dan makanan bergizi dari orang tua',
    explanation:
      'Kasih sayang, tempat tinggal, dan makanan adalah HAK yang patut diterima anak. Sementara merapikan kamar dan belajar adalah KEWAJIBAN.',
  },
  {
    id: 'pkn-q8',
    chapterTitle: 'Hak dan Kewajiban',
    question: 'Sebelum kita menuntut hak kita, hal yang harus kita lakukan terlebih dahulu adalah...',
    options: [
      'Melaksanakan kewajiban dengan penuh tanggung jawab',
      'Meminta hadiah kepada guru',
      'Bermain bersama teman sepuasnya',
      'Menunggu disuruh orang tua',
    ],
    correctAnswer: 'Melaksanakan kewajiban dengan penuh tanggung jawab',
    explanation:
      'Kewajiban harus dilaksanakan terlebih dahulu dengan tertib sebelum kita dapat menikmati hak dengan seimbang.',
  },
  {
    id: 'pkn-q9',
    chapterTitle: 'Hak dan Kewajiban',
    question: 'Berikut ini yang merupakan kewajiban seorang siswa saat berada di sekolah adalah...',
    options: [
      'Mematuhi tata tertib sekolah dan memakai seragam rapi',
      'Mendapatkan ruang kelas yang ber-AC',
      'Meminjam buku perpustakaan',
      'Bermain bola di jam istirahat',
    ],
    correctAnswer: 'Mematuhi tata tertib sekolah dan memakai seragam rapi',
    explanation:
      'Mematuhi tata tertib, hadir tepat waktu, dan menjaga kebersihan sekolah adalah kewajiban utama setiap siswa.',
  },
  {
    id: 'pkn-q10',
    chapterTitle: 'Bhinneka Tunggal Ika',
    question: 'Semboyan bangsa Indonesia "Bhinneka Tunggal Ika" memiliki arti...',
    options: [
      'Berbeda-beda tetapi tetap satu jua',
      'Bersatu kita teguh bercerai kita runtuh',
      'Maju terus pantang mundur',
      'Indonesia tanah airku yang tercinta',
    ],
    correctAnswer: 'Berbeda-beda tetapi tetap satu jua',
    explanation:
      'Bhinneka Tunggal Ika artinya meskipun masyarakat Indonesia terdiri dari bermacam-macam suku, budaya, dan agama, kita tetap bersatu sebagai satu bangsa Indonesia.',
  },
  {
    id: 'pkn-q11',
    chapterTitle: 'Bhinneka Tunggal Ika',
    question: 'Tempat ibadah bagi pemeluk agama Islam adalah...',
    options: ['Masjid', 'Gereja', 'Pura', 'Vihara'],
    correctAnswer: 'Masjid',
    explanation:
      'Masjid adalah tempat ibadah umat Islam. Umat Kristen/Katolik di Gereja, Hindu di Pura, dan Buddha di Vihara.',
  },
  {
    id: 'pkn-q12',
    chapterTitle: 'Bhinneka Tunggal Ika',
    question: 'Di kelas 3 ada teman baru yang berasal dari Papua dengan logat bicara yang berbeda. Sikap Cia yang paling terpuji adalah...',
    options: [
      'Mengajaknya berkenalan dan bermain bersama dengan ramah',
      'Menertawakan logat bicaranya',
      'Menjauhinya karena berbeda daerah',
      'Menyuruhnya tidak boleh berbicara di kelas',
    ],
    correctAnswer: 'Mengajaknya berkenalan dan bermain bersama dengan ramah',
    explanation:
      'Kita harus selalu ramah dan menghargai teman dari mana pun asalnya tanpa mengejek atau membeda-bedakan (toleransi).',
  },
  {
    id: 'pkn-q13',
    chapterTitle: 'Simbol Negaraku',
    question: 'Jumlah bulu pada masing-masing sayap burung Garuda Pancasila berjumlah 17 helai. Angka ini melambangkan...',
    options: [
      'Tanggal Proklamasi Kemerdekaan Indonesia',
      'Bulan Kemerdekaan Indonesia',
      'Jumlah provinsi pertama di Indonesia',
      'Usia kemerdekaan bangsa',
    ],
    correctAnswer: 'Tanggal Proklamasi Kemerdekaan Indonesia',
    explanation:
      '17 helai sayap melambangkan tanggal 17 Agustus 1945 hari kemerdekaan Indonesia.',
  },
  {
    id: 'pkn-q14',
    chapterTitle: 'Simbol Negaraku',
    question: 'Lagu kebangsaan Indonesia Raya diciptakan oleh...',
    options: ['W.R. Supratman', 'Ibu Sud', 'Ismail Marzuki', 'Kusbini'],
    correctAnswer: 'W.R. Supratman',
    explanation:
      'Lagu kebangsaan Indonesia Raya diciptakan oleh pahlawan nasional Wage Rudolf (W.R.) Supratman.',
  },
  {
    id: 'pkn-q15',
    chapterTitle: 'Gotong Royong',
    question: 'Manfaat utama dari melakukan kerja bakti membersihkan lingkungan sekolah secara gotong royong adalah...',
    options: [
      'Pekerjaan menjadi lebih cepat selesai dan terasa ringan',
      'Bisa memilih tidak bekerja dan hanya menonton',
      'Mendapatkan bayaran uang jajan dari kepala sekolah',
      'Membuat murid-murid saling bersaing siapa yang paling lelah',
    ],
    correctAnswer: 'Pekerjaan menjadi lebih cepat selesai dan terasa ringan',
    explanation:
      'Gotong royong membuat pekerjaan berat terasa ringan, cepat selesai, serta menumbuhkan kerukunan dan persaudaraan.',
  },
];
