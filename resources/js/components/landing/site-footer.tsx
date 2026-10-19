import { Link } from '@inertiajs/react';
import { about, contact, faq, glossary, service, team } from '@/routes';

const linkColumns = [
    {
        title: 'Program',
        links: [
            { label: 'WAPERD', href: '/#program' },
            { label: 'WPPE / WPPE-P / WPPE-PT', href: '/#program' },
            { label: 'WMI', href: '/#program' },
            { label: 'WPEE', href: '/#program' },
            { label: 'AAJI', href: '/#program' },
        ],
    },
    {
        title: 'InvestaLearning',
        links: [
            { label: 'About Us', href: about.url() },
            { label: 'Service', href: service.url() },
            { label: 'Our Team', href: team.url() },
            { label: 'Glossary', href: glossary.url() },
            { label: 'FAQ', href: faq.url() },
            { label: 'Contact Us', href: contact.url() },
        ],
    },
    {
        title: 'Kontak',
        links: [
            {
                label: 'info@investalearning.com',
                href: 'mailto:info@investalearning.com',
            },
            {
                label: 'analyst@investalearning.com',
                href: 'mailto:analyst@investalearning.com',
            },
            {
                label: '0815-1962-9804 (WA)',
                href: 'https://wa.me/6281519629804',
            },
        ],
    },
];

export default function SiteFooter() {
    return (
        <footer
            id="kontak"
            className="scroll-mt-20 border-t border-slate-200 bg-white py-16"
        >
            <div className="mx-auto max-w-7xl px-6 lg:px-12">
                <div className="mb-12 grid grid-cols-2 gap-8 md:grid-cols-5">
                    <div className="col-span-2">
                        <span className="text-3xl font-extrabold tracking-tight text-ink">
                            InvestaLearning
                        </span>
                        <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-500">
                            Persiapan Ujian Standar Profesi Pasar Modal dan
                            pelatihan keuangan untuk individu maupun institusi.
                        </p>
                    </div>

                    {linkColumns.map((column) => (
                        <div
                            key={column.title}
                            className={
                                column.title === 'Kontak'
                                    ? 'col-span-2 md:col-span-1'
                                    : undefined
                            }
                        >
                            <p className="mb-4 text-xs font-bold tracking-wider text-ink uppercase">
                                {column.title}
                            </p>
                            <ul className="space-y-2.5 text-sm text-slate-600">
                                {column.links.map((link) => (
                                    <li key={link.label}>
                                        {link.href.startsWith('/') ? (
                                            <Link
                                                href={link.href}
                                                className="break-all transition-colors hover:text-ink"
                                            >
                                                {link.label}
                                            </Link>
                                        ) : (
                                            <a
                                                href={link.href}
                                                className="break-all transition-colors hover:text-ink"
                                            >
                                                {link.label}
                                            </a>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="border-t border-slate-100 pt-8 text-xs text-slate-400">
                    <p>
                        © 2014–{new Date().getFullYear()} PT. Biner Investa
                        Berkembang (Investa Group). Hak cipta dilindungi.
                    </p>
                </div>
            </div>
        </footer>
    );
}
