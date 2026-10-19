import { router } from '@inertiajs/react';
import { useLayoutEffect, useRef, useState } from 'react';
import type { MouseEvent, ReactNode } from 'react';
import {
    Field,
    inputClass,
    preventSubmit,
    SubmitButton,
} from '@/components/auth/form-parts';
import AuthLayout from '@/layouts/auth-layout';
import { cn } from '@/lib/utils';
import { login, register } from '@/routes';
import { request as passwordRequest } from '@/routes/password';

type Tab = 'login' | 'register' | 'forgot';

const tabs: Record<Tab, { title: string; url: () => string }> = {
    login: { title: 'Masuk', url: () => login.url() },
    register: { title: 'Daftar', url: () => register.url() },
    forgot: { title: 'Lupa Password', url: () => passwordRequest.url() },
};

// Switch forms without a server round trip: a client-side Inertia visit
// swaps the `tab` prop and updates the URL, so links and the back button
// keep working while the card just animates to the other form.
function switchTab(tab: Tab) {
    router.push({
        url: tabs[tab].url(),
        props: (props) => ({ ...props, tab }),
        preserveScroll: true,
        preserveState: true,
    });
}

export default function Auth({ tab }: { tab: Tab }) {
    return (
        <AuthLayout title={tabs[tab].title}>
            <AnimatedHeight>
                {tab !== 'forgot' && (
                    <nav
                        aria-label="Masuk atau daftar"
                        className="relative mb-8 grid grid-cols-2 border-b border-line"
                    >
                        <TabButton tab="login" current={tab} />
                        <TabButton tab="register" current={tab} />
                        <span
                            aria-hidden="true"
                            className={cn(
                                'absolute -bottom-px left-0 h-0.5 w-1/2 bg-brand transition-transform duration-300 ease-out motion-reduce:transition-none',
                                tab === 'register' && 'translate-x-full',
                            )}
                        />
                    </nav>
                )}

                <div
                    key={tab}
                    className="animate-slide-in motion-reduce:animate-none"
                >
                    {tab === 'login' && <LoginForm />}
                    {tab === 'register' && <RegisterForm />}
                    {tab === 'forgot' && <ForgotPasswordForm />}
                </div>
            </AnimatedHeight>
        </AuthLayout>
    );
}

// Smoothly resizes to fit its content, so the card grows and shrinks
// instead of jumping when a longer or shorter form swaps in.
function AnimatedHeight({ children }: { children: ReactNode }) {
    const innerRef = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState<number | undefined>(undefined);

    useLayoutEffect(() => {
        const inner = innerRef.current;

        if (!inner) {
            return;
        }

        const observer = new ResizeObserver(() =>
            setHeight(inner.offsetHeight),
        );
        observer.observe(inner);

        return () => observer.disconnect();
    }, []);

    return (
        <div
            className="overflow-hidden transition-[height] duration-300 ease-out motion-reduce:transition-none"
            style={{ height }}
        >
            <div ref={innerRef}>{children}</div>
        </div>
    );
}

function SwitchLink({
    tab,
    className,
    children,
}: {
    tab: Tab;
    className?: string;
    children: ReactNode;
}) {
    const onClick = (event: MouseEvent<HTMLAnchorElement>) => {
        // Let modified clicks (new tab, new window) behave like normal links.
        if (event.metaKey || event.ctrlKey || event.shiftKey) {
            return;
        }

        event.preventDefault();
        switchTab(tab);
    };

    return (
        <a href={tabs[tab].url()} onClick={onClick} className={className}>
            {children}
        </a>
    );
}

function TabButton({ tab, current }: { tab: Tab; current: Tab }) {
    const active = tab === current;

    return (
        <SwitchLink
            tab={tab}
            className={cn(
                'pb-3 text-center text-sm font-semibold transition-colors',
                active ? 'text-ink' : 'text-slate-500 hover:text-ink',
            )}
        >
            <span aria-current={active ? 'page' : undefined}>
                {tabs[tab].title}
            </span>
        </SwitchLink>
    );
}

function LoginForm() {
    return (
        <form onSubmit={preventSubmit} className="space-y-5">
            <div>
                <h2 className="text-2xl font-extrabold tracking-tight">
                    Selamat datang kembali
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                    Masuk untuk melanjutkan latihan dan TryOut Anda.
                </p>
            </div>

            <Field label="User ID" htmlFor="login-username">
                <input
                    id="login-username"
                    name="username"
                    type="text"
                    autoComplete="username"
                    className={inputClass}
                />
            </Field>

            <Field
                label="Password"
                htmlFor="login-password"
                aside={
                    <SwitchLink
                        tab="forgot"
                        className="text-xs font-semibold text-brand hover:text-brand-hover"
                    >
                        Lupa password?
                    </SwitchLink>
                }
            >
                <input
                    id="login-password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    className={inputClass}
                />
            </Field>

            <label className="flex items-center gap-2 text-sm text-slate-600">
                <input
                    type="checkbox"
                    name="remember"
                    className="h-4 w-4 rounded border-slate-300 accent-brand"
                />
                Ingat saya
            </label>

            <SubmitButton>Masuk</SubmitButton>

            <p className="text-center text-sm text-slate-500">
                Belum punya akun?{' '}
                <SwitchLink
                    tab="register"
                    className="font-semibold text-brand hover:text-brand-hover"
                >
                    Daftar sekarang
                </SwitchLink>
            </p>
        </form>
    );
}

function ForgotPasswordForm() {
    return (
        <form onSubmit={preventSubmit} className="space-y-5">
            <SwitchLink
                tab="login"
                className="inline-flex text-sm font-semibold text-slate-500 hover:text-ink"
            >
                ← Kembali ke halaman Masuk
            </SwitchLink>

            <div>
                <h2 className="text-2xl font-extrabold tracking-tight">
                    Lupa password
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                    Masukkan email dan User ID yang Anda gunakan saat mendaftar.
                    Kami akan mengirimkan petunjuk untuk mengatur ulang password
                    ke email tersebut.
                </p>
            </div>

            <Field label="Email" htmlFor="forgot-email">
                <input
                    id="forgot-email"
                    name="email"
                    type="email"
                    maxLength={40}
                    required
                    autoComplete="email"
                    className={inputClass}
                />
            </Field>

            <Field label="User ID" htmlFor="forgot-username">
                <input
                    id="forgot-username"
                    name="username"
                    type="text"
                    required
                    autoComplete="username"
                    className={inputClass}
                />
            </Field>

            <SubmitButton>Kirim</SubmitButton>

            <p className="text-center text-sm text-slate-500">
                Ingat password Anda?{' '}
                <SwitchLink
                    tab="login"
                    className="font-semibold text-brand hover:text-brand-hover"
                >
                    Masuk
                </SwitchLink>
            </p>
        </form>
    );
}

// Options copied from the old site's "Daftar Peserta Baru" form.
const examTypes = [
    'WPPE',
    'WPEE',
    'WMI',
    'WAPERD',
    'WPPE Pemasaran',
    'WPPE Pemasaran Terbatas',
    'Lainnya',
    'AAJI',
    'AASI',
    'PAYDI',
];

const packages = [
    'Biasa',
    'Khusus A',
    'Khusus B',
    'Khusus C',
    'Khusus D',
    'Khusus E',
    'Khusus F',
    'Khusus G',
    'Khusus H',
    'Khusus I',
    'Khusus J',
];

function RegisterForm() {
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');

    const passwordsDiffer =
        passwordConfirmation !== '' && password !== passwordConfirmation;

    return (
        <form onSubmit={preventSubmit} className="space-y-8">
            <div>
                <h2 className="text-2xl font-extrabold tracking-tight">
                    Pendaftaran peserta baru
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                    Isi data berikut untuk mulai mengikuti program persiapan
                    ujian.
                </p>
            </div>

            <FormSection title="Data Pribadi">
                <Field
                    label="Nama Lengkap"
                    htmlFor="register-name"
                    className="sm:col-span-2"
                >
                    <input
                        id="register-name"
                        name="name"
                        type="text"
                        maxLength={60}
                        required
                        autoComplete="name"
                        className={inputClass}
                    />
                </Field>

                <fieldset>
                    <legend className="mb-2 text-sm font-semibold text-ink">
                        Jenis Kelamin
                    </legend>
                    <div className="grid grid-cols-2 gap-2">
                        {[
                            { value: 'P', label: 'Pria' },
                            { value: 'W', label: 'Wanita' },
                        ].map((gender) => (
                            <label
                                key={gender.value}
                                className="flex cursor-pointer items-center gap-2 rounded-lg border border-slate-300 px-4 py-3 text-sm has-checked:border-brand has-checked:bg-brand-soft has-checked:font-semibold"
                            >
                                <input
                                    type="radio"
                                    name="gender"
                                    value={gender.value}
                                    defaultChecked={gender.value === 'P'}
                                    className="accent-brand"
                                />
                                {gender.label}
                            </label>
                        ))}
                    </div>
                </fieldset>

                <Field label="Tanggal Lahir" htmlFor="register-birth-date">
                    <input
                        id="register-birth-date"
                        name="birth_date"
                        type="date"
                        autoComplete="bday"
                        className={inputClass}
                    />
                </Field>

                <Field
                    label="Institusi"
                    htmlFor="register-institution"
                    className="sm:col-span-2"
                >
                    <input
                        id="register-institution"
                        name="institution"
                        type="text"
                        maxLength={100}
                        required
                        autoComplete="organization"
                        className={inputClass}
                    />
                </Field>

                <Field
                    label="Alamat"
                    htmlFor="register-address"
                    className="sm:col-span-2"
                >
                    <textarea
                        id="register-address"
                        name="address"
                        rows={3}
                        required
                        autoComplete="street-address"
                        className={inputClass}
                    />
                </Field>

                <Field label="No. Telepon" htmlFor="register-phone">
                    <input
                        id="register-phone"
                        name="phone"
                        type="tel"
                        maxLength={15}
                        required
                        autoComplete="tel"
                        className={inputClass}
                    />
                </Field>

                <Field label="E-Mail" htmlFor="register-email">
                    <input
                        id="register-email"
                        name="email"
                        type="email"
                        maxLength={40}
                        required
                        autoComplete="email"
                        className={inputClass}
                    />
                </Field>

                <Field label="Jenis Ujian" htmlFor="register-exam">
                    <select
                        id="register-exam"
                        name="exam_type"
                        required
                        defaultValue=""
                        className={inputClass}
                    >
                        <option value="" disabled>
                            Pilih Jenis Ujian
                        </option>
                        {examTypes.map((exam) => (
                            <option key={exam} value={exam}>
                                {exam}
                            </option>
                        ))}
                    </select>
                </Field>

                <Field label="Paket" htmlFor="register-package">
                    <select
                        id="register-package"
                        name="package"
                        required
                        defaultValue=""
                        className={inputClass}
                    >
                        <option value="" disabled>
                            Pilih Paket
                        </option>
                        {packages.map((item) => (
                            <option key={item} value={item}>
                                {item}
                            </option>
                        ))}
                    </select>
                </Field>
            </FormSection>

            <FormSection title="Data Login">
                <Field
                    label="User ID"
                    htmlFor="register-username"
                    className="sm:col-span-2"
                >
                    <input
                        id="register-username"
                        name="username"
                        type="text"
                        required
                        autoComplete="username"
                        className={inputClass}
                    />
                </Field>

                <Field label="Password ID" htmlFor="register-password">
                    <input
                        id="register-password"
                        name="password"
                        type="password"
                        maxLength={40}
                        required
                        autoComplete="new-password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        className={inputClass}
                    />
                </Field>

                <Field
                    label="Re-Password ID"
                    htmlFor="register-password-confirmation"
                >
                    <input
                        id="register-password-confirmation"
                        name="password_confirmation"
                        type="password"
                        maxLength={40}
                        required
                        autoComplete="new-password"
                        value={passwordConfirmation}
                        onChange={(event) =>
                            setPasswordConfirmation(event.target.value)
                        }
                        aria-invalid={passwordsDiffer}
                        aria-describedby="register-password-message"
                        className={cn(
                            inputClass,
                            passwordsDiffer &&
                                'border-red-500 focus:border-red-500 focus:ring-red-500/15',
                        )}
                    />
                </Field>

                <p
                    id="register-password-message"
                    aria-live="polite"
                    className="-mt-2 text-sm text-red-600 sm:col-span-2"
                >
                    {passwordsDiffer &&
                        'Data Password tidak sama dengan Re-password'}
                </p>
            </FormSection>

            <SubmitButton>Daftar</SubmitButton>

            <p className="text-center text-sm text-slate-500">
                Sudah punya akun?{' '}
                <SwitchLink
                    tab="login"
                    className="font-semibold text-brand hover:text-brand-hover"
                >
                    Masuk
                </SwitchLink>
            </p>
        </form>
    );
}

function FormSection({
    title,
    children,
}: {
    title: string;
    children: ReactNode;
}) {
    return (
        <fieldset>
            <legend className="mb-5 w-full border-b border-line pb-2 text-sm font-bold text-ink">
                {title}
            </legend>
            <div className="grid gap-5 sm:grid-cols-2">{children}</div>
        </fieldset>
    );
}
