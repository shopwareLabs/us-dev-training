<?php declare(strict_types=1);

namespace SwagFaq\Storefront\Controller;

use Shopware\Core\System\SalesChannel\SalesChannelContext;
use Shopware\Storefront\Controller\StorefrontController;
use SwagFaq\Core\Content\Route\AbstractFaqSubmitRoute;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;

#[Route(defaults: ['_routeScope' => ['storefront']])]
class FaqController extends StorefrontController
{
    public function __construct(private readonly AbstractFaqSubmitRoute $route)
    {
    }

    #[Route(
        path: '/swag-faq/submit',
        name: 'frontend.swag-faq.submit',
        defaults: ['XmlHttpRequest' => 'true'],
        methods: ['POST'],
    )]
    public function submit(Request $request, SalesChannelContext $context): JsonResponse
    {
        $this->route->submit($request, $context);

        return new JsonResponse([
            'success' => true,
        ]);
    }
}
