import LegacyReport from '@/components/admin/legacy-report';
import AdminLayout from '@/layouts/admin-layout';

export default function SummaryHasilPeserta({
    reportUrl,
}: {
    reportUrl: string;
}) {
    return (
        <AdminLayout title="Summary Hasil Peserta">
            <LegacyReport title="Summary Hasil Peserta" reportUrl={reportUrl} />
        </AdminLayout>
    );
}
