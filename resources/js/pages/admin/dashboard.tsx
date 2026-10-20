import { Link } from '@inertiajs/react';
import ExamShare from '@/components/admin/dashboard/exam-share';
import type { ExamShareItem } from '@/components/admin/dashboard/exam-share';
import RecentParticipants from '@/components/admin/dashboard/recent-participants';
import type { RecentParticipant } from '@/components/admin/dashboard/recent-participants';
import RecentResults from '@/components/admin/dashboard/recent-results';
import Icon from '@/components/admin/icon';
import type { ExamResult } from '@/components/admin/types';
import { Card, StatTile } from '@/components/admin/ui';
import AdminLayout from '@/layouts/admin-layout';
import admin from '@/routes/admin';

// Both summaries are deferred props (see DashboardController): undefined
// until they arrive a moment after the page.
type Participants = {
    total: number;
    active: number;
    byExam: ExamShareItem[];
    recent: RecentParticipant[];
};

type Exams = {
    subjects: number;
    questions: number;
    results: number;
    recentResults: ExamResult[];
};

const number = (value: number | undefined) =>
    value === undefined ? '…' : value.toLocaleString('id-ID');

export default function Dashboard({
    participants,
    exams,
}: {
    participants?: Participants;
    exams?: Exams;
}) {
    return (
        <AdminLayout title="Dashboard">
            <div className="mb-6 flex flex-wrap items-center justify-end gap-3">
                <Link
                    href={admin.tambahSoal.url()}
                    className="flex items-center gap-1.5 rounded-xl bg-brand px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-brand-hover"
                >
                    <Icon name="plus" className="h-4 w-4" />
                    Tambah Soal
                </Link>
            </div>

            <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    <StatTile
                        label="Peserta terdaftar"
                        value={number(participants?.total)}
                        icon="users"
                        hint={
                            participants
                                ? `${number(participants.active)} akun aktif`
                                : undefined
                        }
                    />
                    <StatTile
                        label="Mata pelajaran"
                        value={number(exams?.subjects)}
                        icon="book"
                    />
                    <StatTile
                        label="Bank soal"
                        value={number(exams?.questions)}
                        icon="database"
                    />
                    <StatTile
                        label="Hasil ujian"
                        value={number(exams?.results)}
                        icon="chart"
                    />
                </div>

                {exams ? (
                    <RecentResults results={exams.recentResults} />
                ) : (
                    <Loading
                        title="Hasil ujian terbaru"
                        className="lg:col-span-8"
                    />
                )}
                {participants ? (
                    <RecentParticipants participants={participants.recent} />
                ) : (
                    <Loading
                        title="Pendaftar terbaru"
                        className="lg:col-span-4"
                    />
                )}
                {participants ? (
                    <ExamShare items={participants.byExam} />
                ) : (
                    <Loading
                        title="Peserta per jenis ujian"
                        className="lg:col-span-4"
                    />
                )}
            </div>
        </AdminLayout>
    );
}

function Loading({ title, className }: { title: string; className: string }) {
    return (
        <Card title={title} className={`col-span-12 ${className}`}>
            <div className="space-y-3" aria-busy="true">
                {[0, 1, 2].map((row) => (
                    <div
                        key={row}
                        className="h-10 animate-pulse rounded-xl bg-slate-100 motion-reduce:animate-none"
                    />
                ))}
                <span className="sr-only">Memuat data</span>
            </div>
        </Card>
    );
}
