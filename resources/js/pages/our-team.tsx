import PageContent from '@/components/page-content';
import PageHero from '@/components/page-hero';
import PublicLayout from '@/layouts/public-layout';

const trainings = [
    {
        title: 'Pelatihan Waperd 24-25 Februari 2020 (Bank Sinarmas)',
        image: '/images/team/sinarmas-2020-02-24.jpeg',
    },
    {
        title: 'Pelatihan Waperd 26-27 Februari 2020 (Bank Sinarmas)',
        image: '/images/team/sinarmas-2020-02-26.jpeg',
    },
    {
        title: 'Pelatihan Waperd 06-08 Maret 2019 (Bank Mega)',
        image: '/images/team/mega-2019-03-06.jpeg',
    },
    {
        title: 'Pelatihan Waperd 17-18 Juni 2019 (Bank Mega)',
        image: '/images/team/mega-2019-06-17.jpeg',
    },
];

export default function OurTeam() {
    return (
        <PublicLayout title="Our Team">
            <PageHero title="Professional Team">
                <p className="max-w-3xl text-lg leading-relaxed text-slate-600">
                    Tim kami terdiri dari para profesional yang memiliki
                    pengalaman profesional dan pelatihan di Industri Keuangan
                    dan Pasar Modal. Dimana dalam bidang pelatihan kami telah
                    bekerja sama dengan berbagai institusi keuangan dan pasar
                    modal untuk meningkatkan kemampuan para profesionalnya dalam
                    persiapan ujian sertifikasi dan kecakapan dalam melakukan
                    pekerjaannya.
                </p>
            </PageHero>
            <PageContent>
                <div className="grid gap-6 sm:grid-cols-2">
                    {trainings.map((training) => (
                        <figure key={training.title}>
                            <img
                                src={training.image}
                                alt={training.title}
                                loading="lazy"
                                className="aspect-[4/3] w-full rounded-2xl object-cover"
                            />
                            <figcaption className="mt-3 text-sm font-semibold text-ink">
                                {training.title}
                            </figcaption>
                        </figure>
                    ))}
                </div>
            </PageContent>
        </PublicLayout>
    );
}
