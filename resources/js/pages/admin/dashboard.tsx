import { Link } from '@inertiajs/react';
import { useState } from 'react';
import type { ReactNode } from 'react';
import Icon from '@/components/admin/icon';
import type { IconName } from '@/components/admin/icon';
import AdminLayout from '@/layouts/admin-layout';
import { cn } from '@/lib/utils';
import admin from '@/routes/admin';

// Static sample data until the admin panel is connected to the database.
const stats: {
    label: string;
    value: string;
    change: number;
    icon: IconName;
}[] = [
    { label: 'Peserta aktif', value: '1.284', change: 8.2, icon: 'users' },
    { label: 'Bank soal', value: '6.420', change: 3.1, icon: 'database' },
    {
        label: 'TryOut dikerjakan bulan ini',
        value: '3.918',
        change: 12.4,
        icon: 'chart',
    },
    { label: 'Sertifikat terbit', value: '312', change: -2.6, icon: 'badge' },
];

const dailyTryouts = [
    { day: 'Kam', date: '9 Okt', count: 118 },
    { day: 'Jum', date: '10 Okt', count: 142 },
    { day: 'Sab', date: '11 Okt', count: 96 },
    { day: 'Min', date: '12 Okt', count: 74 },
    { day: 'Sen', date: '13 Okt', count: 186 },
    { day: 'Sel', date: '14 Okt', count: 164 },
    { day: 'Rab', date: '15 Okt', count: 151 },
];

type Participant = {
    name: string;
    exam: string;
    plan: string;
    status: 'aktif' | 'baru';
    joined: string;
};

const participants: Participant[] = [
    {
        name: 'Rina Kartika',
        exam: 'WAPERD',
        plan: 'Khusus A',
        status: 'baru',
        joined: 'Hari ini',
    },
    {
        name: 'Dimas Prasetyo',
        exam: 'WPPE',
        plan: 'Biasa',
        status: 'baru',
        joined: 'Hari ini',
    },
    {
        name: 'Siti Rahmawati',
        exam: 'WMI',
        plan: 'Khusus B',
        status: 'aktif',
        joined: '14 Okt',
    },
    {
        name: 'Andi Wijaya',
        exam: 'WPPE Pemasaran',
        plan: 'Biasa',
        status: 'aktif',
        joined: '13 Okt',
    },
    {
        name: 'Maya Lestari',
        exam: 'AAJI',
        plan: 'Khusus C',
        status: 'baru',
        joined: '13 Okt',
    },
    {
        name: 'Budi Santoso',
        exam: 'WAPERD',
        plan: 'Biasa',
        status: 'aktif',
        joined: '12 Okt',
    },
    {
        name: 'Fajar Nugroho',
        exam: 'WPEE',
        plan: 'Khusus A',
        status: 'aktif',
        joined: '11 Okt',
    },
];

const results = [
    {
        name: 'Siti Rahmawati',
        exam: 'WMI',
        packageName: 'Paket 3',
        attempt: 2,
        score: 82,
        date: '15 Okt, 14:20',
    },
    {
        name: 'Budi Santoso',
        exam: 'WAPERD',
        packageName: 'Paket 1',
        attempt: 3,
        score: 76,
        date: '15 Okt, 11:05',
    },
    {
        name: 'Andi Wijaya',
        exam: 'WPPE Pemasaran',
        packageName: 'Paket 2',
        attempt: 1,
        score: 58,
        date: '15 Okt, 09:47',
    },
    {
        name: 'Fajar Nugroho',
        exam: 'WPEE',
        packageName: 'Paket 1',
        attempt: 1,
        score: 64,
        date: '14 Okt, 19:30',
    },
    {
        name: 'Rina Kartika',
        exam: 'WAPERD',
        packageName: 'Paket 1',
        attempt: 1,
        score: 71,
        date: '14 Okt, 16:12',
    },
];

const PASSING_SCORE = 70;

const examShare = [
    { exam: 'WAPERD', count: 486 },
    { exam: 'WPPE', count: 271 },
    { exam: 'WPPE Pemasaran', count: 198 },
    { exam: 'WMI', count: 142 },
    { exam: 'AAJI', count: 117 },
    { exam: 'Lainnya', count: 70 },
];

export default function Dashboard() {
    return (
        <AdminLayout title="Dashboard">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                <span className="flex items-center gap-2 rounded-xl border border-line bg-white px-3 py-1.5 text-xs font-medium text-slate-600 shadow-sm">
                    <Icon name="calendar" className="h-4 w-4 text-slate-400" />
                    Pembaruan terakhir: 15 Okt 2026
                </span>
                <Link
                    href={admin.page.url('tambah-soal')}
                    className="flex items-center gap-1.5 rounded-xl bg-brand px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-brand-hover"
                >
                    <Icon name="plus" className="h-4 w-4" />
                    Tambah Soal
                </Link>
            </div>

            <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    {stats.map((stat) => (
                        <StatCard key={stat.label} {...stat} />
                    ))}
                </div>

                <TryoutChart />
                <RecentParticipants />
                <RecentResults />
                <ExamShare />
            </div>
        </AdminLayout>
    );
}

function Card({
    title,
    action,
    className,
    children,
}: {
    title: string;
    action?: ReactNode;
    className?: string;
    children: ReactNode;
}) {
    return (
        <section
            className={cn(
                'col-span-12 rounded-2xl border border-line bg-white p-5 shadow-sm',
                className,
            )}
        >
            <div className="mb-4 flex items-center justify-between gap-3">
                <h2 className="text-sm font-semibold text-ink">{title}</h2>
                {action}
            </div>
            {children}
        </section>
    );
}

function StatCard({
    label,
    value,
    change,
    icon,
}: {
    label: string;
    value: string;
    change: number;
    icon: IconName;
}) {
    const up = change >= 0;

    return (
        <div className="rounded-2xl border border-line bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
                <span className="text-sm text-slate-500">{label}</span>
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-soft text-brand">
                    <Icon name={icon} className="h-4.5 w-4.5" />
                </span>
            </div>
            <p className="text-2xl font-extrabold tracking-tight text-ink tabular-nums">
                {value}
            </p>
            <p className="mt-1 flex items-center gap-1 text-xs text-slate-500">
                <span
                    className={cn(
                        'flex items-center gap-0.5 font-semibold',
                        up ? 'text-emerald-600' : 'text-red-600',
                    )}
                >
                    <Icon
                        name={up ? 'arrowUp' : 'arrowDown'}
                        className="h-3 w-3"
                    />
                    {Math.abs(change).toLocaleString('id-ID')}%
                </span>
                dari bulan lalu
            </p>
        </div>
    );
}

function TryoutChart() {
    const max = Math.max(...dailyTryouts.map((day) => day.count));
    const ceiling = Math.ceil(max / 50) * 50;
    const total = dailyTryouts.reduce((sum, day) => sum + day.count, 0);
    const gridSteps = [1, 0.5, 0];

    return (
        <Card
            title="TryOut dikerjakan, 7 hari terakhir"
            className="lg:col-span-8"
            action={
                <span className="rounded-lg border border-line px-2.5 py-1 text-xs font-medium text-slate-600">
                    Mingguan
                </span>
            }
        >
            <p className="mb-8 text-2xl font-extrabold tracking-tight tabular-nums">
                {total.toLocaleString('id-ID')}
                <span className="ml-2 text-sm font-medium text-slate-500">
                    TryOut
                </span>
            </p>

            <div className="flex gap-3">
                <div className="relative h-48 w-8 shrink-0">
                    {gridSteps.map((step) => (
                        <span
                            key={step}
                            className="absolute right-0 translate-y-1/2 text-[11px] text-slate-400 tabular-nums"
                            style={{ bottom: `${step * 100}%` }}
                        >
                            {Math.round(ceiling * step)}
                        </span>
                    ))}
                </div>

                <div className="relative h-48 flex-1">
                    {gridSteps.map((step) => (
                        <span
                            key={step}
                            aria-hidden="true"
                            className="absolute inset-x-0 border-t border-dashed border-line"
                            style={{ bottom: `${step * 100}%` }}
                        />
                    ))}

                    <div className="absolute inset-0 flex items-end justify-between gap-2 sm:gap-4">
                        {dailyTryouts.map((day) => {
                            const peak = day.count === max;

                            return (
                                <div
                                    key={day.date}
                                    className="group flex h-full flex-1 items-end justify-center"
                                >
                                    <div
                                        className="relative w-full max-w-12"
                                        style={{
                                            height: `${(day.count / ceiling) * 100}%`,
                                        }}
                                    >
                                        <span
                                            className={cn(
                                                'pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 rounded-lg bg-ink px-2 py-1 text-[11px] font-semibold whitespace-nowrap text-white transition-opacity',
                                                peak
                                                    ? 'opacity-100'
                                                    : 'opacity-0 group-hover:opacity-100',
                                            )}
                                        >
                                            {day.count} TryOut
                                        </span>
                                        <span
                                            className={cn(
                                                'block h-full w-full rounded-t-lg transition-colors',
                                                peak
                                                    ? 'bg-brand'
                                                    : 'bg-brand-soft group-hover:bg-brand/40',
                                            )}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            <div className="mt-2 ml-11 flex justify-between gap-2 sm:gap-4">
                {dailyTryouts.map((day) => (
                    <span
                        key={day.date}
                        className={cn(
                            'flex-1 text-center text-xs',
                            day.count === max
                                ? 'font-semibold text-ink'
                                : 'text-slate-400',
                        )}
                    >
                        {day.day}
                    </span>
                ))}
            </div>
        </Card>
    );
}

const participantTabs = [
    { key: 'semua', label: 'Semua' },
    { key: 'aktif', label: 'Aktif' },
    { key: 'baru', label: 'Baru' },
] as const;

type ParticipantTab = (typeof participantTabs)[number]['key'];

function RecentParticipants() {
    const [tab, setTab] = useState<ParticipantTab>('semua');

    const visible =
        tab === 'semua'
            ? participants
            : participants.filter((participant) => participant.status === tab);

    return (
        <Card
            title="Peserta terbaru"
            className="lg:col-span-4"
            action={
                <Link
                    href={admin.page.url('data-peserta')}
                    className="text-xs font-semibold text-brand hover:text-brand-hover"
                >
                    Lihat semua
                </Link>
            }
        >
            <div
                role="tablist"
                className="mb-4 grid grid-cols-3 rounded-xl bg-slate-100/80 p-1 text-center text-xs font-medium"
            >
                {participantTabs.map((item) => (
                    <button
                        key={item.key}
                        type="button"
                        role="tab"
                        aria-selected={tab === item.key}
                        onClick={() => setTab(item.key)}
                        className={cn(
                            'rounded-lg py-1.5 transition',
                            tab === item.key
                                ? 'bg-white font-semibold text-ink shadow-sm'
                                : 'text-slate-500 hover:text-ink',
                        )}
                    >
                        {item.label}
                    </button>
                ))}
            </div>

            <ul className="space-y-2.5">
                {visible.map((participant) => (
                    <li
                        key={participant.name}
                        className="flex items-center justify-between gap-3 rounded-xl border border-slate-100 p-3 transition hover:border-line hover:bg-slate-50/60"
                    >
                        <div className="flex min-w-0 items-center gap-3">
                            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-soft text-xs font-bold text-brand">
                                {initials(participant.name)}
                            </span>
                            <div className="min-w-0">
                                <p className="truncate text-xs font-semibold text-ink">
                                    {participant.name}
                                </p>
                                <p className="truncate text-[11px] text-slate-400">
                                    {participant.exam} · {participant.plan}
                                </p>
                            </div>
                        </div>
                        <div className="shrink-0 text-right">
                            <span
                                className={cn(
                                    'text-[11px] font-semibold',
                                    participant.status === 'baru'
                                        ? 'text-brand'
                                        : 'text-emerald-600',
                                )}
                            >
                                {participant.status === 'baru'
                                    ? 'Baru'
                                    : 'Aktif'}
                            </span>
                            <p className="text-[11px] text-slate-400">
                                {participant.joined}
                            </p>
                        </div>
                    </li>
                ))}
            </ul>
        </Card>
    );
}

function RecentResults() {
    return (
        <Card
            title="Hasil TryOut terbaru"
            className="lg:col-span-8"
            action={
                <Link
                    href={admin.page.url('laporan-tryout')}
                    className="text-xs font-semibold text-brand hover:text-brand-hover"
                >
                    Laporan lengkap
                </Link>
            }
        >
            <div className="-mx-5 overflow-x-auto">
                <table className="w-full min-w-[560px] text-left text-sm">
                    <thead>
                        <tr className="border-y border-line bg-slate-50/70 text-xs text-slate-500">
                            <th className="px-5 py-2.5 font-medium">Peserta</th>
                            <th className="px-3 py-2.5 font-medium">Ujian</th>
                            <th className="px-3 py-2.5 font-medium">
                                Percobaan
                            </th>
                            <th className="px-3 py-2.5 font-medium">Skor</th>
                            <th className="px-5 py-2.5 text-right font-medium">
                                Waktu
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-line">
                        {results.map((result) => {
                            const passed = result.score >= PASSING_SCORE;

                            return (
                                <tr key={`${result.name}-${result.date}`}>
                                    <td className="px-5 py-3 font-semibold text-ink">
                                        {result.name}
                                    </td>
                                    <td className="px-3 py-3 text-slate-600">
                                        {result.exam}
                                        <span className="block text-xs text-slate-400">
                                            {result.packageName}
                                        </span>
                                    </td>
                                    <td className="px-3 py-3 text-slate-600 tabular-nums">
                                        {result.attempt}/3
                                    </td>
                                    <td className="px-3 py-3">
                                        <span
                                            className={cn(
                                                'font-bold tabular-nums',
                                                passed
                                                    ? 'text-emerald-600'
                                                    : 'text-red-600',
                                            )}
                                        >
                                            {result.score}
                                        </span>
                                        <span className="ml-1.5 text-xs text-slate-400">
                                            {passed ? 'Lulus' : 'Belum lulus'}
                                        </span>
                                    </td>
                                    <td className="px-5 py-3 text-right text-xs text-slate-500">
                                        {result.date}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </Card>
    );
}

function ExamShare() {
    const total = examShare.reduce((sum, item) => sum + item.count, 0);

    return (
        <Card title="Peserta per jenis ujian" className="lg:col-span-4">
            <ul className="space-y-4">
                {examShare.map((item) => {
                    const share = (item.count / total) * 100;

                    return (
                        <li key={item.exam}>
                            <div className="mb-1.5 flex justify-between text-xs">
                                <span className="font-medium text-slate-600">
                                    {item.exam}
                                </span>
                                <span className="text-slate-500 tabular-nums">
                                    {item.count.toLocaleString('id-ID')} ·{' '}
                                    {Math.round(share)}%
                                </span>
                            </div>
                            <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                                <div
                                    className="h-full rounded-full bg-brand"
                                    style={{ width: `${share}%` }}
                                />
                            </div>
                        </li>
                    );
                })}
            </ul>
        </Card>
    );
}

function initials(name: string): string {
    return name
        .split(' ')
        .slice(0, 2)
        .map((part) => part.charAt(0))
        .join('');
}
