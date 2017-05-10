$(function () {
    product();
});

function getUrl() {
    var url = window.location.href;
    return url.slice(url.indexOf('?') + 1).replace("#", '');
}

function product() {
    $.ajax({
        url: "http://127.0.0.1:3000/api/getmoneyctrlproduct",
        data: getUrl(),
        dataType: 'json',
        type: 'get',
        success: function (data) {
            var res = data.result[0];
            console.log(res);
            $('.page').html(
                '<div class="product_name">' +
                res.productName +
                '</div>' +
                '<div class="product_pinkage">' +
                res.productPinkage +
                '</div>' +
                '<div class="product_from">' +
                res.productFrom + ' ' + res.productTime + ' ' + res.productTips + ' <a href="#">' + res.productComCount + '</a>' +
                '</div>' +
                '<div class="product_info">' +
                '   <div class="img">' +
                res.productImgSm +
                '   </div>' +
                '   <div class="info_box">' +
                res.productInfo2 +
                '   </div>' +
                '</div>' +
                res.productCity +
                '<div class="go_buy"><a href="#"><i></i> 前往购买</a></div>' +
                res.productComment
            );
        }
    });
}