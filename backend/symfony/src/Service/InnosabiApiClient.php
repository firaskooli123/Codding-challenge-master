<?php

namespace App\Service;

use App\Exception\ApiException;
use App\Interface\InnosabiApiClientInterface;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Contracts\HttpClient\HttpClientInterface;
use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;

class InnosabiApiClient implements InnosabiApiClientInterface
{
    private string $apiUrl;
    private string $username;
    private string $password;

    public function __construct(
        private HttpClientInterface $httpClient,
        ParameterBagInterface $params
    ) {
        $this->apiUrl = $params->get('app.innosabi.api_url');
        $this->username = $params->get('app.innosabi.username');
        $this->password = $params->get('app.innosabi.password');
    }

    public function getSuggestions(array $queryParams = []): array
    {
        try {
            $response = $this->httpClient->request('GET', $this->apiUrl, [
                'auth_basic' => [$this->username, $this->password],
                'query' => $queryParams,
            ]);

            return $response->toArray();
        } catch (\Exception $e) {
            throw new ApiException(
                'Failed to fetch suggestions from Innosabi API',
                Response::HTTP_INTERNAL_SERVER_ERROR,
                $e
            );
        }
    }
}
