const heroImage =
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBJIbjE8Y4RtayHMFXLS_OpiDE_6psanyVXTrIldzoiO0qacocqZT_ghkURSoSm7BG7DjOCncpiAifmlPDKKJLhL1bLS-ytEWDpYt-WlaXiYqWZEmSRoS8TQ-6HPURezzUIoV8B0ut8jj99NU3jwJbGO6tswFPTcp2HLEUfV9RH4I-MKlb_RJC-vLCk4b5dMOLDhgXqQKRhyO2MHZY_yU7H-iMcFOhOHS1Wkv8tUVqT2s1Z_Bbv5Iof';

// Illustrative sample of the per-topic analysis shown after a TryOut.
const topicScores = [
    { topic: 'Reksa Dana', score: 86 },
    { topic: 'Hukum Pasar Modal', score: 64 },
    { topic: 'Etika Profesi', score: 78 },
];

export default function HeroSection() {
    return (
        <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28">
            <div className="mx-auto max-w-7xl px-6 lg:px-12">
                <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
                    <div className="flex flex-col items-start pr-0 lg:col-span-6 lg:pr-6">
                        <h1 className="mb-6 text-5xl leading-[1.08] font-extrabold tracking-tight text-ink sm:text-6xl lg:text-7xl">
                            Siap lulus ujian sertifikasi pasar modal
                        </h1>
                        <p className="mb-8 max-w-lg text-lg leading-relaxed font-normal text-slate-600">
                            Latihan soal dengan pembahasan, TryOut dengan waktu
                            ujian sesungguhnya, dan analisis per topik untuk
                            WAPERD, WPPE, WMI, dan sertifikasi lainnya.
                        </p>
                        <a
                            href="#program"
                            className="inline-flex items-center justify-center gap-2 rounded-full bg-brand px-8 py-3.5 text-base font-semibold text-white shadow-sm transition-all duration-200 hover:bg-brand-hover hover:shadow-md active:scale-95"
                        >
                            <span>Mulai belajar</span>
                            <svg
                                className="h-4 w-4 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2.5}
                                />
                            </svg>
                        </a>
                    </div>

                    <div className="relative flex justify-center lg:col-span-6">
                        <div className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-white bg-slate-100 shadow-xl lg:max-w-none">
                            <img
                                src={heroImage}
                                alt="Peserta belajar online untuk persiapan ujian sertifikasi"
                                className="h-[440px] w-full object-cover object-top sm:h-[500px]"
                            />
                        </div>

                        <TryoutBadge />
                        <TopicAnalysisCard />
                    </div>
                </div>
            </div>
        </section>
    );
}

function TryoutBadge() {
    return (
        <div className="absolute -top-4 -left-3 w-56 -translate-y-2 rounded-2xl border border-slate-100 bg-white/95 px-4 py-3 shadow-floating backdrop-blur-md sm:top-12 sm:left-4">
            <div className="mb-2 flex items-center justify-between text-[11px] font-semibold text-slate-400">
                <span>TryOut aktif</span>
                <span className="flex items-center gap-1 text-slate-500">
                    <svg
                        className="h-3.5 w-3.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                        />
                    </svg>
                    Waktu nyata
                </span>
            </div>
            <div className="flex items-center justify-between rounded-xl border border-slate-100/80 bg-slate-50 p-2">
                <div className="flex items-center gap-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-brand text-[10px] font-extrabold text-white">
                        W
                    </div>
                    <div>
                        <div className="text-xs leading-tight font-bold text-slate-800">
                            WAPERD
                        </div>
                        <div className="text-[10px] text-slate-400">
                            Paket 2
                        </div>
                    </div>
                </div>
                <span className="inline-block shrink-0 rounded-md border border-slate-200/60 bg-white px-2 py-0.5 text-[10px] font-semibold whitespace-nowrap text-slate-700 shadow-2xs">
                    Percobaan 1/3
                </span>
            </div>
        </div>
    );
}

function TopicAnalysisCard() {
    return (
        <div className="absolute -bottom-6 -left-2 w-[280px] rounded-2xl border border-slate-100 bg-white/95 p-4 shadow-floating backdrop-blur-md sm:left-2 sm:w-[310px]">
            <div className="mb-3 flex items-center justify-between">
                <h3 className="text-sm font-bold text-ink">
                    Analisis per topik
                </h3>
                <span className="text-[10px] font-medium text-slate-400">
                    Contoh hasil
                </span>
            </div>

            <ul className="mb-3 space-y-2.5">
                {topicScores.map((item) => (
                    <li key={item.topic}>
                        <div className="mb-1 flex items-center justify-between text-[11px]">
                            <span className="font-medium text-slate-600">
                                {item.topic}
                            </span>
                            <span className="font-bold text-ink">
                                {item.score}%
                            </span>
                        </div>
                        <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
                            <div
                                className="h-full rounded-full bg-brand"
                                style={{ width: `${item.score}%` }}
                            />
                        </div>
                    </li>
                ))}
            </ul>

            <div className="flex items-center justify-between border-t border-slate-100 pt-2 text-[11px]">
                <span className="text-slate-500">
                    Perlu ditingkatkan:{' '}
                    <span className="font-semibold text-slate-800">
                        Hukum Pasar Modal
                    </span>
                </span>
            </div>
        </div>
    );
}
