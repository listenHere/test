/**
 * Created by Administrator on 2017/4/26.
 */

$(function () {
    $.ajax({
        url: 'http://127.0.0.1:3000/api/getindexmenu',
        dataType: 'json',
        type: 'get',
        success: function (data) {
            var res = data.result, html = '';
            $.each(res, function (i) {
                if (i < 8) {
                    html +=
                        '<li>' +
                        '   <a href="' + this.titlehref + '">' +
                        this.img +
                        '       <p>' + this.name + '</p>' +
                        '   </a>' +
                        '</li>';
                } else {
                    html +=
                        '<li style="display: none">' +
                        '   <a href="' + this.titlehref + '">' +
                        this.img +
                        '       <p>' + this.name + '</p>' +
                        '   </a>' +
                        '</li>';
                }
            });

            $('.nav > ul').html(html);

            var show = true;

            $('.nav li:nth-child(8)').click(function () {
                $(this).find('a')[0].href = 'javascript:;';
                if (show) {
                    $(this).nextAll().show();
                } else {
                    $(this).nextAll().hide();
                }
                show = !show;
            });
        }
    });

    $.ajax({
        url: 'http://127.0.0.1:3000/api/getmoneyctrl',
        dataType: 'json',
        type: 'get',
        success: function (data) {
            var res = data.result, html = '';
            console.log(res);
            $.each(res, function () {
                var str = this.productComCount, num;
                num = parseInt(str.slice(str.search(/\d/)));
                html +=
                    '<a href="#" class="product_box"> ' +
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
                    '</a>';
            });
            $('.product').html(html);
        }
    });
});