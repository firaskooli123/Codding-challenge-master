<?php

namespace App\Tests\Service;

use App\Exception\ApiException;
use App\Service\InnosabiApiClient;
use PHPUnit\Framework\TestCase;
use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Contracts\HttpClient\HttpClientInterface;
use Symfony\Contracts\HttpClient\ResponseInterface;

/**
 * @covers \App\Service\InnosabiApiClient
 */
class InnosabiApiClientTest extends TestCase
{
    private const API_URL = 'https://api.test.com';
    private const USERNAME = 'testuser';
    private const PASSWORD = 'testpass';

    /** @var HttpClientInterface&\PHPUnit\Framework\MockObject\MockObject */
    private $httpClient;

    /** @var ParameterBagInterface&\PHPUnit\Framework\MockObject\MockObject */
    private $parameterBag;

    private InnosabiApiClient $innosabiApiClient;

    /** @var ResponseInterface&\PHPUnit\Framework\MockObject\MockObject */
    private $response;

    protected function setUp(): void
    {
        $this->httpClient = $this->createMock(HttpClientInterface::class);
        $this->parameterBag = $this->createMock(ParameterBagInterface::class);
        $this->response = $this->createMock(ResponseInterface::class);

        $this->parameterBag->method('get')
            ->willReturnMap([
                ['app.innosabi.api_url', self::API_URL],
                ['app.innosabi.username', self::USERNAME],
                ['app.innosabi.password', self::PASSWORD],
            ]);

        $this->innosabiApiClient = new InnosabiApiClient(
            $this->httpClient,
            $this->parameterBag
        );
    }

    /**
     * @test
     */
    public function getSuggestionsWithoutParams(): void
    {
        $expectedData = ['data' => ['suggestions' => []]];
        $this->response->method('toArray')->willReturn($expectedData);

        $this->httpClient->expects($this->once())
            ->method('request')
            ->with(
                'GET',
                self::API_URL,
                [
                    'auth_basic' => [self::USERNAME, self::PASSWORD],
                    'query' => [],
                ]
            )
            ->willReturn($this->response);

        $result = $this->innosabiApiClient->getSuggestions();

        $this->assertEquals($expectedData, $result);
    }

    /**
     * @test
     */
    public function getSuggestionsWithParams(): void
    {
        $expectedData = ['data' => ['suggestions' => [['id' => 1]]]];
        $queryParams = [
            'include' => 'details',
            'filter' => 'active',
            'page' => '1'
        ];

        $this->response->method('toArray')->willReturn($expectedData);

        $this->httpClient->expects($this->once())
            ->method('request')
            ->with(
                'GET',
                self::API_URL,
                [
                    'auth_basic' => [self::USERNAME, self::PASSWORD],
                    'query' => $queryParams,
                ]
            )
            ->willReturn($this->response);

        $result = $this->innosabiApiClient->getSuggestions($queryParams);

        $this->assertEquals($expectedData, $result);
    }

    /**
     * @test
     */
    public function getSuggestionsThrowsApiExceptionOnHttpClientError(): void
    {
        $this->httpClient->method('request')
            ->willThrowException(new \Exception('HTTP Client Error'));

        $this->expectException(ApiException::class);
        $this->expectExceptionMessage('Failed to fetch suggestions from Innosabi API');

        try {
            $this->innosabiApiClient->getSuggestions();
            $this->fail('Expected ApiException was not thrown');
        } catch (ApiException $e) {
            $this->assertEquals(Response::HTTP_INTERNAL_SERVER_ERROR, $e->getStatusCode());
            throw $e;
        }
    }

    /**
     * @test
     */
    public function getSuggestionsThrowsApiExceptionOnInvalidResponse(): void
    {
        $this->response->method('toArray')
            ->willThrowException(new \Exception('Invalid JSON'));

        $this->httpClient->method('request')
            ->willReturn($this->response);

        $this->expectException(ApiException::class);
        $this->expectExceptionMessage('Failed to fetch suggestions from Innosabi API');

        try {
            $this->innosabiApiClient->getSuggestions();
            $this->fail('Expected ApiException was not thrown');
        } catch (ApiException $e) {
            $this->assertEquals(Response::HTTP_INTERNAL_SERVER_ERROR, $e->getStatusCode());
            throw $e;
        }
    }
}