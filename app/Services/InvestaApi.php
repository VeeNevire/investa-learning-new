<?php

namespace App\Services;

use App\Exceptions\InvestaApiUnavailable;
use Illuminate\Http\Client\ConnectionException;
use Illuminate\Http\Client\PendingRequest;
use Illuminate\Http\Client\RequestException;
use Illuminate\Http\Client\Response;
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
     * @param  array<string, mixed>  $data
     */
    private function post(string $path, array $data = []): Response
    {
        try {
            return $this->request()->post($path, $data)->throw();
        } catch (ConnectionException|RequestException $exception) {
            throw new InvestaApiUnavailable(previous: $exception);
        }
    }

    private function request(): PendingRequest
    {
        return Http::baseUrl(config('services.investa_api.url'))
            ->timeout(config('services.investa_api.timeout'))
            ->acceptJson()
            ->asForm();
    }
}
