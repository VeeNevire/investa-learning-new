import { Link } from '@inertiajs/react';
import { Card } from '@/components/admin/ui';
import { cn } from '@/lib/utils';
import admin from '@/routes/admin';

export type RecentParticipant = {
    uid: string;
    name: string;
    exam: string;
    class: string;
    status: 'aktif' | 'nonaktif';
    registered: string;
};

export default function RecentParticipants({
    participants,
}: {
    participants: RecentParticipant[];
}) {
    return (
        <Card
            title="Pendaftar terbaru"
            className="col-span-12 lg:col-span-4"
            action={
                <Link
                    href={admin.dataPeserta.url()}
                    className="text-xs font-semibold text-brand hover:text-brand-hover"
                >
                    Lihat semua
                </Link>
            }
        >
            <ul className="space-y-2.5">
                {participants.map((participant) => (
                    <li
                        key={participant.uid}
                        className="flex items-center justify-between gap-3 rounded-xl border border-slate-100 p-3"
                    >
                        <div className="flex min-w-0 items-center gap-3">
                            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-soft text-xs font-bold text-brand uppercase">
                                {initials(participant.name)}
                            </span>
                            <div className="min-w-0">
                                <p className="truncate text-xs font-semibold text-ink">
                                    {participant.name}
                                </p>
                                <p className="truncate text-[11px] text-slate-400">
                                    {participant.exam} · {participant.class}
                                </p>
                            </div>
                        </div>
                        <div className="shrink-0 text-right">
                            <span
                                className={cn(
                                    'text-[11px] font-semibold',
                                    participant.status === 'aktif'
                                        ? 'text-emerald-600'
                                        : 'text-slate-400',
                                )}
                            >
                                {participant.status === 'aktif'
                                    ? 'Aktif'
                                    : 'Nonaktif'}
                            </span>
                            <p className="text-[11px] text-slate-400">
                                {participant.registered}
                            </p>
                        </div>
                    </li>
                ))}
            </ul>
        </Card>
    );
}

function initials(name: string): string {
    return name
        .split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part.charAt(0))
        .join('');
}
