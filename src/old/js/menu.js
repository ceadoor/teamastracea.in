$(function () {

  $(".menu-link").click(function (e) {
    e.preventDefault();
    $(".menu").toggleClass("open");
    $(".menu-overlay").toggleClass("open");
  });
});

$(function () {

  $("#about").click(function (e) {
    e.preventDefault();
    $(".about .container").toggleClass("show");
    if ($(".contact .container").hasClass('show')) {
      $(".contact .container").toggleClass("show");
    }
  });
});

$(function () {

  $("#contact").click(function (e) {
    e.preventDefault();
    $(".contact .container").toggleClass("show");
    if ($(".about .container").hasClass('show')) {
      $(".about .container").toggleClass("show");
    }
  });
});