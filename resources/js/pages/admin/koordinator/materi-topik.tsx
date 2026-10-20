import LegacyReport from '@/components/admin/legacy-report';
import AdminLayout from '@/layouts/admin-layout';

export default function MateriTopik({ reportUrl }: { reportUrl: string }) {
    return (
        <AdminLayout title="Materi Topik">
            <LegacyReport title="Materi Topik" reportUrl={reportUrl} />
        </AdminLayout>
    );
}
