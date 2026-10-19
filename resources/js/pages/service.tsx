import PageContent from '@/components/page-content';
import PageHero from '@/components/page-hero';
import PublicLayout from '@/layouts/public-layout';

const services = [
    {
        title: 'Sertifikasi Keuangan dan Pasar Modal',
        items: [
            'AAJI (Asosiasi Asuransi Jiwa Indonesia)',
            'WPPE-PT (Wakil Perantara Pedagang Efek Pemasaran Terbatas)',
            'WAPERD (Wakil Agen Penjual Efek Reksa Dana)',
            'WPPE-P (Wakil Perantara Pedagang Efek Pemasaran)',
            'WPPE (Wakil Perantara Pedagang Efek)',
            'WMI (Wakil Manajer Investasi)',
            'WPEE (Wakil Penjamin Emisi Efek)',
        ],
    },
    {
        title: 'Personal Skill',
        items: ['Negotiation Skill', 'Communication Skill'],
    },
    {
        title: 'Penasihat Investasi',
        items: [
            'Product Monitoring and Evaluation',
            'Financial Planner',
            'Investment Risk Management',
        ],
    },
];

export default function Service() {
    return (
        <PublicLayout title="Service">
            <PageHero title="Training and Investment Advisory">
                <p className="max-w-2xl text-lg leading-relaxed text-slate-600">
                    Kami menawarkan beberapa jasa yang dapat bermanfaat bagi
                    stakeholder di Industri Keuangan dan Pasar Modal, di
                    antaranya :
                </p>
            </PageHero>
            <PageContent>
                <ol className="grid gap-6 md:grid-cols-3">
                    {services.map((service, index) => (
                        <li key={service.title}>
                            <span className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-brand-soft text-sm font-bold text-brand">
                                {index + 1}
                            </span>
                            <h2 className="mb-4 text-xl font-bold tracking-tight text-ink">
                                {service.title}
                            </h2>
                            <ol className="space-y-2.5">
                                {service.items.map((item, itemIndex) => (
                                    <li
                                        key={item}
                                        className="flex items-start gap-2 text-sm text-slate-600"
                                    >
                                        <span className="w-4 shrink-0 font-semibold text-slate-400">
                                            {String.fromCharCode(
                                                97 + itemIndex,
                                            )}
                                            .
                                        </span>
                                        {item}
                                    </li>
                                ))}
                            </ol>
                        </li>
                    ))}
                </ol>
            </PageContent>
        </PublicLayout>
    );
}
