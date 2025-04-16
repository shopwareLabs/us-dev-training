declare module '*.vue';

import '@shopware-ag/entity-schema-types';

declare global {
    namespace EntitySchema {
        interface Entities {
            swag_faq_entry: swag_faq_entry;
        }
        interface swag_faq_entry {
            id: string;
            question: string;
            answer: string;
        }
    }
}
