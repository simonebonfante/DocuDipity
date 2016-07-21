<?php
	include "config_db.php";
    $host=$_SESSION["host"]; // Host name 
    $username=$_SESSION["username"]; // Mysql username 
    $password=$_SESSION["password"]; // Mysql password 
    $db_name=$_SESSION["db_name"]; 
    
    $title=$_POST["title"];
    $radio=$_POST["status"];
    $description=$_POST["description"];
    $js=$_POST["js"];
    $css=$_POST["css"];
    $id=$_POST["id"];
    $author=$_POST["author"];

    if($radio=="private"){
    	$status=0;
    }else{
    	$status=1;
    }

    $conn = new mysqli($host, $username, $password, $db_name);
    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    

    $stmt = $conn->prepare("INSERT INTO rules (js, css, title, id, status, description, author) VALUES (?, ?, ?, ?, ?, ?, ?)");
    if ( false===$stmt ) {
      header('refresh: 3; url = ../index.php');
      echo "Failed to prepare the query";    
    }
	$stmt->bind_param('sssddss', $js, $css, $title, $id, $status, $description, $author);
    if (!$stmt->execute()) {
		header("refresh: 2; url=../index.php");
		echo "Execute failed: (" . $stmt->errno . ") " . $stmt->error;
	}
	header('refresh: 2; url = ../index.php');
    echo "index_logged.php?doc=a&rule=".$title."&pass=0";

    $conn->close();
?>