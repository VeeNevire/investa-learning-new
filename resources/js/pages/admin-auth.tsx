import { Head, Link, useForm } from '@inertiajs/react';
import { Field, inputClass, SubmitButton } from '@/components/auth/form-parts';
import AuthLayout from '@/layouts/auth-layout';
import { login as userLogin } from '@/routes';
import { store } from '@/actions/App/Http/Controllers/Admin/AdminAuthController';

export default function AdminAuth() {
    const { data, setData, post, processing, errors } = useForm({
        username: '',
        password: '',
    });

    function submit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        post(store.url());
    }

    return (
        <AuthLayout title="Masuk Admin">
            <Head title="Masuk Admin" />
            <form onSubmit={submit} className="space-y-5">
                <div className="mb-8">
                    <p className="text-sm font-semibold text-brand">ADMINISTRATOR</p>
                    <h1 className="mt-2 text-2xl font-extrabold tracking-tight">
                        Masuk ke panel admin
                    </h1>
                    <p className="mt-1 text-sm text-slate-500">
                        Gunakan akun administrator InvestaLearning.
                    </p>
                </div>

                <Field label="User ID" htmlFor="admin-username">
                    <input
                        id="admin-username"
                        name="username"
                        type="text"
                        autoComplete="username"
                        autoFocus
                        required
                        value={data.username}
                        onChange={(event) => setData('username', event.target.value)}
                        aria-invalid={Boolean(errors.username)}
                        className={inputClass}
                    />
                    {errors.username && (
                        <p role="alert" className="mt-2 text-sm text-red-600">
                            {errors.username}
                        </p>
                    )}
                </Field>

                <Field label="Password" htmlFor="admin-password">
                    <input
                        id="admin-password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        value={data.password}
                        onChange={(event) => setData('password', event.target.value)}
                        aria-invalid={Boolean(errors.password)}
                        className={inputClass}
                    />
                    {errors.password && (
                        <p role="alert" className="mt-2 text-sm text-red-600">
                            {errors.password}
                        </p>
                    )}
                </Field>

                <SubmitButton>
                    {processing ? 'Memeriksa...' : 'Masuk sebagai Admin'}
                </SubmitButton>

                <p className="text-center text-sm text-slate-500">
                    Login peserta?{' '}
                    <Link href={userLogin()} className="font-semibold text-brand hover:text-brand-hover">
                        Masuk di sini
                    </Link>
                </p>
            </form>
        </AuthLayout>
    );
}
