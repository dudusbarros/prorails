<?php

/**
 * Magma ProRails Product Push Server v1.1.0 (http://getvilla.org/)
 * Copyright 2014-2015 Magma Fantastico
 * Licensed under MIT (https://github.com/noibe/villa/blob/master/LICENSE)
 */

header('Content-Type: application/json; charset=UTF-8;');
require_once('../../var/connection.php');
require_once('../../model/Model.php');
require_once('../../model/Thing.php');
require_once('../../model/Product.php');

function __autoload($name) {
	echo "Want to load $name.\n";
	throw new Exception("Unable to load $name.");
}

try {

	$connection = new Connection();
	$c = $connection->getConnection();

	$o = new Product();

	if ($_id = $_GET['_id']) {      // is update

		$o->setQueryName('_id');
		$o->setQueryValue($_id);

		$r = $o->pull($c);
		$o->fill(mysqli_fetch_assoc($r));

		if ($name = $_GET['name']) $o->name = $name;
		if ($provider_id = $_GET['provider_id']) $o->provider_id = $provider_id;
		if ($code = $_GET['code']) $o->code = $code;
		if ($category_id = $_GET['category_id']) $o->category_id = $category_id;

		$o->push($c);

	} else if (($name = $_GET['name']) &&
			   ($provider_id = $_GET['provider_id']) &&
			   ($code = $_GET['code']) &&
			   (($category_id = $_GET['category_id']))) {   // is new

		$o->name = $name;
		$o->provider_id = $provider_id;
		$o->code = $code;
		$o->category_id = $category_id;

		$o->push($c);

	}

	print_r($o->toJSON());

} catch (Exception $e) {
	echo $e->getMessage(), "\n";
}