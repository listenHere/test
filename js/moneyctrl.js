$(function () {
    setProduct();
});

function setProduct() {
    function list () {
        $.ajax({
            url: "http://127.0.0.1:3000/api/getmoneyctrl",
            data: {pageid: index},
            dataType: "json",
            type: "get",
            success: function (data) {
                var res = data.result, html = '', i = 1;

                $(".current_page > a").text("第 " + (index + 1) + " 页");

                if(!page){
                    page = Math.ceil(data.totalCount / data.pagesize);
                    for (; i <= page; i++) {
                        $("#select ul").append('<li><a href="javascript:;" alt="' + i + '">第' + i + '页</a></li>');
                    }
                    $("#select a").click(function () {
                        index = $(this).attr('alt') - 1;
                        list();
                        $(this).parent().parent().parent().hide();
                    });
                }

                $.each(res, function () {
                    var str = this.productComCount, num;
                    num = parseInt(str.slice(str.search(/\d/)));
                    html +=
                        '<a href="moneyproduct.html?productid=' + this.productId + '" class="product_box"> ' +
                        '    <div class="pro_img">' +
                        this.productImgSm +
                        '    </div>' +
                        '    <div class="pro_info">' +
                        '       <div class="pro_tit">' + this.productName + '</div>' +
                        '       <div class="pro_price">' + this.productPinkage + '</div>' +
                        '       <div class="other clearfix">' +
                        '           <div class="pro_time fl">' + this.productFrom + ' | ' + this.productTime + '</div>' +
                        '           <div class="pro_comment fr">' + num + '</div>' +
                        '       </div>' +
                        '    </div>' +
                        '</a>'
                });

                $('.product_list').html(html);
            }
        });
    }

    var page, index = 0;

    list();

    $(".goto_page .prev").click(function () {
        if (index > 1) {
            index--;
            list();
            window.scrollTo(0, 0);
            $("#page_num option:nth-child(" + page + ")").prop('selected', 'true');
        }
    });

    $(".current_page > a").click(function () {
        $(this).next().show();
    });

    $(".goto_page .next").click(function () {
        if (index < page - 1) {
            index++;
            list();
            window.scrollTo(0, 0);
            $("#page_num option:nth-child(" + page + ")").prop('selected', 'true');
        }
    });
}