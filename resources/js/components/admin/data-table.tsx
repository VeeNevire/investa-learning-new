import { router } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import Icon from '@/components/admin/icon';
import type { Option, ServerTable, TableMeta } from '@/components/admin/types';
import { Card, demoToast, Toggle } from '@/components/admin/ui';
import { cn } from '@/lib/utils';

export type Column<T> = {
    label: string;
    // `index` counts from 0 across all pages, so `index + 1` is the row number.
    render: (row: T, index: number) => ReactNode;
    className?: string;
};

export type TableFilter = {
    // Query string key the controller reads, e.g. "examId".
    key: string;
    label: string;
    options: Option[];
};

type QueryValue = string | number | undefined;

// Reloads only the `table` prop with new query values. Empty values and
// page 1 are dropped so the URL stays short.
export function visitTable(
    query: Record<string, string>,
    changes: Record<string, QueryValue>,
) {
    const params = Object.fromEntries(
        Object.entries({ ...query, ...changes }).filter(
            ([key, value]) =>
                value !== undefined &&
                value !== '' &&
                !(key === 'page' && Number(value) === 1),
        ),
    );

    router.get(window.location.pathname, params, {
        only: ['table'],
        preserveState: true,
        preserveScroll: true,
        replace: true,
    });
}

const SEARCH_DELAY = 350;

// Search, filters and pages are handled by the server (see
// app/Support/AdminTable.php); this only renders one page and asks for others.
export default function DataTable<T>({
    title,
    table,
    columns,
    rowKey,
    search = false,
    filters = [],
    actions,
    emptyText = 'Tidak ada data yang cocok.',
}: {
    title?: string;
    table: ServerTable<T>;
    columns: Column<T>[];
    rowKey: (row: T) => string;
    search?: boolean;
    filters?: TableFilter[];
    actions?: ReactNode;
    emptyText?: string;
}) {
    const { rows, meta, query } = table;
    const [keyword, setKeyword] = useState(query.q ?? '');
    const timer = useRef<number | undefined>(undefined);

    useEffect(() => () => window.clearTimeout(timer.current), []);

    const onSearch = (value: string) => {
        setKeyword(value);
        window.clearTimeout(timer.current);
        timer.current = window.setTimeout(
            () => visitTable(query, { q: value.trim(), page: undefined }),
            SEARCH_DELAY,
        );
    };

    const start = Math.max(0, meta.from - 1);

    return (
        <Card title={title} action={actions}>
            {(search || filters.length > 0) && (
                <div className="mb-4 flex flex-wrap items-center gap-2">
                    {search && (
                        <label className="relative min-w-52 flex-1 sm:max-w-xs">
                            <span className="sr-only">Cari</span>
                            <Icon
                                name="search"
                                className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400"
                            />
                            <input
                                type="search"
                                value={keyword}
                                onChange={(event) =>
                                    onSearch(event.target.value)
                                }
                                placeholder="Cari data"
                                className="w-full rounded-xl border border-line bg-slate-50/80 py-2 pr-3 pl-9 text-sm outline-none placeholder:text-slate-400 focus:border-brand focus:ring-1 focus:ring-brand"
                            />
                        </label>
                    )}
                    {filters.map((filter) => (
                        <label key={filter.key}>
                            <span className="sr-only">{filter.label}</span>
                            <select
                                value={query[filter.key] ?? ''}
                                onChange={(event) =>
                                    visitTable(query, {
                                        [filter.key]: event.target.value,
                                        page: undefined,
                                    })
                                }
                                className="max-w-56 rounded-xl border border-line bg-white py-2 pr-8 pl-3 text-sm text-slate-700 outline-none focus:border-brand"
                            >
                                <option value="">Semua {filter.label}</option>
                                {filter.options.map((option) => (
                                    <option
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.label}
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
                        {rows.map((row, index) => (
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
                        {rows.length === 0 && (
                            <tr>
                                <td
                                    colSpan={columns.length}
                                    className="px-5 py-10 text-center text-sm text-slate-400"
                                >
                                    {emptyText}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <TableFooter
                meta={meta}
                shown={rows.length}
                onPage={(page) => visitTable(query, { page })}
            />
        </Card>
    );
}

export function TableFooter({
    meta,
    shown,
    onPage,
}: {
    meta: TableMeta;
    shown: number;
    onPage: (page: number) => void;
}) {
    const number = (value: number) => value.toLocaleString('id-ID');

    return (
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
            <span>
                {meta.total === 0
                    ? '0 data'
                    : `${number(meta.from)}–${number(meta.from + shown - 1)} dari ${number(meta.total)} data`}
            </span>
            {meta.lastPage > 1 && (
                <div className="flex flex-wrap items-center gap-1">
                    <PageButton
                        label="Sebelumnya"
                        disabled={meta.page === 1}
                        onClick={() => onPage(meta.page - 1)}
                    >
                        ‹
                    </PageButton>
                    {pageWindow(meta.page, meta.lastPage).map((page, index) =>
                        page === null ? (
                            <span
                                key={`gap-${index}`}
                                className="px-1 text-slate-400"
                            >
                                …
                            </span>
                        ) : (
                            <PageButton
                                key={page}
                                label={`Halaman ${page}`}
                                active={meta.page === page}
                                onClick={() => onPage(page)}
                            >
                                {page}
                            </PageButton>
                        ),
                    )}
                    <PageButton
                        label="Berikutnya"
                        disabled={meta.page === meta.lastPage}
                        onClick={() => onPage(meta.page + 1)}
                    >
                        ›
                    </PageButton>
                </div>
            )}
        </div>
    );
}

// First, last and the pages around the current one, with gaps as null:
// 1 … 4 5 6 … 298.
function pageWindow(current: number, last: number): (number | null)[] {
    const pages = new Set([1, last, current - 1, current, current + 1]);
    const sorted = [...pages]
        .filter((page) => page >= 1 && page <= last)
        .sort((a, b) => a - b);

    return sorted.flatMap((page, index) =>
        index > 0 && page - sorted[index - 1] > 1 ? [null, page] : [page],
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
                'flex h-7 min-w-7 items-center justify-center rounded-lg px-2 font-semibold tabular-nums transition',
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

// Status switch. Saving to the backend comes in a later step, so for now it
// flips locally and says the change is not saved.
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
                        `${label} ${next ? 'diaktifkan' : 'dinonaktifkan'} (belum disimpan).`,
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
