<?php
	session_start();
	$_SESSION["id"] = SID;
    include "config_db.php";
	$host=$_SESSION["host"]; // Host name 
    $username=$_SESSION["username"]; // Mysql username 
    $password=$_SESSION["password"]; // Mysql password 
    $db_name=$_SESSION["db_name"]; 

    $mymail=$_POST["mail"];
    $mypassword=md5($_POST['password'][$raw_output=false]);
    $count=0;
    // Create connection
	$conn = new mysqli($host, $username, $password, $db_name);
	// Check connection
	if ($conn->connect_error) {
	    die("Connection failed: " . $conn->connect_error);
	} 

	$sql = "SELECT email, password, name FROM signin";
	$result = $conn->query($sql);

	if ($result->num_rows > 0) {
	    // output data of each row
	    while($row = $result->fetch_assoc()) {
	        if(($mymail==$row["email"])&&($mypassword==$row["password"])){	
	        	$_SESSION["user"] = $row["name"];
				$_SESSION["email"] = $mymail;
				$count=1;
				echo "acc";
	        }
	    }
	    if($count==0){
	    	echo "deny";
	    }
	} else {
	    echo "0 result";
	}
	$conn->close();
?>