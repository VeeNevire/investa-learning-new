import Icon from '@/components/admin/icon';
import { Card } from '@/components/admin/ui';

// The old admin had no data screen for the coordinator reports, only a link
// to an Excel export on the old server. Until the backend offers that data,
// these pages link to the same export.
export default function LegacyReport({
    title,
    reportUrl,
}: {
    title: string;
    reportUrl: string;
}) {
    return (
        <Card className="max-w-2xl">
            <div className="flex flex-col items-start gap-4 sm:flex-row">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-brand">
                    <Icon name="document" />
                </span>
                <div>
                    <h2 className="mb-1 text-sm font-semibold text-ink">
                        Laporan {title} dalam Excel
                    </h2>
                    <p className="mb-4 text-sm text-slate-500">
                        Laporan ini dibuat oleh sistem lama dan dibuka di tab
                        baru. Datanya belum tersedia lewat API, jadi belum bisa
                        ditampilkan sebagai tabel di sini.
                    </p>
                    <a
                        href={reportUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-xl bg-brand px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-brand-hover"
                    >
                        Buka laporan Excel
                        <Icon
                            name="arrowUp"
                            className="h-3.5 w-3.5 rotate-45"
                        />
                    </a>
                </div>
            </div>
        </Card>
    );
}
