import LegacyReport from '@/components/admin/legacy-report';
import AdminLayout from '@/layouts/admin-layout';

export default function MateriTopikDetail({
    reportUrl,
}: {
    reportUrl: string;
}) {
    return (
        <AdminLayout title="Materi Topik Detail">
            <LegacyReport title="Materi Topik Detail" reportUrl={reportUrl} />
        </AdminLayout>
    );
}
