<?php

/**
 * Magma ProRails Model v0.3.0 (http://getvilla.org/)
 * Copyright 2014-2015 Magma Fantastico
 * Licensed under MIT (https://github.com/noibe/villa/blob/master/LICENSE)
 */

class Product extends Thing {
	public $provider_id;
	public $code;
	public $name;
	public $category_id;

	public function fill($a)
	{
		$this->_id = $a['_id'];
		$this->provider_id = $a['provider_id'];
		$this->code = $a['code'];
		$this->name = $a['name'];
		$this->category_id = $a['category_id'];
	}
}