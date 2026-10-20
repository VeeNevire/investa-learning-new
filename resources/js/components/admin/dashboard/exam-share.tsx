import { Card } from '@/components/admin/ui';

export type ExamShareItem = { exam: string; count: number };

export default function ExamShare({ items }: { items: ExamShareItem[] }) {
    const total = items.reduce((sum, item) => sum + item.count, 0);

    return (
        <Card
            title="Peserta per jenis ujian"
            className="col-span-12 lg:col-span-4"
        >
            <ul className="space-y-4">
                {items.map((item) => {
                    const share = total === 0 ? 0 : (item.count / total) * 100;

                    return (
                        <li key={item.exam}>
                            <div className="mb-1.5 flex justify-between gap-3 text-xs">
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
