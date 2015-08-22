<?php
/**
 * Magma ProRails Image Server v0.5.0 (http://getvilla.org/)
 * Copyright 2014-2015 Magma Fantastico
 * Licensed under MIT (https://github.com/noibe/villa/blob/master/LICENSE)
 */

namespace Image;

class Image {

	public $_id;
	public $fileName;
	public $height;
	public $width;
	public $sourceName;

	private $path;
	private $tmp_name;
	private $root = '/var/www/prorails/';
	private $server = 'static/';
	private $location;
	private $thumbLocation = 'thumb/';

	private $tiny;
	private $tinyKey = 'fduaTbUMoCknGiK5djqhhDtbW2l5SwYF';
	private $resize;
	private $tinyResult;

	public static function Test() {
		return 'oi';
	}

	/**
	 * Image constructor.
	 * @param $path
	 */
	public function __construct($path) {
		if ($path) {
			if (!$path['error']) {

				$this->path = $path;
				$this->sourceName = $path['name'];
				$this->tmp_name = $path['tmp_name'];

				$this->buildLocation();
				$this->fileName = $this->buildFileName();

				$this->_id = '';

				$this->resize = array(
					'height'=>256
				);

				if ($t = $this->tinify($this->tmp_name, $this->resize)) {
					$t->toFile($this->location . $this->thumbLocation . $this->fileName);
					$this->tinyResult = $t->result();
				}

				$this->saveFile();

			}
		}
	}

	/**
	 * @return string
	 */
	public function getId() {
		return $this->_id;
	}

	/**
	 * @param string $id
	 */
	public function setId($id) {
		$this->_id = $id;
	}

	public function persistDiretory($dir = '') {
		if (!file_exists($this->location . $dir)) mkdir($this->location . $dir, 0777, true);
	}

	public function buildLocation() {
		$this->location = $this->root . $this->server;
	}

	public function buildFileName() {
		$fn = $this->getGenerateRandomString(64);

		while (file_exists($this->location . $fn))
			$fn = $this->getGenerateRandomString(64);

		return $fn;
	}

	function getGenerateRandomString($length = 10, $start = '') {
		$characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
		$charactersLength = strlen($characters);
		$randomString = $start;

		for ($i = 0; $i < $length; $i++)
			$randomString .= $characters[rand(0, $charactersLength - 1)];

		return $randomString . '.' . pathinfo($this->path['name'], PATHINFO_EXTENSION);
	}

	/**
	 * Executa push utilizando a conexão e a string construída
	 * @param mysqli $c
	 */
	public function push($c) {
		if ($this->getId()) $q = 'UPDATE ...';
		else $q = 'INSERT ...';

		if ($q)
			if ($c->query($q))
				$this->setId($c->insert_id);
			else echo $c->error;
	}

	/**
	 * Executa pull utilizando a conexão e a string construída
	 * @param mysqli $c
	 * @return bool|mysqli_result
	 */
	public function pull($c) {
		$q = 'SELECT...';

		if ($q)
			if ($r = $c->query($q))
				return $r;
		return false;
	}

	public function saveFile() {
		$this->persistDiretory();
		return move_uploaded_file($this->tmp_name, $this->location . $this->fileName) ? true : false;
	}

	public function tiny() {

	}

	public function tinify($tmp_file, $resize) {
		$this->persistDiretory($this->thumbLocation);
		Tinify\setKey($this->tinyKey);

		try {
			$t = Tinify\fromFile($tmp_file);

			if ($resize) $t->resize($resize);

			return $t;
		} catch (Exception $e) {
			echo $e;
			return false;
		}
	}

}