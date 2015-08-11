<?php

/**
 * Magma ProRails Model v0.3.0 (http://getvilla.org/)
 * Copyright 2014-2015 Magma Fantastico
 * Licensed under MIT (https://github.com/noibe/villa/blob/master/LICENSE)
 */

class User extends Thing {
	public $name;

	public function fill($a)
	{
		$this->_id = $a['_id'];
		$this->name = $a['name'];
	}
}