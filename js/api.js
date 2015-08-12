/*!
 * Magma ProRails API v0.6.0 (http://getvilla.org/)
 * Copyright 2013-2015 Noibe Developers
 * Licensed under MIT (https://github.com/noibe/villa/blob/master/LICENSE)
 */

/*
 * Public Data
 */

var Product = [];
var Users = [];
var Providers = [];
var Categories = [];



/*
 * Product
 */

var destroyProducts;
destroyProducts = function() {
	document.getElementById('products').innerHTML = '';
};

var addProduct;
addProduct = function(a, d) {
	var b = a.getElementsByTagName('ul')[0];
	b.appendChild(buildProduct(d));
};

var createProduct;
createProduct = function() {

	var a = this.parentNode;
	var inputName = a.querySelector('#productName');
	var inputCode = a.querySelector('#productCode');
	var inputProvider = a.querySelector('#productProvider');
	var inputCategory = a.querySelector('#productCategory');

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
			addProduct(a.parentNode, data);
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

var buildProductsList;
buildProductsList = function(d) {

	var e = document.createElement('ul');

	for (var i = d.length; i--; )
		e.appendChild(buildProduct(d[i]));

	return e;

};

var buildProducts;
buildProducts = function(d) {

	destroyProducts();

	var b = document.getElementById('products');

	b.insertBefore(buildProductsList(d), b.firstChild);
	b.insertBefore(buildProductInput(), b.firstChild);

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
			buildProducts(data);
		}
	});
};

var getProduct;
getProduct = function() {
	if (document.getElementById('products')) pullProduct();
};

/*
 * User
 */

var destroyUsers;
destroyUsers = function() {
	document.getElementById('users').innerHTML = '';
};

var addUser;
addUser = function(a, d) {
	var b = a.getElementsByTagName('ul')[0];
	b.appendChild(buildUser(d));
};

var createUser;
createUser = function() {

	var a = this.parentNode;
	var b = a.querySelector('input');

	$.ajax({
		cache: false,
		data: { name: b.value },
		method: 'get',
		url: 'i/user/push/',
		success: function(data) {
			addUser(a.parentNode, data);
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

	/*
	 * It is simliar to build buildCategory and buildProviders functions
	 * */

	var li = document.createElement('li');
	var text = document.createTextNode(d.name);
	li.setAttribute('data-user', d._id);
	li.appendChild(text);

	return li;

};

var buildUsersList;
buildUsersList = function(d) {

	var e = document.createElement('ul');

	for (var i = d.length; i--; )
		e.appendChild(buildUser(d[i]));

	return e;

};

var buildUsers;
buildUsers = function(d) {

	destroyUsers();

	var b = document.getElementById('users');

	b.insertBefore(buildUsersList(d), b.firstChild);
	b.insertBefore(buildUserInput(), b.firstChild);

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
			buildUsers(data);
		}
	});
};

var getUser;
getUser = function() {
	if (document.getElementById('users')) pullUser();
};

/*
 * Category
 */

var destroyProviders;
destroyProviders = function() {
	document.getElementById('providers').innerHTML = '';
};

var addProvider;
addProvider = function(a, d) {
	var b = a.getElementsByTagName('ul')[0];
	b.appendChild(buildProvider(d));
};

var createProvider;
createProvider = function() {

	var a = this.parentNode;
	var b = a.querySelector('input');

	$.ajax({
		cache: false,
		data: { name: b.value },
		method: 'get',
		url: 'i/provider/push/',
		success: function(data) {
			addProvider(a.parentNode, data);
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

	/*
	 * It is simliar to build buildCategory function
	 * */

	var li = document.createElement('li');
	var text = document.createTextNode(d.name);
	li.setAttribute('data-provider', d._id);
	li.appendChild(text);

	return li;

};

var buildProvidersList;
buildProvidersList = function(d) {

	var e = document.createElement('ul');

	for (var i = d.length; i--; )
		e.appendChild(buildProvider(d[i]));

	return e;

};

var buildProviders;
buildProviders = function(d) {

	destroyProviders();

	var b = document.getElementById('providers');

	b.insertBefore(buildProvidersList(d), b.firstChild);
	b.insertBefore(buildProviderInput(), b.firstChild);

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
			buildProviders(data);
		}
	});
};

var getProvider;
getProvider = function() {
	if (document.getElementById('providers')) pullProvider();
};

/*
 * Category
 */

var destroyCategories;
destroyCategories = function() {
	document.getElementById('categories').innerHTML = '';
};

var addCategory;
addCategory = function(a, d) {
	var b = a.getElementsByTagName('ul')[0];
	b.appendChild(buildCategory(d));
};

var createCategory;
createCategory = function() {

	var a = this.parentNode;
	var b = a.querySelector('input');

	$.ajax({
		cache: false,
		data: { name: b.value },
		method: 'get',
		url: 'i/category/push/',
		success: function(data) {
			addCategory(a.parentNode, data);
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

	var li = document.createElement('li');
	var text = document.createTextNode(d.name);
	li.setAttribute('data-category', d._id);
	li.appendChild(text);

	return li;

};

var buildCategoriesList;
buildCategoriesList = function(d) {

	var e = document.createElement('ul');

	for (var i = d.length; i--; )
		e.appendChild(buildCategory(d[i]));

	return e;

};

var buildCategories;
buildCategories = function(d) {

	destroyCategories();

	var b = document.getElementById('categories');

	b.insertBefore(buildCategoriesList(d), b.firstChild);
	b.insertBefore(buildCategoryInput(), b.firstChild);

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
			buildCategories(data);
		}
	});
};

var getCategory;
getCategory = function() {
	if (document.getElementById('categories')) pullCategory();
};