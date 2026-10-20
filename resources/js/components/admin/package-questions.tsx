import { router } from '@inertiajs/react';
import { Mono, QuestionText } from '@/components/admin/cells';
import DataTable from '@/components/admin/data-table';
import type { Column } from '@/components/admin/data-table';
import type { Option, ServerTable } from '@/components/admin/types';
import {
    Badge,
    Button,
    Card,
    fieldClass,
    FormField,
} from '@/components/admin/ui';

export type PackageQuestion = {
    code: string;
    staticCode: string;
    order: number;
    text: string;
    answer: string;
    minutes: number;
};

type Selected = { pelajaran: string; jenis: string; kelas: string };

const columns: Column<PackageQuestion>[] = [
    { label: 'No Urut', render: (row) => row.order },
    { label: 'Kd Soal', render: (row) => <Mono>{row.code}</Mono> },
    { label: 'Kd Statis', render: (row) => <Mono>{row.staticCode}</Mono> },
    { label: 'Soal', render: (row) => <QuestionText>{row.text}</QuestionText> },
    {
        label: 'Kunci',
        render: (row) => <Badge tone="brand">{row.answer}</Badge>,
    },
    {
        label: 'Pilihan',
        render: () => <Button variant="danger">Hapus</Button>,
    },
];

// Questions in one practice or TryOut package. The backend needs subject,
// exam type and class together before it returns anything.
export default function PackageQuestions({
    kind,
    selected,
    table,
    subjectOptions,
    examOptions,
    classOptions,
}: {
    kind: 'Latihan' | 'Tryout';
    selected: Selected;
    table: ServerTable<PackageQuestion> | null;
    subjectOptions: Option[];
    examOptions: Option[];
    classOptions: Option[];
}) {
    const choose = (key: keyof Selected, value: string) =>
        router.get(
            window.location.pathname,
            Object.fromEntries(
                Object.entries({ ...selected, [key]: value }).filter(
                    ([, entry]) => entry !== '',
                ),
            ),
            { preserveState: true, preserveScroll: true, replace: true },
        );

    const selects: {
        key: keyof Selected;
        label: string;
        options: Option[];
    }[] = [
        { key: 'pelajaran', label: 'Pelajaran', options: subjectOptions },
        { key: 'jenis', label: 'Jenis Ujian', options: examOptions },
        { key: 'kelas', label: 'Kelas', options: classOptions },
    ];

    return (
        <div className="space-y-6">
            <Card>
                <div className="grid gap-4 sm:grid-cols-3">
                    {selects.map((select) => (
                        <FormField key={select.key} label={select.label}>
                            <select
                                value={selected[select.key]}
                                onChange={(event) =>
                                    choose(select.key, event.target.value)
                                }
                                className={fieldClass}
                            >
                                <option value="">Pilih {select.label}</option>
                                {select.options.map((option) => (
                                    <option
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </FormField>
                    ))}
                </div>
            </Card>

            {table ? (
                <DataTable
                    title={`Soal ${kind.toLowerCase()} di paket ini`}
                    table={table}
                    columns={columns}
                    rowKey={(row) => row.code}
                    search
                    emptyText="Paket ini belum berisi soal."
                    actions={<Button icon="plus">Tambah Soal {kind}</Button>}
                />
            ) : (
                <Card>
                    <p className="py-8 text-center text-sm text-slate-500">
                        Pilih pelajaran, jenis ujian, dan kelas untuk melihat
                        soalnya.
                    </p>
                </Card>
            )}
        </div>
    );
}
