import { router } from '@inertiajs/react';
import {
    Button,
    Card,
    demoToast,
    fieldClass,
    FormField,
    PageIntro,
} from '@/components/admin/ui';
import AdminLayout from '@/layouts/admin-layout';
import admin from '@/routes/admin';

export default function TambahPelajaran({ nextCode }: { nextCode: string }) {
    return (
        <AdminLayout title="Tambah Pelajaran">
            <PageIntro description="Tambahkan mata pelajaran baru." />
            <Card className="max-w-2xl">
                <form
                    onSubmit={(event) => {
                        event.preventDefault();
                        demoToast();
                    }}
                    className="space-y-5"
                >
                    <FormField
                        label="Kode Pelajaran"
                        hint="Kode berikutnya dari server."
                    >
                        <input
                            type="text"
                            name="kd_pelajaran"
                            defaultValue={nextCode}
                            readOnly
                            className={`${fieldClass} bg-slate-50 font-mono`}
                        />
                    </FormField>
                    <FormField label="Nama Pelajaran">
                        <input
                            type="text"
                            name="nm_pelajaran"
                            placeholder="Contoh: TryOut WPPE-A-04"
                            className={fieldClass}
                        />
                    </FormField>
                    <div className="flex gap-2">
                        <button
                            type="submit"
                            className="rounded-xl bg-brand px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-hover"
                        >
                            Simpan
                        </button>
                        <Button
                            variant="secondary"
                            onClick={() =>
                                router.visit(admin.dataPelajaran.url())
                            }
                        >
                            Batal
                        </Button>
                    </div>
                </form>
            </Card>
        </AdminLayout>
    );
}
