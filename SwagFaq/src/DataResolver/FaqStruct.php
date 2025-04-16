<?php

namespace SwagFaq\DataResolver;

use Shopware\Core\Framework\Struct\Struct;

class FaqStruct extends Struct
{
    protected $faqEntries;

    protected $productName;

    public function getFaqEntries()
    {
        return $this->faqEntries;
    }

    public function setFaqEntries($faqEntries)
    {
        $this->faqEntries = $faqEntries;
    }

    public function getProductName()
    {
        return $this->productName;
    }

    public function setProductName($productName)
    {
        $this->productName = $productName;
    }
}
