<?php
	$file_xml=$_POST["file"];
	unlink("../data/xml/".$file_xml);
	echo json_encode($file_xml);
?>