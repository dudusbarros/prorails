<?php

/**
 * Magma ProRails Relationship Push Server v1.1.0 (http://getvilla.org/)
 * Copyright 2014-2015 Magma Fantastico
 * Licensed under MIT (https://github.com/noibe/villa/blob/master/LICENSE)
 */

header('Content-Type: application/json; charset=UTF-8;');
require_once('../../var/connection.php');
require_once('../../model/Model.php');
require_once('../../model/Thing.php');
require_once('../../model/ProductRelationship.php');

function __autoload($name) {
	echo "Want to load $name.\n";
	throw new Exception("Unable to load $name.");
}

try {

	$connection = new Connection();
	$c = $connection->getConnection();

	if (($relationship_id = $_GET['relationship_id']) && ($product_id = $_GET['product_id'])) {

		$o = new ProductRelationship();

		$o->relationship_id = $relationship_id;
		$o->product_id = $product_id;

		$o->push($c);

		print_r($o);

	} else {
		echo 'oi';
	}

} catch (Exception $e) {
	echo $e->getMessage(), "\n";
}