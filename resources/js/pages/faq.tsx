import PageHero from '@/components/page-hero';
import PublicLayout from '@/layouts/public-layout';
import { AnimatePresence, motion } from 'motion/react';
import { useState, type ReactNode } from 'react';

const ease = [0.22, 1, 0.36, 1] as const;

export function FaqItem({
    question,
    number,
    children,
}: {
    question: string;
    number?: number;
    children: ReactNode;
}) {
    const [open, setOpen] = useState(false);

    return (
        <div
            className={`rounded-2xl border border-slate-200 bg-white px-6 py-5 transition-shadow duration-300 ${
                open ? 'shadow-soft' : ''
            }`}
        >
            <button
                type="button"
                onClick={() => setOpen((o) => !o)}
                aria-expanded={open}
                className="flex w-full cursor-pointer items-start justify-between gap-4 text-left text-base font-semibold text-ink"
            >
                <span className="flex gap-3">
                    {number !== undefined && <span className="text-slate-400">{number}.</span>}
                    {question}
                </span>
                <motion.span
                    animate={{ rotate: open ? 45 : 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-colors duration-300 ${
                        open ? 'bg-brand text-white' : 'bg-slate-100 text-slate-600'
                    }`}
                >
                    <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M12 5v14m-7-7h14" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} />
                    </svg>
                </motion.span>
            </button>

            <AnimatePresence initial={false}>
                {open && (
                    <motion.div
                        key="answer"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease }}
                        className="overflow-hidden"
                    >
                        <motion.div
                            initial={{ y: -8 }}
                            animate={{ y: 0 }}
                            exit={{ y: -8 }}
                            transition={{ duration: 0.35, ease }}
                            className={`pt-3 text-sm leading-relaxed text-slate-600 ${number !== undefined ? 'pl-7' : ''}`}
                        >
                            {children}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
const faqs = [
    {
        question: 'Bagaimana cara melakukan pendaftaran?',
        answer: [
            'Peserta dapat melakukan pendaftaran dengan mengklik link pendaftaran dan mengisi form pendaftaran sesuai dengan ujian dan paket yang ingin diikuti. Selanjutnya peserta melakukan aktivasi pendaftaran berdasarkan e-mail notifikasi yang kami kirimkan ke e-mail peserta. Setelah aktivasi pendaftaran, peserta akan terdaftar dengan jenis paket biasa dan kami akan mengaktifkan jenis paket yang peserta daftarkan setelah peserta melakukan pembayaran dan melakukan konfirmasi pembayaran kepada kami.',
        ],
    },
    {
        question:
            'Kapan program persiapan ujian standar profesi pasar modal berlangsung?',
        answer: [
            'Program Persiapan Ujian Standar Profesi Pasar Modal berlangsung setiap saat setelah Peserta melakukan Pendaftaran atas Program Persiapan Ujian Standar Profesi Pasar Modal yang tersedia.',
        ],
    },
    {
        question: 'Ada berapa jenis program?',
        answer: [
            'Kami menyediakan jenis program sertifikasi dan non sertifikasi utk program keuangan dan pasar modal.',
        ],
    },
    {
        question: 'Apakah perbedaan ujian latihan dan ujian tryout?',
        answer: [
            'Latihan :',
            '• Menampilkan soal-soal dengan jawaban dan pembahasan yang langsung dapat dilihat dengan mengklik tulisan pada jawaban.',
            '• Nilai dari hasil tes latihan tidak disimpan ke dalam daftar nilai peserta.',
            'TryOut :',
            '• Menampilkan soal-soal tanpa jawaban, dimana jawaban dan pembahasan dapat dilihat setelah selesai mengerjakan ujian tersebut.',
            '• Nilai dari hasil tes tryout disimpan ke dalam daftar nilai peserta sehingga peserta dapat melihat perkembangan atas pengerjaan tryout tersebut.',
            '• Menampilkan hasil analisa berdasarkan topik pada paket soal sehingga peserta dapat melakukan analisa dalam proses pembelajaran selanjutnya.',
        ],
    },
    {
        question: 'Bagaimana proses pengerjaan ujian tryout?',
        answer: [
            'Peserta diberi kesempatan untuk mengerjakan paket soal tryout yang sama sebanyak 3 (tiga) kali dan setelah selesai mengerjakan paket soal tryout tersebut sebanyak 3 (tiga) kali maka peserta dapat melihat jawaban dan penjelasan dari soal-soal yang ada di dalam paket soal tersebut.',
        ],
    },
    {
        question: 'Bagaimana sistem penilaian ujian latihan dan ujian tryout?',
        answer: [
            'Sistem penilaian ujian latihan dan ujian tryout sama dengan sistem penilaian Ujian Standar Profesi Pasar Modal yang sesungguhnya dimana setiap nomor memiliki nilai 1 dan tidak ada nilai (–) untuk jawaban yang salah.',
        ],
    },
    {
        question:
            'Apabila saya sedang mengerjakan ujian dan kemudian tidak mengklik ujian selesai apakah ujian saya akan dinilai?',
        answer: [
            'Ya, karena setiap peserta mengklik tombol “START” maka peserta diwajibkan untuk menyelesaikan TryOut tersebut dan apabila peserta tidak menyelesaikannya maka sistem kami akan melakukan penilaian secara otomatis berdasarkan apa yang sudah peserta kerjakan.',
        ],
    },
    {
        question:
            'Apakah INVESTALEARNING menyediakan pelatihan persiapan ujian standar profesi pasar modal dan keuangan secara inhouse?',
        answer: [
            'Ya, saat ini kami sedang mempersiapkan pelatihan yang ditujukan untuk Persiapan Ujian Standar Profesi Pasar Modal maupun pelatihan keuangan secara inhouse untuk institusi. Apabila bapak/ibu memiliki kebutuhan tersebut bisa menghubungi kami melalui e-mail di analyst@investalearning.com.',
        ],
    },
];

export default function Faq() {
    return (
        <PublicLayout title="FAQ">
            <PageHero title="Frequently Answer Question" />
           <section className="pb-20">
    <div className="mx-auto max-w-5xl space-y-3 px-6 lg:px-12">
        {faqs.map((faq, index) => (
            <FaqItem key={faq.question} question={faq.question} number={index + 1}>
                <div className="space-y-2">
                    {faq.answer.map((line) => (
                        <p key={line} className={line.endsWith(':') ? 'pt-1 font-semibold text-ink' : undefined}>
                            {line}
                        </p>
                    ))}
                </div>
            </FaqItem>
        ))}
    </div>
</section>
        </PublicLayout>
    );
}
