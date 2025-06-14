<?php

namespace App\Interface;

interface InnosabiApiClientInterface
{
    /**
     * Get suggestions from Innosabi API
     *
     * @param array<string, mixed> $queryParams
     * @return array<string, mixed>
     */
    public function getSuggestions(array $queryParams = []): array;
}