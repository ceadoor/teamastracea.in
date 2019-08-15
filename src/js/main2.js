function init() {
    var menu_bottom = anime({
        targets: [".main-nav",".tag",".date"],
        translateY: [20, 0],
        opacity: [0, 1],
        duration: 600,
        easing: 'easeInQuad'
    });

    var adizya_text = anime({
        targets: '#home h2 p',
        translateY: [-20, 0],
        opacity: [0, 1],
        easing: 'easeInQuad',
        duration: function (el, i, l) {
            return 200 + (i * 50);
        }
    });

    var anime_tag = anime({
        targets: '.tag',
        opacity: [0, 1],
        duration: 600,
        easing: 'easeInQuad'
    });
}

window.onload = init;