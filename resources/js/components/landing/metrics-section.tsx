const metrics = [
    { value: '2014', label: 'Berpengalaman sejak' },
    { value: '7', label: 'Program sertifikasi' },
    { value: '2', label: 'Mode belajar: Latihan & TryOut' },
    { value: '3x', label: 'Kesempatan TryOut per paket' },
];

export default function MetricsSection() {
    return (
        <section className="border-y border-line bg-white py-12">
            <div className="mx-auto max-w-7xl px-6 lg:px-12">
                <div className="grid grid-cols-2 gap-8 divide-x-0 divide-slate-100 text-center md:grid-cols-4 md:divide-x">
                    {metrics.map((metric) => (
                        <div key={metric.label} className="px-4">
                            <p className="text-3xl font-extrabold tracking-tight text-ink lg:text-4xl">
                                {metric.value}
                            </p>
                            <p className="mt-1 text-sm font-medium text-slate-500">
                                {metric.label}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
