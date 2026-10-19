import { useState } from 'react';
import type { ReactNode } from 'react';
import Icon from '@/components/admin/icon';
import { Card, demoToast, Toggle } from '@/components/admin/ui';
import { cn } from '@/lib/utils';

export type Column<T> = {
    label: string;
    render: (row: T, index: number) => ReactNode;
    className?: string;
};

export type Filter<T> = {
    label: string;
    options: string[];
    value: (row: T) => string;
};

export default function DataTable<T>({
    title,
    rows,
    columns,
    rowKey,
    searchText,
    filters = [],
    pageSize = 10,
    actions,
}: {
    title?: string;
    rows: T[];
    columns: Column<T>[];
    rowKey: (row: T) => string;
    searchText?: (row: T) => string;
    filters?: Filter<T>[];
    pageSize?: number;
    actions?: ReactNode;
}) {
    const [query, setQuery] = useState('');
    const [selected, setSelected] = useState<string[]>(filters.map(() => ''));
    const [page, setPage] = useState(1);

    const keyword = query.trim().toLowerCase();
    const filtered = rows.filter(
        (row) =>
            (!keyword ||
                !searchText ||
                searchText(row).toLowerCase().includes(keyword)) &&
            filters.every(
                (filter, index) =>
                    !selected[index] || filter.value(row) === selected[index],
            ),
    );

    const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
    const currentPage = Math.min(page, pageCount);
    const start = (currentPage - 1) * pageSize;
    const visible = filtered.slice(start, start + pageSize);

    return (
        <Card title={title} action={actions}>
            {(searchText || filters.length > 0) && (
                <div className="mb-4 flex flex-wrap items-center gap-2">
                    {searchText && (
                        <label className="relative min-w-52 flex-1 sm:max-w-xs">
                            <span className="sr-only">Cari</span>
                            <Icon
                                name="search"
                                className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400"
                            />
                            <input
                                type="search"
                                value={query}
                                onChange={(event) => {
                                    setQuery(event.target.value);
                                    setPage(1);
                                }}
                                placeholder="Cari data"
                                className="w-full rounded-xl border border-line bg-slate-50/80 py-2 pr-3 pl-9 text-sm outline-none placeholder:text-slate-400 focus:border-brand focus:ring-1 focus:ring-brand"
                            />
                        </label>
                    )}
                    {filters.map((filter, index) => (
                        <label key={filter.label}>
                            <span className="sr-only">{filter.label}</span>
                            <select
                                value={selected[index]}
                                onChange={(event) => {
                                    const next = [...selected];
                                    next[index] = event.target.value;
                                    setSelected(next);
                                    setPage(1);
                                }}
                                className="rounded-xl border border-line bg-white py-2 pr-8 pl-3 text-sm text-slate-700 outline-none focus:border-brand"
                            >
                                <option value="">Semua {filter.label}</option>
                                {filter.options.map((option) => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        </label>
                    ))}
                </div>
            )}

            <div className="-mx-5 overflow-x-auto">
                <table className="w-full min-w-[640px] text-left text-sm">
                    <thead>
                        <tr className="border-y border-line bg-slate-50/70 text-xs text-slate-500">
                            {columns.map((column) => (
                                <th
                                    key={column.label}
                                    className={cn(
                                        'px-3 py-2.5 font-medium whitespace-nowrap first:pl-5 last:pr-5',
                                        column.className,
                                    )}
                                >
                                    {column.label}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-line">
                        {visible.map((row, index) => (
                            <tr
                                key={rowKey(row)}
                                className="hover:bg-slate-50/50"
                            >
                                {columns.map((column) => (
                                    <td
                                        key={column.label}
                                        className={cn(
                                            'px-3 py-3 align-middle text-slate-600 first:pl-5 last:pr-5',
                                            column.className,
                                        )}
                                    >
                                        {column.render(row, start + index)}
                                    </td>
                                ))}
                            </tr>
                        ))}
                        {visible.length === 0 && (
                            <tr>
                                <td
                                    colSpan={columns.length}
                                    className="px-5 py-10 text-center text-sm text-slate-400"
                                >
                                    Tidak ada data yang cocok.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
                <span>
                    {filtered.length === 0
                        ? '0 data'
                        : `${start + 1}–${start + visible.length} dari ${filtered.length} data`}
                </span>
                {pageCount > 1 && (
                    <div className="flex items-center gap-1">
                        <PageButton
                            label="Sebelumnya"
                            disabled={currentPage === 1}
                            onClick={() => setPage(currentPage - 1)}
                        >
                            ‹
                        </PageButton>
                        {Array.from({ length: pageCount }, (_, index) => (
                            <PageButton
                                key={index}
                                label={`Halaman ${index + 1}`}
                                active={currentPage === index + 1}
                                onClick={() => setPage(index + 1)}
                            >
                                {index + 1}
                            </PageButton>
                        ))}
                        <PageButton
                            label="Berikutnya"
                            disabled={currentPage === pageCount}
                            onClick={() => setPage(currentPage + 1)}
                        >
                            ›
                        </PageButton>
                    </div>
                )}
            </div>
        </Card>
    );
}

function PageButton({
    label,
    active = false,
    disabled = false,
    onClick,
    children,
}: {
    label: string;
    active?: boolean;
    disabled?: boolean;
    onClick: () => void;
    children: ReactNode;
}) {
    return (
        <button
            type="button"
            aria-label={label}
            aria-current={active ? 'page' : undefined}
            disabled={disabled}
            onClick={onClick}
            className={cn(
                'flex h-7 min-w-7 items-center justify-center rounded-lg px-2 font-semibold transition',
                active
                    ? 'bg-brand text-white'
                    : 'text-slate-600 hover:bg-slate-100',
                disabled && 'pointer-events-none opacity-40',
            )}
        >
            {children}
        </button>
    );
}

// Status switch that flips locally so the demo feels interactive.
export function StatusToggle({
    initial,
    label,
}: {
    initial: boolean;
    label: string;
}) {
    const [on, setOn] = useState(initial);

    return (
        <span className="flex items-center gap-2">
            <Toggle
                checked={on}
                label={label}
                onChange={(next) => {
                    setOn(next);
                    demoToast(
                        `${label} ${next ? 'diaktifkan' : 'dinonaktifkan'} (mode demo).`,
                    );
                }}
            />
            <span
                className={cn(
                    'text-xs font-medium',
                    on ? 'text-emerald-600' : 'text-slate-400',
                )}
            >
                {on ? 'Aktif' : 'Nonaktif'}
            </span>
        </span>
    );
}

export function RowActions({ children }: { children: ReactNode }) {
    return <div className="flex items-center gap-1">{children}</div>;
}
