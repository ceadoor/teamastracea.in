import 'bootstrap';
import './sass/main.scss';

// JQuery
$(document).ready(() => {
    // enable bootstrap tooltips
    $(() => {
        $('[data-toggle="tooltip"]').tooltip({ trigger: 'hover' })
    });
});
