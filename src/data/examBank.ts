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

// Generators per topic
type QuestionGenerator = (index: number) => ExamQuestion;

// =================== TOPIC 1: BAB 1 - BILANGAN CACAH SAMPAI 10.000 ===================
const bab1Generators: QuestionGenerator[] = [
  // 1. Nilai tempat ribuan
  (idx) => {
    const th = randInt(2, 9);
    const h = randInt(1, 9);
    const t = randInt(1, 9);
    const o = randInt(1, 9);
    const num = th * 1000 + h * 100 + t * 10 + o;
    const places = [
      { name: 'RIBUAN', val: th, answerVal: `${th}` },
      { name: 'RATUSAN', val: h, answerVal: `${h}` },
      { name: 'PULUHAN', val: t, answerVal: `${t}` },
      { name: 'SATUAN', val: o, answerVal: `${o}` },
    ];
    const picked = places[randInt(0, 3)];
    const correct = picked.answerVal;
    const distractors = Array.from(new Set([`${th}`, `${h}`, `${t}`, `${o}`, `${randInt(1, 9)}`]))
      .filter(x => x !== correct)
      .slice(0, 3);
    while (distractors.length < 3) distractors.push(`${(parseInt(correct) + distractors.length + 1) % 10}`);

    return {
      id: `b1-place-${idx}-${num}`,
      number: idx,
      chapterTitle: 'Bab 1: Bilangan Cacah sampai 10.000',
      category: 'Nilai Tempat',
      question: `Pada bilangan ${formatId(num)}, angka berapakah yang menempati nilai tempat ${picked.name}?`,
      options: shuffle([correct, ...distractors]),
      correctAnswer: correct,
      explanation: `Bilangan ${formatId(num)} tersusun atas ${th} ribuan (${formatId(th * 1000)}), ${h} ratusan (${h * 100}), ${t} puluhan (${t * 10}), dan ${o} satuan (${o}). Jadi nilai tempat ${picked.name} ditempati oleh angka ${picked.answerVal}.`,
    };
  },

  // 2. Dekomposisi bentuk panjang
  (idx) => {
    const th = randInt(1, 8);
    const h = randInt(1, 9);
    const t = randInt(1, 9);
    const o = randInt(1, 9);
    const num = th * 1000 + h * 100 + t * 10 + o;
    const correct = `${formatId(th * 1000)} + ${h * 100} + ${t * 10} + ${o}`;
    const wrong1 = `${formatId(th * 100)} + ${h * 100} + ${t * 10} + ${o}`;
    const wrong2 = `${formatId(th * 1000)} + ${h * 10} + ${t * 100} + ${o}`;
    const wrong3 = `${formatId(th * 1000)} + ${h * 100} + ${t} + ${o * 10}`;

    return {
      id: `b1-decomp-${idx}-${num}`,
      number: idx,
      chapterTitle: 'Bab 1: Bilangan Cacah sampai 10.000',
      category: 'Bentuk Panjang',
      question: `Bentuk panjang (dekomposisi) dari bilangan ${formatId(num)} adalah...`,
      options: shuffle([correct, wrong1, wrong2, wrong3]),
      correctAnswer: correct,
      explanation: `Uraikan nilai setiap digit sesuai tempatnya: ${th} ribuan (${formatId(th * 1000)}) + ${h} ratusan (${h * 100}) + ${t} puluhan (${t * 10}) + ${o} satuan (${o}) = ${correct}.`,
    };
  },

  // 3. Membaca bilangan dengan nol di tengah
  (idx) => {
    const th = randInt(2, 9);
    const ones = randInt(1, 9);
    const num = th * 1000 + ones;
    const wordsTh = ['', 'Satu', 'Dua', 'Tiga', 'Empat', 'Lima', 'Enam', 'Tujuh', 'Delapan', 'Sembilan'];
    const wordsOnes = ['', 'satu', 'dua', 'tiga', 'empat', 'lima', 'enam', 'tujuh', 'delapan', 'sembilan'];

    const correct = `${wordsTh[th]} ribu ${wordsOnes[ones]}`;
    const wrong1 = `${wordsTh[th]} ratus ${wordsOnes[ones]}`;
    const wrong2 = `${wordsTh[th]} ribu nol ratus ${wordsOnes[ones]}`;
    const wrong3 = `${wordsTh[th]} ribu ${wordsOnes[ones]} puluh`;

    return {
      id: `b1-read-${idx}-${num}`,
      number: idx,
      chapterTitle: 'Bab 1: Bilangan Cacah sampai 10.000',
      category: 'Membaca Bilangan',
      question: `Lambang bilangan ${formatId(num)} dibaca...`,
      options: shuffle([correct, wrong1, wrong2, wrong3]),
      correctAnswer: correct,
      explanation: `Karena angka ratusan dan puluhan bernilai nol (0), maka tidak perlu diucapkan. ${formatId(num)} dibaca "${correct}".`,
    };
  },

  // 4. Membandingkan dua bilangan 4 digit
  (idx) => {
    const th = randInt(2, 8);
    const num1 = th * 1000 + randInt(200, 400);
    const num2 = th * 1000 + randInt(500, 800);
    const isNum1Smaller = num1 < num2;
    const correct = isNum1Smaller ? '< (lebih kecil)' : '> (lebih besar)';
    const wrong1 = isNum1Smaller ? '> (lebih besar)' : '< (lebih kecil)';
    const wrong2 = '= (sama dengan)';
    const wrong3 = '>= (lebih dari)';

    return {
      id: `b1-comp-${idx}-${num1}`,
      number: idx,
      chapterTitle: 'Bab 1: Bilangan Cacah sampai 10.000',
      category: 'Membandingkan Bilangan',
      question: `Tanda perbandingan yang tepat untuk: ${formatId(num1)} ... ${formatId(num2)} adalah...`,
      options: [correct, wrong1, wrong2, wrong3],
      correctAnswer: correct,
      explanation: `Angka ribuan keduanya sama (${formatId(th * 1000)}). Lihat ratusannya: ${formatId(num1)} ratusannya lebih ${isNum1Smaller ? 'kecil' : 'besar'} dibanding ${formatId(num2)}. Maka ${formatId(num1)} ${isNum1Smaller ? '<' : '>'} ${formatId(num2)}.`,
    };
  },

  // 5. Penjumlahan susun menyimpan sampai 10.000
  (idx) => {
    const a = randInt(1500, 4500);
    const b = randInt(1200, 4800);
    const sum = a + b;
    const correct = formatId(sum);
    const wrong1 = formatId(sum + 10);
    const wrong2 = formatId(sum - 100);
    const wrong3 = formatId(sum + 100);

    return {
      id: `b1-add-${idx}-${a}`,
      number: idx,
      chapterTitle: 'Bab 1: Bilangan Cacah sampai 10.000',
      category: 'Penjumlahan Susun',
      question: `Hasil dari penjumlahan bersusun ${formatId(a)} + ${formatId(b)} adalah...`,
      options: shuffle([correct, wrong1, wrong2, wrong3]),
      correctAnswer: correct,
      explanation: `Jumlahkan dari digit satuan lurus ke kiri: ${formatId(a)} + ${formatId(b)} = ${correct}. Jika hasil kolom ≥ 10, simpan 1 di atas kolom sebelah kirinya.`,
    };
  },

  // 6. Pengurangan susun meminjam sampai 10.000
  (idx) => {
    const diff = randInt(1200, 3500);
    const b = randInt(1500, 4500);
    const a = b + diff; // ensures a > b
    const correct = formatId(diff);
    const wrong1 = formatId(diff + 10);
    const wrong2 = formatId(diff - 10);
    const wrong3 = formatId(diff + 100);

    return {
      id: `b1-sub-${idx}-${a}`,
      number: idx,
      chapterTitle: 'Bab 1: Bilangan Cacah sampai 10.000',
      category: 'Pengurangan Susun',
      question: `Hasil dari pengurangan bersusun ${formatId(a)} - ${formatId(b)} adalah...`,
      options: shuffle([correct, wrong1, wrong2, wrong3]),
      correctAnswer: correct,
      explanation: `Kurangkan dari digit satuan ke ribuan: ${formatId(a)} - ${formatId(b)} = ${correct}. Gunakan teknik meminjam jika angka atas lebih kecil dari angka bawah.`,
    };
  },

  // 7. Perkalian kelipatan ribuan
  (idx) => {
    const mult = randInt(2, 5);
    const base = randInt(1, 4) * 1000;
    const res = mult * base;
    const correct = formatId(res);
    const wrong1 = formatId(res - 1000);
    const wrong2 = formatId(res + 1000);
    const wrong3 = formatId(res / 10);

    return {
      id: `b1-mult-${idx}-${base}`,
      number: idx,
      chapterTitle: 'Bab 1: Bilangan Cacah sampai 10.000',
      category: 'Perkalian Ribuan',
      question: `Berapakah hasil perkalian dari ${mult} × ${formatId(base)}?`,
      options: shuffle([correct, wrong1, wrong2, wrong3]),
      correctAnswer: correct,
      explanation: `Gunakan trik nol: kalikan angka depan ${mult} × ${base / 1000} = ${mult * (base / 1000)}, lalu tambahkan 3 angka nol di belakangnya ➔ ${correct}.`,
    };
  },

  // 8. Pembagian ribuan adil
  (idx) => {
    const divisor = randInt(2, 4);
    const res = randInt(1, 3) * 1000;
    const dividend = divisor * res;
    const correct = formatId(res);
    const wrong1 = formatId(res + 500);
    const wrong2 = formatId(res - 500);
    const wrong3 = formatId(res * 2);

    return {
      id: `b1-div-${idx}-${dividend}`,
      number: idx,
      chapterTitle: 'Bab 1: Bilangan Cacah sampai 10.000',
      category: 'Pembagian Ribuan',
      question: `Kakek membagikan uang Rp ${formatId(dividend)} sama rata kepada ${divisor} cucunya. Berapa rupiah yang didapat masing-masing cucu?`,
      options: shuffle([`Rp ${correct}`, `Rp ${wrong1}`, `Rp ${wrong2}`, `Rp ${wrong3}`]),
      correctAnswer: `Rp ${correct}`,
      explanation: `Rp ${formatId(dividend)} ÷ ${divisor} = Rp (${dividend / 1000} ÷ ${divisor}) ribu = Rp ${correct}.`,
    };
  },
];

// =================== TOPIC 2: BAB 2 - KALIMAT MATEMATIKA & POLA BILANGAN ===================
const bab2Generators: QuestionGenerator[] = [
  // 1. Kotak misteri penjumlahan
  (idx) => {
    const known = randInt(120, 450);
    const mystery = randInt(50, 300);
    const total = known + mystery;
    const correct = `${mystery}`;
    const wrong1 = `${mystery + 10}`;
    const wrong2 = `${mystery - 10}`;
    const wrong3 = `${total + known}`;

    return {
      id: `b2-box-add-${idx}-${total}`,
      number: idx,
      chapterTitle: 'Bab 2: Kalimat Matematika & Pola Bilangan',
      category: 'Kotak Misteri',
      question: `Tentukan nilai ⬜ yang tepat pada kalimat matematika: ${known} + ⬜ = ${total}`,
      options: shuffle([correct, wrong1, wrong2, wrong3]),
      correctAnswer: correct,
      explanation: `Untuk mencari angka misteri penjumlahan, kurangkan hasil akhir dengan angka yang sudah diketahui: ⬜ = ${total} - ${known} = ${correct}.`,
    };
  },

  // 2. Kotak misteri pengurangan
  (idx) => {
    const total = randInt(300, 700);
    const result = randInt(100, 250);
    const mystery = total - result;
    const correct = `${mystery}`;
    const wrong1 = `${mystery + 20}`;
    const wrong2 = `${mystery - 20}`;
    const wrong3 = `${total + result}`;

    return {
      id: `b2-box-sub-${idx}-${total}`,
      number: idx,
      chapterTitle: 'Bab 2: Kalimat Matematika & Pola Bilangan',
      category: 'Kotak Misteri',
      question: `Tentukan nilai ⬜ yang memenuhi persamaan: ${total} - ⬜ = ${result}`,
      options: shuffle([correct, wrong1, wrong2, wrong3]),
      correctAnswer: correct,
      explanation: `Untuk mencari angka pengurang: ⬜ = ${total} - ${result} = ${correct}.`,
    };
  },

  // 3. Pola bilangan loncat membesar
  (idx) => {
    const step = [3, 4, 5, 10, 25, 50][randInt(0, 5)];
    const start = randInt(10, 100);
    const n1 = start;
    const n2 = n1 + step;
    const n3 = n2 + step;
    const n4 = n3 + step; // target
    const n5 = n4 + step; // target 2
    const correct = `${n4}, ${n5}`;
    const wrong1 = `${n4 + 2}, ${n5 + 4}`;
    const wrong2 = `${n4 - 1}, ${n5}`;
    const wrong3 = `${n4 + step}, ${n5 + step}`;

    return {
      id: `b2-pat-inc-${idx}-${start}`,
      number: idx,
      chapterTitle: 'Bab 2: Kalimat Matematika & Pola Bilangan',
      category: 'Pola Bilangan',
      question: `Perhatikan barisan bilangan: ${n1}, ${n2}, ${n3}, ..., ... Dua bilangan berikutnya adalah...`,
      options: shuffle([correct, wrong1, wrong2, wrong3]),
      correctAnswer: correct,
      explanation: `Aturan pola ini adalah bertambah ${step} (+${step}) di setiap langkah. Suku ke-4 = ${n3} + ${step} = ${n4}, dan suku ke-5 = ${n4} + ${step} = ${n5}.`,
    };
  },

  // 4. Pola bilangan loncat mengecil
  (idx) => {
    const step = [5, 10, 20, 50][randInt(0, 3)];
    const start = randInt(200, 500);
    const n1 = start;
    const n2 = n1 - step;
    const n3 = n2 - step;
    const n4 = n3 - step;
    const correct = `${n4}`;
    const wrong1 = `${n4 + step}`;
    const wrong2 = `${n4 - 5}`;
    const wrong3 = `${n4 + 10}`;

    return {
      id: `b2-pat-dec-${idx}-${start}`,
      number: idx,
      chapterTitle: 'Bab 2: Kalimat Matematika & Pola Bilangan',
      category: 'Pola Bilangan',
      question: `Lengkapi bilangan selanjutnya pada pola mengecil berikut: ${n1}, ${n2}, ${n3}, ...`,
      options: shuffle([correct, wrong1, wrong2, wrong3]),
      correctAnswer: correct,
      explanation: `Setiap bilangan berkurang ${step} (-${step}). Maka bilangan berikutnya adalah ${n3} - ${step} = ${correct}.`,
    };
  },
];

// =================== TOPIC 3: BAB 3 - PENGUKURAN PANJANG, BERAT, & WAKTU ===================
const bab3Generators: QuestionGenerator[] = [
  // 1. Konversi meter ke cm
  (idx) => {
    const m = randInt(2, 9);
    const cmExtra = randInt(1, 9) * 10;
    const totalCm = m * 100 + cmExtra;
    const correct = `${totalCm} cm`;
    const wrong1 = `${m * 10 + cmExtra} cm`;
    const wrong2 = `${totalCm + 100} cm`;
    const wrong3 = `${m * 1000 + cmExtra} cm`;

    return {
      id: `b3-length-mcm-${idx}-${m}`,
      number: idx,
      chapterTitle: 'Bab 3: Pengukuran Panjang, Berat, & Waktu',
      category: 'Pengukuran Panjang',
      question: `Panjang pita hiasan kelas adalah ${m} meter ${cmExtra} cm. Panjang pita tersebut sama dengan...`,
      options: shuffle([correct, wrong1, wrong2, wrong3]),
      correctAnswer: correct,
      explanation: `Ingat bahwa 1 meter = 100 cm. Maka ${m} m = ${m * 100} cm. Total panjang = ${m * 100} cm + ${cmExtra} cm = ${correct}.`,
    };
  },

  // 2. Konversi km ke meter
  (idx) => {
    const km = randInt(2, 6);
    const m = randInt(1, 9) * 50;
    const totalM = km * 1000 + m;
    const correct = `${formatId(totalM)} meter`;
    const wrong1 = `${formatId(km * 100 + m)} meter`;
    const wrong2 = `${formatId(totalM + 1000)} meter`;
    const wrong3 = `${formatId(totalM - 500)} meter`;

    return {
      id: `b3-dist-km-${idx}-${km}`,
      number: idx,
      chapterTitle: 'Bab 3: Pengukuran Panjang, Berat, & Waktu',
      category: 'Pengukuran Panjang',
      question: `Jarak dari rumah Cia ke sekolah adalah ${km} km ${m} m. Berapa meter jarak rumah Cia ke sekolah?`,
      options: shuffle([correct, wrong1, wrong2, wrong3]),
      correctAnswer: correct,
      explanation: `1 kilometer = 1.000 meter. Maka ${km} km = ${formatId(km * 1000)} m. Jarak total = ${formatId(km * 1000)} + ${m} = ${correct}.`,
    };
  },

  // 3. Konversi kg ke gram
  (idx) => {
    const kg = randInt(2, 7);
    const gExtra = randInt(1, 5) * 100;
    const totalG = kg * 1000 + gExtra;
    const correct = `${formatId(totalG)} gram`;
    const wrong1 = `${formatId(kg * 100 + gExtra)} gram`;
    const wrong2 = `${formatId(totalG + 500)} gram`;
    const wrong3 = `${formatId(kg * 10000 + gExtra)} gram`;

    return {
      id: `b3-weight-kg-${idx}-${kg}`,
      number: idx,
      chapterTitle: 'Bab 3: Pengukuran Panjang, Berat, & Waktu',
      category: 'Pengukuran Berat',
      question: `Ibu membeli semangka dengan berat ${kg} kg ${gExtra} gram. Berat semangka dalam satuan gram adalah...`,
      options: shuffle([correct, wrong1, wrong2, wrong3]),
      correctAnswer: correct,
      explanation: `1 kg = 1.000 gram. Maka ${kg} kg = ${formatId(kg * 1000)} gram. Total berat = ${formatId(kg * 1000)} + ${gExtra} = ${correct}.`,
    };
  },

  // 4. Membaca jam / lama waktu
  (idx) => {
    const startHour = randInt(7, 10);
    const durationHours = randInt(1, 3);
    const endHour = startHour + durationHours;
    const correct = `${durationHours} jam`;
    const wrong1 = `${durationHours + 1} jam`;
    const wrong2 = `${durationHours * 30} jam`;
    const wrong3 = `${durationHours + 2} jam`;

    return {
      id: `b3-time-dur-${idx}-${startHour}`,
      number: idx,
      chapterTitle: 'Bab 3: Pengukuran Panjang, Berat, & Waktu',
      category: 'Pengukuran Waktu',
      question: `Cia mulai belajar pukul 0${startHour}.00 dan selesai pada pukul ${endHour < 10 ? '0' + endHour : endHour}.00. Berapa lama Cia belajar?`,
      options: shuffle([correct, wrong1, wrong2, wrong3]),
      correctAnswer: correct,
      explanation: `Lama waktu = Jam selesai - Jam mulai = ${endHour}.00 - 0${startHour}.00 = ${correct} (${durationHours * 60} menit).`,
    };
  },
];

// =================== TOPIC 4: BAB 4 - PECAHAN & BANGUN DATAR ===================
const bab4Generators: QuestionGenerator[] = [
  // 1. Pecahan bagian kue / pizza
  (idx) => {
    const parts = [2, 4, 6, 8][randInt(0, 3)];
    const taken = 1;
    const correct = `${taken}/${parts}`;
    const wrong1 = `${parts}/${taken}`;
    const wrong2 = `${taken}/${parts + 1}`;
    const wrong3 = `${taken}/${parts - 1}`;

    return {
      id: `b4-frac-pizza-${idx}-${parts}`,
      number: idx,
      chapterTitle: 'Bab 4: Pecahan & Bangun Datar',
      category: 'Pecahan Sederhana',
      question: `Sebuah kue dipotong menjadi ${parts} bagian sama besar. Mimi memakan ${taken} potong kue. Nilai pecahan dari bagian yang dimakan Mimi adalah...`,
      options: shuffle([correct, wrong1, wrong2, wrong3]),
      correctAnswer: correct,
      explanation: `Pecahan menyatakan bagian dari keseluruhan. 1 potong dari ${parts} bagian yang sama ditulis sebagai ${correct}.`,
    };
  },

  // 2. Membandingkan pecahan penyebut sama
  (idx) => {
    const denom = randInt(5, 9);
    const num1 = randInt(2, denom - 2);
    const num2 = num1 + randInt(1, 2);
    const correct = '< (lebih kecil)';
    const wrong1 = '> (lebih besar)';
    const wrong2 = '= (sama dengan)';
    const wrong3 = '>= (lebih dari)';

    return {
      id: `b4-frac-comp-${idx}-${denom}`,
      number: idx,
      chapterTitle: 'Bab 4: Pecahan & Bangun Datar',
      category: 'Membandingkan Pecahan',
      question: `Bandingkan kedua pecahan berikut: ${num1}/${denom} ... ${num2}/${denom}. Tanda perbandingan yang tepat adalah...`,
      options: [correct, wrong1, wrong2, wrong3],
      correctAnswer: correct,
      explanation: `Jika penyebut kedua pecahan sama (${denom}), cukup bandingkan pembilangnya: karena ${num1} < ${num2}, maka ${num1}/${denom} < ${num2}/${denom}.`,
    };
  },

  // 3. Ciri bangun datar (sisi dan sudut)
  (idx) => {
    const shapes = [
      { name: 'persegi', sides: 4, corners: 4, desc: 'memiliki 4 sisi yang sama panjang dan 4 sudut siku-siku' },
      { name: 'persegi panjang', sides: 4, corners: 4, desc: 'memiliki 2 pasang sisi sejajar sama panjang dan 4 sudut siku-siku' },
      { name: 'segitiga', sides: 3, corners: 3, desc: 'memiliki 3 sisi dan 3 titik sudut' },
    ];
    const picked = shapes[randInt(0, 2)];
    const correct = picked.name;
    const distractors = shapes.map(s => s.name).filter(n => n !== correct);
    distractors.push('lingkaran');

    return {
      id: `b4-shape-props-${idx}-${picked.sides}`,
      number: idx,
      chapterTitle: 'Bab 4: Pecahan & Bangun Datar',
      category: 'Bangun Datar',
      question: `Bangun datar yang ${picked.desc} adalah...`,
      options: shuffle([correct, ...distractors]),
      correctAnswer: correct,
      explanation: `Sifat ${picked.desc} adalah ciri khas dari bangun ${picked.name}.`,
    };
  },

  // 4. Jenis sudut
  (idx) => {
    const angles = [
      { name: 'Sudut Siku-siku', desc: 'berukuran tepat 90 derajat (seperti pojok meja/buku)' },
      { name: 'Sudut Lancip', desc: 'berukuran lebih kecil dari 90 derajat (lebih sempit/runcing)' },
      { name: 'Sudut Tumpul', desc: 'berukuran lebih besar dari 90 derajat (terbuka lebar)' },
    ];
    const picked = angles[randInt(0, 2)];
    const correct = picked.name;
    const distractors = angles.map(a => a.name).filter(n => n !== correct);
    distractors.push('Sudut Lurus');

    return {
      id: `b4-angle-type-${idx}`,
      number: idx,
      chapterTitle: 'Bab 4: Pecahan & Bangun Datar',
      category: 'Sudut',
      question: `Sudut yang ${picked.desc} dinamakan...`,
      options: shuffle([correct, ...distractors]),
      correctAnswer: correct,
      explanation: `${picked.name} adalah sudut yang ${picked.desc}.`,
    };
  },
];

// =================== TOPIC 5: BAB 5 - PENYAJIAN DATA & PIKTOGRAM ===================
const bab5Generators: QuestionGenerator[] = [
  // 1. Membaca piktogram dengan legenda simbol
  (idx) => {
    const scale = [2, 5, 10][randInt(0, 2)];
    const iconsCount = randInt(3, 7);
    const fruit = ['Apel', 'Jeruk', 'Mangga', 'Pisang'][randInt(0, 3)];
    const total = iconsCount * scale;
    const correct = `${total} buah`;
    const wrong1 = `${iconsCount} buah`;
    const wrong2 = `${total + scale} buah`;
    const wrong3 = `${total - scale} buah`;

    return {
      id: `b5-picto-read-${idx}-${total}`,
      number: idx,
      chapterTitle: 'Bab 5: Penyajian Data & Piktogram',
      category: 'Diagram Gambar (Piktogram)',
      question: `Pada diagram gambar, ada ${iconsCount} simbol bintang ⭐ yang melambangkan penjualan buah ${fruit}. Jika 1 simbol ⭐ mewakili ${scale} buah, berapa banyak buah ${fruit} yang terjual?`,
      options: shuffle([correct, wrong1, wrong2, wrong3]),
      correctAnswer: correct,
      explanation: `Setiap simbol bernilai ${scale} buah. Karena ada ${iconsCount} simbol, hitung perkalian: ${iconsCount} × ${scale} = ${correct}.`,
    };
  },

  // 2. Selisih data tertinggi dan terendah
  (idx) => {
    const high = randInt(15, 30);
    const low = randInt(5, 12);
    const diff = high - low;
    const correct = `${diff} orang`;
    const wrong1 = `${high} orang`;
    const wrong2 = `${diff + 2} orang`;
    const wrong3 = `${high + low} orang`;

    return {
      id: `b5-data-diff-${idx}-${diff}`,
      number: idx,
      chapterTitle: 'Bab 5: Penyajian Data & Piktogram',
      category: 'Membaca Data',
      question: `Data hobi siswa kelas 3: Membaca = ${high} orang, Menari = ${low} orang. Selisih jumlah siswa yang hobi membaca dan menari adalah...`,
      options: shuffle([correct, wrong1, wrong2, wrong3]),
      correctAnswer: correct,
      explanation: `Selisih dicari dengan mengurangkan data terbesar dengan data terkecil: ${high} - ${low} = ${correct}.`,
    };
  },

  // 3. Membaca tabel turus
  (idx) => {
    const correct = '14';
    const wrong1 = '12';
    const wrong2 = '15';
    const wrong3 = '10';

    return {
      id: `b5-tally-${idx}`,
      number: idx,
      chapterTitle: 'Bab 5: Penyajian Data & Piktogram',
      category: 'Tabel Turus',
      question: 'Sebuah turus data tertulis: (IIII/) (IIII/) (IIII). Bilangan yang menyatakan banyaknya data turus tersebut adalah...',
      options: shuffle([correct, wrong1, wrong2, wrong3]),
      correctAnswer: correct,
      explanation: 'Satu ikat turus (IIII/) bernilai 5. Dua ikat turus bernilai 5 + 5 = 10. Ditambah 4 batang lepas = 10 + 4 = 14.',
    };
  },
];

// All generator pools by chapter
const allGenerators = [
  ...bab1Generators,
  ...bab2Generators,
  ...bab3Generators,
  ...bab4Generators,
  ...bab5Generators,
];

/**
 * Generate N exam questions (20 to 100) balanced across all 5 chapters
 */
export function generateExamQuestions(count: number = 20): ExamQuestion[] {
  const safeCount = Math.max(20, Math.min(100, count));
  const questions: ExamQuestion[] = [];

  // Distribute questions evenly across chapters
  const pools = [
    bab1Generators,
    bab2Generators,
    bab3Generators,
    bab4Generators,
    bab5Generators,
  ];

  for (let i = 1; i <= safeCount; i++) {
    // Pick pool in round-robin fashion or weighted
    const poolIndex = (i - 1) % pools.length;
    const pool = pools[poolIndex];
    const generator = pool[randInt(0, pool.length - 1)] || allGenerators[randInt(0, allGenerators.length - 1)];

    const q = generator(i);
    q.number = i;
    questions.push(q);
  }

  return questions;
}
