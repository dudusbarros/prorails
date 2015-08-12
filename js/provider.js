/*!
 * Magma ProRails Provider API v0.5.0 (http://getvilla.org/)
 * Copyright 2013-2015 Noibe Developers
 * Licensed under MIT (https://github.com/noibe/villa/blob/master/LICENSE)
 */

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
	e.classList.add('add');

	var inputName = document.createElement('input');
	inputName.type = 'text';
	inputName.id = 'providerName';
	inputName.placeholder = 'Nome';

	var a = document.createElement('a');
	a.innerHTML = 'Adicionar';
	a.classList.add('btn');
	a.addEventListener('click', createProvider);

	e.appendChild(inputName);
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