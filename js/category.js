/*!
 * Magma ProRails Category API v0.5.0 (http://getvilla.org/)
 * Copyright 2013-2015 Noibe Developers
 * Licensed under MIT (https://github.com/noibe/villa/blob/master/LICENSE)
 */

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
	e.classList.add('add');

	var inputName = document.createElement('input');
	inputName.type = 'text';
	inputName.id = 'categoryName';
	inputName.placeholder = 'Nome';

	var a = document.createElement('a');
	a.innerHTML = 'Adicionar';
	a.classList.add('btn');
	a.addEventListener('click', createCategory);

	e.appendChild(inputName);
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