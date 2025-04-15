<?php declare(strict_types=1);

namespace SwagFaq\Extension\Content\Product;

use Shopware\Core\Content\Product\ProductDefinition;
use Shopware\Core\Framework\DataAbstractionLayer\EntityExtension;
use Shopware\Core\Framework\DataAbstractionLayer\Field\Flag\CascadeDelete;
use Shopware\Core\Framework\DataAbstractionLayer\Field\OneToManyAssociationField;
use Shopware\Core\Framework\DataAbstractionLayer\FieldCollection;

class ProductExtension extends EntityExtension
{
    public function extendFields(FieldCollection $collection): void
    {
        $collection->add(
            (new OneToManyAssociationField(
                propertyName: 'swagFaqEntries',
                referenceClass: 'swag_faq_entry.definition',
                referenceField: 'product_id',
                localField: 'id'
            ))->addFlags(new CascadeDelete())
        );
    }

    /**
     * from version 6.7
     */
    public function getEntityName(): string
    {
        return ProductDefinition::ENTITY_NAME;
    }

    /**
     * before version 6.7
     */
    public function getDefinitionClass(): string
    {
        return ProductDefinition::class;
    }
}
