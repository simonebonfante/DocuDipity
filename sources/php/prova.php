<?php
	session_start();
  	if (!isset($_SESSION['user'])){
      	header("location:/index.php");
  	}else{
  		$user = $_SESSION["user"];
  	}
  	include "config_db.php";
	$host=$_SESSION["host"]; // Host name 
	$username=$_SESSION["username"]; // Mysql username 
	$password=$_SESSION["password"]; // Mysql password 
	$db_name=$_SESSION["db_name"]; // Database name 


	$title=$_POST["title"]."_copy";
	$js=$_POST["js"];
	$css=$_POST["css"];
	$auth=$_POST["author"];
	$id=2;

	// Create connection
	$conn = new mysqli($host, $username, $password, $db_name);
	// Check connection
	if ($conn->connect_error) {
	    die("Connection failed: " . $conn->connect_error);
	} 

	$sql = 'INSERT INTO rules (js, css, title, author, description, id, status)
	VALUES ("'.$js.'" , "css3_pr0va3", "'.$title.'", "author3_prova3", "description3_prova3", "4", "1")';

	if ($conn->query($sql) === TRUE) {
	    echo "New record created successfully";
	} else {
	    echo "Error: " . $sql . "<br>" . $conn->error;
	}

	$conn->close();
		
	echo $title . ", " . $js . ", " . $css . ", ". $auth . ", " . $id;
?>