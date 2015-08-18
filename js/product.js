/*!
 * Magma ProRails Product API v0.9.5 (http://getvilla.org/)
 * Copyright 2013-2015 Noibe Developers
 * Licensed under MIT (https://github.com/noibe/villa/blob/master/LICENSE)
 */

var createProduct;
createProduct = function() {

	var a = findParent(this);
	var inputName = document.getElementById('productName');
	var inputCode = document.getElementById('productCode');
	var inputProvider = document.getElementById('productProvider');
	var inputCategory = document.getElementById('productCategory');

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
	e.classList.add('add');

	var inputName = document.createElement('input');
	inputName.type = 'text';
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
	a.addEventListener('click', createProduct);

	e.appendChild(inputName);
	e.appendChild(inputCode);
	e.appendChild(inputProvider);
	e.appendChild(inputCategory);
	e.appendChild(a);

	return e;

};

var updateProduct;
updateProduct = function(d, li) {

	var a = document.createElement('a');
	a.classList.add('select-area');

	var name = document.createElement('span');
	name.classList.add('name');
	name.innerHTML = d.name;

	var code = document.createElement('span');
	code.classList.add('code');
	code.innerHTML = d.code;

	a.appendChild(name);
	a.appendChild(code);

	a.addEventListener('click', editProduct);

	li.innerHTML = '';

	li.setAttribute('data-product', d._id);
	li.setAttribute('data-product-name', d.name);
	li.setAttribute('data-product-code', d.code);
	li.setAttribute('data-product-provider', d.provider_id);
	li.setAttribute('data-product-category', d.category_id);
	li.appendChild(a);

};

var pushProduct;
pushProduct = function() {
	var a = findParent(this, 'item');
	var b = this.parentNode;
	a.classList.remove('edit');

	console.log(b);

	var input_id = b.querySelector('.editProduct_id');
	var inputName = b.querySelector('.editProductName');
	var inputCode = b.querySelector('.editProductCode');
	var inputProvider = b.querySelector('.editProductProvider');
	var inputCategory = b.querySelector('.editProductCategory');

	$.ajax({
		cache: false,
		data: {
			_id: input_id.value,
			name: inputName.value,
			code: inputCode.value,
			provider_id: inputProvider.options[inputProvider.selectedIndex].value,
			category_id: inputCategory.options[inputCategory.selectedIndex].value
		},
		method: 'get',
		url: 'i/product/push/',
		success: function(data) {
			updateProduct(data, a);
		}
	});
};

var buildEditProductArea;
buildEditProductArea = function(e) {
	var i, s;

	var a = document.createElement('div');
	a.classList.add('edit-area');

	var input_id = document.createElement('input');
	input_id.classList.add('editProduct_id');
	input_id.classList.add('id');
	input_id.type = 'hidden';
	input_id.value = e.getAttribute('data-product');

	var inputName = document.createElement('input');
	inputName.classList.add('editProductName');
	inputName.classList.add('name');
	inputName.type = 'text';
	inputName.value = e.getAttribute('data-product-name');

	var inputCode = document.createElement('input');
	inputCode.classList.add('editProductCode');
	inputCode.classList.add('code');
	inputCode.type = 'text';
	inputCode.value = e.getAttribute('data-product-code');

	var inputProvider = document.createElement('select');
	inputProvider.classList.add('editProductProvider');
	inputProvider.classList.add('provider');
	for (i = Providers.length; i--; ) {
		s = document.createElement('option');
		s.innerHTML = Providers[i].name;
		s.value = Providers[i]._id;
		inputProvider.appendChild(s);
	}

	var inputCategory = document.createElement('select');
	inputCategory.classList.add('editProductCategory');
	inputCategory.classList.add('category');
	for (i = Categories.length; i--; ) {
		s = document.createElement('option');
		s.innerHTML = Categories[i].name;
		s.value = Categories[i]._id;
		inputCategory.appendChild(s);
	}

	inputProvider.value = e.getAttribute('data-product-provider');
	inputCategory.value = e.getAttribute('data-product-category');

	var inputAdd = document.createElement('a');
	inputAdd.classList.add('btn');
	inputAdd.innerHTML = 'Salvar';
	inputAdd.addEventListener('click', pushProduct);

	a.appendChild(input_id);
	a.appendChild(inputProvider);
	a.appendChild(inputCategory);
	a.appendChild(inputName);
	a.appendChild(inputCode);
	a.appendChild(inputAdd);

	return a;
};

var editProduct;
editProduct = function() {
	var a = this.parentNode;
	a.classList.add('edit');
	if (!a.getElementsByClassName('edit-area').length > 0)
		a.appendChild(buildEditProductArea(a));
};

var buildProduct;
buildProduct = function(d) {

	var a = document.createElement('a');
	a.classList.add('select-area');
	a.href = '#';

	var name = document.createElement('span');
	name.classList.add('name');
	name.innerHTML = d.name;

	var code = document.createElement('span');
	code.classList.add('code');
	code.innerHTML = d.code;

	a.appendChild(name);
	a.appendChild(code);

	a.addEventListener('click', editProduct);

	var li = document.createElement('li');
	li.setAttribute('data-product', d._id);
	li.setAttribute('data-product-name', d.name);
	li.setAttribute('data-product-code', d.code);
	li.setAttribute('data-product-provider', d.provider_id);
	li.setAttribute('data-product-category', d.category_id);
	li.appendChild(a);

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

			var time = 500;

			var interval = setInterval(
				function() {
					if (!!Categories.length && !!Providers.length) {
						console.log('asd');
						build(data, 'product', 'products', buildProduct, buildProductInput);
						clearInterval(interval);
					}
				}, 200);

		}
	});

};