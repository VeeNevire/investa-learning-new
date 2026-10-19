import type { ReactNode } from 'react';

export default function PageHero({
    title,
    children,
}: {
    title: string;
    children?: ReactNode;
}) {
    return (
        <section className="pt-12 pb-10 lg:pt-20 lg:pb-14">
            <div className="mx-auto max-w-5xl px-6 lg:px-12">
                <h1 className="text-4xl leading-tight font-extrabold tracking-tight text-ink sm:text-5xl lg:text-6xl">
                    {title}
                </h1>
                {children && <div className="mt-6">{children}</div>}
            </div>
        </section>
    );
}
