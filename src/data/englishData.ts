export type EnglishLevelId = 'basic' | 'intermediate' | 'expert';

export interface VocabularyWord {
  id: string;
  english: string;
  indonesian: string;
  category: string;
  emoji: string;
  pronunciationHint: string;
  exampleSentence: string;
  sentenceMeaning: string;
}

export interface TenseExample {
  title: string;
  formula: string;
  description: string;
  timeline: 'past' | 'present' | 'continuous';
  sentence: string;
  translation: string;
  verbForm: string; // e.g. "V1 (eat)", "V-ing (is eating)", "V2 (ate)"
  timeSignal: string; // e.g. "Every day", "Right now", "Yesterday"
}

export interface EnglishTopic {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  icon: string;
  description: string;
  kikoTip: string;
  vocabularies: VocabularyWord[];
  grammarFocus?: {
    title: string;
    rules: string[];
    tenseComparisons?: TenseExample[];
  };
  conversation?: {
    characterA: string;
    characterB: string;
    dialogue: { speaker: string; text: string; meaning: string }[];
  };
}

export interface EnglishQuizQuestion {
  id: string;
  level: EnglishLevelId;
  question: string;
  soundText?: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  tip: string;
}

export interface EnglishLevel {
  id: EnglishLevelId;
  name: string;
  tagline: string;
  symbol: string;
  badgeColor: {
    bg: string;
    text: string;
    border: string;
    accent: string;
  };
  topics: EnglishTopic[];
  quizQuestions: EnglishQuizQuestion[];
}

export const ENGLISH_LEVELS: EnglishLevel[] = [
  // =========================================================================
  // 1. BASIC LEVEL (Pemula: Greetings, Daily Words, Simple Present Tense)
  // =========================================================================
  {
    id: 'basic',
    name: 'Level 1: Basic (Pemula)',
    tagline: 'Perkenalan, Kosakata Penting & Simple Present Tense (Waktu Sekarang)',
    symbol: '🌱',
    badgeColor: {
      bg: 'bg-emerald-50',
      text: 'text-emerald-800',
      border: 'border-emerald-300',
      accent: 'bg-emerald-500 hover:bg-emerald-600',
    },
    topics: [
      {
        id: 'basic-topic-1',
        title: 'Greetings & Introductions (Salam & Perkenalan)',
        subtitle: 'Cara menyapa dan berkenalan dengan teman baru dalam bahasa Inggris',
        badge: 'Percakapan Pertama',
        icon: '👋',
        description:
          'Setiap bertemu orang atau teman baru, kita bisa menyapa dengan riang. Dengarkan suaranya dan tirukan ya!',
        kikoTip:
          'Ucapkan "Hello!" sambil tersenyum ramah. Kalau pagi hari, katakan "Good morning!"',
        vocabularies: [
          {
            id: 'v-b1',
            english: 'Good morning',
            indonesian: 'Selamat pagi',
            category: 'Salam',
            emoji: '🌅',
            pronunciationHint: 'Gud mor-ning',
            exampleSentence: 'Good morning, teacher!',
            sentenceMeaning: 'Selamat pagi, guru!',
          },
          {
            id: 'v-b2',
            english: 'How are you?',
            indonesian: 'Apa kabar?',
            category: 'Pertanyaan',
            emoji: '😊',
            pronunciationHint: 'Hau ar yu?',
            exampleSentence: 'Hello Cia, how are you today?',
            sentenceMeaning: 'Halo Cia, bagaimana kabarmu hari ini?',
          },
          {
            id: 'v-b3',
            english: 'I am fine',
            indonesian: 'Saya baik-baik saja / kabar baik',
            category: 'Jawaban',
            emoji: '✨',
            pronunciationHint: 'Ai em fain',
            exampleSentence: 'I am fine, thank you!',
            sentenceMeaning: 'Saya baik-baik saja, terima kasih!',
          },
          {
            id: 'v-b4',
            english: 'My name is...',
            indonesian: 'Nama saya adalah...',
            category: 'Perkenalan',
            emoji: '🏷️',
            pronunciationHint: 'Mai neim iz...',
            exampleSentence: 'My name is Cia, nice to meet you!',
            sentenceMeaning: 'Nama saya adalah Cia, senang bertemu denganmu!',
          },
        ],
        conversation: {
          characterA: 'Mimi',
          characterB: 'Cia',
          dialogue: [
            { speaker: 'Mimi', text: 'Hello! What is your name?', meaning: 'Halo! Siapa namamu?' },
            { speaker: 'Cia', text: 'Hi! My name is Cia. How are you?', meaning: 'Hai! Nama saya Cia. Apa kabarmu?' },
            { speaker: 'Mimi', text: 'I am happy and great! Nice to meet you, Cia!', meaning: 'Saya senang dan baik sekali! Senang bertemu denganmu, Cia!' },
          ],
        },
      },
      {
        id: 'basic-topic-2',
        title: 'Colors, Numbers & Pets (Warna, Angka & Hewan)',
        subtitle: 'Kosakata warna-warni, angka 1-10, dan hewan kesayangan',
        badge: 'Kosakata Favorit',
        icon: '🎨',
        description:
          'Mari mengenal warna-warni cerah di sekitar kita dan hewan peliharaan yang lucu.',
        kikoTip:
          'Coba sebutkan warna benda di kamarmu dalam bahasa Inggris: "My book is red!"',
        vocabularies: [
          {
            id: 'v-b5',
            english: 'Red, Blue, Yellow, Green',
            indonesian: 'Merah, Biru, Kuning, Hijau',
            category: 'Warna',
            emoji: '🌈',
            pronunciationHint: 'Red, Blu, Yel-lo, Grin',
            exampleSentence: 'The apple is red and the sky is blue.',
            sentenceMeaning: 'Apel itu berwarna merah dan langit berwarna biru.',
          },
          {
            id: 'v-b6',
            english: 'One, Two, Three, Four, Five',
            indonesian: 'Satu, Dua, Tiga, Empat, Lima',
            category: 'Angka',
            emoji: '🔢',
            pronunciationHint: 'Wan, Tu, Thri, For, Faiv',
            exampleSentence: 'I have three pencils.',
            sentenceMeaning: 'Saya punya tiga pensil.',
          },
          {
            id: 'v-b7',
            english: 'Cute cat and playful dog',
            indonesian: 'Kucing lucu dan anjing yang lincah',
            category: 'Hewan',
            emoji: '🐱',
            pronunciationHint: 'Kyut ket end plei-ful dog',
            exampleSentence: 'Mimi is a very cute cat.',
            sentenceMeaning: 'Mimi adalah kucing yang sangat lucu.',
          },
        ],
      },
      {
        id: 'basic-topic-3',
        title: 'Simple Present Tense (Jurus Waktu Sekarang & Kebiasaan)',
        subtitle: 'Pola kalimat kegiatan rutin sehari-hari dan fakta umum',
        badge: 'Tenses Dasar 1 ⏱️',
        icon: '⏰',
        description:
          'Simple Present Tense dipakai untuk menceritakan apa yang kita lakukan setiap hari (kebiasaan) atau hal-hal yang benar nyata.',
        kikoTip:
          'Rahasia He/She/It: Kalau pelakunya He, She, atau It (satu orang/benda), kata kerjanya harus ditambah huruf "s" atau "es"! (Contoh: He eats, She plays).',
        vocabularies: [
          {
            id: 'v-b8',
            english: 'Eat (Eats)',
            indonesian: 'Makan',
            category: 'Verb 1 (Kata Kerja)',
            emoji: '🍎',
            pronunciationHint: 'It (Its)',
            exampleSentence: 'I eat bread every morning.',
            sentenceMeaning: 'Saya makan roti setiap pagi.',
          },
          {
            id: 'v-b9',
            english: 'Play (Plays)',
            indonesian: 'Bermain',
            category: 'Verb 1 (Kata Kerja)',
            emoji: '⚽',
            pronunciationHint: 'Plei (Pleis)',
            exampleSentence: 'Cia plays with Mimi after school.',
            sentenceMeaning: 'Cia bermain bersama Mimi setelah pulang sekolah.',
          },
          {
            id: 'v-b10',
            english: 'Study (Studies)',
            indonesian: 'Belajar',
            category: 'Verb 1 (Kata Kerja)',
            emoji: '📚',
            pronunciationHint: 'Sta-di (Sta-diz)',
            exampleSentence: 'We study English together.',
            sentenceMeaning: 'Kita belajar bahasa Inggris bersama-sama.',
          },
        ],
        grammarFocus: {
          title: 'Rumus Simple Present Tense:',
          rules: [
            '1. Untuk I / You / We / They ➔ Gunakan kata kerja asli (Verb 1) tanpa tambahan.',
            '   Contoh: "They play ball" (Mereka bermain bola).',
            '2. Untuk He / She / It / Nama 1 Orang (Cia, Mimi) ➔ Tambahkan "s" atau "es" di kata kerja.',
            '   Contoh: "Cia reads a book" (Cia membaca buku).',
            '3. Kata To Be waktu sekarang: I am | You/We/They are | He/She/It is.',
            '   Contoh: "I am happy" (Saya senang), "Mimi is sleepy" (Mimi mengantuk).',
          ],
          tenseComparisons: [
            {
              title: 'Kebiasaan Rutin',
              formula: 'Subject + Verb 1',
              description: 'Menyatakan rutinitas harian yang sering dilakukan.',
              timeline: 'present',
              sentence: 'I drink milk every morning.',
              translation: 'Saya minum susu setiap pagi.',
              verbForm: 'Verb 1: drink',
              timeSignal: 'Every morning (Setiap pagi)',
            },
            {
              title: 'Subjek Tunggal (Orang Ketiga)',
              formula: 'He / She + Verb 1 + s',
              description: 'Kata kerja ketambahan akhiran "s".',
              timeline: 'present',
              sentence: 'She drinks fresh orange juice.',
              translation: 'Dia minum jus jeruk segar.',
              verbForm: 'Verb 1 + s: drinks',
              timeSignal: 'Usually (Biasanya)',
            },
          ],
        },
      },
    ],
    quizQuestions: [
      {
        id: 'qb-1',
        level: 'basic',
        question: 'Apa arti dari sapaan: "Good morning"?',
        options: ['Selamat malam', 'Selamat pagi', 'Selamat siang', 'Sampai jumpa'],
        correctAnswer: 'Selamat pagi',
        explanation: '"Good morning" diucapkan saat menyapa seseorang di pagi hari.',
        tip: 'Ingat kata "morning" artinya pagi!',
      },
      {
        id: 'qb-2',
        level: 'basic',
        question: 'Lengkapi kalimat perkenalan ini: "Hello, my ... is Cia."',
        options: ['book', 'name', 'color', 'cat'],
        correctAnswer: 'name',
        explanation: '"My name is Cia" artinya "Nama saya adalah Cia".',
        tip: 'Nama dalam bahasa Inggris adalah "name".',
      },
      {
        id: 'qb-3',
        level: 'basic',
        question: 'Apa bahasa Inggris dari warna "Kuning"?',
        options: ['Blue', 'Yellow', 'Green', 'Red'],
        correctAnswer: 'Yellow',
        explanation: 'Yellow artinya kuning, seperti warna buah pisang atau matahari!',
        tip: 'Blue = Biru, Red = Merah, Green = Hijau, Yellow = Kuning.',
      },
      {
        id: 'qb-4',
        level: 'basic',
        question: 'Berapakah jumlah: "Two + Three = ..."?',
        options: ['Four', 'Five', 'Six', 'Seven'],
        correctAnswer: 'Five',
        explanation: 'Two (2) + Three (3) = Five (5).',
        tip: 'Hitung jarimu: 2 ditambah 3 adalah 5 (Five).',
      },
      {
        id: 'qb-5',
        level: 'basic',
        question: 'Pilihlah to be yang benar: "I ... a smart student."',
        options: ['is', 'are', 'am', 'be'],
        correctAnswer: 'am',
        explanation: 'Pasangan to be untuk subjek "I" selalu "am" (I am).',
        tip: 'Ingat lagunya: I am, You are, He is, She is!',
      },
      {
        id: 'qb-6',
        level: 'basic',
        question: 'Dalam Simple Present Tense: "She ... milk every morning."',
        options: ['drink', 'drinks', 'drinking', 'drank'],
        correctAnswer: 'drinks',
        explanation: 'Karena subjeknya "She" (dia perempuan tunggal), kata kerja drink harus ditambah "s" ➔ drinks.',
        tip: 'He / She / It suka huruf "s" di belakang kata kerjanya!',
      },
      {
        id: 'qb-7',
        level: 'basic',
        question: 'Pilihlah kalimat yang benar untuk subjek "They":',
        options: ['They plays football', 'They play football', 'They is play', 'They playing'],
        correctAnswer: 'They play football',
        explanation: 'Untuk subjek "They" (mereka), gunakan Verb 1 asli tanpa "s" ➔ "They play football".',
        tip: 'They (banyak orang) tidak memakai tambahan "s".',
      },
      {
        id: 'qb-8',
        level: 'basic',
        question: 'Apa arti dari kalimat: "Mimi is a cute cat"?',
        options: ['Mimi adalah anjing besar', 'Mimi adalah kucing yang lucu', 'Mimi suka makan ikan', 'Mimi sedang tidur'],
        correctAnswer: 'Mimi adalah kucing yang lucu',
        explanation: 'Cute = lucu, cat = kucing.',
        tip: 'Cute artinya imut atau lucu.',
      },
      {
        id: 'qb-9',
        level: 'basic',
        question: 'Bagaimana jawaban yang sopan jika ditanya: "How are you?"',
        options: ['My name is Mimi', 'I am fine, thank you', 'It is blue', 'Goodbye'],
        correctAnswer: 'I am fine, thank you',
        explanation: 'Menjawab kabar baik dengan "I am fine, thank you" (Saya baik, terima kasih).',
        tip: '"How are you?" menanyakan kabar keadaanmu.',
      },
      {
        id: 'qb-10',
        level: 'basic',
        question: 'Pilihlah to be yang pas untuk Mimi: "Mimi ... sleepy."',
        options: ['am', 'are', 'is', 'were'],
        correctAnswer: 'is',
        explanation: 'Mimi adalah subjek tunggal (hewan/it), sehingga menggunakan to be "is".',
        tip: 'Satu orang/hewan pasangannya adalah "is".',
      },
    ],
  },

  // =========================================================================
  // 2. INTERMEDIATE LEVEL (Menengah: Routine, Continuous, Present vs Past)
  // =========================================================================
  {
    id: 'intermediate',
    name: 'Level 2: Intermediate (Menengah)',
    tagline: 'Daily Routine, Present Continuous (Sedang Terjadi) & Jembatan Waktu',
    symbol: '🌟',
    badgeColor: {
      bg: 'bg-amber-50',
      text: 'text-amber-800',
      border: 'border-amber-300',
      accent: 'bg-amber-500 hover:bg-amber-600',
    },
    topics: [
      {
        id: 'inter-topic-1',
        title: 'School Life & Daily Activities (Aktivitas Sekolah & Rumah)',
        subtitle: 'Menceritakan jadwal harian dari bangun tidur sampai belajar di sekolah',
        badge: 'Rutinitas Cia',
        icon: '🎒',
        description:
          'Belajar kosakata kegiatan harian seperti sarapan, pergi ke sekolah, dan membaca buku di perpustakaan.',
        kikoTip:
          'Gunakan penunjuk waktu: "At 6 o\'clock, I wake up" (Pada jam 6 tepat, saya bangun tidur).',
        vocabularies: [
          {
            id: 'v-i1',
            english: 'Wake up & Brush teeth',
            indonesian: 'Bangun tidur & Menggosok gigi',
            category: 'Aktivitas',
            emoji: '⏰',
            pronunciationHint: 'Weik ap end brash tith',
            exampleSentence: 'I wake up at six o\'clock and brush my teeth.',
            sentenceMeaning: 'Saya bangun jam 6 dan menggosok gigi saya.',
          },
          {
            id: 'v-i2',
            english: 'Have breakfast',
            indonesian: 'Makan sarapan pagi',
            category: 'Aktivitas',
            emoji: '🍳',
            pronunciationHint: 'Hev brek-fast',
            exampleSentence: 'We have breakfast with eggs and milk.',
            sentenceMeaning: 'Kami sarapan dengan telur dan susu.',
          },
          {
            id: 'v-i3',
            english: 'Backpack & Pencil case',
            indonesian: 'Tas ransel & Kotak pensil',
            category: 'Sekolah',
            emoji: '🎒',
            pronunciationHint: 'Bek-pek end pen-sil keis',
            exampleSentence: 'I put my notebook into my backpack.',
            sentenceMeaning: 'Saya memasukkan buku catatan ke dalam tas ransel saya.',
          },
        ],
      },
      {
        id: 'inter-topic-2',
        title: 'Present Continuous Tense (Kamera Langsung: Sedang Terjadi Sekarang!)',
        subtitle: 'Menceritakan aksi yang sedang berlangsung detik ini juga (Verb-ing)',
        badge: 'Tenses Dasar 2 🎥',
        icon: '🎥',
        description:
          'Bayangkan kamu sedang memegang kamera video live! Untuk menceritakan apa yang SEDANG berlangsung sekarang, kita pakai jurus: To Be (am/is/are) + Verb-ing!',
        kikoTip:
          'Ciri khasnya ada kata "Right now" (sekarang juga) atau "Look!" (Lihatlah!). Jangan lupa pasangkan "is/am/are" sebelum kata kerja berakhiran -ing ya!',
        vocabularies: [
          {
            id: 'v-i4',
            english: 'Reading (is reading)',
            indonesian: 'Sedang membaca',
            category: 'Action Verb-ing',
            emoji: '📖',
            pronunciationHint: 'Ri-ding',
            exampleSentence: 'Cia is reading a comic right now.',
            sentenceMeaning: 'Cia sedang membaca komik sekarang juga.',
          },
          {
            id: 'v-i5',
            english: 'Running (are running)',
            indonesian: 'Sedang berlari',
            category: 'Action Verb-ing',
            emoji: '🏃',
            pronunciationHint: 'Ran-ning',
            exampleSentence: 'The children are running in the playground.',
            sentenceMeaning: 'Anak-anak sedang berlari di taman bermain.',
          },
          {
            id: 'v-i6',
            english: 'Eating (am eating)',
            indonesian: 'Sedang makan',
            category: 'Action Verb-ing',
            emoji: '🍕',
            pronunciationHint: 'I-ting',
            exampleSentence: 'Look! Mimi is eating delicious fish.',
            sentenceMeaning: 'Lihat! Mimi sedang memakan ikan yang lezat.',
          },
        ],
        grammarFocus: {
          title: 'Rumus Present Continuous Tense:',
          rules: [
            '1. I ➔ am + Verb-ing (Contoh: "I am studying English")',
            '2. He / She / It ➔ is + Verb-ing (Contoh: "He is playing game")',
            '3. You / We / They ➔ are + Verb-ing (Contoh: "We are watching TV")',
            '4. Kata penunjuk waktu: now (sekarang), right now (saat ini juga), at the moment.',
          ],
          tenseComparisons: [
            {
              title: 'Present Rutin vs Sedang Terjadi',
              formula: 'V1 vs (is/am/are + V-ing)',
              description: 'Bandingkan kebiasaan vs yang sedang berlangsung sekarang.',
              timeline: 'continuous',
              sentence: 'Rutin: I eat apples. | Sekarang: I am eating an apple right now!',
              translation: 'Rutin: Saya biasa makan apel. | Sekarang: Saya sedang makan apel!',
              verbForm: 'am eating',
              timeSignal: 'Right now (Detik ini)',
            },
          ],
        },
      },
      {
        id: 'inter-topic-3',
        title: 'Present vs Past Preview (Jembatan Waktu: Hari Ini vs Kemarin)',
        subtitle: 'Mengenal perbedaan kata penunjuk waktu: Today vs Yesterday',
        badge: 'Jembatan Waktu 🌉',
        icon: '⏳',
        description:
          'Bagaimana cara menceritakan hal yang berbeda antara hari ini dengan kemarin? Mari kita bandingkan perubahannya!',
        kikoTip:
          'Today = Hari ini. Yesterday = Kemarin. Kata kerjanya akan berubah bentuk kalau sudah lewat kemarin!',
        vocabularies: [
          {
            id: 'v-i7',
            english: 'Today vs Yesterday',
            indonesian: 'Hari ini vs Kemarin',
            category: 'Keterangan Waktu',
            emoji: '📅',
            pronunciationHint: 'Tu-dei vs Yes-ter-dei',
            exampleSentence: 'Today I am happy, yesterday I was tired.',
            sentenceMeaning: 'Hari ini saya senang, kemarin saya lelah.',
          },
        ],
        grammarFocus: {
          title: 'Perubahan To Be (Waktu Sekarang vs Kemarin):',
          rules: [
            'Sekarang: I am / He is / She is ➔ Kemarin berubah jadi: WAS',
            'Sekarang: You are / We are / They are ➔ Kemarin berubah jadi: WERE',
            'Contoh: "Today it is sunny" (Hari ini cerah) ➔ "Yesterday it was rainy" (Kemarin hujan).',
          ],
          tenseComparisons: [
            {
              title: 'To Be Sekarang (Is/Am)',
              formula: 'Subject + is / am',
              description: 'Kondisi saat ini.',
              timeline: 'present',
              sentence: 'I am at home today.',
              translation: 'Saya ada di rumah hari ini.',
              verbForm: 'am',
              timeSignal: 'Today (Hari ini)',
            },
            {
              title: 'To Be Kemarin (Was)',
              formula: 'Subject + was',
              description: 'Kondisi kemarin yang sudah lewat.',
              timeline: 'past',
              sentence: 'I was at school yesterday.',
              translation: 'Saya ada di sekolah kemarin.',
              verbForm: 'was',
              timeSignal: 'Yesterday (Kemarin)',
            },
          ],
        },
      },
    ],
    quizQuestions: [
      {
        id: 'qi-1',
        level: 'intermediate',
        question: 'Lengkapi kalimat aksi langsung: "Look! Mimi ... sleeping on the sofa."',
        options: ['am', 'is', 'are', 'were'],
        correctAnswer: 'is',
        explanation: 'Mimi adalah subjek tunggal (it/kucing), pasangannya adalah "is" ➔ "is sleeping".',
        tip: 'Subjek 1 orang/hewan + is + Verb-ing.',
      },
      {
        id: 'qi-2',
        level: 'intermediate',
        question: 'Pilihlah bentuk Present Continuous yang tepat: "We ... English right now."',
        options: ['study', 'are studying', 'studied', 'is study'],
        correctAnswer: 'are studying',
        explanation: 'Untuk "We" dan keterangan "right now", gunakan "are studying".',
        tip: 'We + are + kata kerja berakhiran -ing.',
      },
      {
        id: 'qi-3',
        level: 'intermediate',
        question: 'Apa arti kalimat: "I am doing my homework right now"?',
        options: [
          'Saya sudah selesai PR kemarin',
          'Saya sedang mengerjakan PR saya saat ini',
          'Saya tidak mau mengerjakan PR',
          'Besok saya akan buat PR',
        ],
        correctAnswer: 'Saya sedang mengerjakan PR saya saat ini',
        explanation: '"am doing" artinya "sedang mengerjakan", "right now" artinya "saat ini".',
        tip: 'Verb-ing artinya aksi yang SEDANG berlangsung.',
      },
      {
        id: 'qi-4',
        level: 'intermediate',
        question: 'Kemarin Cia ada di taman. Pilihlah kata yang tepat: "Cia ... at the park yesterday."',
        options: ['is', 'are', 'was', 'am'],
        correctAnswer: 'was',
        explanation: 'Karena ada kata "yesterday" (kemarin) dan subjeknya "Cia" (tunggal), maka to be "is" berubah menjadi "was".',
        tip: 'Kemarin (yesterday) untuk satu orang memakai "was".',
      },
      {
        id: 'qi-5',
        level: 'intermediate',
        question: 'Perubahan to be "They are" untuk waktu kemarin (lampau) adalah...',
        options: ['They was', 'They were', 'They is', 'They am'],
        correctAnswer: 'They were',
        explanation: '"Are" berubah menjadi "were" untuk waktu lampau (kemarin).',
        tip: 'They / We / You di masa lalu memakai "were".',
      },
      {
        id: 'qi-6',
        level: 'intermediate',
        question: 'Benda apa yang kamu pakai untuk membawa buku ke sekolah?',
        options: ['Toothbrush', 'Backpack', 'Pillow', 'Fork'],
        correctAnswer: 'Backpack',
        explanation: 'Backpack artinya tas ransel sekolah!',
        tip: 'Backpack = tas ransel di punggung.',
      },
      {
        id: 'qi-7',
        level: 'intermediate',
        question: 'Lengkapi: "Listen! The baby is ... right now."',
        options: ['cries', 'crying', 'cried', 'cry'],
        correctAnswer: 'crying',
        explanation: 'Setelah kata "is", gunakan kata kerja berakhiran -ing ➔ "is crying".',
        tip: 'is + V-ing.',
      },
      {
        id: 'qi-8',
        level: 'intermediate',
        question: 'Manakah penanda waktu untuk kegiatan yang sedang berlangsung sekarang?',
        options: ['Yesterday', 'Right now', 'Last year', 'Two days ago'],
        correctAnswer: 'Right now',
        explanation: '"Right now" berarti "saat ini juga / sekarang".',
        tip: 'Now / Right now menunjukkan saat ini.',
      },
      {
        id: 'qi-9',
        level: 'intermediate',
        question: 'Apa arti kalimat: "They were happy yesterday"?',
        options: ['Mereka senang hari ini', 'Mereka bahagia kemarin', 'Mereka akan senang besok', 'Mereka sedang sedih'],
        correctAnswer: 'Mereka bahagia kemarin',
        explanation: '"were" dan "yesterday" menunjukkan kejadian di waktu kemarin.',
        tip: 'Yesterday = kemarin.',
      },
      {
        id: 'qi-10',
        level: 'intermediate',
        question: 'Pilihlah kalimat yang benar saat Cia sedang makan es krim sekarang:',
        options: ['Cia ate ice cream', 'Cia is eating ice cream', 'Cia eat ice cream', 'Cia was eat'],
        correctAnswer: 'Cia is eating ice cream',
        explanation: 'Karena sedang berlangsung sekarang, gunakan "is eating".',
        tip: 'Sedang makan = is eating.',
      },
    ],
  },

  // =========================================================================
  // 3. EXPERT LEVEL (Mahir: Simple Past Tense, Irregular Verbs, Story)
  // =========================================================================
  {
    id: 'expert',
    name: 'Level 3: Expert (Mahir)',
    tagline: 'Simple Past Tense (Mesin Waktu Kemarin), Kata Kerja Ajaib & Cerita Petualangan',
    symbol: '👑',
    badgeColor: {
      bg: 'bg-purple-50',
      text: 'text-purple-800',
      border: 'border-purple-300',
      accent: 'bg-purple-500 hover:bg-purple-600',
    },
    topics: [
      {
        id: 'expert-topic-1',
        title: 'Simple Past Tense: Mesin Waktu Kemarin (Verb 2)',
        subtitle: 'Menceritakan pengalaman seru di masa lampau menggunakan kata kerja bentuk kedua',
        badge: 'Tenses Dasar 3 ⏪',
        icon: '🕰️',
        description:
          'Setiap kali kita menceritakan apa yang sudah terjadi (kemarin, minggu lalu, tadi pagi), kata kerja bahasa Inggris berubah ke bentuk lampau (Verb 2).',
        kikoTip:
          'Ada yang tinggal ditambah "-ed" (Regular Verbs, seperti play ➔ played). Tapi ada juga kata kerja ajaib yang berubah bentuknya (Irregular Verbs, seperti go ➔ went)!',
        vocabularies: [
          {
            id: 'v-e1',
            english: 'Play ➔ Played',
            indonesian: 'Bermain ➔ Sudah bermain (kemarin)',
            category: 'Regular Verb 2 (+ed)',
            emoji: '🎮',
            pronunciationHint: 'Plei ➔ Pleid',
            exampleSentence: 'Yesterday, Cia played puzzle with Mimi.',
            sentenceMeaning: 'Kemarin, Cia bermain puzzle bersama Mimi.',
          },
          {
            id: 'v-e2',
            english: 'Watch ➔ Watched',
            indonesian: 'Menonton ➔ Sudah menonton',
            category: 'Regular Verb 2 (+ed)',
            emoji: '📺',
            pronunciationHint: 'Woch ➔ Woch-t',
            exampleSentence: 'We watched a funny cartoon last night.',
            sentenceMeaning: 'Kami menonton kartun lucu tadi malam.',
          },
          {
            id: 'v-e3',
            english: 'Go ➔ Went',
            indonesian: 'Pergi ➔ Sudah pergi (ke suatu tempat)',
            category: 'Irregular Verb (Ajaib)',
            emoji: '🚀',
            pronunciationHint: 'Gou ➔ Went',
            exampleSentence: 'Last Sunday, I went to the zoo with my family.',
            sentenceMeaning: 'Hari Minggu lalu, saya pergi ke kebun binatang bersama keluarga saya.',
          },
          {
            id: 'v-e4',
            english: 'Eat ➔ Ate',
            indonesian: 'Makan ➔ Sudah makan',
            category: 'Irregular Verb (Ajaib)',
            emoji: '🥞',
            pronunciationHint: 'It ➔ Eit',
            exampleSentence: 'Mimi ate delicious fish yesterday.',
            sentenceMeaning: 'Mimi makan ikan lezat kemarin.',
          },
          {
            id: 'v-e5',
            english: 'See ➔ Saw',
            indonesian: 'Melihat ➔ Sudah melihat',
            category: 'Irregular Verb (Ajaib)',
            emoji: '👀',
            pronunciationHint: 'Si ➔ So',
            exampleSentence: 'I saw a big colorful butterfly in the garden.',
            sentenceMeaning: 'Saya melihat kupu-kupu besar berwarna-warni di taman.',
          },
        ],
        grammarFocus: {
          title: 'Tabel 3 Waktu Ajaib (Perbandingan Kata Kerja):',
          rules: [
            '1. Waktu Sekarang (Present): "I go to school every day."',
            '2. Sedang Terjadi (Continuous): "I am going to school right now."',
            '3. Waktu Kemarin (Past): "Yesterday, I went to school."',
            'Kata penunjuk waktu lampau: Yesterday (kemarin), Last night (tadi malam), Last week (minggu lalu).',
          ],
          tenseComparisons: [
            {
              title: 'Waktu Sekarang (Present)',
              formula: 'Subject + Verb 1',
              description: 'Kebiasaan sehari-hari.',
              timeline: 'present',
              sentence: 'I eat an apple.',
              translation: 'Saya makan apel (kebiasaan).',
              verbForm: 'V1: eat',
              timeSignal: 'Every day',
            },
            {
              title: 'Sedang Terjadi (Continuous)',
              formula: 'Subject + is/am/are + V-ing',
              description: 'Sedang berlangsung detik ini.',
              timeline: 'continuous',
              sentence: 'I am eating an apple.',
              translation: 'Saya sedang makan apel (saat ini).',
              verbForm: 'am eating',
              timeSignal: 'Right now',
            },
            {
              title: 'Waktu Lampau (Past)',
              formula: 'Subject + Verb 2',
              description: 'Sudah terjadi kemarin.',
              timeline: 'past',
              sentence: 'Yesterday, I ate an apple.',
              translation: 'Kemarin, saya makan sebuah apel.',
              verbForm: 'V2: ate',
              timeSignal: 'Yesterday',
            },
          ],
        },
      },
      {
        id: 'expert-topic-2',
        title: 'Story Time: Cia & Mimi’s Weekend Trip (Petualangan Akhir Pekan)',
        subtitle: 'Cerita pendek seru memadukan kalimat waktu lampau dan pemahaman bacaan',
        badge: 'Reading Adventure 📖',
        icon: '🏰',
        description:
          'Baca cerita petualangan Cia dan Mimi saat berkunjung ke kebun bunga dan pantai akhir pekan lalu.',
        kikoTip:
          'Perhatikan kata kerja lampau yang dicetak tebal seperti "went", "saw", dan "played".',
        vocabularies: [
          {
            id: 'v-e6',
            english: 'Beach & Sea',
            indonesian: 'Pantai & Lautan',
            category: 'Tempat',
            emoji: '🏖️',
            pronunciationHint: 'Bich end Si',
            exampleSentence: 'We walked along the sunny beach.',
            sentenceMeaning: 'Kami berjalan di sepanjang pantai yang cerah.',
          },
          {
            id: 'v-e7',
            english: 'Sandcastle',
            indonesian: 'Istana pasir',
            category: 'Benda',
            emoji: '🏰',
            pronunciationHint: 'Send-kes-el',
            exampleSentence: 'Cia built a wonderful sandcastle.',
            sentenceMeaning: 'Cia membangun istana pasir yang indah.',
          },
        ],
        conversation: {
          characterA: 'Mimi',
          characterB: 'Cia',
          dialogue: [
            { speaker: 'Mimi', text: 'Where did you go last Saturday, Cia?', meaning: 'Ke mana kamu pergi hari Sabtu lalu, Cia?' },
            { speaker: 'Cia', text: 'I went to the beach with my parents! We saw big waves.', meaning: 'Saya pergi ke pantai bersama orang tua saya! Kami melihat ombak besar.' },
            { speaker: 'Mimi', text: 'Did you build a sandcastle?', meaning: 'Apakah kamu membangun istana pasir?' },
            { speaker: 'Cia', text: 'Yes, I built a big castle and ate delicious ice cream!', meaning: 'Ya, saya membuat istana besar dan memakan es krim yang enak!' },
          ],
        },
      },
    ],
    quizQuestions: [
      {
        id: 'qe-1',
        level: 'expert',
        question: 'Apakah bentuk kedua (Verb 2) dari kata kerja "GO" (pergi)?',
        options: ['Goes', 'Going', 'Went', 'Gone'],
        correctAnswer: 'Went',
        explanation: 'Kata kerja "go" adalah irregular verb (kata kerja ajaib) yang berubah menjadi "went" di masa lampau.',
        tip: 'Go ➔ Went.',
      },
      {
        id: 'qe-2',
        level: 'expert',
        question: 'Lengkapi kalimat lampau ini: "Yesterday, Cia ... delicious fried rice."',
        options: ['eat', 'ate', 'eating', 'eats'],
        correctAnswer: 'ate',
        explanation: 'Karena ada kata "yesterday" (kemarin), kata kerja eat berubah menjadi Verb 2 yaitu "ate".',
        tip: 'Eat (sekarang) ➔ Ate (kemarin).',
      },
      {
        id: 'qe-3',
        level: 'expert',
        question: 'Manakah bentuk Verb 2 dari kata kerja beraturan "PLAY"?',
        options: ['Playing', 'Plays', 'Played', 'Play'],
        correctAnswer: 'Played',
        explanation: 'Kata kerja beraturan (regular verb) cukup ditambahkan akhiran "-ed" ➔ played.',
        tip: 'Play + ed = Played.',
      },
      {
        id: 'qe-4',
        level: 'expert',
        question: 'Apa arti dari kalimat: "We saw three dolphins in the sea last week"?',
        options: [
          'Kami melihat tiga lumba-lumba di laut minggu lalu',
          'Kami sedang berenang dengan lumba-lumba',
          'Tiga lumba-lumba melompat ke darat',
          'Besok kami akan melihat lumba-lumba',
        ],
        correctAnswer: 'Kami melihat tiga lumba-lumba di laut minggu lalu',
        explanation: '"saw" adalah bentuk lampau dari see (melihat), "last week" = minggu lalu.',
        tip: 'Saw = sudah melihat.',
      },
      {
        id: 'qe-5',
        level: 'expert',
        question: 'Bandingkan 3 waktu: Sekarang (Present), Sedang Terjadi (Continuous), dan Kemarin (Past) dari kata "BUY" (membeli):',
        options: [
          'Buy | is buying | bought',
          'Bought | buying | buys',
          'Buy | buyed | is buy',
          'Buys | bought | buying',
        ],
        correctAnswer: 'Buy | is buying | bought',
        explanation: 'Bentuk Verb 1 adalah "buy", continuous "is buying", dan Verb 2 lampau adalah "bought".',
        tip: 'Buy (V1) ➔ Bought (V2).',
      },
      {
        id: 'qe-6',
        level: 'expert',
        question: 'Pilihlah kalimat yang menunjukkan waktu lampau (Simple Past Tense) yang benar:',
        options: [
          'I am going to school now',
          'I go to school every day',
          'I went to school yesterday',
          'I will go to school tomorrow',
        ],
        correctAnswer: 'I went to school yesterday',
        explanation: '"went" dan "yesterday" adalah ciri khas Simple Past Tense.',
        tip: 'Cari kata kerja Verb 2 dan keterangan waktu lampau.',
      },
      {
        id: 'qe-7',
        level: 'expert',
        question: 'Kemarin malam Mimi tidur di kasur. Bahasa Inggrisnya adalah: "Last night, Mimi ... on the bed."',
        options: ['sleeps', 'sleeping', 'slept', 'is sleep'],
        correctAnswer: 'slept',
        explanation: 'Bentuk kedua (Verb 2) dari kata "sleep" adalah "slept".',
        tip: 'Sleep ➔ Slept.',
      },
      {
        id: 'qe-8',
        level: 'expert',
        question: 'Apa arti kata penunjuk waktu "Last night"?',
        options: ['Tadi malam', 'Besok pagi', 'Sekarang', 'Tadi siang'],
        correctAnswer: 'Tadi malam',
        explanation: '"Last night" berarti tadi malam / malam kemarin.',
        tip: 'Night = malam, last night = tadi malam.',
      },
      {
        id: 'qe-9',
        level: 'expert',
        question: 'Lengkapi percakapan: "Where did you go yesterday?" - "I ... to the city park."',
        options: ['go', 'goes', 'went', 'going'],
        correctAnswer: 'went',
        explanation: 'Menjawab pertanyaan lampau "Where did you go...?" dengan Verb 2: "I went...".',
        tip: 'Jawab dengan Verb 2 (went).',
      },
      {
        id: 'qe-10',
        level: 'expert',
        question: 'Manakah pasangan kata kerja Verb 1 ➔ Verb 2 yang TIDAK BENAR?',
        options: [
          'Eat ➔ Ate',
          'Go ➔ Went',
          'See ➔ Saw',
          'Drink ➔ Drinked',
        ],
        correctAnswer: 'Drink ➔ Drinked',
        explanation: 'Perubahan "drink" yang benar adalah "drank", bukan "drinked"!',
        tip: 'Drink ➔ Drank (bukan drinked).',
      },
    ],
  },
];
