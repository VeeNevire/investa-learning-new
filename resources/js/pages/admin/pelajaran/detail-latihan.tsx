import SubjectDetailTable from '@/components/admin/subject-detail-table';
import type { SubjectDetail } from '@/components/admin/subject-detail-table';
import type { Option, ServerTable } from '@/components/admin/types';
import { PageIntro } from '@/components/admin/ui';
import AdminLayout from '@/layouts/admin-layout';

export default function DetailLatihan(props: {
    table: ServerTable<SubjectDetail>;
    examOptions: Option[];
    classOptions: Option[];
}) {
    return (
        <AdminLayout title="Detail Latihan">
            <PageIntro description="Paket soal latihan per mata pelajaran, jenis ujian, dan kelas." />
            <SubjectDetailTable kind="Latihan" {...props} />
        </AdminLayout>
    );
}
