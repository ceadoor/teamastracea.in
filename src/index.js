import 'bootstrap';
import './sass/main.scss';

// animation library
import './assets/js/fluidAnimation';

// JQuery
$(document).ready(() => {
    // enable bootstrap tooltips
    $(() => {
        $('[data-toggle="tooltip"]').tooltip({ trigger: 'hover' })
    });
});
