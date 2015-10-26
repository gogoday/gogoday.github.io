function menu () {
	var article, articleChilds,
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
			li.appendChild(a);
			li.className = tag;
			ul.appendChild(li);
		}
	});

	fragment.appendChild(ul);

	document.getElementById('leftMenu').appendChild(fragment);

	(function (body) {
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
	})(document.body)
}

menu();