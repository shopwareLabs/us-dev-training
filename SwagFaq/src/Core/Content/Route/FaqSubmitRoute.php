<?php declare(strict_types=1);

namespace SwagFaq\Core\Content\Route;

use Shopware\Core\Framework\DataAbstractionLayer\EntityCollection;
use Shopware\Core\Framework\DataAbstractionLayer\EntityRepository;
use Shopware\Core\Framework\Plugin\Exception\DecorationPatternException;
use Shopware\Core\System\SalesChannel\SalesChannelContext;
use Shopware\Core\System\SalesChannel\StoreApiResponse;
use Shopware\Core\System\SalesChannel\SuccessResponse;
use SwagFaq\Core\Content\SwagFaqEntry\SwagFaqEntryEntity;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;

#[Route(defaults: ['_routeScope' => ['store-api']])]
class FaqSubmitRoute extends AbstractFaqSubmitRoute
{
    /**
     * @param EntityRepository<EntityCollection<SwagFaqEntryEntity>> $faqRepository
     */
    public function __construct(private readonly EntityRepository $faqRepository)
    {
    }

    public function getDecorated(): AbstractFaqSubmitRoute
    {
        throw new DecorationPatternException(self::class);
    }

    #[Route(
        path: '/store-api/swag-faq/submit',
        name: 'store-api.swag-faq.submit',
        methods: ['POST']
    )]
    public function submit(Request $request, SalesChannelContext $context): StoreApiResponse
    {
        $this->faqRepository->create([
            [
                'question' => $request->request->get('question'),
                'answer' => $request->request->get('answer'),
                'productId' => $request->request->get('productId'),
                'productVersionId' => $request->request->get('productVersionId'),
            ]
        ], $context->getContext());

        return new SuccessResponse();
    }
}
