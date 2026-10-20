import { Link } from '@inertiajs/react';
import { Reveal } from '@/components/landing/motion';
import { register } from '@/routes';

export default function CtaBanner() {
    return (
        <section className="relative overflow-hidden bg-ink py-16 text-white">
            <Reveal className="relative z-10 mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 px-6 md:flex-row lg:px-12">
                <div>
                    <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                        Siap menghadapi Ujian Standar Profesi Pasar Modal?
                    </h2>
                    <p className="mt-2 text-base text-slate-400">
                        Daftar sekarang dan mulai berlatih dengan soal yang
                        disusun sesuai topik ujian.
                    </p>
                </div>
                <div className="flex shrink-0 flex-wrap items-center gap-4">
                    <Link
                        href={register()}
                        className="rounded-full bg-brand px-8 py-3.5 font-bold text-white shadow-md transition-all duration-200 hover:bg-brand-hover"
                    >
                        Daftar sekarang
                    </Link>
                    <a
                        href="https://wa.me/6281519629804"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-full border border-white/20 px-6 py-3.5 font-semibold text-white transition-colors hover:bg-white/10"
                    >
                        Tanya via WhatsApp
                    </a>
                </div>
            </Reveal>
        </section>
    );
}
