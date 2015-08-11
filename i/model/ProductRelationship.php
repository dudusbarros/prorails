<?php

/**
 * Magma ProRails Model v0.3.0 (http://getvilla.org/)
 * Copyright 2014-2015 Magma Fantastico
 * Licensed under MIT (https://github.com/noibe/villa/blob/master/LICENSE)
 */

class ProductRelationship extends Thing {
	public $product_id;
	public $relationship_id;

	public function fill($a)
	{
		$this->_id = $a['_id'];
		$this->relationship_id = $a['$relationship_id'];
		$this->product_id = $a['product_id'];
	}
}