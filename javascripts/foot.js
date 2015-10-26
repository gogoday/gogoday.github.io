/**
 * Created by wolf on 2015/10/26.
 */

function floatCate() {
    var leftMenu = document.getElementById('leftMenu');
    body.onscroll = function (e) {
        if (body.scrollTop > 257) {
            leftMenu.className = 'menu fixed';
            leftMenu.style.left = getLeft(document.getElementsByTagName('article')[0]) + 'px';
        } else {
            leftMenu.className = 'menu';
            leftMenu.removeAttribute('style');
        }
    };
}