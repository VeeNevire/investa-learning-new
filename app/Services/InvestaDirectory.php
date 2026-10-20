<?php

namespace App\Services;

use App\Support\ApiFormat;
use Illuminate\Support\Collection;

/**
 * Whole-table reads that several admin pages share. The backend returns these
 * tables in one response, so they are trimmed to display fields and cached
 * briefly; sensitive columns never reach the cache or the browser.
 */
class InvestaDirectory
{
    private const TTL = 60;

    public function __construct(
        private InvestaApi $api,
        private InvestaLookups $lookups,
    ) {}

    /**
     * Every registered participant, newest first. The backend row also holds
     * the password hash, verification code, address, phone and e-mail; none of
     * those are kept.
     *
     * @return Collection<int, array{uid: string, userId: string, name: string, institution: string, classId: string, class: string, examId: string, exam: string, registeredAt: string, registered: string, status: string}>
     */
    public function participants(): Collection
    {
        $rows = $this->api->cached('participants', self::TTL, function () {
            $examTypes = $this->lookups->examTypes();
            $classes = $this->lookups->classes();

            return collect(InvestaApi::rows($this->api->get('admin/peserta/ListPeserta'), 'dataku'))
                ->map(fn (array $row) => [
                    'uid' => (string) $row['uid'],
                    'userId' => (string) $row['userid'],
                    'name' => (string) $row['nama'],
                    'institution' => (string) ($row['institusi'] ?? ''),
                    'classId' => (string) $row['kelas'],
                    'class' => $classes[$row['kelas']] ?? (string) $row['kelas'],
                    'examId' => (string) $row['jenis_ujian'],
                    'exam' => $examTypes[$row['jenis_ujian']] ?? '-',
                    'registeredAt' => (string) $row['tgl_daftar'],
                    'registered' => ApiFormat::date($row['tgl_daftar']),
                    'status' => $row['statusaktif'] === 'YES' ? 'aktif' : 'nonaktif',
                ])
                ->sortByDesc('registeredAt')
                ->values()
                ->all();
        });

        return collect($rows);
    }
}
