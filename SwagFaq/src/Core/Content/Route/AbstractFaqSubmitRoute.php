<?php declare(strict_types=1);

namespace SwagFaq\Core\Content\Route;

use Shopware\Core\System\SalesChannel\SalesChannelContext;
use Shopware\Core\System\SalesChannel\StoreApiResponse;
use Symfony\Component\HttpFoundation\Request;

abstract class AbstractFaqSubmitRoute
{
    abstract public function getDecorated(): AbstractFaqSubmitRoute;

    abstract public function submit(Request $request, SalesChannelContext $context): StoreApiResponse;
}
