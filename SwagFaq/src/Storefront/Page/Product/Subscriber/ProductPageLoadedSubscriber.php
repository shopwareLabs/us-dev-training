<?php declare(strict_types=1);

namespace SwagFaq\Storefront\Page\Product\Subscriber;

use Shopware\Commercial\Licensing\License;
use Shopware\Core\Framework\Log\Package;
use Shopware\Storefront\Page\Product\ProductPageCriteriaEvent;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

class ProductPageLoadedSubscriber implements EventSubscriberInterface
{
    public static function getSubscribedEvents(): array
    {
        return [
            ProductPageCriteriaEvent::class => ['enrichCriteria', 100],
        ];
    }

    public function enrichCriteria(ProductPageCriteriaEvent $event): void
    {
        $event->getCriteria()->addAssociation('swagFaqEntries');
    }
}
