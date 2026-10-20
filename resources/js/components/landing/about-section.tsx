import { Reveal, Stagger, StaggerItem } from '@/components/landing/motion';
import { cn } from '@/lib/utils';

const photos = [
    {
        src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC5I8uO-Q-Cu2ZSUXo0kPyB20abaEwMvePOI5DxE6tmGFkdKLYHIGgNCoUyIRhmk4Tt2Kxii4DEd8t2aS7GH9m6Md3FeFAdQ84XCnI5iYV1faDLx5pY689-LD9G0IHdPNohSf1nZNbkgmSERGp-cWx5oD6OL3DcBvpiCVMti5pHKot-YUkVOv0A-Nyhk-sb4WvOZk19uqXrd_-mYQ5U_6eXZ5PAvbup_uuytJAOMJSVfdqOKXQhCr3e',
    },
    {
        src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC5Y-5DPfkx37n-_mBdMcQ08oG4JjBjQWPNH9VU6VFk9f6TwGl-4g8fUurTG5yoMh2s5HHnnlcdLhcUF___Tov-CioThrdHQXHhthwmPmC2QQlYAbvH9RcP7SFfKb0SjtmNganYDzhOblBWBF-TK1JAR9WWX2fk1mR119n0ImjDrsLyx3rkpRdYuUPdepsPs-hWWpFFufCjZDjaTYeq8pnNGu0TMELKXkodbAlXQoWMz16k7J7-tVqf',
    },
    {
        src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDYiBZZxJzjfvsI7jaU_TeJNW7J8REHsQS3GRCSCPIG3q6Awv3-7drqK8w3uM2sQU4r8QOtsUqsSL0qyFr6pa6xhW83mrClFuuTcdHBUPvmHnh5FL0EvkAddIrrrPl_DzdW8mDkI2eEtGYrP8bHDABUYkepMP0KiHNu7XCEpwiG8BCADvOztoia_XEn2J8auIpytzTGszE71qdxXDscJ7IMuyq5dWoTyd0m9tfTcCbqqENakSDk0jbG',
    },
    {
        src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAGmKfNtMF-oRmeO4F12RpS-8i9meXmLoScn-rfj4zraPWijlLl6q7KWzq9HoO3jzF32DIUSa81M6t7_jTktRg0tLGFPJSUZQ8Lf3Bjbx6U6wJx8K1iiZiWg9cr8pR-oySdCbCLqxkeUqvtA2daDEl_CKqb6n_XwvO5sncm9dGkOadIL8Dq0SorVBk2yEK45HJRiLPBg6L94v6TgRmyrkdfBhDZSnwkqlLpoOL3PmBlxY_0MRaEsZNp',
        highlighted: true,
    },
];

const trainings = [
    {
        client: 'Bank Sinarmas',
        program: 'Pelatihan WAPERD',
        date: '26–27 Februari 2020',
    },
    {
        client: 'Bank Sinarmas',
        program: 'Pelatihan WAPERD',
        date: '24–25 Februari 2020',
    },
    {
        client: 'Bank Mega',
        program: 'Pelatihan WAPERD',
        date: '17–18 Juni 2019',
    },
    {
        client: 'Bank Mega',
        program: 'Pelatihan WAPERD',
        date: '6–8 Maret 2019',
    },
];

export default function AboutSection() {
    return (
        <section id="tentang-kami" className="scroll-mt-20 bg-white py-24">
            <div className="mx-auto max-w-7xl px-6 lg:px-12">
                <Reveal className="mb-16 max-w-3xl">
                    <h2 className="mb-4 text-4xl leading-tight font-extrabold tracking-tight text-ink sm:text-5xl">
                        Dipercaya institusi keuangan
                    </h2>
                    <p className="mb-4 text-base leading-relaxed text-slate-600">
                        Perkembangan pasar modal menuntut tenaga profesional
                        yang tidak hanya berpendidikan formal, tetapi juga
                        memenuhi persyaratan sertifikasi profesi dari regulator.
                        InvestaLearning hadir untuk membantu persiapan Ujian
                        Standar Profesi Pasar Modal.
                    </p>
                    <p className="text-base leading-relaxed text-slate-600">
                        Tim kami terdiri dari profesional berpengalaman di
                        industri keuangan dan pasar modal, dan telah bekerja
                        sama dengan berbagai institusi untuk mempersiapkan
                        profesionalnya menghadapi ujian sertifikasi.
                    </p>
                </Reveal>

                <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
                    <div className="lg:col-span-7" aria-hidden="true">
                        <Stagger
                            gap={0.1}
                            className="relative no-scrollbar flex items-center gap-2 overflow-x-auto rounded-3xl pt-2 pb-4 sm:gap-3"
                        >
                            {photos.map((photo) => (
                                <StaggerItem
                                    key={photo.src}
                                    className={cn(
                                        'shrink-0 overflow-hidden rounded-2xl',
                                        photo.highlighted
                                            ? 'h-88 w-44 shadow-xl ring-4 ring-brand/30 sm:w-56'
                                            : 'h-80 w-36 shadow-md sm:w-44',
                                    )}
                                >
                                    <img
                                        src={photo.src}
                                        alt=""
                                        className="h-full w-full object-cover"
                                    />
                                </StaggerItem>
                            ))}
                        </Stagger>
                    </div>

                    <Reveal delay={0.15} className="lg:col-span-5">
                        <h3 className="mb-6 text-2xl font-bold tracking-tight text-ink">
                            Pelatihan inhouse terakhir
                        </h3>
                        <Stagger
                            as="ul"
                            className="divide-y divide-slate-100 border-y border-slate-100"
                        >
                            {trainings.map((training) => (
                                <StaggerItem
                                    as="li"
                                    key={`${training.client}-${training.date}`}
                                    className="flex items-center justify-between gap-4 py-4"
                                >
                                    <div>
                                        <p className="text-sm font-bold text-ink">
                                            {training.client}
                                        </p>
                                        <p className="text-xs text-slate-500">
                                            {training.program}
                                        </p>
                                    </div>
                                    <span className="shrink-0 text-xs font-semibold text-slate-600">
                                        {training.date}
                                    </span>
                                </StaggerItem>
                            ))}
                        </Stagger>
                        <a
                            href="mailto:analyst@investalearning.com"
                            className="mt-6 inline-flex text-sm font-semibold text-ink underline decoration-brand decoration-2 underline-offset-4 hover:decoration-ink"
                        >
                            Ajukan pelatihan inhouse untuk institusi Anda
                        </a>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}
