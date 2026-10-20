<?php

namespace App\Support;

use App\Services\InvestaApi;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Support\Str;

/**
 * Builds the `table` prop admin pages share with `DataTable`:
 * `{rows, meta: {page, lastPage, total, perPage, from}, query: {q, ...filters}}`.
 */
class AdminTable
{
    public const PER_PAGE = 20;

    /**
     * The page number the visitor asked for (`?page=`), at least 1.
     */
    public static function page(Request $request): int
    {
        return max(1, $request->integer('page', 1));
    }

    /**
     * For endpoints the backend already pages, e.g. `.../ListPelajaran/{page}`,
     * which answer `{total, perPage, page, lastPage, data}`.
     *
     * @param  array<mixed>  $response
     * @param  callable(array<string, mixed>): array<string, mixed>  $map
     * @param  array<string, string>  $query
     * @return array<string, mixed>
     */
    public static function fromPaged(array $response, callable $map, array $query = []): array
    {
        $perPage = max(1, (int) ($response['perPage'] ?? 0));
        $page = max(1, (int) ($response['page'] ?? 1));

        return [
            'rows' => array_map($map, InvestaApi::rows($response)),
            'meta' => self::meta($page, (int) ($response['total'] ?? 0), $perPage),
            'query' => $query,
        ];
    }

    /**
     * For endpoints that return every row at once: search, filter and page
     * here so the browser only receives one page of already-mapped rows.
     *
     * @template TRow of array<string, mixed>
     *
     * @param  Collection<array-key, TRow>  $rows  mapped rows
     * @param  list<string>  $search  row keys `?q=` looks in
     * @param  list<string>  $filters  row keys that may be filtered by exact value, read from the query string under the same name
     * @return array<string, mixed>
     */
    public static function fromCollection(
        Collection $rows,
        Request $request,
        array $search = [],
        array $filters = [],
        int $perPage = self::PER_PAGE,
    ): array {
        $keyword = Str::lower(trim($request->string('q')->toString()));
        $query = array_filter(['q' => $keyword]);

        if ($keyword !== '' && $search !== []) {
            $rows = $rows->filter(fn (array $row) => collect($search)
                ->contains(fn (string $key) => Str::contains(Str::lower((string) ($row[$key] ?? '')), $keyword)));
        }

        foreach ($filters as $key) {
            $value = $request->string($key)->toString();

            if ($value !== '') {
                $query[$key] = $value;
                $rows = $rows->filter(fn (array $row) => (string) ($row[$key] ?? '') === $value);
            }
        }

        $total = $rows->count();
        $lastPage = max(1, (int) ceil($total / $perPage));
        $page = min(self::page($request), $lastPage);

        return [
            'rows' => $rows->forPage($page, $perPage)->values()->all(),
            'meta' => self::meta($page, $total, $perPage),
            'query' => $query,
        ];
    }

    /**
     * @return array{page: int, lastPage: int, total: int, perPage: int, from: int}
     */
    private static function meta(int $page, int $total, int $perPage): array
    {
        return [
            'page' => $page,
            'lastPage' => max(1, (int) ceil($total / $perPage)),
            'total' => $total,
            'perPage' => $perPage,
            'from' => $total === 0 ? 0 : ($page - 1) * $perPage + 1,
        ];
    }
}
