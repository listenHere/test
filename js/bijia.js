$(function () {
    //
    function getUrl(){
        var url = window.location.href;
        if(url.indexOf('&') != -1){
            return {
                url: url.slice(url.indexOf('?') + 1, url.indexOf('&')),
                categoryid: url.slice(url.indexOf('&') + 1)
            };
        } else {
            return {
                url: url.slice(url.indexOf('?') + 1)
            };
        }
    }

    console.log(getUrl().url);
//
    $.ajax({
        url: 'http://127.0.0.1:3000/api/getproduct',
        data: getUrl().url,
        type: 'get',
        dataType: 'json',
        success: function (data) {
            var res = data.result, html = '';

            $.each(res, function () {
                html +=
                    '<div class="pro_tit">' + this.productName + '</div>' +
                    '<div class="pro_img">' +
                        this.productImg +
                    '   <div class="pro_like">' +
                    '       <a href="javascript:;">' +
                    '           <img src="images/pro_like.jpg" alt="">' +
                    '       </a>' +
                    '   </div>' +
                    '</div>' +
                    '<div class="pro_nav">' +
                    '   <ul class="por_list clearfix">' +
                    '       <li class="active"><a href="javascript:;">比价购买</a><i></i></li>' +
                    '       <li><a href="javascript:;">产品参数</a><i></i></li>' +
                    '       <li><a href="javascript:;">评价()</a><i></i></li>' +
                    '   </ul>' +
                        this.bjShop +
                    '</div>';
            });
            $(".page .product").html(html);
        }
    });

    $.ajax({
        url :'http://127.0.0.1:3000/api/getproductcom',
        type: 'get',
        data: getUrl().url,
        dataType: 'json',
        success: function (data) {
            var res = data.result, html = '';
            $.each(res, function () {
                html +=
                    '<div class="com_info">' +
                    '   <div class="info_top clearfix">' +
                    '       <div class="fl">' + this.comName + '</div>' +
                    '       <div class="fr">' + this.comTime + '<br>' + this.comFrom + '</div>' +
                    '   </div>' +
                    '   <div class="info">' +
                     this.comContent +
                    '   </div>' +
                    '</div>';
            });
            $(html).insertBefore('.to_more');
        }
    });
});