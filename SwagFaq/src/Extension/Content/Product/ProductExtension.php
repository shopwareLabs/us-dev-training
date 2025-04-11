<?php declare(strict_types=1);

namespace SwagFaq\Extension\Content\Product;

use Shopware\Core\Content\Product\ProductDefinition;
use Shopware\Core\Framework\DataAbstractionLayer\EntityExtension;
use Shopware\Core\Framework\DataAbstractionLayer\Field\OneToManyAssociationField;
use Shopware\Core\Framework\DataAbstractionLayer\FieldCollection;
use SwagFaq\Core\Content\SwagFaqEntry\SwagFaqEntryDefinition;

class ProductExtension extends EntityExtension
{
    public function extendFields(FieldCollection $collection): void
    {
        $collection->add(
            new OneToManyAssociationField('swagFaqEntries', 'swag_faq_entry.definition', 'product_id', 'id')
        );
    }

    public function getEntityName(): string
    {
        return ProductDefinition::ENTITY_NAME;
    }

    public function getDefinitionClass(): string
    {
        return ProductDefinition::class;
    }
}
