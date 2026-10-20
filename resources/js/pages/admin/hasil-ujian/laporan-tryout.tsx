import { router } from '@inertiajs/react';
import { Count, Mono, Percent, QuestionText } from '@/components/admin/cells';
import DataTable from '@/components/admin/data-table';
import type { Column } from '@/components/admin/data-table';
import type { Option, ServerTable } from '@/components/admin/types';
import { Card, fieldClass, FormField, PageIntro } from '@/components/admin/ui';
import AdminLayout from '@/layouts/admin-layout';

type QuestionReport = {
    key: string;
    staticCode: string;
    order: number;
    text: string;
    correct: number;
    total: number;
};

type Selected = { paket: string; ke: string };

const attempts = ['1', '2', '3', '4', '5'];

const columns: Column<QuestionReport>[] = [
    { label: 'No Urut', render: (row) => row.order },
    { label: 'Kd Statis', render: (row) => <Mono>{row.staticCode}</Mono> },
    { label: 'Soal', render: (row) => <QuestionText>{row.text}</QuestionText> },
    {
        label: 'Menjawab Benar',
        render: (row) => <Count value={row.correct} />,
    },
    { label: 'Total Peserta', render: (row) => <Count value={row.total} /> },
    {
        label: 'Persentase Benar',
        render: (row) => (
            <Percent
                value={
                    row.total === 0
                        ? 0
                        : Math.round((row.correct / row.total) * 100)
                }
            />
        ),
    },
];

export default function LaporanTryout({
    packageOptions,
    selected,
    table,
}: {
    packageOptions: Option[];
    selected: Selected;
    table: ServerTable<QuestionReport> | null;
}) {
    const choose = (changes: Partial<Selected>) =>
        router.get(
            window.location.pathname,
            Object.fromEntries(
                Object.entries({ ...selected, ...changes }).filter(
                    ([, value]) => value !== '',
                ),
            ),
            { preserveState: true, preserveScroll: true, replace: true },
        );

    return (
        <AdminLayout title="Laporan Tryout">
            <PageIntro description="Persentase peserta yang menjawab benar untuk setiap soal TryOut." />
            <div className="space-y-6">
                <Card>
                    <div className="grid gap-4 sm:grid-cols-3">
                        <FormField
                            label="Paket TryOut"
                            className="sm:col-span-2"
                        >
                            <select
                                value={selected.paket}
                                onChange={(event) =>
                                    choose({ paket: event.target.value })
                                }
                                className={fieldClass}
                            >
                                <option value="">Pilih paket</option>
                                {packageOptions.map((option) => (
                                    <option
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </FormField>
                        <FormField label="Ujian Ke">
                            <select
                                value={selected.ke}
                                onChange={(event) =>
                                    choose({ ke: event.target.value })
                                }
                                className={fieldClass}
                            >
                                {attempts.map((attempt) => (
                                    <option key={attempt} value={attempt}>
                                        {attempt}
                                    </option>
                                ))}
                            </select>
                        </FormField>
                    </div>
                </Card>

                {table ? (
                    <DataTable
                        title="Laporan per soal"
                        table={table}
                        columns={columns}
                        rowKey={(row) => row.key}
                        search
                        emptyText="Belum ada peserta yang mengerjakan TryOut ini."
                    />
                ) : (
                    <Card>
                        <p className="py-8 text-center text-sm text-slate-500">
                            {packageOptions.length === 0
                                ? 'Belum ada paket TryOut untuk akun admin ini.'
                                : 'Pilih paket TryOut untuk melihat laporannya.'}
                        </p>
                    </Card>
                )}
            </div>
        </AdminLayout>
    );
}
