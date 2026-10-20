<?php

namespace App\Support;

use Illuminate\Support\Carbon;
use Illuminate\Support\Str;
use Throwable;

/**
 * Turns raw backend values into display text for admin tables.
 */
class ApiFormat
{
    /**
     * Question text is stored as HTML. Tables show it as plain text so no
     * markup from the backend is ever rendered as HTML.
     */
    public static function plain(?string $html, int $limit = 240): string
    {
        $text = html_entity_decode(strip_tags((string) $html), ENT_QUOTES | ENT_HTML5, 'UTF-8');

        return Str::limit(Str::squish($text), $limit);
    }

    /**
     * Dates arrive either as "2026-10-15 12:52:41" (Jakarta time) or as UTC
     * ISO strings such as "2020-08-09T17:00:00.000Z".
     */
    public static function date(?string $value, bool $withTime = false): string
    {
        if (blank($value)) {
            return '-';
        }

        try {
            $date = str_ends_with($value, 'Z')
                ? Carbon::parse($value)->setTimezone('Asia/Jakarta')
                : Carbon::parse($value, 'Asia/Jakarta');
        } catch (Throwable) {
            return $value;
        }

        // Month names follow the app locale (APP_LOCALE=id).
        return $date->translatedFormat($withTime ? 'j M Y, H:i' : 'j M Y');
    }

    /**
     * Full URL of a file uploaded through the old site, e.g.
     * `asset('assets/logo', 'x.jpg')`. Null when there is no file name.
     */
    public static function asset(string $folder, ?string $file): ?string
    {
        if (blank($file)) {
            return null;
        }

        $base = rtrim((string) config('services.investa_api.asset_url'), '/');

        return $base.'/'.trim($folder, '/').'/'.rawurlencode((string) $file);
    }
}
