function menu () {
	var article, articleChilds,
		target,
		fragment = document.createDocumentFragment(),
		ul = document.createElement('ul'),
		li = document.createElement('li'),
		a = ce('a'),
		index = 1;

	article = document.getElementsByTagName('article');
	articleChilds = article[0].children;

	[].forEach.call(articleChilds, function (item) {
		if (item.tagName.toLowerCase() == 'h3') {
			item.name = item.id;
			a.innerHTML = index + ' ' + item.innerHTML;
			a.href = '#' + a.id;
			li.appendChild(a);
			li.class = 'h3';
			ul.appendChild(li);
		}
		
		if (item.tagName.toLowerCase() == 'h4') {
			item.name = item.id;
			a.innerHTML = item.innerHTML;
			a.href = '#' + a.id;
			li.appendChild(a);
			li.class = 'h4';
			ul.appendChild(li);
		}
		index ++;
	});

	fragment.appendChild(ul);

	document.getElementById('leftMenu').appendChild(fragment);

	(function (body) {
		body.onscroll = function (e) {
			if (body.scrollTop > 257) {
				document.getElementById('leftMenu').className = 'menu fixed';
			} else {
				document.getElementById('leftMenu').className = 'menu';
			}
		};
	})(document.body)
}

menu();