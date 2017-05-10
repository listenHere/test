$(function() {

})

function getUrl() {
    var url = window.location.href;
    return url.slice(url.indexOf('?') + 1).replace("#", '');
}