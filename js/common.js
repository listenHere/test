/**
 * Created by Administrator on 2017/4/26.
 */

$(function () {
    $(window).resize(function () {
        if ($(window).width() <= 640) {
            $('html').css('font-size', $(window).width() * 100 / 640);
        } else {
            $('html').css('font-size', 100);
        }
    }).trigger('resize');

    $('.return_top').click(function () {
        $('body').animate({scrollTop: 0}, 200, 'linear');
    });
});