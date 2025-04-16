<?php declare(strict_types=1);

namespace SwagFaq\Command;

use Faker\Factory;
use Shopware\Core\Content\Product\ProductCollection;
use Shopware\Core\Defaults;
use Shopware\Core\Framework\Context;
use Shopware\Core\Framework\DataAbstractionLayer\EntityCollection;
use Shopware\Core\Framework\DataAbstractionLayer\EntityRepository;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Criteria;
use SwagFaq\Core\Content\SwagFaqEntry\SwagFaqEntryEntity;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

#[AsCommand(
    name: 'swag-faq:demo-data',
    description: 'Add dummy FAQ entries to products',
)]
class DemoDataCommand extends Command
{
    /**
     * @var EntityRepository<ProductCollection> $productRepository
     * @param EntityRepository<EntityCollection<SwagFaqEntryEntity>> $faqEntryRepository
     */
    public function __construct(
        private readonly EntityRepository $productRepository,
        private readonly EntityRepository $faqEntryRepository,
    ) {
        parent::__construct();
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $context = Context::createCLIContext();

        $criteria = new Criteria();
        $productIds = $this->productRepository->searchIds($criteria, Context::createCLIContext());

        $faker = Factory::create();

        $faqEntries = [];
        foreach ($productIds->getIds() as $productId) {
            for ($i = 0; $i < rand(1, 5); $i++) {
                $faqEntries[] = [
                    'productId' => $productId,
                    'productVersionId' => Defaults::LIVE_VERSION,
                    'question' => ucfirst(implode(' ', $faker->words(rand(3, 8))) . '?'),
                    'answer' => $faker->paragraph(rand(1, 3)),
                ];
            }
        }

        $this->faqEntryRepository->create($faqEntries, $context);

        return Command::SUCCESS;
    }
}
