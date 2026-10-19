import { Link, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import {
    about,
    contact,
    faq,
    glossary,
    home,
    login,
    register,
    service,
    team,
} from '@/routes';

type NavLink = {
    label: string;
    href: string;
    children?: { label: string; href: string }[];
};

const glossaryRanges = [
    { label: 'Glossary A - E', letter: 'A' },
    { label: 'Glossary F - J', letter: 'F' },
    { label: 'Glossary K - O', letter: 'K' },
    { label: 'Glossary P - T', letter: 'P' },
    { label: 'Glossary U - Z', letter: 'U' },
];

const navLinks: NavLink[] = [
    { label: 'Home', href: home.url() },
    { label: 'FAQ', href: faq.url() },
    {
        label: 'Glossary',
        href: glossary.url(),
        children: glossaryRanges.map((range) => ({
            label: range.label,
            href: `${glossary.url()}#huruf-${range.letter}`,
        })),
    },
    { label: 'Contact Us', href: contact.url() },
    { label: 'Service', href: service.url() },
    { label: 'About Us', href: about.url() },
    { label: 'Our Team', href: team.url() },
];

// Past this many pixels of scroll the bar detaches into a floating pill.
const DETACH_AFTER = 24;

export default function SiteHeader() {
    const { url } = usePage();
    const [menuOpen, setMenuOpen] = useState(false);
    const [detached, setDetached] = useState(false);

    useEffect(() => {
        const onScroll = () => setDetached(window.scrollY > DETACH_AFTER);

        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });

        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const path = url.split(/[?#]/)[0];
    const isActive = (href: string) => path === href;

    // Both states add up to 80px tall (h-20, or pt-3 + h-17), so the page
    // below never jumps when the bar changes shape.
    return (
        <header
            className={cn(
                'sticky top-0 z-50 border-b transition-all duration-300 motion-reduce:transition-none',
                detached
                    ? 'border-transparent px-3 pt-3 sm:px-4'
                    : 'border-gray-100 bg-white/80 backdrop-blur-md',
            )}
        >
            <div
                className={cn(
                    'mx-auto flex items-center justify-between gap-4 border transition-all duration-300 motion-reduce:transition-none',
                    detached
                        ? 'h-17 max-w-6xl rounded-full border-line bg-white/85 px-4 shadow-floating backdrop-blur-md sm:px-5'
                        : 'h-20 max-w-7xl border-transparent px-6 lg:px-12',
                )}
            >
                <Link
                    href={home()}
                    className="group flex items-center gap-1.5 sm:gap-2"
                >
                    <img
                        src="/images/logo-mark.svg"
                        alt=""
                        className="h-7 w-7 shrink-0 sm:h-8 sm:w-8"
                    />
                    <span className="text-xl font-extrabold tracking-tight whitespace-nowrap text-ink transition-opacity group-hover:opacity-90 sm:text-2xl">
                        InvestaLearning
                    </span>
                </Link>

                <nav
                    aria-label="Navigasi utama"
                    className="hidden items-center gap-0.5 rounded-full border border-gray-200/50 bg-gray-100/80 p-1.5 xl:flex"
                >
                    {navLinks.map((link) => {
                        const linkClass = cn(
                            'rounded-full px-3.5 py-2 text-sm font-medium whitespace-nowrap text-slate-700 transition-all duration-200 hover:bg-white hover:text-ink',
                            isActive(link.href) &&
                                'bg-white text-ink shadow-sm',
                        );

                        if (!link.children) {
                            return (
                                <Link
                                    key={link.label}
                                    href={link.href}
                                    className={linkClass}
                                    aria-current={
                                        isActive(link.href) ? 'page' : undefined
                                    }
                                >
                                    {link.label}
                                </Link>
                            );
                        }

                        return (
                            <div key={link.label} className="group relative">
                                <Link
                                    href={link.href}
                                    className={cn(
                                        linkClass,
                                        'inline-flex items-center gap-1',
                                    )}
                                    aria-current={
                                        isActive(link.href) ? 'page' : undefined
                                    }
                                >
                                    {link.label}
                                    <svg
                                        className="h-3.5 w-3.5 transition-transform group-focus-within:rotate-180 group-hover:rotate-180"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            d="M19 9l-7 7-7-7"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                        />
                                    </svg>
                                </Link>
                                <div className="invisible absolute top-full left-0 pt-2 opacity-0 transition-opacity group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                                    <ul className="w-48 rounded-2xl border border-slate-100 bg-white p-1.5 shadow-floating">
                                        {link.children.map((child) => (
                                            <li key={child.label}>
                                                <SubLink
                                                    href={child.href}
                                                    samePage={isActive(
                                                        link.href,
                                                    )}
                                                    className="block rounded-xl px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-ink"
                                                >
                                                    {child.label}
                                                </SubLink>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        );
                    })}
                </nav>

                <div className="flex shrink-0 items-center gap-3 sm:gap-5">
                    <Link
                        href={login()}
                        className="hidden text-sm font-semibold whitespace-nowrap text-slate-800 transition-colors hover:text-slate-600 sm:inline"
                    >
                        Masuk
                    </Link>
                    <Link
                        href={register()}
                        className="rounded-full bg-brand px-4 py-2.5 text-sm font-semibold whitespace-nowrap text-white shadow-sm transition-all duration-200 hover:bg-brand-hover hover:shadow active:scale-95 sm:px-6"
                    >
                        Daftar
                    </Link>
                    <button
                        type="button"
                        aria-label={menuOpen ? 'Tutup menu' : 'Buka menu'}
                        aria-expanded={menuOpen}
                        aria-controls="mobile-menu"
                        onClick={() => setMenuOpen((open) => !open)}
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-700 xl:hidden"
                    >
                        <svg
                            className="h-5 w-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                d={
                                    menuOpen
                                        ? 'M6 18L18 6M6 6l12 12'
                                        : 'M4 7h16M4 12h16M4 17h16'
                                }
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                            />
                        </svg>
                    </button>
                </div>
            </div>

            {menuOpen && (
                <nav
                    id="mobile-menu"
                    aria-label="Navigasi utama"
                    className="mx-3 mt-2 max-h-[calc(100vh-6rem)] overflow-y-auto rounded-2xl border border-line bg-white px-3 py-3 shadow-floating sm:mx-4 xl:hidden"
                >
                    <ul className="space-y-1">
                        {navLinks.map((link) => (
                            <li key={link.label}>
                                <Link
                                    href={link.href}
                                    onClick={() => setMenuOpen(false)}
                                    className={cn(
                                        'block rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50',
                                        isActive(link.href) &&
                                            'bg-slate-100 text-ink',
                                    )}
                                >
                                    {link.label}
                                </Link>
                                {link.children && (
                                    <ul className="mb-1 ml-4 border-l border-slate-100 pl-2">
                                        {link.children.map((child) => (
                                            <li key={child.label}>
                                                <SubLink
                                                    href={child.href}
                                                    samePage={isActive(
                                                        link.href,
                                                    )}
                                                    onClick={() =>
                                                        setMenuOpen(false)
                                                    }
                                                    className="block rounded-xl px-4 py-2 text-sm text-slate-600 hover:bg-slate-50"
                                                >
                                                    {child.label}
                                                </SubLink>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        ))}
                        <li className="sm:hidden">
                            <Link
                                href={login()}
                                className="block rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                            >
                                Masuk
                            </Link>
                        </li>
                    </ul>
                </nav>
            )}
        </header>
    );
}

// Already on the target page: a plain anchor only changes the hash, which the
// page listens to, instead of making another Inertia visit.
function SubLink({
    href,
    samePage,
    className,
    onClick,
    children,
}: {
    href: string;
    samePage: boolean;
    className: string;
    onClick?: () => void;
    children: ReactNode;
}) {
    if (samePage) {
        return (
            <a href={href} className={className} onClick={onClick}>
                {children}
            </a>
        );
    }

    return (
        <Link href={href} className={className} onClick={onClick}>
            {children}
        </Link>
    );
}
