const faqs = [
    {
        question: 'Bagaimana cara mendaftar?',
        answer: 'Isi formulir pendaftaran sesuai ujian dan paket yang ingin diikuti, lalu aktivasi akun melalui email notifikasi yang kami kirimkan. Paket yang Anda pilih akan diaktifkan setelah pembayaran dan konfirmasi pembayaran.',
    },
    {
        question: 'Kapan program persiapan ujian berlangsung?',
        answer: 'Kapan saja. Program bisa langsung diikuti setelah pendaftaran Anda selesai.',
    },
    {
        question: 'Apa perbedaan Latihan dan TryOut?',
        answer: 'Latihan menampilkan jawaban dan pembahasan langsung di setiap soal, tanpa batas waktu, dan nilainya tidak disimpan. TryOut dikerjakan dengan waktu ujian sesungguhnya, nilainya disimpan, dan hasilnya dianalisis per topik.',
    },
    {
        question: 'Bagaimana proses pengerjaan TryOut?',
        answer: 'Setiap paket TryOut bisa dikerjakan hingga 3 kali. Setelah percobaan ketiga, jawaban dan pembahasan seluruh soal di paket tersebut bisa dilihat. Jika TryOut tidak diselesaikan setelah menekan tombol mulai, sistem menilai otomatis berdasarkan jawaban yang sudah diisi.',
    },
    {
        question: 'Bagaimana sistem penilaiannya?',
        answer: 'Sama seperti Ujian Standar Profesi Pasar Modal yang sesungguhnya: setiap jawaban benar bernilai 1 dan tidak ada pengurangan nilai untuk jawaban salah.',
    },
    {
        question: 'Apakah tersedia pelatihan inhouse untuk institusi?',
        answer: 'Ya. Kami menyediakan pelatihan persiapan ujian sertifikasi maupun pelatihan keuangan secara inhouse. Hubungi kami di analyst@investalearning.com.',
    },
];

export default function FaqSection() {
    return (
        <section id="faq" className="scroll-mt-20 bg-canvas py-24">
            <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 lg:grid-cols-12 lg:px-12">
                <div className="lg:col-span-4">
                    <h2 className="mb-4 text-4xl leading-tight font-extrabold tracking-tight text-ink sm:text-5xl">
                        Pertanyaan umum
                    </h2>
                    <p className="text-base text-slate-600">
                        Tidak menemukan jawaban? Hubungi kami di{' '}
                        <a
                            href="mailto:info@investalearning.com"
                            className="font-semibold text-ink underline underline-offset-4"
                        >
                            info@investalearning.com
                        </a>
                        .
                    </p>
                </div>

                <div className="space-y-3 lg:col-span-8">
                    {faqs.map((faq) => (
                        <details
                            key={faq.question}
                            className="group rounded-2xl border border-slate-200 bg-white px-6 py-5 open:shadow-soft"
                        >
                            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold text-ink [&::-webkit-details-marker]:hidden">
                                {faq.question}
                                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition-transform group-open:rotate-45 group-open:bg-brand group-open:text-white">
                                    <svg
                                        className="h-3.5 w-3.5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            d="M12 5v14m-7-7h14"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2.5}
                                        />
                                    </svg>
                                </span>
                            </summary>
                            <p className="mt-3 text-sm leading-relaxed text-slate-600">
                                {faq.answer}
                            </p>
                        </details>
                    ))}
                </div>
            </div>
        </section>
    );
}
