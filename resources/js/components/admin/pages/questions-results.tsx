import { router } from '@inertiajs/react';
import { useState } from 'react';
import DataTable, { RowActions } from '@/components/admin/data-table';
import type { Column } from '@/components/admin/data-table';
import {
    bankQuestions,
    examResults,
    examTypes,
    packages,
    participantSummaries,
    PASSING_SCORE,
    practiceQuestions,
    subjects,
    topicDetails,
    topics,
    topicSummaries,
    tryoutQuestions,
    tryoutReport,
} from '@/components/admin/dummy';
import type {
    ExamResult,
    ParticipantSummary,
    Question,
    QuestionReport,
    TopicDetail,
    TopicSummary,
} from '@/components/admin/dummy';
import Icon from '@/components/admin/icon';
import type { AdminPageMap } from '@/components/admin/pages/types';
import admin from '@/routes/admin';
import {
    Badge,
    Button,
    Card,
    demoToast,
    fieldClass,
    FormField,
    StatTile,
} from '@/components/admin/ui';
import { cn } from '@/lib/utils';

function Mono({ children }: { children: string }) {
    return <span className="font-mono text-xs text-slate-500">{children}</span>;
}

function QuestionText({ children }: { children: string }) {
    return <span className="line-clamp-2 max-w-md text-ink">{children}</span>;
}

function Percent({ value }: { value: number }) {
    return (
        <span className="flex items-center gap-2">
            <span className="h-1.5 w-20 overflow-hidden rounded-full bg-slate-100">
                <span
                    className={cn(
                        'block h-full rounded-full',
                        value >= PASSING_SCORE ? 'bg-brand' : 'bg-amber-400',
                    )}
                    style={{ width: `${value}%` }}
                />
            </span>
            <span className="text-xs font-semibold text-ink tabular-nums">
                {value}%
            </span>
        </span>
    );
}

const bankColumns: Column<Question>[] = [
    { label: 'Kd Soal', render: (row) => <Mono>{row.code}</Mono> },
    { label: 'Kd Statis', render: (row) => <Mono>{row.staticCode}</Mono> },
    { label: 'Soal', render: (row) => <QuestionText>{row.text}</QuestionText> },
    {
        label: 'Kunci',
        render: (row) => <Badge tone="brand">{row.answer}</Badge>,
    },
    { label: 'Keterangan', render: (row) => row.topic },
    {
        label: 'Pilihan',
        render: () => (
            <RowActions>
                <Button variant="ghost">Ubah</Button>
                <Button variant="danger">Hapus</Button>
            </RowActions>
        ),
    },
];

function BankQuestionsPage() {
    return (
        <DataTable
            title="Daftar soal"
            rows={bankQuestions}
            columns={bankColumns}
            rowKey={(row) => row.code}
            searchText={(row) => `${row.code} ${row.staticCode} ${row.text}`}
            filters={[
                {
                    label: 'Pelajaran',
                    options: subjects.map((subject) => subject.name),
                    value: (row) => row.subject,
                },
                {
                    label: 'Topik',
                    options: topics,
                    value: (row) => row.topic,
                },
            ]}
            actions={
                <Button
                    icon="plus"
                    onClick={() => router.visit(admin.page.url('tambah-soal'))}
                >
                    Tambah Soal
                </Button>
            }
        />
    );
}

const practiceColumns: Column<Question>[] = [
    { label: 'Kd Soal', render: (row) => <Mono>{row.code}</Mono> },
    { label: 'Kd Statis', render: (row) => <Mono>{row.staticCode}</Mono> },
    { label: 'No Urut', render: (row) => row.order },
    { label: 'Soal', render: (row) => <QuestionText>{row.text}</QuestionText> },
    {
        label: 'Jawab',
        render: (row) => <Badge tone="brand">{row.answer}</Badge>,
    },
    { label: 'Waktu', render: (row) => `${row.minutes} menit` },
    {
        label: 'Pilihan',
        render: () => <Button variant="danger">Hapus</Button>,
    },
];

function examQuestionsPage(rows: Question[], kind: string) {
    return function ExamQuestionsPage() {
        return (
            <DataTable
                title={`Daftar soal ${kind}`}
                rows={rows}
                columns={practiceColumns}
                rowKey={(row) => row.code}
                searchText={(row) => `${row.code} ${row.text}`}
                filters={[
                    {
                        label: 'Jenis Ujian',
                        options: [...examTypes],
                        value: (row) => row.exam,
                    },
                    {
                        label: 'Kelas',
                        options: [...packages],
                        value: (row) => row.plan,
                    },
                ]}
                actions={<Button icon="plus">Tambah Soal {kind}</Button>}
            />
        );
    };
}

function AddQuestionPage() {
    return (
        <Card className="max-w-3xl">
            <form
                onSubmit={(event) => {
                    event.preventDefault();
                    demoToast('Soal tersimpan (mode demo).');
                }}
                className="space-y-5"
            >
                <div className="grid gap-5 sm:grid-cols-2">
                    <FormField label="Kode Statis">
                        <input
                            type="text"
                            defaultValue="ST-512"
                            className={fieldClass}
                        />
                    </FormField>
                    <FormField label="Mata Pelajaran">
                        <select className={fieldClass}>
                            {subjects.map((subject) => (
                                <option key={subject.code}>
                                    {subject.name}
                                </option>
                            ))}
                        </select>
                    </FormField>
                </div>
                <FormField label="Soal">
                    <textarea
                        rows={4}
                        placeholder="Tulis pertanyaan"
                        className={fieldClass}
                    />
                </FormField>
                <FormField
                    label="Gambar (opsional)"
                    hint="Format JPG atau PNG, maksimal 2 MB."
                >
                    <input
                        type="file"
                        accept="image/*"
                        className="block w-full text-sm text-slate-500 file:mr-3 file:rounded-lg file:border-0 file:bg-brand-soft file:px-3 file:py-2 file:text-xs file:font-semibold file:text-brand"
                    />
                </FormField>
                <div className="grid gap-4 sm:grid-cols-2">
                    {['A', 'B', 'C', 'D', 'E'].map((option) => (
                        <FormField key={option} label={`Jawaban ${option}`}>
                            <input type="text" className={fieldClass} />
                        </FormField>
                    ))}
                    <FormField label="Kunci Jawaban">
                        <select className={fieldClass}>
                            {['A', 'B', 'C', 'D', 'E'].map((option) => (
                                <option key={option}>{option}</option>
                            ))}
                        </select>
                    </FormField>
                </div>
                <FormField label="Solusi / Pembahasan">
                    <textarea rows={3} className={fieldClass} />
                </FormField>
                <FormField label="Keterangan (topik)">
                    <select className={fieldClass}>
                        {topics.map((topic) => (
                            <option key={topic}>{topic}</option>
                        ))}
                    </select>
                </FormField>
                <div className="flex gap-2">
                    <button
                        type="submit"
                        className="rounded-xl bg-brand px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-hover"
                    >
                        Simpan Soal
                    </button>
                    <Button variant="secondary">Batal</Button>
                </div>
            </form>
        </Card>
    );
}

function UploadExcelPage() {
    const [fileName, setFileName] = useState('');

    return (
        <div className="grid gap-6 lg:grid-cols-3">
            <Card className="lg:col-span-2">
                <form
                    onSubmit={(event) => {
                        event.preventDefault();
                        demoToast(
                            fileName
                                ? `${fileName} diproses (mode demo).`
                                : 'Pilih file Excel terlebih dahulu.',
                        );
                    }}
                    className="space-y-5"
                >
                    <FormField label="Mata Pelajaran">
                        <select className={fieldClass}>
                            {subjects.map((subject) => (
                                <option key={subject.code}>
                                    {subject.name}
                                </option>
                            ))}
                        </select>
                    </FormField>
                    <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-line bg-canvas px-6 py-12 text-center hover:border-brand">
                        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-soft text-brand">
                            <Icon name="document" />
                        </span>
                        <span className="text-sm font-semibold text-ink">
                            {fileName || 'Pilih file Excel soal'}
                        </span>
                        <span className="text-xs text-slate-500">
                            Format .xlsx, maksimal 5 MB
                        </span>
                        <input
                            type="file"
                            accept=".xlsx,.xls"
                            className="sr-only"
                            onChange={(event) =>
                                setFileName(event.target.files?.[0]?.name ?? '')
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
                    {[
                        'Kode Statis',
                        'Soal',
                        'Jawaban A sampai E',
                        'Kunci',
                        'Solusi',
                        'Keterangan (topik)',
                    ].map((column, index) => (
                        <li key={column} className="flex gap-2">
                            <span className="w-5 text-slate-400">
                                {index + 1}.
                            </span>
                            {column}
                        </li>
                    ))}
                </ol>
                <Button variant="secondary" icon="document" className="mt-5">
                    Unduh Template
                </Button>
            </Card>
        </div>
    );
}

const resultColumns: Column<ExamResult>[] = [
    { label: 'No', render: (_, index) => index + 1 },
    { label: 'No Ujian', render: (row) => <Mono>{row.number}</Mono> },
    {
        label: 'Nama Ujian',
        render: (row) => (
            <span className="font-semibold text-ink">{row.examName}</span>
        ),
    },
    { label: 'Jenis Ujian', render: (row) => row.exam },
    { label: 'Kelas', render: (row) => row.plan },
    { label: 'UID', render: (row) => <Mono>{row.uid}</Mono> },
    { label: 'Nama Peserta', render: (row) => row.name },
    {
        label: 'Nilai',
        render: (row) => (
            <span
                className={cn(
                    'font-bold tabular-nums',
                    row.passed ? 'text-emerald-600' : 'text-red-600',
                )}
            >
                {row.score}
            </span>
        ),
    },
    {
        label: 'Status',
        render: (row) => (
            <Badge tone={row.passed ? 'green' : 'red'}>
                {row.passed ? 'Lulus' : 'Tidak lulus'}
            </Badge>
        ),
    },
];

function ResultsPage() {
    const passed = examResults.filter((row) => row.passed).length;
    const average = Math.round(
        examResults.reduce((sum, row) => sum + row.score, 0) /
            examResults.length,
    );

    return (
        <div className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-3">
                <StatTile
                    label="Ujian selesai"
                    value={String(examResults.length)}
                    icon="clipboard"
                />
                <StatTile
                    label="Lulus"
                    value={`${Math.round((passed / examResults.length) * 100)}%`}
                    icon="badge"
                    hint={`${passed} dari ${examResults.length} peserta`}
                />
                <StatTile
                    label="Rata-rata nilai"
                    value={String(average)}
                    icon="chart"
                    hint={`Batas lulus ${PASSING_SCORE}`}
                />
            </div>
            <DataTable
                title="Daftar peserta yang menyelesaikan ujian"
                rows={examResults}
                columns={resultColumns}
                rowKey={(row) => row.number}
                searchText={(row) => `${row.name} ${row.uid} ${row.number}`}
                filters={[
                    {
                        label: 'Jenis Ujian',
                        options: [...examTypes],
                        value: (row) => row.exam,
                    },
                    {
                        label: 'Status',
                        options: ['Lulus', 'Tidak lulus'],
                        value: (row) => (row.passed ? 'Lulus' : 'Tidak lulus'),
                    },
                ]}
            />
        </div>
    );
}

const reportColumns: Column<QuestionReport>[] = [
    { label: 'Kd Statis', render: (row) => <Mono>{row.staticCode}</Mono> },
    { label: 'No Urut', render: (row) => row.order },
    { label: 'Soal', render: (row) => <QuestionText>{row.text}</QuestionText> },
    {
        label: 'Menjawab Benar',
        render: (row) => <span className="tabular-nums">{row.correct}</span>,
    },
    {
        label: 'Total Peserta',
        render: (row) => <span className="tabular-nums">{row.total}</span>,
    },
    {
        label: 'Persentase Benar',
        render: (row) => (
            <Percent value={Math.round((row.correct / row.total) * 100)} />
        ),
    },
];

function TryoutReportPage() {
    return (
        <div className="space-y-6">
            <Card>
                <div className="grid gap-4 sm:grid-cols-3">
                    <FormField label="Pelajaran">
                        <select className={fieldClass}>
                            {subjects.map((subject) => (
                                <option key={subject.code}>
                                    {subject.name}
                                </option>
                            ))}
                        </select>
                    </FormField>
                    <FormField label="Jenis Ujian">
                        <select className={fieldClass}>
                            {examTypes.map((exam) => (
                                <option key={exam}>{exam}</option>
                            ))}
                        </select>
                    </FormField>
                    <FormField label="Ujian Ke">
                        <select className={fieldClass}>
                            {[1, 2, 3].map((attempt) => (
                                <option key={attempt}>{attempt}</option>
                            ))}
                        </select>
                    </FormField>
                </div>
            </Card>
            <DataTable
                title="Laporan TryOut per soal"
                rows={tryoutReport}
                columns={reportColumns}
                rowKey={(row) => `${row.order}`}
                searchText={(row) => `${row.staticCode} ${row.text}`}
                actions={
                    <Button variant="secondary" icon="document">
                        Unduh PDF
                    </Button>
                }
            />
        </div>
    );
}

const topicColumns: Column<TopicSummary>[] = [
    {
        label: 'Materi Topik',
        render: (row) => (
            <span className="font-semibold text-ink">{row.topic}</span>
        ),
    },
    {
        label: 'Jumlah Soal',
        render: (row) => <span className="tabular-nums">{row.questions}</span>,
    },
    {
        label: 'Peserta',
        render: (row) => (
            <span className="tabular-nums">{row.participants}</span>
        ),
    },
    {
        label: 'Rata-rata Benar',
        render: (row) => <Percent value={row.correctRate} />,
    },
];

function TopicsPage() {
    return (
        <DataTable
            title="Rekap berdasarkan materi topik"
            rows={topicSummaries}
            columns={topicColumns}
            rowKey={(row) => row.topic}
            actions={
                <Button variant="secondary" icon="document">
                    Excel
                </Button>
            }
        />
    );
}

const topicDetailColumns: Column<TopicDetail>[] = [
    {
        label: 'Nama',
        render: (row) => (
            <span className="font-semibold text-ink">{row.name}</span>
        ),
    },
    { label: 'Jenis Ujian', render: (row) => row.exam },
    { label: 'Materi Topik', render: (row) => row.topic },
    {
        label: 'Benar',
        render: (row) => (
            <span className="text-emerald-600 tabular-nums">{row.correct}</span>
        ),
    },
    {
        label: 'Salah',
        render: (row) => (
            <span className="text-red-600 tabular-nums">{row.wrong}</span>
        ),
    },
    {
        label: 'Persentase',
        render: (row) => (
            <Percent
                value={Math.round(
                    (row.correct / (row.correct + row.wrong)) * 100,
                )}
            />
        ),
    },
];

function TopicDetailsPage() {
    return (
        <DataTable
            title="Rekap materi topik per peserta"
            rows={topicDetails}
            columns={topicDetailColumns}
            rowKey={(row) => row.id}
            searchText={(row) => row.name}
            filters={[
                { label: 'Topik', options: topics, value: (row) => row.topic },
            ]}
            actions={
                <Button variant="secondary" icon="document">
                    Excel
                </Button>
            }
        />
    );
}

const summaryColumns: Column<ParticipantSummary>[] = [
    { label: 'UID', render: (row) => <Mono>{row.uid}</Mono> },
    {
        label: 'Nama',
        render: (row) => (
            <span className="font-semibold text-ink">{row.name}</span>
        ),
    },
    { label: 'Jenis Ujian', render: (row) => row.exam },
    {
        label: 'Jumlah TryOut',
        render: (row) => <span className="tabular-nums">{row.tryouts}</span>,
    },
    {
        label: 'Nilai Tertinggi',
        render: (row) => (
            <span className="font-bold text-ink tabular-nums">{row.best}</span>
        ),
    },
    { label: 'Rata-rata', render: (row) => <Percent value={row.average} /> },
    { label: 'TryOut Terakhir', render: (row) => row.last },
];

function SummaryPage() {
    return (
        <DataTable
            title="Summary hasil peserta"
            rows={participantSummaries}
            columns={summaryColumns}
            rowKey={(row) => row.uid}
            searchText={(row) => `${row.name} ${row.uid}`}
            filters={[
                {
                    label: 'Jenis Ujian',
                    options: [...examTypes],
                    value: (row) => row.exam,
                },
            ]}
            actions={
                <Button variant="secondary" icon="document">
                    Excel
                </Button>
            }
        />
    );
}

export const questionResultPages: AdminPageMap = {
    'data-soal': {
        description: 'Seluruh soal di bank soal beserta kunci dan topiknya.',
        Component: BankQuestionsPage,
    },
    'tambah-soal': {
        description: 'Tambahkan soal baru ke bank soal.',
        Component: AddQuestionPage,
    },
    'upload-excel': {
        description: 'Unggah banyak soal sekaligus dari file Excel.',
        Component: UploadExcelPage,
    },
    'soal-latihan': {
        description:
            'Soal yang dipakai pada mode Latihan, per jenis ujian dan kelas.',
        Component: examQuestionsPage(practiceQuestions, 'Latihan'),
    },
    'soal-tryout': {
        description:
            'Soal yang dipakai pada mode TryOut, per jenis ujian dan kelas.',
        Component: examQuestionsPage(tryoutQuestions, 'Tryout'),
    },
    'informasi-hasil': {
        description: 'Hasil ujian peserta beserta nilai dan status kelulusan.',
        Component: ResultsPage,
    },
    'laporan-tryout': {
        description:
            'Persentase peserta yang menjawab benar untuk setiap soal TryOut.',
        Component: TryoutReportPage,
    },
    'materi-topik': {
        description: 'Rekap kemampuan peserta berdasarkan materi topik ujian.',
        Component: TopicsPage,
    },
    'materi-topik-detail': {
        description: 'Rincian jawaban benar dan salah per peserta dan topik.',
        Component: TopicDetailsPage,
    },
    'summary-hasil-peserta': {
        description: 'Ringkasan perkembangan nilai TryOut setiap peserta.',
        Component: SummaryPage,
    },
};
