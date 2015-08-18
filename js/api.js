/*!
 * Magma ProRails API v0.7.5 (http://getvilla.org/)
 * Copyright 2013-2015 Noibe Developers
 * Licensed under MIT (https://github.com/noibe/villa/blob/master/LICENSE)
 */

/*
* Public Data
* */

var Product = [];
var Users = [];
var Providers = [];
var Categories = [];

/*
* Build Functions
* */

var add;
add = function(a, d, f) {
	var b = a.getElementsByTagName('ul')[0];
	var li = f(d);
	li.classList.add('item');
	b.appendChild(li);
};

var findParent;
findParent = function(e, c) {
	if (!c) c = 'data';
	var a = e.parentNode;
	if (a.classList.contains(c)) return a;
	else if (e == document.body) return false;
	else return findParent(a, c);
};

var buildName;
buildName = function(d, singular) {

	var a = document.createElement('a');
	a.setAttribute('data-' + singular, d._id);
	a.classList.add('select-area');
	a.innerHTML = d.name;

	var li = document.createElement('li');
	li.appendChild(a);

	return li;
};

var buildList;
buildList = function(d, f) {
	var e = document.createElement('ul');
	e.classList.add('list');

	for (var i = d.length; i--; ) {
		var li = f(d[i]);
		li.classList.add('item');
		e.appendChild(li);
	}

	return e;
};

var destroy;
destroy = function(plural) {
	document.getElementById(plural).innerHTML = '';
};

var build;
build = function(data, singular, plural, list, input) {

	destroy(plural);

	var b = document.getElementById(plural);

	b.insertBefore(buildList(data, list), b.firstChild);
	b.insertBefore(input(), b.firstChild);

};

var getData;
getData = function(plural, f) {
	if (document.getElementById(plural)) f();
};

