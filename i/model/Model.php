<?php

/**
 * Magma ProRails Model (http://getvilla.org/)
 * Copyright 2014-2015 Magma Fantastico
 * Licensed under MIT (https://github.com/noibe/villa/blob/master/LICENSE)
 */

class Model {
	public $user;
	public $provider;
	public $category;
	public $product;
	public $relationship;
	public $productRelationship;

	/**
	 * @return string
	 */
	public function toJSON()
	{
		return json_encode($this);
	}
}