import { Reveal, Stagger, StaggerItem } from '@/components/landing/motion';

const steps = [
    {
        title: 'Pelajari materi per topik',
        description:
            'Materi online disusun per topik ujian, jadi Anda bisa membangun pemahaman sebelum mulai mengerjakan soal.',
    },
    {
        title: 'Latihan dengan pembahasan',
        description:
            'Jawaban dan pembahasan bisa langsung dilihat di setiap soal, tanpa batas waktu. Nilai latihan tidak disimpan.',
    },
    {
        title: 'TryOut dengan waktu nyata',
        description:
            'Kerjakan paket soal dengan durasi ujian sesungguhnya, hingga 3 kali per paket. Pembahasan terbuka setelah percobaan ketiga.',
    },
    {
        title: 'Analisis & grafik perkembangan',
        description:
            'Nilai TryOut tersimpan dan dianalisis per topik, lengkap dengan grafik untuk melihat bagian yang masih perlu ditingkatkan.',
    },
];

export default function HowItWorksSection() {
    return (
        <section id="cara-belajar" className="scroll-mt-20 bg-white py-24">
            <div className="mx-auto max-w-7xl px-6 lg:px-12">
                <Reveal className="mb-14 max-w-2xl">
                    <h2 className="mb-4 text-4xl leading-tight font-extrabold tracking-tight text-ink sm:text-5xl">
                        Cara belajar di InvestaLearning
                    </h2>
                    <p className="text-base text-slate-600">
                        Penilaian mengikuti sistem ujian sebenarnya: setiap
                        jawaban benar bernilai 1 dan tidak ada pengurangan nilai
                        untuk jawaban salah.
                    </p>
                </Reveal>

                <Stagger
                    as="ol"
                    className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4"
                >
                    {steps.map((step, index) => (
                        <StaggerItem
                            as="li"
                            key={step.title}
                            className="flex flex-col gap-4 rounded-2xl border border-line bg-canvas p-6"
                        >
                            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-soft text-sm font-bold text-brand">
                                {index + 1}
                            </span>
                            <h3 className="text-lg leading-snug font-bold text-ink">
                                {step.title}
                            </h3>
                            <p className="text-sm leading-relaxed text-slate-600">
                                {step.description}
                            </p>
                        </StaggerItem>
                    ))}
                </Stagger>
            </div>
        </section>
    );
}
