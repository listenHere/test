$(function () {
    $.ajax({
        url: "http://127.0.0.1:3000/api/getinlanddiscount",
        type: "get",
        dataType: "json",
        success: function (data) {
            var res = data.result, html = '';
            $.each(res, function () {
                html +=
                    '<a href="inlandproduct.html?productid=' + this.productId + '" class="item">' +
                    '   <div class="img">' +
                    this.productImg +
                    '</div>' +
                    '<div class="name">' +
                    this.productName +
                    '</div>' +
                    '<div class="price">' +
                    this.productPrice +
                    '</div>' +
                    '<div class="time">' +
                    this.productFrom + this.productTime +
                    '</div>' +
                    '</a>';
            });

            $(".page").html(html);
        }
    });
});