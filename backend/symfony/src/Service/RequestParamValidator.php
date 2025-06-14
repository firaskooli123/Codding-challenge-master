<?php

namespace App\Service;

use Symfony\Component\HttpFoundation\Exception\BadRequestException;

class RequestParamValidator
{
    private const ALLOWED_PARAMS = ['include', 'filter', 'order', 'limit', 'page'];

    /**
     * @param array<string, mixed> $params
     * @throws BadRequestException
     */
    public function validateSuggestionParams(array $params): void
    {
        foreach (array_keys($params) as $param) {
            if (!in_array($param, self::ALLOWED_PARAMS)) {
                throw new BadRequestException(sprintf('Parameter "%s" is not allowed', $param));
            }
        }
    }
}