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

    $js=$_POST["js"];
    $css=$_POST["css"];
    $title=$_POST["cretitle"];
    $author=$_POST["creauth"];
    $description=$_POST["credesc"];
    $radio=$_POST["radius"];

    if($radio=="private"){
        $status=0;
    }else{
        $status=1;
    }
    // Connect to server and select databse.
    $conn = new mysqli("$host", "$username", "$password", "$db_name");

    // Check connection to database
    if ($conn->connect_errno) {
      // header('refresh: 3; url = /gestione_regole.php');
      echo "Failed to connect";
    }
   $stmt2= "SELECT id FROM rules";
    $result = $conn->query($stmt2);

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
    $stmt = $conn->prepare("INSERT INTO rules (js, css, title, author, id, status, description) VALUES (?, ?, ?, ?, ?, ?, ?)");
    if ( false===$stmt ) {
      header('refresh: 3; url = ../index.php');
      echo "Failed to prepare the query";    
    }
    $stmt->bind_param('ssssdds', $js, $css, $title, $author, $id, $status, $description);
    if (!$stmt->execute()) {
        header("refresh: 2; url=../index.php");
        echo "Execute failed: (" . $stmt->errno . ") " . $stmt->error;
    }
    header('refresh: 2; url = ../index.php');
    echo "index_logged.php?doc=a&rule=".$title."&pass=0"; 

    $conn->close();

?>