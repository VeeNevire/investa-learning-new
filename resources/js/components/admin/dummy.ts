// Dummy data for demoing the admin panel. Generated from a fixed seed so
// every page load shows the same rows.

function seeded(seed: number) {
    let state = seed;

    return () => {
        state = (state * 1664525 + 1013904223) % 4294967296;

        return state / 4294967296;
    };
}

const random = seeded(2026);
const pick = <T>(items: readonly T[]): T =>
    items[Math.floor(random() * items.length)];
const between = (min: number, max: number) =>
    Math.floor(random() * (max - min + 1)) + min;

export const examTypes = [
    'WAPERD',
    'WPPE',
    'WPPE Pemasaran',
    'WPPE Pemasaran Terbatas',
    'WMI',
    'WPEE',
    'AAJI',
] as const;

export const packages = [
    'Biasa',
    'Khusus A',
    'Khusus B',
    'Khusus C',
    'Khusus D',
] as const;

const firstNames = [
    'Rina',
    'Dimas',
    'Siti',
    'Andi',
    'Maya',
    'Budi',
    'Fajar',
    'Putri',
    'Agus',
    'Dewi',
    'Rizky',
    'Nadia',
    'Hendra',
    'Lestari',
    'Yoga',
    'Ayu',
    'Bayu',
    'Citra',
    'Eko',
    'Fitri',
];

const lastNames = [
    'Kartika',
    'Prasetyo',
    'Rahmawati',
    'Wijaya',
    'Lestari',
    'Santoso',
    'Nugroho',
    'Permata',
    'Saputra',
    'Anggraini',
    'Hidayat',
    'Utami',
    'Gunawan',
    'Sari',
    'Pratama',
];

const institutions = [
    'Bank Sinarmas',
    'Bank Mega',
    'Mandiri Sekuritas',
    'BNI Sekuritas',
    'Trimegah Sekuritas',
    'Mirae Asset',
    'Universitas Indonesia',
    'Umum',
];

const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'Mei',
    'Jun',
    'Jul',
    'Agu',
    'Sep',
    'Okt',
    'Nov',
    'Des',
];

const dateIn2026 = () => `${between(1, 28)} ${pick(months.slice(0, 10))} 2026`;

const fullName = () => `${pick(firstNames)} ${pick(lastNames)}`;
const userId = (name: string) =>
    name.toLowerCase().replace(/[^a-z]+/g, '.') + between(10, 99);

export const topics = [
    'Pengetahuan Pasar Modal',
    'Hukum Pasar Modal',
    'Reksa Dana',
    'Etika Profesi',
    'Analisis Efek',
    'Manajemen Risiko',
    'Perpajakan Efek',
];

const questionStems = [
    'Pihak yang berwenang memberikan izin usaha Manajer Investasi adalah',
    'Nilai Aktiva Bersih (NAB) reksa dana dihitung setiap',
    'Yang dimaksud dengan efek bersifat ekuitas adalah',
    'Prinsip mengenal nasabah (KYC) wajib diterapkan oleh',
    'Jenis reksa dana yang portofolionya minimal 80% pada efek utang adalah',
    'Kewajiban keterbukaan informasi emiten diatur dalam',
    'Benturan kepentingan wajib dihindari oleh wakil perusahaan efek karena',
    'Biaya pembelian unit penyertaan reksa dana disebut',
    'Risiko yang timbul karena perubahan tingkat suku bunga disebut',
    'Penyelesaian transaksi bursa dilakukan pada hari ke',
];

export type Participant = {
    uid: string;
    userId: string;
    name: string;
    institution: string;
    plan: string;
    exam: string;
    registered: string;
    active: boolean;
    email: string;
    phone: string;
};

export const participants: Participant[] = Array.from(
    { length: 42 },
    (_, index) => {
        const name = fullName();

        return {
            uid: `P${String(1201 + index).padStart(5, '0')}`,
            userId: userId(name),
            name,
            institution: pick(institutions),
            plan: pick(packages),
            exam: pick(examTypes),
            registered: dateIn2026(),
            active: random() > 0.2,
            email: `${userId(name)}@mail.com`,
            phone: `08${between(11, 99)}-${between(1000, 9999)}-${between(1000, 9999)}`,
        };
    },
);

export type Subject = { code: string; name: string; active: boolean };

export const subjects: Subject[] = [
    { code: 'PL01', name: 'Pengetahuan Umum Pasar Modal', active: true },
    { code: 'PL02', name: 'Hukum dan Etika Pasar Modal', active: true },
    { code: 'PL03', name: 'Reksa Dana', active: true },
    { code: 'PL04', name: 'Analisis dan Penilaian Efek', active: true },
    { code: 'PL05', name: 'Manajemen Portofolio', active: true },
    { code: 'PL06', name: 'Perdagangan Efek', active: true },
    { code: 'PL07', name: 'Penjaminan Emisi Efek', active: false },
    { code: 'PL08', name: 'Asuransi Jiwa (AAJI)', active: true },
];

export type SubjectDetail = {
    id: string;
    subject: string;
    exam: string;
    plan: string;
    questions: number;
    minutes: number;
};

const subjectDetails = (prefix: string): SubjectDetail[] =>
    Array.from({ length: 16 }, (_, index) => ({
        id: `${prefix}${index}`,
        subject: pick(subjects).name,
        exam: pick(examTypes),
        plan: `Paket ${between(1, 5)}`,
        questions: pick([40, 50, 60, 75, 100]),
        minutes: pick([60, 90, 120]),
    }));

export const practiceDetails = subjectDetails('L');
export const tryoutDetails = subjectDetails('T');

export type Question = {
    code: string;
    staticCode: string;
    order: number;
    text: string;
    answer: 'A' | 'B' | 'C' | 'D' | 'E';
    topic: string;
    subject: string;
    exam: string;
    plan: string;
    minutes: number;
};

const questions = (prefix: string, count: number): Question[] =>
    Array.from({ length: count }, (_, index) => ({
        code: `${prefix}${String(index + 1).padStart(4, '0')}`,
        staticCode: `ST-${between(100, 999)}`,
        order: index + 1,
        text: `${pick(questionStems)} ...`,
        answer: pick(['A', 'B', 'C', 'D', 'E'] as const),
        topic: pick(topics),
        subject: pick(subjects).name,
        exam: pick(examTypes),
        plan: pick(packages),
        minutes: pick([1, 2, 3]),
    }));

export const bankQuestions = questions('S', 48);
export const practiceQuestions = questions('L', 36);
export const tryoutQuestions = questions('T', 36);

export type VideoConference = {
    id: number;
    title: string;
    participants: number;
    status: 'Terjadwal' | 'Berlangsung' | 'Selesai';
    schedule: string;
    teacher: string;
    room: string;
};

export const videoConferences: VideoConference[] = Array.from(
    { length: 12 },
    (_, index) => ({
        id: index + 1,
        title: `Kelas ${pick(examTypes)}: ${pick(topics)}`,
        participants: between(12, 60),
        status: pick(['Terjadwal', 'Berlangsung', 'Selesai'] as const),
        schedule: `${dateIn2026()}, ${between(8, 19)}:00`,
        teacher: fullName(),
        room: `IL-${between(1000, 9999)}`,
    }),
);

export type ExamResult = {
    number: string;
    examName: string;
    exam: string;
    plan: string;
    uid: string;
    name: string;
    score: number;
    passed: boolean;
};

export const PASSING_SCORE = 70;

export const examResults: ExamResult[] = Array.from(
    { length: 40 },
    (_, index) => {
        const participant = pick(participants);
        const score = between(42, 96);

        return {
            number: `UJ-${String(5301 + index)}`,
            examName: `TryOut ${participant.exam} Paket ${between(1, 5)}`,
            exam: participant.exam,
            plan: participant.plan,
            uid: participant.uid,
            name: participant.name,
            score,
            passed: score >= PASSING_SCORE,
        };
    },
);

export type QuestionReport = {
    staticCode: string;
    order: number;
    text: string;
    correct: number;
    total: number;
};

export const tryoutReport: QuestionReport[] = Array.from(
    { length: 30 },
    (_, index) => {
        const total = 120;

        return {
            staticCode: `ST-${between(100, 999)}`,
            order: index + 1,
            text: `${pick(questionStems)} ...`,
            correct: between(28, 112),
            total,
        };
    },
);

export type TopicSummary = {
    topic: string;
    questions: number;
    participants: number;
    correctRate: number;
};

export const topicSummaries: TopicSummary[] = topics.map((topic) => ({
    topic,
    questions: between(40, 180),
    participants: between(180, 640),
    correctRate: between(48, 88),
}));

export type TopicDetail = {
    id: string;
    name: string;
    exam: string;
    topic: string;
    correct: number;
    wrong: number;
};

export const topicDetails: TopicDetail[] = Array.from(
    { length: 36 },
    (_, index) => {
        const participant = pick(participants);
        const correct = between(4, 20);

        return {
            id: `TD${index}`,
            name: participant.name,
            exam: participant.exam,
            topic: pick(topics),
            correct,
            wrong: 20 - correct,
        };
    },
);

export type ParticipantSummary = {
    uid: string;
    name: string;
    exam: string;
    tryouts: number;
    best: number;
    average: number;
    last: string;
};

export const participantSummaries: ParticipantSummary[] = participants
    .slice(0, 30)
    .map((participant) => {
        const best = between(60, 97);

        return {
            uid: participant.uid,
            name: participant.name,
            exam: participant.exam,
            tryouts: between(1, 12),
            best,
            average: best - between(4, 18),
            last: dateIn2026(),
        };
    });

export type Announcement = {
    id: number;
    title: string;
    date: string;
    active: boolean;
};

export const announcements: Announcement[] = [
    'Jadwal TryOut nasional WAPERD bulan November',
    'Pembaruan bank soal WPPE sesuai kurikulum 2026',
    'Panduan mengerjakan TryOut dengan waktu nyata',
    'Libur layanan admin cuti bersama akhir tahun',
    'Kelas video conference WMI dibuka',
    'Cara mengunduh sertifikat kelulusan',
    'Perubahan biaya paket Khusus A',
    'Tips persiapan ujian standar profesi',
].map((title, index) => ({
    id: index + 1,
    title,
    date: dateIn2026(),
    active: index < 6,
}));

export type DownloadFile = {
    id: string;
    exam: string;
    topic: string;
    fileName: string;
    active: boolean;
};

const downloads = (prefix: string, kind: string): DownloadFile[] =>
    Array.from({ length: 14 }, (_, index) => {
        const exam = pick(examTypes);
        const topic = pick(topics);

        return {
            id: `${prefix}${index}`,
            exam,
            topic,
            fileName: `${kind}-${exam.toLowerCase().replace(/\s+/g, '-')}-${index + 1}.pdf`,
            active: random() > 0.15,
        };
    });

export const materialFiles = downloads('M', 'materi');
export const regulationFiles = downloads('R', 'peraturan');
export const documentationFiles = downloads('D', 'dokumentasi');

export type GuestMessage = {
    id: number;
    name: string;
    email: string;
    phone: string;
    message: string;
    date: string;
};

const guestMessages = [
    'Apakah tersedia paket TryOut untuk WMI?',
    'Mohon info jadwal pelatihan inhouse untuk kantor kami.',
    'Saya lupa password akun, mohon bantuannya.',
    'Bagaimana cara konfirmasi pembayaran paket?',
    'Apakah sertifikat bisa diunduh setelah lulus TryOut?',
    'Mohon ditambahkan materi perpajakan efek.',
];

export const guestBook: GuestMessage[] = Array.from(
    { length: 18 },
    (_, index) => {
        const name = fullName();

        return {
            id: index + 1,
            name,
            email: `${userId(name)}@mail.com`,
            phone: `08${between(11, 99)}-${between(1000, 9999)}-${between(1000, 9999)}`,
            message: pick(guestMessages),
            date: dateIn2026(),
        };
    },
);

export type Certificate = {
    id: number;
    name: string;
    title: string;
    teacher: string;
    signer: string;
};

const signers = [
    'Dr. Hendra Gunawan',
    'Ir. Lestari Utami, M.M.',
    'Bayu Pratama, CFA',
];

export const certificates: Certificate[] = Array.from(
    { length: 24 },
    (_, index) => {
        const participant = participants[index];

        return {
            id: index + 1,
            name: participant.name,
            title: `Sertifikat Pelatihan ${participant.exam}`,
            teacher: fullName(),
            signer: pick(signers),
        };
    },
);

export type CertificateTemplate = {
    id: number;
    title: string;
    teacher: string;
    signer: string;
};

export const certificateTemplates: CertificateTemplate[] = examTypes.map(
    (exam, index) => ({
        id: index + 1,
        title: `Pelatihan Persiapan Ujian ${exam}`,
        teacher: fullName(),
        signer: pick(signers),
    }),
);

export const backgrounds = [
    'Klasik Biru',
    'Minimal Putih',
    'Garis Emas',
    'Indigo Modern',
    'Bingkai Ganda',
    'Polos Krem',
];

export const institutionLogos = [
    'InvestaLearning',
    'Bank Sinarmas',
    'Bank Mega',
    'Mandiri Sekuritas',
    'BNI Sekuritas',
    'Investa Group',
];

export const signatures = signers.map((name, index) => ({
    name,
    position: ['Direktur Utama', 'Direktur Pelatihan', 'Koordinator Program'][
        index
    ],
}));

export const cardBackgrounds = institutions.slice(0, 6).map((institution) => ({
    institution,
    uploader: fullName(),
}));

export type AdminUser = {
    uid: string;
    name: string;
    userId: string;
    access: 'Admin' | 'Koordinator' | 'Editor';
    active: boolean;
};

export const adminUsers: AdminUser[] = Array.from({ length: 9 }, (_, index) => {
    const name = fullName();

    return {
        uid: `A${String(index + 1).padStart(3, '0')}`,
        name,
        userId: userId(name),
        access:
            index === 0
                ? 'Admin'
                : pick(['Admin', 'Koordinator', 'Editor'] as const),
        active: index < 7,
    };
});

export const visitorStats = [
    { category: 'Halaman Beranda', total: 18420 },
    { category: 'Glossary', total: 9612 },
    { category: 'Halaman Masuk', total: 7208 },
    { category: 'Halaman Daftar', total: 4150 },
    { category: 'FAQ', total: 3389 },
    { category: 'About Us', total: 2104 },
    { category: 'Service', total: 1876 },
    { category: 'Contact Us', total: 1422 },
    { category: 'Our Team', total: 968 },
];

export const slides = [
    { fileName: 'slide-tryout-waperd.jpg', link: '/register', active: true },
    { fileName: 'slide-kelas-wmi.jpg', link: '/service', active: true },
    { fileName: 'slide-sertifikat.jpg', link: '/about-us', active: false },
    { fileName: 'slide-inhouse.jpg', link: '/contact-us', active: true },
];

export const runningTexts = [
    {
        id: 1,
        text: 'Pendaftaran TryOut nasional WAPERD dibuka hingga 31 Oktober 2026.',
        active: true,
    },
    {
        id: 2,
        text: 'Paket Khusus A kini termasuk kelas video conference mingguan.',
        active: true,
    },
    {
        id: 3,
        text: 'Layanan admin libur pada tanggal merah nasional.',
        active: false,
    },
    {
        id: 4,
        text: 'Bank soal WPPE diperbarui sesuai kurikulum terbaru.',
        active: true,
    },
];

export const floatingVideos = [
    {
        id: 1,
        title: 'Cara mengerjakan TryOut',
        link: 'https://youtu.be/demo-tryout',
        active: true,
    },
    {
        id: 2,
        title: 'Membaca analisis per topik',
        link: 'https://youtu.be/demo-analisis',
        active: true,
    },
    {
        id: 3,
        title: 'Profil InvestaLearning',
        link: 'https://youtu.be/demo-profil',
        active: false,
    },
];
