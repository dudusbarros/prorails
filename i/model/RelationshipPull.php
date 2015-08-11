<?php

/**
 * Magma Scientific Model (http://getvilla.org/)
 * Copyright 2014-2015 Magma Fantastico
 * Licensed under MIT (https://github.com/noibe/villa/blob/master/LICENSE)
 */

class RelationshipPull extends Model {

	public function __construct($r, $c)
	{
		$this->relationship = new Relationship();
		$this->relationship->fill(mysqli_fetch_assoc($r));
	}

}