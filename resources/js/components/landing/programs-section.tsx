import { Link } from '@inertiajs/react';
import { register } from '@/routes';

const programs = [
    { code: 'WAPERD', name: 'Wakil Agen Penjual Efek Reksa Dana' },
    { code: 'WPPE', name: 'Wakil Perantara Pedagang Efek' },
    { code: 'WPPE-P', name: 'Wakil Perantara Pedagang Efek Pemasaran' },
    {
        code: 'WPPE-PT',
        name: 'Wakil Perantara Pedagang Efek Pemasaran Terbatas',
    },
    { code: 'WMI', name: 'Wakil Manajer Investasi' },
    { code: 'WPEE', name: 'Wakil Penjamin Emisi Efek' },
    { code: 'AAJI', name: 'Asosiasi Asuransi Jiwa Indonesia' },
];

export default function ProgramsSection() {
    return (
        <section
            id="program"
            className="relative scroll-mt-20 overflow-hidden px-6 py-24 lg:px-12 lg:py-28"
        >
            <div className="mx-auto max-w-7xl">
                <div className="mx-auto mb-14 max-w-2xl text-center">
                    <h2 className="mb-4 text-4xl leading-tight font-extrabold tracking-tight text-ink sm:text-5xl">
                        Program persiapan untuk setiap sertifikasi
                    </h2>
                    <p className="mx-auto max-w-lg text-base text-slate-600">
                        Bank soal dan materi disusun mengikuti topik Ujian
                        Standar Profesi Pasar Modal, sehingga Anda berlatih
                        dengan materi yang benar-benar diujikan.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {programs.map((program) => (
                        <Link
                            key={program.code}
                            href={register()}
                            className="group flex flex-col gap-4 rounded-2xl border border-line bg-white p-6 transition-colors duration-200 hover:border-brand"
                        >
                            <span className="text-2xl font-extrabold tracking-tight text-brand">
                                {program.code}
                            </span>
                            <span className="text-sm leading-snug font-semibold text-slate-800">
                                {program.name}
                            </span>
                            <span className="mt-auto text-xs font-semibold text-slate-500 transition-colors group-hover:text-ink">
                                Latihan & TryOut →
                            </span>
                        </Link>
                    ))}

                    <div className="flex flex-col justify-center gap-2 rounded-2xl border border-dashed border-line p-6">
                        <span className="text-sm font-bold text-ink">
                            Program non-sertifikasi
                        </span>
                        <span className="text-sm leading-snug text-slate-600">
                            Pelatihan keuangan dan pasar modal untuk kebutuhan
                            pengembangan profesional.
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
}
