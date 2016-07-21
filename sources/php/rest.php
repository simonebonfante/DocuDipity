<?php
	$parts = parse_url("https://mysite.com/test/1234?email=diopo");
	parse_str($parts['query'], $query);
	$url=$_SERVER['REQUEST_URI'];
	$parts = parse_url($url);
	parse_str($parts['query'], $query);
	$curr_document=$query["doc"];
	$curr_rule=$query["rule"];
	echo $curr_document . "   and   " . $curr_rule
?>