import { router } from '@inertiajs/react';
import Icon from '@/components/admin/icon';
import { Button } from '@/components/admin/ui';
import AdminLayout from '@/layouts/admin-layout';

// Shown by bootstrap/app.php when the backend API cannot be reached.
export default function ApiUnavailable({ message }: { message: string }) {
    return (
        <AdminLayout title="Server data tidak terhubung">
            <div className="flex min-h-[60vh] items-center justify-center rounded-2xl border border-dashed border-line bg-white p-8 text-center">
                <div className="max-w-sm">
                    <span className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
                        <Icon name="database" />
                    </span>
                    <h2 className="mb-2 text-lg font-bold text-ink">
                        Data belum bisa dimuat
                    </h2>
                    <p className="mb-6 text-sm text-slate-500">{message}</p>
                    <Button onClick={() => router.reload()}>Coba lagi</Button>
                </div>
            </div>
        </AdminLayout>
    );
}
