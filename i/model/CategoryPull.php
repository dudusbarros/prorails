<?php

/**
 * Magma Scientific Model (http://getvilla.org/)
 * Copyright 2014-2015 Magma Fantastico
 * Licensed under MIT (https://github.com/noibe/villa/blob/master/LICENSE)
 */

class CategoryPull extends Model {

	public function __construct($r, $c)
	{
		$this->category = new Category();
		$this->category->fill(mysqli_fetch_assoc($r));
	}

}