<?php

namespace App\Services;

/**
 * Reference lists from the backend (exam types, classes, subjects), cached
 * for an hour because they rarely change.
 */
class InvestaLookups
{
    private const TTL = 3600;

    public function __construct(private InvestaApi $api) {}

    /**
     * @return array<int|string, string> exam type id => name, e.g. 1 => "WPPE"
     */
    public function examTypes(): array
    {
        return $this->api->cached('lookup:exam-types', self::TTL, fn () => collect(InvestaApi::rows($this->api->get('admin/data/soal/JenisUjian')))
            ->mapWithKeys(fn (array $row) => [$row['jenis_ujian_id'] => (string) $row['jenis_ujian_desc']])
            ->all());
    }

    /**
     * @return array<int|string, string> class id => name, e.g. "I" => "Biasa"
     */
    public function classes(): array
    {
        return $this->api->cached('lookup:classes', self::TTL, fn () => collect(InvestaApi::rows($this->api->get('admin/data/soal/Kelas')))
            ->mapWithKeys(fn (array $row) => [$row['kelas_id'] => (string) $row['kelas_desc']])
            ->all());
    }

    /**
     * @return array<int|string, string> subject code => name, e.g. "P010" => "Latihan WPPE-A-01"
     */
    public function subjects(): array
    {
        return $this->api->cached('lookup:subjects', self::TTL, fn () => collect(InvestaApi::rows($this->api->get('admin/data/soal/MateriPelajaran')))
            ->sortBy('kd_pelajaran')
            ->mapWithKeys(fn (array $row) => [$row['kd_pelajaran'] => (string) $row['nm_pelajaran']])
            ->all());
    }

    /**
     * Turns an id => label map into select options for the frontend.
     *
     * @param  array<int|string, string>  $map
     * @return list<array{value: string, label: string}>
     */
    public static function options(array $map): array
    {
        return array_map(
            fn (int|string $value, string $label) => ['value' => (string) $value, 'label' => $label],
            array_keys($map),
            array_values($map),
        );
    }
}
