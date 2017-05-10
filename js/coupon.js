$(function () {
    $.ajax({
        url: "http://127.0.0.1:3000/api/getcoupon",
        dataType: "json",
        type: "get",
        success: function (data) {
            var res = data.result, i = 0, html = '';
            for(; i < res.length; i++){
                html +=
                    '<a href="quan.html?couponid=' + res[i].couponId + '" class="item">' +
                    '<div class="box">'+
                    '<img src="' + res[i].couponImg + '" alt="">' +
                    '<div class="tit">' + res[i].couponTitle + '</div>' +
                    '</div>'+
                    '</a>';
            }
            $(".page").html(html);
        }
    });
})
