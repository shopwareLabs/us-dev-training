import * as sw from '@shopware-ag/meteor-admin-sdk';

const TAB_LOCATION ='swagfaq-product-detail-tab-faq';
const CARD_LOCATION = 'swagfaq-product-detail-tab-faq-card';

// Add the ui extensions when your extension is loaded in the hidden iFrame
if (sw.location.is(sw.location.MAIN_HIDDEN)) {
    await sw.ui.tabs('sw-product-detail').addTabItem({
        label: 'FAQ',
        componentSectionId: TAB_LOCATION
    });

    await sw.ui.componentSection.add({
        component: 'card',
        positionId: TAB_LOCATION,
        props: {
            title: 'Hello from plugin',
            subtitle: 'I am before the properties card',
            locationId: CARD_LOCATION,
        }
    });
}

// Render the custom UI when the iFrame location matches your defined location
if (sw.location.is(CARD_LOCATION)) {
    // Todo: figure out how to use meteor and custom components
    // Todo: maybe we can just create a plain vue app and use meteor components in there?
    let app = document.querySelector('#app');
    app.innerHTML = `<h1>I am the in the location "${CARD_LOCATION}"</h1>
    <mt-button>click me</mt-button>
    `;
}
