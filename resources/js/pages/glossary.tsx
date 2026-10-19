import { useEffect, useRef, useState } from 'react';
import CtaBanner from '@/components/landing/cta-banner';
import PublicLayout from '@/layouts/public-layout';
import { cn } from '@/lib/utils';

type GlossaryTerm = {
    term: string;
    definition: string;
};

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

const firstLetter = (item: GlossaryTerm) => item.term.charAt(0).toUpperCase();

// Letters are addressed as #huruf-X so the header's "Glossary F - J" links
// and shared URLs open on the right letter.
function letterFromHash(): string | null {
    const match = window.location.hash.match(/^#huruf-([A-Z])$/);

    return match ? match[1] : null;
}

export default function Glossary({ terms }: { terms: GlossaryTerm[] }) {
    const available = new Set(terms.map(firstLetter));
    const fallback = alphabet.find((letter) => available.has(letter)) ?? 'A';

    const [query, setQuery] = useState('');
    const [letter, setLetter] = useState(() => {
        const fromHash = letterFromHash();

        return fromHash && available.has(fromHash) ? fromHash : fallback;
    });
    const listRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const onHashChange = () => {
            const fromHash = letterFromHash();

            if (fromHash) {
                setLetter(fromHash);
                setQuery('');
                listRef.current?.scrollIntoView({ block: 'start' });
            }
        };

        window.addEventListener('hashchange', onHashChange);

        return () => window.removeEventListener('hashchange', onHashChange);
    }, []);

    const keyword = query.trim().toLowerCase();
    const visible = keyword
        ? terms.filter(
              (item) =>
                  item.term.toLowerCase().includes(keyword) ||
                  item.definition.toLowerCase().includes(keyword),
          )
        : terms.filter((item) => firstLetter(item) === letter);

    return (
        <PublicLayout title="Glossary">
            <section className="pt-12 pb-10 lg:pt-20">
                <div className="mx-auto max-w-5xl px-6 lg:px-12">
                    <h1 className="mb-4 text-4xl leading-tight font-extrabold tracking-tight text-ink sm:text-5xl lg:text-6xl">
                        Glossary Pasar Modal
                    </h1>
                    <p className="mb-8 max-w-2xl text-lg leading-relaxed text-slate-600">
                        Kumpulan {terms.length} istilah keuangan dan pasar modal
                        yang sering muncul di Ujian Standar Profesi Pasar Modal.
                    </p>

                    <label className="relative block max-w-xl">
                        <span className="sr-only">Cari istilah</span>
                        <svg
                            className="pointer-events-none absolute top-1/2 left-5 h-4 w-4 -translate-y-1/2 text-slate-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                            />
                        </svg>
                        <input
                            type="search"
                            value={query}
                            onChange={(event) => setQuery(event.target.value)}
                            placeholder="Cari istilah, misalnya: reksa dana"
                            className="w-full rounded-full border border-slate-200 bg-white py-3.5 pr-5 pl-12 text-sm shadow-soft outline-none placeholder:text-slate-400 focus:border-brand focus:ring-4 focus:ring-brand/15"
                        />
                    </label>
                </div>
            </section>

            <nav
                aria-label="Indeks huruf"
                className="sticky top-20 z-40 border-y border-line bg-white/90 backdrop-blur-md"
            >
                <div className="mx-auto no-scrollbar flex max-w-5xl gap-1 overflow-x-auto px-6 py-3 lg:px-12">
                    {alphabet.map((item) =>
                        available.has(item) ? (
                            <a
                                key={item}
                                href={`#huruf-${item}`}
                                aria-current={
                                    !keyword && item === letter
                                        ? 'true'
                                        : undefined
                                }
                                className={cn(
                                    'flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold text-slate-700 transition-colors hover:bg-brand-soft hover:text-brand',
                                    !keyword &&
                                        item === letter &&
                                        'bg-brand text-white hover:bg-brand hover:text-white',
                                )}
                            >
                                {item}
                            </a>
                        ) : (
                            <span
                                key={item}
                                className="flex h-8 w-8 shrink-0 items-center justify-center text-xs font-bold text-slate-300"
                            >
                                {item}
                            </span>
                        ),
                    )}
                </div>
            </nav>

            <section className="py-12 lg:py-16">
                <div
                    ref={listRef}
                    className="mx-auto max-w-5xl scroll-mt-40 px-6 lg:px-12"
                >
                    <p className="mb-6 text-sm text-slate-500">
                        {keyword ? (
                            <>
                                {visible.length} istilah cocok dengan “{query}”
                            </>
                        ) : (
                            <>
                                <span className="text-2xl font-extrabold text-ink">
                                    {letter}
                                </span>{' '}
                                · {visible.length} istilah
                            </>
                        )}
                    </p>

                    {visible.length === 0 ? (
                        <p className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center text-sm text-slate-500">
                            Tidak ada istilah yang cocok dengan “{query}”.
                        </p>
                    ) : (
                        <dl className="grid gap-4 md:grid-cols-2">
                            {visible.map((item) => (
                                <div
                                    key={item.term}
                                    className="rounded-2xl border border-line bg-white p-5"
                                >
                                    <dt className="mb-2 font-bold text-ink">
                                        {item.term}
                                    </dt>
                                    <dd className="text-sm leading-relaxed text-slate-600">
                                        {item.definition}
                                    </dd>
                                </div>
                            ))}
                        </dl>
                    )}
                </div>
            </section>

            <CtaBanner />
        </PublicLayout>
    );
}
