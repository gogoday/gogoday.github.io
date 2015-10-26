/**
 * Created by wolf on 2015/10/26.
 */

function getLeft(dom) {
    var p, left = 0;
    p = dom.offsetParent;
    while (p.tagName.toLowerCase() != 'body') {
        console.log(p.className + ':' + p.offsetLeft);
        left += p.offsetLeft;
        p = p.offsetParent;
    }
    return left + dom.offsetLeft + dom.offsetWidth + 20;

}