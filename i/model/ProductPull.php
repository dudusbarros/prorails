<?php

/**
 * Magma Scientific Model (http://getvilla.org/)
 * Copyright 2014-2015 Magma Fantastico
 * Licensed under MIT (https://github.com/noibe/villa/blob/master/LICENSE)
 */

class ProductPull extends Model {

	public function __construct($r, $c)
	{
		$this->product = new Product();
		$this->product->fill(mysqli_fetch_assoc($r));
	}

}