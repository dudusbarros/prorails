<?php

/**
 * Magma ProRails User Pull Server v1.1.0 (http://getvilla.org/)
 * Copyright 2014-2015 Magma Fantastico
 * Licensed under MIT (https://github.com/noibe/villa/blob/master/LICENSE)
 */

header('Content-Type: application/json; charset=UTF-8;');
require_once('../../var/connection.php');
require_once('../../model/Model.php');
require_once('../../model/Thing.php');
require_once('../../model/ProviderPull.php');
require_once('../../model/Provider.php');

function __autoload($name) {
	echo "Want to load $name.\n";
	throw new Exception("Unable to load $name.");
}

try {

	$connection = new Connection();
	$c = $connection->getConnection();

	$o = new Provider();
	$o->setQueryName('name');
	$o->setQueryValue('');

	if ($r = $o->pull($c)) {
		$a = array();
		for ($i = $r->num_rows; $i--; ) {
			$pull = new Provider();
			$pull->fill(mysqli_fetch_assoc($r));
			array_push($a, $pull);
		}
		print_r(json_encode($a));
	}

} catch (Exception $e) {
	echo $e->getMessage(), "\n";
}