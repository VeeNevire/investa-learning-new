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

const choices = ['A', 'B', 'C', 'D', 'E'];

export default function TambahSoal() {
    return (
        <AdminLayout title="Tambah Soal">
            <PageIntro description="Tambahkan soal baru ke bank soal." />
            <Card className="max-w-3xl">
                <form
                    onSubmit={(event) => {
                        event.preventDefault();
                        demoToast();
                    }}
                    className="space-y-5"
                >
                    <FormField
                        label="Kode Statis"
                        hint="Kelompok soal diikuti nomor, contoh: AKF118."
                    >
                        <input type="text" className={fieldClass} />
                    </FormField>
                    <FormField label="Soal">
                        <textarea
                            rows={4}
                            placeholder="Tulis pertanyaan"
                            className={fieldClass}
                        />
                    </FormField>
                    <FormField
                        label="Gambar (opsional)"
                        hint="Format JPG atau PNG."
                    >
                        <input
                            type="file"
                            accept="image/*"
                            className="block w-full text-sm text-slate-500 file:mr-3 file:rounded-lg file:border-0 file:bg-brand-soft file:px-3 file:py-2 file:text-xs file:font-semibold file:text-brand"
                        />
                    </FormField>
                    <div className="grid gap-4 sm:grid-cols-2">
                        {choices.map((choice) => (
                            <FormField key={choice} label={`Jawaban ${choice}`}>
                                <input type="text" className={fieldClass} />
                            </FormField>
                        ))}
                        <FormField label="Kunci Jawaban">
                            <select className={fieldClass}>
                                {choices.map((choice) => (
                                    <option key={choice}>{choice}</option>
                                ))}
                            </select>
                        </FormField>
                    </div>
                    <FormField label="Solusi / Pembahasan">
                        <textarea rows={3} className={fieldClass} />
                    </FormField>
                    <FormField label="Keterangan" hint="Contoh: BUKU 1.">
                        <input type="text" className={fieldClass} />
                    </FormField>
                    <div className="flex gap-2">
                        <button
                            type="submit"
                            className="rounded-xl bg-brand px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-hover"
                        >
                            Simpan Soal
                        </button>
                        <Button
                            variant="secondary"
                            onClick={() => router.visit(admin.dataSoal.url())}
                        >
                            Batal
                        </Button>
                    </div>
                </form>
            </Card>
        </AdminLayout>
    );
}
