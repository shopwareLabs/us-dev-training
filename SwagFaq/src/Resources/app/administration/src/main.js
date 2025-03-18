import * as sw from '@shopware-ag/meteor-admin-sdk';

sw.notification.dispatch({
    title: 'A test notification',
    message: 'This was really easy to do'
});

if (sw.location.is(sw.location.MAIN_HIDDEN)) {
    sw.ui.actionButton.add({
        action: 'swag-faq_customer-detail-action',
        entity: 'customer',
        view: 'detail',
        label: 'Test action',
        callback: (entity, entityIds) => {
            // TODO: do something
        },
    });
}
