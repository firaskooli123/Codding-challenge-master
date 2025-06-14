<?php

namespace App\Tests\Service;

use App\Service\RequestParamValidator;
use PHPUnit\Framework\TestCase;
use Symfony\Component\HttpFoundation\Exception\BadRequestException;

class RequestParamValidatorTest extends TestCase
{
    private RequestParamValidator $validator;

    protected function setUp(): void
    {
        $this->validator = new RequestParamValidator();
    }

    public function testValidateValidParams(): void
    {
        $validParams = [
            'include' => 'details',
            'filter' => 'active',
            'order' => 'desc',
            'limit' => '10',
            'page' => '1'
        ];

        $this->validator->validateSuggestionParams($validParams);
        $this->assertTrue(true); // If we reach here, no exception was thrown
    }

    public function testValidateEmptyParams(): void
    {
        $this->validator->validateSuggestionParams([]);
        $this->assertTrue(true); // If we reach here, no exception was thrown
    }

    public function testValidateInvalidParamThrowsException(): void
    {
        $invalidParams = ['invalid_param' => 'value'];

        $this->expectException(BadRequestException::class);
        $this->expectExceptionMessage('Parameter "invalid_param" is not allowed');

        $this->validator->validateSuggestionParams($invalidParams);
    }

    public function testValidateMixedParamsThrowsException(): void
    {
        $mixedParams = [
            'include' => 'details',
            'invalid_param' => 'value'
        ];

        $this->expectException(BadRequestException::class);
        $this->expectExceptionMessage('Parameter "invalid_param" is not allowed');

        $this->validator->validateSuggestionParams($mixedParams);
    }
}