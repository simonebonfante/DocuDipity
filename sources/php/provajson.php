<?php   
    $host="localhost"; // Host name 
    $username="root"; // Mysql username 
    $password="root"; // Mysql password 
    $db_name="mysql"; // Database name
    
    $mysqli = new mysqli("$host", "$username", "$password", "$db_name");
    
    if ($mysqli->connect_errno) {
      //header('refresh: 3; url = /index.php');
       echo "Failed to connect to MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
    }

    $sql = "SELECT nome FROM signin";

    $result = $mysqli->query($sql);
    if ($result->num_rows > 0) {
        // output data of each row
        $vettore_categorie=array();
        $i=0;
        while($row = $result->fetch_assoc()) {
            echo $row["nome"];
        }
    } else {
        echo "0 results";
    }
?>