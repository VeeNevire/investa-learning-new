import { router } from '@inertiajs/react';
import {
    Card,
    fieldClass,
    FormField,
    PageIntro,
    StatTile,
} from '@/components/admin/ui';
import AdminLayout from '@/layouts/admin-layout';

type Category = { id: number; name: string; total: number };

// Visits per category id. Loaded after the page because the backend is slow.
type Visits = Record<string, number> | undefined;

type Selected = { bulan: string; tanggal: string };

const number = (value: number) => value.toLocaleString('id-ID');

export default function Visitor({
    categories,
    selected,
    monthly,
    daily,
}: {
    categories: Category[];
    selected: Selected;
    monthly?: Visits;
    daily?: Visits;
}) {
    const total = categories.reduce((sum, category) => sum + category.total, 0);
    const sumOf = (visits: Visits) =>
        visits
            ? number(
                  Object.values(visits).reduce((sum, count) => sum + count, 0),
              )
            : 'Memuat…';
    const countOf = (visits: Visits, id: number) =>
        visits ? number(visits[id] ?? 0) : '…';
    const max = Math.max(1, ...categories.map((category) => category.total));

    const choose = (changes: Partial<Selected>) =>
        router.get(
            window.location.pathname,
            { ...selected, ...changes },
            { preserveState: true, preserveScroll: true, replace: true },
        );

    return (
        <AdminLayout title="Visitor">
            <PageIntro description="Jumlah akses website per bagian: sepanjang waktu, untuk satu bulan, dan untuk satu hari." />
            <div className="space-y-6">
                <Card>
                    <div className="grid gap-4 sm:grid-cols-2 lg:max-w-lg">
                        <FormField label="Bulan">
                            <input
                                type="month"
                                value={selected.bulan}
                                onChange={(event) =>
                                    event.target.value &&
                                    choose({ bulan: event.target.value })
                                }
                                className={fieldClass}
                            />
                        </FormField>
                        <FormField label="Tanggal">
                            <input
                                type="date"
                                value={selected.tanggal}
                                onChange={(event) =>
                                    event.target.value &&
                                    choose({ tanggal: event.target.value })
                                }
                                className={fieldClass}
                            />
                        </FormField>
                    </div>
                </Card>

                <div className="grid gap-4 sm:grid-cols-3">
                    <StatTile
                        label="Total akses"
                        value={number(total)}
                        icon="chart"
                    />
                    <StatTile
                        label="Akses per bulan"
                        value={sumOf(monthly)}
                        icon="calendar"
                        hint={selected.bulan}
                    />
                    <StatTile
                        label="Akses per tanggal"
                        value={sumOf(daily)}
                        icon="users"
                        hint={selected.tanggal}
                    />
                </div>

                <Card title="Akses per bagian">
                    <div className="-mx-5 overflow-x-auto">
                        <table className="w-full min-w-[560px] text-left text-sm">
                            <thead>
                                <tr className="border-y border-line bg-slate-50/70 text-xs text-slate-500">
                                    <th className="px-5 py-2.5 font-medium">
                                        Bagian
                                    </th>
                                    <th className="px-3 py-2.5 font-medium">
                                        Total
                                    </th>
                                    <th className="px-3 py-2.5 text-right font-medium">
                                        Bulan
                                    </th>
                                    <th className="px-5 py-2.5 text-right font-medium">
                                        Hari
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-line">
                                {categories.map((category) => (
                                    <tr key={category.id}>
                                        <td className="px-5 py-3 font-medium text-ink">
                                            {category.name}
                                        </td>
                                        <td className="px-3 py-3">
                                            <span className="flex items-center gap-3">
                                                <span className="h-2 w-32 overflow-hidden rounded-full bg-slate-100">
                                                    <span
                                                        className="block h-full rounded-full bg-brand"
                                                        style={{
                                                            width: `${(category.total / max) * 100}%`,
                                                        }}
                                                    />
                                                </span>
                                                <span className="text-slate-600 tabular-nums">
                                                    {number(category.total)}
                                                </span>
                                            </span>
                                        </td>
                                        <td className="px-3 py-3 text-right text-slate-600 tabular-nums">
                                            {countOf(monthly, category.id)}
                                        </td>
                                        <td className="px-5 py-3 text-right text-slate-600 tabular-nums">
                                            {countOf(daily, category.id)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>
            </div>
        </AdminLayout>
    );
}
