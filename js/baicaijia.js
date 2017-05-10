$(function () {
    //init
    setNav();
    setItem();
});

//nav
function setNav() {
    $.ajax({
        url: "http://127.0.0.1:3000/api/getbaicaijiatitle",
        type: "get",
        dataType: "json",
        success: function (data) {
            var res = data.result, html = '', i = 0, width = 0;

            for (; i < res.length; i++) {
                html +=
                    '<li><a href="javascript:;" data-titid="' + res[i].titleId + '">' + res[i].title + '</a></li>'
            }

            $(".nav ul").html(html);

            for(i = 0; i < res.length; i++){
                width += $(".nav ul li").eq(i)[0].offsetWidth;
            }

            function move() {
                var startX = 0, endX = 0, current = 0, x = 0, ismove = false;
                $(".nav ul").on('touchstart', function (e) {
                     startX = e.originalEvent.targetTouches[0].clientX;
                });

                $(".nav ul").on('touchmove', function (e) {
                    ismove = true;
                    endX = e.originalEvent.targetTouches[0].clientX;
                    x = endX - startX;
                    remove();
                    goto(x + current);
                });

                $(".nav ul").on('touchend', function () {
                    if(ismove){
                        current += x;
                        if(current >= 0){
                            current = 0;
                            set();
                        }
                        if(current <= -$(".nav ul").width() + $(".nav ul").parent()[0].clientWidth){
                            current = -$(".nav ul").width() + $(".nav ul").parent()[0].clientWidth;
                            set();
                        }
                        goto(current);
                        startX = 0, endX = 0, x = 0, ismove = false;
                    }
                });

                function set() {
                    $(".nav ul").css("transition", "all .2s");
                }
                function remove() {
                    $(".nav ul").css("transition", "none");
                }
                function goto(x) {
                    $(".nav ul").css("transform", "translateX("+ x +"px)");
                }
            }

            $(".nav ul").width(width + 1);

            move();

            $(".nav ul a").click(function () {
                var titleid = $(this).attr("data-titid");
                if(titleid == 0){
                    $(".header .tit h1").text("白菜价·内部折扣");
                } else {
                    $(".header .tit h1").text($(this).text() + "·白菜价");
                }
                setItem(titleid);
                $(this).addClass("active").parent().siblings().find("a").removeClass("active");
            });
            $(".nav ul a").eq(0).trigger("click");
        }
    });
}

//
function setItem(titid) {
    $.ajax({
        url: "http://127.0.0.1:3000/api/getbaicaijiaproduct",
        data: {titleid: titid || 0},
        dataType: "json",
        type: "get",
        success: function (data) {
            var res = data.result, html = '', i = 0;

            for (; i < res.length; i++) {
                html +=
                    '<div class="product_list">' +
                    '<div class="img">' +
                    res[i].productImg +
                    '</div>' +
                    '<div class="pro_info">' +
                    '<div class="pro_tit">' + res[i].productName + '</div>' +
                    '<div class="pro_price">' + res[i].productPrice + '</div>' +
                    res[i].productCouponRemain +
                    res[i].productCoupon +
                    res[i].productHref +
                    '</div>' +
                    '</div>';
            }

            $(".page").html(html);
        }
    });
}