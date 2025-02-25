<?php declare(strict_types=1);

namespace SwagFaq\Core\Content\SwagFaqEntry;

use Shopware\Core\Framework\DataAbstractionLayer\EntityCollection;

/**
 * @method void add(SwagFaqEntryEntity $entity)
 * @method void set(string $key, SwagFaqEntryEntity $entity)
 * @method SwagFaqEntryEntity[] getIterator()
 * @method SwagFaqEntryEntity[] getElements()
 * @method SwagFaqEntryEntity|null get(string $key)
 * @method SwagFaqEntryEntity|null first()
 * @method SwagFaqEntryEntity|null last()
 */
class SwagFaqEntryCollection extends EntityCollection
{
    protected function getExpectedClass(): string
    {
        return SwagFaqEntryEntity::class;
    }
}
