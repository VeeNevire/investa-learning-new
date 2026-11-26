import type { ReactNode } from 'react';
import PageContent from '@/components/page-content';
import PageHero from '@/components/page-hero';
import PublicLayout from '@/layouts/public-layout';

export default function ContactUs() {
    return (
        <PublicLayout title="Contact Us">
            <PageHero title="Jika Bapak/Ibu butuh informasi">
                <p className="text-lg text-slate-600">
                    Silahkan hubungi kami melalui :
                </p>
            </PageHero>
            <PageContent>
                <div className="grid gap-6 md:grid-cols-3">
                    <ContactCard label="E-mail">
                        <a
                            href="mailto:investalearning1@gmail.com"
                            className="break-all underline decoration-brand decoration-2 underline-offset-4 hover:decoration-ink"
                        >
                            investalearning1@gmail.com
                        </a>
                    </ContactCard>
                  
                    <ContactCard label="WhatsApp (WA Only)">
                        <a
                            href="https://wa.me/628987502966"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline decoration-brand decoration-2 underline-offset-4 hover:decoration-ink"
                        >
                            +62 898-7502-966
                        </a>
                    </ContactCard>
                    <ContactCard label="Alamat">
                        <span className="block font-normal text-slate-600">
                            Cibubur Country, komplek RFP I No.8, Cikeas Udik, Kec. Gn. Putri
                            <br />
                             Kabupaten Bogor, Jawa Barat 16966
                        </span>
                    </ContactCard>
                </div>
            </PageContent>
        </PublicLayout>
    );
}

function ContactCard({
    label,
    children,
}: {
    label: string;
    children: ReactNode;
}) {
    return (
        <div className="rounded-2xl bg-canvas p-6">
            <p className="mb-3 text-xs font-bold tracking-wider text-slate-500 uppercase">
                {label}
            </p>
            <div className="text-base font-semibold text-ink">{children}</div>
        </div>
    );
}
