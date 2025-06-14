<?php

namespace App\EventListener;

use App\Exception\ApiException;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Event\ExceptionEvent;
use Symfony\Component\HttpFoundation\Exception\BadRequestException;

class ExceptionListener
{
    public function onKernelException(ExceptionEvent $event): void
    {
        $exception = $event->getThrowable();
        $response = null;

        switch (true) {
            case $exception instanceof ApiException:
                $response = new JsonResponse(
                    ['error' => $exception->getMessage()],
                    $exception->getStatusCode()
                );
                break;

            case $exception instanceof BadRequestException:
                $response = new JsonResponse(
                    ['error' => $exception->getMessage()],
                    Response::HTTP_BAD_REQUEST
                );
                break;

            default:
                $response = new JsonResponse(
                    ['error' => 'An unexpected error occurred'],
                    Response::HTTP_INTERNAL_SERVER_ERROR
                );
        }

        $event->setResponse($response);
    }
}