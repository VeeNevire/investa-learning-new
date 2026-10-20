<?php

namespace App\Services;

use App\Exceptions\InvestaApiUnavailable;
use Closure;
use Illuminate\Http\Client\ConnectionException;
use Illuminate\Http\Client\PendingRequest;
use Illuminate\Http\Client\RequestException;
use Illuminate\Http\Client\Response;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;

/**
 * Client for the backend API on port 3333 that owns all InvestaLearning data.
 * Locally it points at the VPS IP, on the VPS itself at 127.0.0.1.
 */
class InvestaApi
{
    /**
     * Check admin credentials. The backend expects the password as an MD5 hash.
     *
     * @return array{id: string, name: string, access: string}|null
     */
    public function adminLogin(string $username, string $password): ?array
    {
        $body = $this->post('admin/login', [
            'username' => $username,
            'password' => md5($password),
        ])->json();

        if ((int) data_get($body, 'count', 0) < 1) {
            return null;
        }

        return [
            'id' => (string) data_get($body, 'data.idg'),
            'name' => (string) data_get($body, 'data.namag'),
            'access' => (string) data_get($body, 'data.access'),
        ];
    }

    /**
     * Read a GET endpoint and return its decoded JSON.
     *
     * @param  array<string, mixed>  $query
     * @param  int|null  $timeout  seconds, for endpoints known to be slow
     * @return array<mixed>
     */
    public function get(string $path, array $query = [], ?int $timeout = null): array
    {
        return $this->decode($this->send(fn () => $this->request()
            ->when($timeout, fn (PendingRequest $request, int $seconds) => $request->timeout($seconds))
            ->get($path, $query)));
    }

    /**
     * Read an endpoint that the backend only serves over POST. These look up
     * data and change nothing (e.g. `admin/bank/soal/ListSoal/{page}`).
     *
     * @param  array<string, mixed>  $data
     * @return array<mixed>
     */
    public function read(string $path, array $data = []): array
    {
        return $this->decode($this->post($path, $data));
    }

    /**
     * The rows of a response: the response itself when it is a plain list,
     * otherwise the list under `$key` (usually `data`). Anything that is not
     * a row is skipped.
     *
     * @param  array<mixed>  $response
     * @return list<array<string, mixed>>
     */
    public static function rows(array $response, ?string $key = 'data'): array
    {
        $rows = array_is_list($response) || $key === null ? $response : ($response[$key] ?? []);

        return is_array($rows) ? array_values(array_filter($rows, is_array(...))) : [];
    }

    /**
     * Cache a read for a short while, for endpoints that return whole tables
     * at once. Only cache data that is already stripped of sensitive fields.
     *
     * @template T
     *
     * @param  Closure(): T  $callback
     * @return T
     */
    public function cached(string $key, int $seconds, Closure $callback): mixed
    {
        return Cache::remember("investa-api:{$key}", $seconds, $callback);
    }

    /**
     * @param  array<string, mixed>  $data
     */
    private function post(string $path, array $data = []): Response
    {
        return $this->send(fn () => $this->request()->post($path, $data));
    }

    /**
     * @param  Closure(): Response  $request
     */
    private function send(Closure $request): Response
    {
        try {
            return $request()->throw();
        } catch (ConnectionException|RequestException $exception) {
            throw new InvestaApiUnavailable(previous: $exception);
        }
    }

    /**
     * The backend answers unknown routes with an HTML error page, so anything
     * that is not JSON counts as unavailable.
     *
     * @return array<mixed>
     */
    private function decode(Response $response): array
    {
        $body = $response->json();

        if (! is_array($body)) {
            throw new InvestaApiUnavailable;
        }

        return $body;
    }

    private function request(): PendingRequest
    {
        return Http::baseUrl(config('services.investa_api.url'))
            ->timeout(config('services.investa_api.timeout'))
            ->acceptJson()
            ->asForm();
    }
}
