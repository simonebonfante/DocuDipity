<?php
	$title=$_POST["title"];
	$desc=$_POST["desc"];
	$radio=$_POST["radius"];


	echo "index_logged.php?doc=a&rule=".$title."&pass=1&desc=".$desc."&status=".$radio."";
?>