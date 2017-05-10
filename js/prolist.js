$(function () {
    function getUrl() {
        var url = window.location.href;
        return url.slice(url.indexOf('?') + 1).replace("#", '');
    }

    function product() {

        list();
        var page = 1, allpage;

        function list() {
            $.ajax({
                url: 'http://127.0.0.1:3000/api/getproductlist',
                data: getUrl() + '&pageid=' + page,
                dataType: 'json',
                type: 'get',
                success: function (data) {
                    var res = data.result, i = 1, html = '';

                    if (!allpage) {
                        allpage = Math.ceil(data.totalCount / data.pagesize);
                        for (; i <= allpage; i++) {
                            $("#page_num").append('<option value="' + i + '">第' + i + '页</option>');
                        }
                    }

                    $.each(res, function () {
                        html +=
                            '<a href="bijia.html?productid=' + this.productListId + '" class="product_box">' +
                            '    <div class="pro_img">' +
                            this.productImg +
                            '   </div>' +
                            '   <div class="pro_info">' +
                            '       <div class="pro_tit">' + this.productName + '</div>' +
                            '       <div class="pro_price">' +
                            '           <span>￥</span>' + this.productPrice.slice(1) +
                            '       </div>' +
                            '       <div class="other clearfix">' +
                            '           <div class=" fl">' + this.productQuote.replace("报价(", "").replace(")", "") + '商城报价</div>' +
                            '           <div class="scales fr">有' + this.productCom.replace("评论(", "").replace(")", "") + '人评论</div>' +
                            '       </div>' +
                            '    </div>' +
                            '</a>'
                    });

                    $('.product_list').html(html);
                }
            });
        }

        $("#page_num").change(function () {
            window.scrollTo(0, 0);
            page = +$(this).find(":selected").val();
            list();
        });

        $(".page_go .prev").click(function () {
            if (page > 1) {
                page--;
                list();
                window.scrollTo(0, 0);
                $("#page_num option:nth-child(" + (page) + ")").prop('selected', 'true');
            }
        });

        $(".page_go .next").click(function () {
            if (page < allpage) {
                page++;
                list();
                window.scrollTo(0, 0);
                $("#page_num option:nth-child(" + (page) + ")").prop('selected', 'true');
            }
        });
    }

    $.ajax({
        url: 'http://127.0.0.1:3000/api/getcategorybyid',
        data: getUrl(),
        dataType: 'json',
        type: 'get',
        success: function (data) {
            var res = data.result[0], html = '<a href="prolist.html">' + res.category + '</a>';
            $($(html)).insertBefore('.show_filter')
        }
    });

    product();
});