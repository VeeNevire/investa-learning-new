import PackageQuestions from '@/components/admin/package-questions';
import { PageIntro } from '@/components/admin/ui';
import AdminLayout from '@/layouts/admin-layout';

export default function SoalLatihan(
    props: Omit<Parameters<typeof PackageQuestions>[0], 'kind'>,
) {
    return (
        <AdminLayout title="Soal Latihan">
            <PageIntro description="Soal yang dipakai pada mode Latihan, per pelajaran, jenis ujian, dan kelas." />
            <PackageQuestions kind="Latihan" {...props} />
        </AdminLayout>
    );
}
