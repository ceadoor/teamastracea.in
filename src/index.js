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

    // Toggle Home Navbar
    $(".navbar__toggler--link").click(function (e) {
        e.preventDefault();
        $(".navbar__toggler").toggleClass("open");
        $(".navbar__overlay--menu").toggleClass("open");
    });
});
