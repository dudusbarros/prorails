<?php

/**
 * Magma Scientific Model (http://getvilla.org/)
 * Copyright 2014-2015 Magma Fantastico
 * Licensed under MIT (https://github.com/noibe/villa/blob/master/LICENSE)
 */

class Pull extends Model {

	public function __construct($r, $c)
	{
		$this->user = new User();
		$this->user->fill(mysqli_fetch_assoc($r));
	}

}