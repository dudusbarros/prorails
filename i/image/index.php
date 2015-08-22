<?php

/**
 * Magma ProRails Image Server v0.5.0 (http://getvilla.org/)
 * Copyright 2014-2015 Magma Fantastico
 * Licensed under MIT (https://github.com/noibe/villa/blob/master/LICENSE)
 */

//header('Content-Type: application/json; charset=UTF-8;');

require_once('../vendor/autoload.php');
require_once('Image.php');

$s = \Image\Image::Test();

Tinify\setKey('fduaTbUMoCknGiK5djqhhDtbW2l5SwYF');

$t = \Tinify\Tinify::getClient();

print_r($t);

$p = $_FILES['photo'];

//print_r($photo);

?>

<!doctype html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>File Upload | ProRails</title>
</head>
<body>

	<form action="index.php" method="post" enctype="multipart/form-data">

		<input type="hidden" name="MAX_FILE_SIZE" value="0" />
		<input type="file" name="photo">
		<br/>
		<input type="submit" value="send">
		<br/>

	</form>

	<img src="<?php echo '../../' ; ?>" alt="photo">

</body>
</html>