import { useState } from 'react';
import Icon from '@/components/admin/icon';
import { Card, demoToast, PageIntro } from '@/components/admin/ui';
import AdminLayout from '@/layouts/admin-layout';

const excelColumns = [
    'Kode Statis',
    'Soal',
    'Jawaban A sampai E',
    'Kunci',
    'Solusi',
    'Keterangan',
];

export default function UploadExcel({ templateUrl }: { templateUrl: string }) {
    const [fileName, setFileName] = useState('');

    return (
        <AdminLayout title="Upload Excel">
            <PageIntro description="Unggah banyak soal sekaligus dari file Excel." />
            <div className="grid gap-6 lg:grid-cols-3">
                <Card className="lg:col-span-2">
                    <form
                        onSubmit={(event) => {
                            event.preventDefault();
                            demoToast(
                                fileName
                                    ? undefined
                                    : 'Pilih file Excel terlebih dahulu.',
                            );
                        }}
                        className="space-y-5"
                    >
                        <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-line bg-canvas px-6 py-12 text-center hover:border-brand">
                            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-soft text-brand">
                                <Icon name="document" />
                            </span>
                            <span className="text-sm font-semibold text-ink">
                                {fileName || 'Pilih file Excel soal'}
                            </span>
                            <span className="text-xs text-slate-500">
                                Format .xlsx atau .xls
                            </span>
                            <input
                                type="file"
                                accept=".xlsx,.xls"
                                className="sr-only"
                                onChange={(event) =>
                                    setFileName(
                                        event.target.files?.[0]?.name ?? '',
                                    )
                                }
                            />
                        </label>
                        <button
                            type="submit"
                            className="rounded-xl bg-brand px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-hover"
                        >
                            Upload
                        </button>
                    </form>
                </Card>
                <Card title="Format kolom Excel">
                    <ol className="space-y-2 text-sm text-slate-600">
                        {excelColumns.map((column, index) => (
                            <li key={column} className="flex gap-2">
                                <span className="w-5 text-slate-400">
                                    {index + 1}.
                                </span>
                                {column}
                            </li>
                        ))}
                    </ol>
                    <a
                        href={templateUrl}
                        className="mt-5 inline-flex items-center gap-1.5 rounded-xl border border-line bg-white px-4 py-2 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
                    >
                        <Icon name="document" className="h-4 w-4" />
                        Unduh Template
                    </a>
                </Card>
            </div>
        </AdminLayout>
    );
}
