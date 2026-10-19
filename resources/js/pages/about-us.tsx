import PageContent from '@/components/page-content';
import PageHero from '@/components/page-hero';
import PublicLayout from '@/layouts/public-layout';

const professions = [
    'WPPE-PT (Wakil Perantara Pedagang Efek Pemasaran Terbatas)',
    'WAPERD (Wakil Agen Penjual Efek Reksa Dana)',
    'WPPE-P (Wakil Perantara Pedagang Efek Pemasaran)',
    'WPPE (Wakil Perantara Pedagang Efek)',
    'WPEE (Wakil Penjamin Emisi Efek)',
    'WMI (Wakil Manajer Investasi)',
];

const preparationModels = [
    {
        name: 'Latihan',
        description:
            'Dimana peserta dapat langsung melihat jawaban dari setiap soal dan lama penyelesaian ujian tidak dibatasi oleh waktu namun hasil ujian tersebut tidak disimpan dalam data nilai peserta.',
    },
    {
        name: 'TryOut',
        description:
            'Dimana peserta mengerjakan ujian dengan waktu yang sesungguhnya dan hasil ujian akan disimpan dalam data nilai peserta.',
    },
];

export default function AboutUs() {
    return (
        <PublicLayout title="About Us">
            <PageHero title="Welcome in investalearning.com" />
            <PageContent>
                <div className="space-y-5 text-base leading-relaxed text-slate-600">
                    <p>
                        Perkembangan industri pasar modal telah mendorong
                        semakin meningkatnya kebutuhan akan tenaga profesional
                        untuk mendukung pertumbuhan industri tersebut. Oleh
                        karena itu, tenaga profesional yang dibutuhkan adalah
                        tenaga yang tidak hanya memiliki pendidikan formal namun
                        juga dapat memenuhi persyaratan ijin sertifikasi profesi
                        sebagaimana yang telah ditetapkan oleh badan regulator
                        di Indonesia.
                    </p>
                    <p>
                        Dalam rangka mendukung peningkatan akan kebutuhan
                        tersebut, kami menyediakan tryout online sebagai suatu
                        bentuk persiapan dalam menghadapi ujian standar profesi
                        pasar modal untuk meningkatkan kemampuan peserta ujian
                        di dalam menghadapi Ujian Standar Profesi Pasar Modal.
                    </p>
                    <p>
                        Adapun Pelatihan Persiapan Ujian Standar Profesi Pasar
                        Modal yang kami sediakan terdiri atas 6 Profesi, yaitu :
                    </p>
                    <ol className="grid gap-3 sm:grid-cols-2">
                        {professions.map((profession, index) => (
                            <li
                                key={profession}
                                className="flex items-start gap-3 rounded-2xl bg-canvas p-4 text-sm"
                            >
                                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand text-xs font-bold text-white">
                                    {index + 1}
                                </span>
                                <span className="font-medium text-slate-800">
                                    {profession}
                                </span>
                            </li>
                        ))}
                    </ol>
                    <p>Yang terdiri atas dua model persiapan, yaitu:</p>
                    <div className="grid gap-4 sm:grid-cols-2">
                        {preparationModels.map((model) => (
                            <div
                                key={model.name}
                                className="rounded-2xl border border-slate-100 p-5"
                            >
                                <h2 className="mb-2 text-lg font-bold text-ink">
                                    {model.name}
                                </h2>
                                <p className="text-sm">{model.description}</p>
                            </div>
                        ))}
                    </div>
                    <p>
                        Pada investalearning peserta akan dapat melakukan
                        evaluasi atas kemampuannya dalam menghadapi ujian nanti,
                        dimana investalearning melakukan klasifikasi topik ujian
                        yang disesuaikan dengan topik ujian dari Ujian Standar
                        Profesi Pasar Modal. Kami juga menyediakan grafik
                        statistik untuk membantu peserta dalam menganalisa
                        perkembangan kesiapan peserta dalam menghadapi ujian dan
                        melakukan analisa atas topik ujian yang masih perlu
                        untuk ditingkatkan sebagai bahan persiapan peserta
                        kembali.
                    </p>
                    <p>
                        Untuk mendukung kebutuhan persiapan Ujian Standar
                        Profesi Pasar Modal, kami menyediakan jenis pelatihan
                        online dan tatap muka (zoom).
                    </p>
                    <p>
                        Selanjutnya kami juga menyediakan materi secara online
                        berdasarkan topik sebagai bahan pembelajaran peserta
                        sehingga bisa mempersiapkan diri sebelum mengikuti
                        TryOut secara online.
                    </p>
                    <p>
                        Untuk informasi lebih jelasnya, anda bisa melihat FAQ
                        (Frequent Answer Question)
                    </p>
                    <p>
                        Selamat dan Sukses untuk Seluruh Calon Peserta Ujian
                        Standar Profesi Pasar Modal.
                    </p>
                    <p className="font-semibold text-ink">
                        Salam,
                        <br />
                        Tim Investalearning
                    </p>
                </div>
            </PageContent>
        </PublicLayout>
    );
}
