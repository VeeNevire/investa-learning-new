import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

// Illustrative TryOut attempts: the same package taken three times, showing
// how the per-topic analysis tracks improvement. Not real participant data.
const topics = ['Reksa Dana', 'Hukum Pasar Modal', 'Etika Profesi'];

const attempts = [
    { scores: [58, 42, 61], total: 54 },
    { scores: [74, 55, 70], total: 66 },
    { scores: [86, 64, 78], total: 76 },
];

const captions = [
    'Kerjakan TryOut dengan waktu ujian sesungguhnya',
    'Lihat topik yang masih perlu ditingkatkan',
    'Pantau perkembangan nilai di setiap percobaan',
];

const QUESTION_COUNT = 40;
const STEP_MS = 3500;
const START_SECONDS = 45 * 60;

function prefersReducedMotion(): boolean {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export default function FeaturePreview() {
    const [reduced] = useState(prefersReducedMotion);
    const [step, setStep] = useState(reduced ? attempts.length - 1 : 0);
    const [seconds, setSeconds] = useState(START_SECONDS);

    useEffect(() => {
        if (reduced) {
            return;
        }

        const stepTimer = window.setInterval(
            () => setStep((current) => (current + 1) % attempts.length),
            STEP_MS,
        );
        const clock = window.setInterval(
            () =>
                setSeconds((current) =>
                    current > 0 ? current - 1 : START_SECONDS,
                ),
            1000,
        );

        return () => {
            window.clearInterval(stepTimer);
            window.clearInterval(clock);
        };
    }, [reduced]);

    const attempt = attempts[step];
    const previous = step > 0 ? attempts[step - 1] : null;
    const answered = Math.min(
        QUESTION_COUNT,
        ((START_SECONDS - seconds) % QUESTION_COUNT) + 1,
    );
    const weakest = topics[attempt.scores.indexOf(Math.min(...attempt.scores))];

    return (
        <div className="w-full max-w-sm" aria-hidden="true">
            <div className="animate-float rounded-2xl border border-line bg-white p-5 shadow-soft motion-reduce:animate-none">
                <div className="mb-4 flex items-start justify-between">
                    <div>
                        <p className="text-sm font-bold text-ink">
                            TryOut WAPERD
                        </p>
                        <p className="text-xs text-slate-500">
                            Paket 2 · Percobaan {step + 1}/3
                        </p>
                    </div>
                    <span className="flex items-center gap-1.5 rounded-lg bg-canvas px-2.5 py-1 text-xs font-semibold text-ink tabular-nums">
                        <svg
                            className="h-3.5 w-3.5 text-brand"
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
                        {formatTime(seconds)}
                    </span>
                </div>
                <div className="mb-1.5 flex justify-between text-xs text-slate-500">
                    <span>
                        Soal {answered} dari {QUESTION_COUNT}
                    </span>
                    <span>
                        {Math.round((answered / QUESTION_COUNT) * 100)}%
                    </span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
                    <div
                        className="h-full rounded-full bg-brand transition-[width] duration-700 ease-out"
                        style={{
                            width: `${(answered / QUESTION_COUNT) * 100}%`,
                        }}
                    />
                </div>
            </div>

            <div className="mt-4 ml-10 animate-float rounded-2xl border border-line bg-white p-5 shadow-soft [animation-delay:-3s] motion-reduce:animate-none">
                <div className="mb-4 flex items-center justify-between">
                    <p className="text-sm font-bold text-ink">
                        Analisis per topik
                    </p>
                    <p className="text-xs font-semibold text-ink tabular-nums">
                        Skor {attempt.total}
                        {previous && (
                            <span className="ml-1.5 text-emerald-600">
                                +{attempt.total - previous.total}
                            </span>
                        )}
                    </p>
                </div>
                <ul className="space-y-3">
                    {topics.map((topic, index) => (
                        <li key={topic}>
                            <div className="mb-1 flex justify-between text-xs">
                                <span
                                    className={cn(
                                        'text-slate-600',
                                        topic === weakest &&
                                            'font-semibold text-ink',
                                    )}
                                >
                                    {topic}
                                </span>
                                <span className="font-semibold text-ink tabular-nums">
                                    {attempt.scores[index]}%
                                </span>
                            </div>
                            <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
                                <div
                                    className={cn(
                                        'h-full rounded-full transition-[width] duration-700 ease-out',
                                        topic === weakest
                                            ? 'bg-amber-400'
                                            : 'bg-brand',
                                    )}
                                    style={{
                                        width: `${attempt.scores[index]}%`,
                                    }}
                                />
                            </div>
                        </li>
                    ))}
                </ul>
                <p className="mt-4 border-t border-line pt-3 text-xs text-slate-500">
                    Perlu ditingkatkan:{' '}
                    <span className="font-semibold text-ink">{weakest}</span>
                </p>
            </div>

            <div className="mt-8 ml-10">
                <p
                    key={step}
                    className="animate-fade-in text-base font-semibold text-ink motion-reduce:animate-none"
                >
                    {captions[step]}
                </p>
                <div className="mt-3 flex gap-1.5">
                    {captions.map((caption, index) => (
                        <span
                            key={caption}
                            className={cn(
                                'h-1.5 rounded-full transition-all duration-500',
                                index === step
                                    ? 'w-6 bg-brand'
                                    : 'w-1.5 bg-brand/25',
                            )}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

function formatTime(total: number): string {
    const minutes = Math.floor(total / 60);
    const seconds = total % 60;

    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}
