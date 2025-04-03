import { createApp, h, defineAsyncComponent } from 'vue';
import { createI18n } from 'vue-i18n';
import '@shopware-ag/meteor-component-library/styles.css';
import '@shopware-ag/meteor-component-library/font.css';
import { location } from '@shopware-ag/meteor-admin-sdk';

// register all components for the location
const locations = {
    'swagfaq-product-detail-tab-faq-card': defineAsyncComponent(
        () => import('./faq-list.vue')
    ),
};

const app = createApp({
    // @ts-expect-error -- TS does not know about the location object
    render: () => h(locations[location.get()]),
});

// todo: snippet files
const i18n = createI18n({
    locale: 'en',
    messages: {
        en: {
            hello: 'Hello world!',
        },
    },
});

app.use(i18n);

app.mount('#app');

location.startAutoResizer();
