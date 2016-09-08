<?php
	include "config_db.php";
    $host=$_SESSION["host"]; // Host name 
    $username=$_SESSION["username"]; // Mysql username 
    $password=$_SESSION["password"]; // Mysql password 
    $db_name=$_SESSION["db_name"]; 

    $conn = new mysqli($host, $username, $password, $db_name);
    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    $stmt= "SELECT id FROM rules";
    $result = $conn->query($stmt);

    if ($result->num_rows > 0) {
	    // output data of each row
	    $j=0;
	    while($row = $result->fetch_assoc()) {
	        $j++;
	    }
	} else {
	    echo "0 results";
	}
	$id=$j;
	echo $id;
?>