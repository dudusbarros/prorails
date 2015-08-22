<?php

/**
 * Magma ProRails Image Server v0.5.0 (http://getvilla.org/)
 * Copyright 2014-2015 Magma Fantastico
 * Licensed under MIT (https://github.com/noibe/villa/blob/master/LICENSE)
 */

header('Content-Type: application/json; charset=UTF-8;');

require_once('../vendor/autoload.php');
Tinify\setKey('fduaTbUMoCknGiK5djqhhDtbW2l5SwYF');

function getGenerateRandomString($length = 10)
{
	$characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
	$charactersLength = strlen($characters);
	$randomString = '';
	for ($i = 0; $i < $length; $i++) {
		$randomString .= $characters[rand(0, $charactersLength - 1)];
	}
	return $randomString;
}

function buildName($p)
{
	return getGenerateRandomString(64) . '.' . pathinfo($p['name'], PATHINFO_EXTENSION);
}

function buildFile($n, $s, $f)
{
	return $s . $f . $n;
}

function tinify($tmp, $resize) {
	try {
		$t = Tinify\fromFile($tmp);

		if ($resize) $t->resize($resize);

		return $t;
	} catch (Exception $e) {
		return false;
	}
}

$p = $_FILES['photo'];
$r = '';

if ($p)
	if (!$p['error']) {

		$tmp_name = $p['tmp_name'];
		$server = '/var/www/prorails/';
		$folder = 'static/';

		$resize = array(
			'width'=>256
		);

//		$resize = false;

		$name = buildName($p);
		$file = buildFile($name, $server, $folder);

		while (file_exists($file)) {
			$name = buildName($p);
			$file = buildFile($name, $server, $folder);
		}

		if ($t = tinify($tmp_name, $resize)) {
			$t->toFile($file);
			$r = $t->result();
			echo '<br>' . $file . ' (' . $r->width() . 'kb)' . '<br>';
		}

	}

?>

<!doctype html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>File Upload</title>
</head>
<body>

	<form action="index.php" method="post" enctype="multipart/form-data">

		<input type="hidden" name="MAX_FILE_SIZE" value="0" />
		<input type="file" name="photo">
		<br/>
		<input type="submit" value="send">
		<br/>

	</form>

	<img src="<?php echo '../../' . $folder . $name; ?>" alt="photo">

</body>
</html>