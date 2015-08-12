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
	b.appendChild(f(d));
};

var findParent;
findParent = function(e) {
	var a = e.parentNode;
	if (a.classList.contains('data')) return a;
	else if (e == document.body) return false;
	else return findParent(a);
};

var buildName;
buildName = function(d, singular) {
	var li = document.createElement('li');
	var text = document.createTextNode(d.name);
	li.setAttribute('data-' + singular, d._id);
	li.appendChild(text);

	return li;
};

var buildList;
buildList = function(d, f) {
	var e = document.createElement('ul');

	for (var i = d.length; i--; )
		e.appendChild(f(d[i]));

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

/*
 * Product
 */

var createProduct;
createProduct = function() {

	var a = findParent(this);
	var inputName = document.getElementById('#productName');
	var inputCode = document.getElementById('#productCode');
	var inputProvider = document.getElementById('#productProvider');
	var inputCategory = document.getElementById('#productCategory');

	$.ajax({
		cache: false,
		data: {
			name: inputName.value,
			code: inputCode.value,
			provider_id: inputProvider.options[inputProvider.selectedIndex].value,
			category_id: inputCategory.options[inputCategory.selectedIndex].value
		},
		method: 'get',
		url: 'i/product/push/',
		success: function(data) {
			add(a, data, buildProduct);
		}
	});

};

var buildProductInput;
buildProductInput = function() {

	var i, s;

	var e = document.createElement('div');

	var inputName = document.createElement('input');
	inputName.id = 'productName';
	inputName.placeholder = 'Nome';

	var inputCode = document.createElement('input');
	inputCode.id = 'productCode';
	inputCode.placeholder = 'Código';

	var inputProvider = document.createElement('select');
	inputProvider.id = 'productProvider';
	for (i = Providers.length; i--; ) {
		s = document.createElement('option');
		s.innerHTML = Providers[i].name;
		s.value = Providers[i]._id;
		inputProvider.appendChild(s);
	}

	var inputCategory = document.createElement('select');
	inputCategory.id = 'productCategory';
	for (i = Categories.length; i--; ) {
		s = document.createElement('option');
		s.innerHTML = Categories[i].name;
		s.value = Categories[i]._id;
		inputCategory.appendChild(s);
	}

	var a = document.createElement('a');
	a.innerHTML = 'Novo produto';
	a.classList.add('btn');
	a.classList.add('new');
	a.addEventListener('click', createProduct);

	e.appendChild(inputName);
	e.appendChild(inputCode);
	e.appendChild(inputProvider);
	e.appendChild(inputCategory);
	e.appendChild(a);

	return e;

};

var buildProduct;
buildProduct = function(d) {

	var li = document.createElement('li');
	li.innerHTML = d.name + ' (' + d.code + ')';
	li.setAttribute('data-product', d._id);
	li.setAttribute('data-product-code', d.code);
	li.setAttribute('data-product-provider', d.provider_id);
	li.setAttribute('data-product-category', d.category_id);

	return li;

};

var pullProduct;
pullProduct = function() {
	$.ajax({
		cache: false,
		url: 'i/product/pull/',
		error: function() {
			Product = false;
		},
		success: function(data) {
			Product = data;
			build(data, 'product', 'products', buildProduct, buildProductInput);
		}
	});
};

/*
 * User
 */

var createUser;
createUser = function() {

	var a = findParent(this);
	var b = document.getElementById('userName');

	$.ajax({
		cache: false,
		data: { name: b.value },
		method: 'get',
		url: 'i/user/push/',
		success: function(data) {
			add(a, data, buildUser);
		}
	});

};

var buildUserInput;
buildUserInput = function() {

	var e = document.createElement('div');

	var input = document.createElement('input');
	input.id = 'userName';
	input.placeholder = 'Nome';

	var a = document.createElement('a');
	a.innerHTML = 'Novo usuário';
	a.classList.add('btn');
	a.classList.add('new');
	a.addEventListener('click', createUser);

	e.appendChild(input);
	e.appendChild(a);

	return e;

};

var buildUser;
buildUser = function(d) {
	return buildName(d, 'user');
};

var pullUser;
pullUser = function() {
	$.ajax({
		cache: false,
		url: 'i/user/pull/',
		error: function() {
			Users = false;
		},
		success: function(data) {
			Users = data;
			build(data, 'user', 'users', buildUser, buildUserInput);
		}
	});
};

/*
* Provider
* */

var createProvider;
createProvider = function() {

	var a = findParent(this);
	var b = document.getElementById('providerName');

	$.ajax({
		cache: false,
		data: { name: b.value },
		method: 'get',
		url: 'i/provider/push/',
		success: function(data) {
			add(a, data, buildProvider);
		}
	});

};

var buildProviderInput;
buildProviderInput = function() {

	var e = document.createElement('div');

	var input = document.createElement('input');
	input.id = 'providerName';
	input.placeholder = 'Nome';

	var a = document.createElement('a');
	a.innerHTML = 'Adicionar';
	a.classList.add('btn');
	a.classList.add('new');
	a.addEventListener('click', createProvider);

	e.appendChild(input);
	e.appendChild(a);

	return e;

};

var buildProvider;
buildProvider = function(d) {
	return buildName(d, 'provider');
};

var pullProvider;
pullProvider = function() {
	$.ajax({
		cache: false,
		url: 'i/provider/pull/',
		error: function() {
			Providers = false;
		},
		success: function(data) {
			Providers = data;
			build(data, 'provider', 'providers', buildProvider, buildProviderInput);
		}
	});
};

/*
* Category
* */

var createCategory;
createCategory = function() {

	var a = findParent(this);
	var b = document.getElementById('categoryName');

	$.ajax({
		cache: false,
		data: { name: b.value },
		method: 'get',
		url: 'i/category/push/',
		success: function(data) {
			add(a, data, buildCategory);
		}
	});

};

var buildCategoryInput;
buildCategoryInput = function() {

	var e = document.createElement('div');

	var input = document.createElement('input');
	input.id = 'categoryName';
	input.placeholder = 'Nome';

	var a = document.createElement('a');
	a.innerHTML = 'Adicionar';
	a.classList.add('btn');
	a.classList.add('new');
	a.addEventListener('click', createCategory);

	e.appendChild(input);
	e.appendChild(a);

	return e;

};

var buildCategory;
buildCategory = function(d) {
	return buildName(d, 'category');
};

var pullCategory;
pullCategory = function() {
	$.ajax({
		cache: false,
		url: 'i/category/pull/',
		error: function() {
			Categories = false;
		},
		success: function(data) {
			Categories = data;
			build(data, 'category', 'categories', buildCategory, buildCategoryInput);
		}
	});
};