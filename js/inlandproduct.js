$(function () {
    product();
});

function getUrl() {
    var url = window.location.href;
    return url.slice(url.indexOf('?') + 1).replace("#", '');
}

function product() {
    $.ajax({
        url: "http://127.0.0.1:3000/api/getdiscountproduct",
        data: getUrl(),
        dataType: 'json',
        type: 'get',
        success: function (data) {
            var res = data.result[0];
            $('.page').html(
                '<div class="product_name">' +
                res.productName +
                '</div>' +
                '<div class="product_pinkage">' +
                res.productPrice +
                '</div>' +
                '<div class="product_from">' +
                res.productFrom + ' ' + res.productTime + ' ' + res.productTips +
                '</div>' +
                '<div class="product_info">' +
                '   <div class="img">' +
                res.productImg +
                '   </div>' +
                '   <div class="info_box">' +
                res.productInfo +
                '   </div>' +
                '</div>' +
                '<div class="go_buy"><a href="#"><i></i> 前往购买</a></div>' +
                '<div class="cu-content-pl">' +
                res.productComment +
                '</div>'
            );
        }
    });
}