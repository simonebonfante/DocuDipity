<?php
	include "config_db.php";
    $host=$_SESSION["host"]; // Host name 
    $username=$_SESSION["username"]; // Mysql username 
    $password=$_SESSION["password"]; // Mysql password 
    $db_name=$_SESSION["db_name"]; 

    $title=$_POST["title"];
   	$group=$_POST["group"];

   	// Create connection   SERVE??????
	$conn = new mysqli($host, $username, $password, $db_name);
	// Check connection
	if ($conn->connect_error) {
	    die("Connection failed: " . $conn->connect_error);
	}
	echo "index_logged.php?doc=".$title."&rule=doco_code&pass=2";
	$conn->close();

?>