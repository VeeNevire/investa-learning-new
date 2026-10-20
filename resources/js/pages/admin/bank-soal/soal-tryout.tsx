import PackageQuestions from '@/components/admin/package-questions';
import { PageIntro } from '@/components/admin/ui';
import AdminLayout from '@/layouts/admin-layout';

export default function SoalTryout(
    props: Omit<Parameters<typeof PackageQuestions>[0], 'kind'>,
) {
    return (
        <AdminLayout title="Soal Tryout">
            <PageIntro description="Soal yang dipakai pada mode TryOut, per pelajaran, jenis ujian, dan kelas." />
            <PackageQuestions kind="Tryout" {...props} />
        </AdminLayout>
    );
}
