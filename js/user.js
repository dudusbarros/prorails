/*!
 * Magma ProRails User API v0.5.0 (http://getvilla.org/)
 * Copyright 2013-2015 Noibe Developers
 * Licensed under MIT (https://github.com/noibe/villa/blob/master/LICENSE)
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
	e.classList.add('add');

	var inputName = document.createElement('input');
	inputName.type = 'text';
	inputName.id = 'userName';
	inputName.placeholder = 'Nome';

	var a = document.createElement('a');
	a.innerHTML = 'Novo usuário';
	a.classList.add('btn');
	a.addEventListener('click', createUser);

	e.appendChild(inputName);
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