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
}

menu();
