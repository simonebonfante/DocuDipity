<?php
    session_start();
    $_SESSION["id"] = SID;
    include "config_db.php";
    $host=$_SESSION["host"]; // Host name 
    $username=$_SESSION["username"]; // Mysql username 
    $password=$_SESSION["password"]; // Mysql password 
    $db_name=$_SESSION["db_name"]; 
    
    $name=$_POST["name"];
    $email=$_POST["mail"];
    $psw=md5($_POST["password"][$raw_output=false]);

    $conn = new mysqli($host, $username, $password, $db_name);
    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $sql = "INSERT INTO signin (name, email, password)
    VALUES ('".$name."', '".$email."', '".$psw."')";

    if ($conn->query($sql) === TRUE) {;
        $_SESSION["user"] = $name;
        $_SESSION["email"] = $psw;
        echo "signed";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }

    $conn->close();
?>