import { m } from 'motion/react';
import type { Variants } from 'motion/react';
import { EASE_OUT, VIEWPORT, fadeUp } from '@/components/landing/motion';

const heroImage =
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBJIbjE8Y4RtayHMFXLS_OpiDE_6psanyVXTrIldzoiO0qacocqZT_ghkURSoSm7BG7DjOCncpiAifmlPDKKJLhL1bLS-ytEWDpYt-WlaXiYqWZEmSRoS8TQ-6HPURezzUIoV8B0ut8jj99NU3jwJbGO6tswFPTcp2HLEUfV9RH4I-MKlb_RJC-vLCk4b5dMOLDhgXqQKRhyO2MHZY_yU7H-iMcFOhOHS1Wkv8tUVqT2s1Z_Bbv5Iof';

// Illustrative sample of the per-topic analysis shown after a TryOut.
const topicScores = [
    { topic: 'Reksa Dana', score: 86 },
    { topic: 'Hukum Pasar Modal', score: 64 },
    { topic: 'Etika Profesi', score: 78 },
];

// The hero is above the fold, so it animates on load instead of on scroll.
const intro: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
};

// Floating cards land after the photo, then start their idle float.
const card = (delay: number): Variants => ({
    hidden: { opacity: 0, y: 16, scale: 0.96 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.6, ease: EASE_OUT, delay },
    },
});

export default function HeroSection() {
    return (
        <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28">
            <div className="mx-auto max-w-7xl px-6 lg:px-12">
                <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
                    <m.div
                        initial="hidden"
                        animate="visible"
                        variants={intro}
                        className="flex flex-col items-start pr-0 lg:col-span-6 lg:pr-6"
                    >
                        <m.h1
                            variants={fadeUp}
                            className="mb-6 text-5xl leading-[1.08] font-extrabold tracking-tight text-ink sm:text-6xl lg:text-7xl"
                        >
                            Siap lulus ujian sertifikasi pasar modal
                        </m.h1>
                        <m.p
                            variants={fadeUp}
                            className="mb-8 max-w-lg text-lg leading-relaxed font-normal text-slate-600"
                        >
                            Latihan soal dengan pembahasan, TryOut dengan waktu
                            ujian sesungguhnya, dan analisis per topik untuk
                            WAPERD, WPPE, WMI, dan sertifikasi lainnya.
                        </m.p>
                        <m.a
                            variants={fadeUp}
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
                        </m.a>
                    </m.div>

                    <div className="relative flex justify-center lg:col-span-6">
                        <m.div
                            initial={{ opacity: 0, scale: 0.96 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.7, ease: EASE_OUT }}
                            className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-white bg-slate-100 shadow-xl lg:max-w-none"
                        >
                            <img
                                src={heroImage}
                                alt="Peserta belajar online untuk persiapan ujian sertifikasi"
                                className="h-[440px] w-full object-cover object-top sm:h-[500px]"
                            />
                        </m.div>

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
        <m.div
            initial="hidden"
            animate="visible"
            variants={card(0.35)}
            className="absolute -top-4 -left-3 w-56 -translate-y-2 sm:top-12 sm:left-4"
        >
            <div className="animate-float rounded-2xl border border-slate-100 bg-white/95 px-4 py-3 shadow-floating backdrop-blur-md motion-reduce:animate-none">
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
        </m.div>
    );
}

function TopicAnalysisCard() {
    return (
        <m.div
            initial="hidden"
            animate="visible"
            variants={card(0.5)}
            className="absolute -bottom-6 -left-2 w-[280px] sm:left-2 sm:w-[310px]"
        >
            <div className="animate-float rounded-2xl border border-slate-100 bg-white/95 p-4 shadow-floating backdrop-blur-md [animation-delay:-3s] motion-reduce:animate-none">
                <div className="mb-3 flex items-center justify-between">
                    <h3 className="text-sm font-bold text-ink">
                        Analisis per topik
                    </h3>
                    <span className="text-[10px] font-medium text-slate-400">
                        Contoh hasil
                    </span>
                </div>

                <ul className="mb-3 space-y-2.5">
                    {topicScores.map((item, index) => (
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
                                <m.div
                                    className="h-full origin-left rounded-full bg-brand"
                                    style={{ width: `${item.score}%` }}
                                    initial={{ scaleX: 0 }}
                                    whileInView={{ scaleX: 1 }}
                                    viewport={VIEWPORT}
                                    transition={{
                                        duration: 0.9,
                                        ease: EASE_OUT,
                                        delay: 0.7 + index * 0.1,
                                    }}
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
        </m.div>
    );
}
