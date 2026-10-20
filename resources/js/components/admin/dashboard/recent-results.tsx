import { Link } from '@inertiajs/react';
import type { ExamResult } from '@/components/admin/types';
import { Card } from '@/components/admin/ui';
import { cn } from '@/lib/utils';
import admin from '@/routes/admin';

export default function RecentResults({ results }: { results: ExamResult[] }) {
    return (
        <Card
            title="Hasil ujian terbaru"
            className="col-span-12 lg:col-span-8"
            action={
                <Link
                    href={admin.informasiHasil.url()}
                    className="text-xs font-semibold text-brand hover:text-brand-hover"
                >
                    Lihat semua
                </Link>
            }
        >
            <div className="-mx-5 overflow-x-auto">
                <table className="w-full min-w-[560px] text-left text-sm">
                    <thead>
                        <tr className="border-y border-line bg-slate-50/70 text-xs text-slate-500">
                            <th className="px-5 py-2.5 font-medium">Peserta</th>
                            <th className="px-3 py-2.5 font-medium">Ujian</th>
                            <th className="px-3 py-2.5 font-medium">Kelas</th>
                            <th className="px-5 py-2.5 text-right font-medium">
                                Nilai
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-line">
                        {results.map((result) => (
                            <tr key={result.number}>
                                <td className="px-5 py-3 font-semibold text-ink">
                                    {result.name}
                                    <span className="block font-mono text-xs font-normal text-slate-400">
                                        {result.number}
                                    </span>
                                </td>
                                <td className="px-3 py-3 text-slate-600">
                                    {result.examName}
                                    <span className="block text-xs text-slate-400">
                                        {result.exam}
                                    </span>
                                </td>
                                <td className="px-3 py-3 text-slate-600">
                                    {result.class}
                                </td>
                                <td className="px-5 py-3 text-right">
                                    <span
                                        className={cn(
                                            'font-bold tabular-nums',
                                            result.passed
                                                ? 'text-emerald-600'
                                                : 'text-red-600',
                                        )}
                                    >
                                        {result.score}
                                    </span>
                                    <span className="ml-1.5 text-xs text-slate-400">
                                        {result.passed
                                            ? 'Lulus'
                                            : 'Belum lulus'}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Card>
    );
}
