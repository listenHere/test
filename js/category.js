$(function () {
    $.ajax({
        url: 'http://127.0.0.1:3000/api/getcategorytitle',
        type: 'get',
        dataType: 'json',
        success: function (data) {
            var tit = data.result, html = '';

            $.each(tit, function (i) {
                html +=
                    '<li>' +
                    '<a alt="' + i + '" href="javascript:;">' + this.title + '</a> ' +
                    '</li>'
            });

            $('.main > ul').html(html);

            var list = $('.main > ul > li');
            var links = $('.main > ul > li > a');
            var index = 0;
            $.each(list, function (i) {
                $.ajax({
                    url: 'http://127.0.0.1:3000/api/getcategory',
                    data: {titleid: i},
                    dataType: 'json',
                    type: 'get',
                    success: function (data) {
                        var res = data.result, html = '<ul class="clearfix" style="display: none;">';
                        $.each(res, function () {
                            html += '<li><a href="prolist.html?categoryid=' + index + '">' + this.category + '</a></li>';
                            index++;
                        });
                        html += '</ul>'
                        list[i].append($(html)[0]);
                    }
                });
            })


            $('.main a').click(function () {
                $(this).hasClass('active') ?
                    $(this)
                        .toggleClass('active')
                        .next()
                        .slideUp(200)
                    :
                    $(this)
                        .toggleClass('active')
                        .next()
                        .slideDown(200)
                        .parent()
                        .siblings()
                        .find('a')
                        .removeClass('active')
                        .next()
                        .slideUp(200)
            });
        }
    });
});