<?php
	include "config_db.php";
    $host=$_SESSION["host"]; // Host name 
    $username=$_SESSION["username"]; // Mysql username 
    $password=$_SESSION["password"]; // Mysql password 
    $db_name=$_SESSION["db_name"]; 

    $title=$_POST["title"];
    $description=$_POST["description"];
    $status=$_POST["status"];
    $js=$_POST["js"];
    $css=$_POST["css"];
    $author=$_POST["author"];
    $doc=$_POST["title_doc"];

    $conn = new mysqli($host, $username, $password, $db_name);
    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $query = "UPDATE rules
        SET js = ?, css = ?
        WHERE title = ? and author= ?";

	if($stmt = $conn->prepare($query)) 
	{
		$stmt->bind_param('ssss', $js, $css, $title, $author);
		if ($stmt->execute()) 
		{
			echo "index_logged.php?doc=".$doc."&rule=".$title."&pass=0";
		} 
		else 
		{
			echo "Error";
		}
	}

	$conn->close();
?>