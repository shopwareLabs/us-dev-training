<?php declare(strict_types=1);

namespace SwagFaq\DataResolver;

use Shopware\Core\Content\Cms\Aggregate\CmsSlot\CmsSlotEntity;
use Shopware\Core\Content\Cms\DataResolver\Element\AbstractCmsElementResolver;
use Shopware\Core\Content\Cms\DataResolver\Element\ElementDataCollection;
use Shopware\Core\Content\Cms\DataResolver\ResolverContext\EntityResolverContext;
use Shopware\Core\Content\Cms\DataResolver\ResolverContext\ResolverContext;
use Shopware\Core\Content\Cms\DataResolver\CriteriaCollection;

class FaqCmsElementDataResolver extends AbstractCmsElementResolver
{
    public function getType(): string
    {
        return 'swagfaq';
    }

    public function collect(CmsSlotEntity $slot, ResolverContext $resolverContext): ?CriteriaCollection
    {
        return null;
    }

    public function enrich(CmsSlotEntity $slot, ResolverContext $resolverContext, ElementDataCollection $result): void
    {
        $faq = new FaqStruct();
        $slot->setData($faq);

        if (!$resolverContext instanceof EntityResolverContext) {
            return;
        }

        $product = $resolverContext->getEntity();

        $faq->setFaqEntries($product->getExtension('swagFaqEntries'));
        $faq->setProductName($product->getName());
    }
}