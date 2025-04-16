<?php declare(strict_types=1);

namespace SwagFaq\Core\Content\SwagFaqEntry;

use Shopware\Core\Content\Product\ProductEntity;
use Shopware\Core\Framework\DataAbstractionLayer\Attribute\Entity as EntityAttribute;
use Shopware\Core\Framework\DataAbstractionLayer\Attribute\Field;
use Shopware\Core\Framework\DataAbstractionLayer\Attribute\FieldType;
use Shopware\Core\Framework\DataAbstractionLayer\Attribute\ForeignKey;
use Shopware\Core\Framework\DataAbstractionLayer\Attribute\ManyToOne;
use Shopware\Core\Framework\DataAbstractionLayer\Attribute\PrimaryKey;
use Shopware\Core\Framework\DataAbstractionLayer\Attribute\ReferenceVersion;
use Shopware\Core\Framework\DataAbstractionLayer\Attribute\Required;
use Shopware\Core\Framework\DataAbstractionLayer\Entity;

#[EntityAttribute('swag_faq_entry')]
class SwagFaqEntryEntity extends Entity
{
    #[PrimaryKey]
    #[Field(type: FieldType::UUID, api: true)]
    public string $id;

    #[Required]
    #[ForeignKey(entity: 'product', api: true)]
    public string $productId;

    #[Required]
    #[ReferenceVersion(entity: 'product')]
    public string $productVersionId;

    #[Required]
    #[Field(type: FieldType::TEXT, api: true)]
    public string $question;

    #[Required]
    #[Field(type: FieldType::TEXT, api: true)]
    public string $answer;

    #[ManyToOne(entity: 'product')]
    public ?ProductEntity $product;
}
