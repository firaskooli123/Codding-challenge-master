<?php

namespace App\Controller;

use App\Interface\InnosabiApiClientInterface;
use App\Service\RequestParamValidator;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class SuggestionController extends AbstractController
{
    public function __construct(
        private InnosabiApiClientInterface $apiClient,
        private RequestParamValidator $validator
    ) {}

    #[Route('/api/suggestion', name: 'api_suggestion', methods: ['GET'])]
    public function getSuggestions(Request $request): Response
    {
        $queryParams = $request->query->all();
        $this->validator->validateSuggestionParams($queryParams);

        $suggestions = $this->apiClient->getSuggestions($queryParams);
        return $this->json($suggestions);
    }
}
