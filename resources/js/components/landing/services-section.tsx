import { Reveal, Stagger, StaggerItem } from '@/components/landing/motion';

const services = [
    {
        title: 'Sertifikasi Keuangan & Pasar Modal',
        items: ['WAPERD', 'WPPE, WPPE-P, WPPE-PT', 'WMI', 'WPEE', 'AAJI'],
    },
    {
        title: 'Personal Skill',
        items: ['Negotiation Skill', 'Communication Skill'],
    },
    {
        title: 'Penasihat Investasi',
        items: [
            'Product Monitoring & Evaluation',
            'Financial Planner',
            'Investment Risk Management',
        ],
    },
];

const deliveryModes = [
    'Online',
    'Tatap muka via Zoom',
    'Inhouse untuk institusi',
];

export default function ServicesSection() {
    return (
        <section
            id="layanan"
            className="scroll-mt-20 border-y border-line bg-canvas py-24"
        >
            <div className="mx-auto max-w-7xl px-6 lg:px-12">
                <Reveal className="mb-14 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
                    <div className="max-w-2xl">
                        <h2 className="mb-4 text-4xl leading-tight font-extrabold tracking-tight text-ink sm:text-5xl">
                            Training & Investment Advisory
                        </h2>
                        <p className="text-base text-slate-600">
                            Layanan untuk individu maupun stakeholder di
                            industri keuangan dan pasar modal.
                        </p>
                    </div>
                    <p className="text-sm text-slate-600">
                        Tersedia:{' '}
                        <span className="font-semibold text-ink">
                            {deliveryModes.join(' · ')}
                        </span>
                    </p>
                </Reveal>

                <Stagger
                    gap={0.12}
                    className="grid grid-cols-1 gap-6 md:grid-cols-3"
                >
                    {services.map((service) => (
                        <StaggerItem
                            key={service.title}
                            className="rounded-3xl border border-slate-100 bg-white p-7 shadow-soft"
                        >
                            <h3 className="mb-5 text-xl font-bold tracking-tight text-ink">
                                {service.title}
                            </h3>
                            <ul className="space-y-3">
                                {service.items.map((item) => (
                                    <li
                                        key={item}
                                        className="flex items-start gap-3 text-sm text-slate-600"
                                    >
                                        <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-brand ring-2 ring-ink/10" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </StaggerItem>
                    ))}
                </Stagger>
            </div>
        </section>
    );
}
