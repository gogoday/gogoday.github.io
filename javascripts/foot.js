/**
 * Created by wolf on 2015/10/26.
 */

function hc() {
    window.addEventListener('hashchange', function () {
        var h, hd;
        h = location.hash;
        hd = document.getElementById(h);
        [].forEach.call(document.getElementById('leftMenu').getElementsByTagName('a'), function (item) {
            item.className = '';
        });
        hd.className = 'red';
    });
}

function getLeft(dom) {
    var p, left = 0;
    p = dom.offsetParent;
    while (p.tagName.toLowerCase() != 'body') {
        left += p.offsetLeft;
        p = p.offsetParent;
    }
    return left + dom.offsetLeft + dom.offsetWidth + 20;

}

function myScroll() {

    var leftMenu, cate, article;
    leftMenu = document.getElementById('leftMenu');
    cate = document.getElementById('cate');
    article = document.getElementsByTagName('article')[0];
    window.onscroll = function (e) {
        if (window.scrollY > 257) {
            if (leftMenu) {
                leftMenu.className = 'menu fixed';
                leftMenu.style.left = getLeft(article) + 'px';
            }
            if (cate) {
                cate.className = 'cate cate-fixed';
                cate.style.left = (getLeft(article) - article.offsetWidth - cate.offsetWidth - 100) + 'px';
            }
        } else {
            if (leftMenu) {
                leftMenu.className = 'menu';
                leftMenu.removeAttribute('style');
            }
            if (cate) {
                cate.className = 'cate';
                cate.removeAttribute('style');
            }
        }
    };
}

hc();
myScroll();


