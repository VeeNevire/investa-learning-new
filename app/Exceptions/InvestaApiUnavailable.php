<?php

namespace App\Exceptions;

use RuntimeException;
use Throwable;

class InvestaApiUnavailable extends RuntimeException
{
    public function __construct(?Throwable $previous = null)
    {
        parent::__construct('Server data tidak dapat dihubungi. Coba lagi beberapa saat lagi.', 0, $previous);
    }
}
