function getLeft(dom) {
    var p, left = 0;
    p = dom.offsetParent;
    while (p.tagName.toLowerCase() != 'body') {
        left += p.offsetLeft;
        p = p.offsetParent;
    }
    return left + dom.offsetLeft + dom.offsetWidth + 20;

}

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

function menu () {
	var article, articleChilds, leftMenu,
		target,
		fragment = document.createDocumentFragment(),
		ul = document.createElement('ul'),
		li,
		a,
		index = 1;

	article = document.getElementsByTagName('article');
	articleChilds = article[0].children;

	[].forEach.call(articleChilds, function (item) {

        var tag = item.tagName.toLowerCase();
		if (tag == 'h3' || tag == 'h4') {
            li = document.createElement('li');
            a = document.createElement('a');
			item.name = item.id;
			a.innerHTML = item.innerHTML;
            a.title = item.innerHTML;
			a.href = '#' + item.id;
            a.id = '#' + item.id;
			li.appendChild(a);
			li.className = tag;
			ul.appendChild(li);
		}
	});

	fragment.appendChild(ul);

    leftMenu = document.getElementById('leftMenu');
    leftMenu.appendChild(fragment);

	window.onscroll = function (e) {
		if (window.scrollY > 257) {
			leftMenu.className = 'menu fixed';
			leftMenu.style.left = getLeft(document.getElementsByTagName('article')[0]) + 'px';
		} else {
			leftMenu.className = 'menu';
			leftMenu.removeAttribute('style');
		}
	};

}

menu();
hc();