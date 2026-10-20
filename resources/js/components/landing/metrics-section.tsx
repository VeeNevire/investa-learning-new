import { CountUp, Stagger, StaggerItem } from '@/components/landing/motion';

const metrics = [
    { value: 2014, from: 2000, label: 'Berpengalaman sejak' },
    { value: 7, label: 'Program sertifikasi' },
    { value: 2, label: 'Mode belajar: Latihan & TryOut' },
    { value: 3, suffix: 'x', label: 'Kesempatan TryOut per paket' },
];

export default function MetricsSection() {
    return (
        <section className="border-y border-line bg-white py-12">
            <div className="mx-auto max-w-7xl px-6 lg:px-12">
                <Stagger className="grid grid-cols-2 gap-8 divide-x-0 divide-slate-100 text-center md:grid-cols-4 md:divide-x">
                    {metrics.map((metric) => (
                        <StaggerItem key={metric.label} className="px-4">
                            <p className="text-3xl font-extrabold tracking-tight text-ink lg:text-4xl">
                                <CountUp
                                    to={metric.value}
                                    from={metric.from}
                                    suffix={metric.suffix}
                                />
                            </p>
                            <p className="mt-1 text-sm font-medium text-slate-500">
                                {metric.label}
                            </p>
                        </StaggerItem>
                    ))}
                </Stagger>
            </div>
        </section>
    );
}
