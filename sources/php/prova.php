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
	$title="aa";

	$conn = new mysqli($host, $username, $password, $db_name);
    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
 //    $stmt3= "SELECT id FROM rules";
	// $result2 = $conn->query($stmt3);

	// if ($result2->num_rows > 0) {
	//     // output data of each row
	//     $jj=0;
	//     while($row = $result2->fetch_assoc()) {
	//         $jj++;
	//     }
	// } else {
	//     echo "0 results";
	// }
	// $idd=$jj;

 //    $stmt2= "SELECT id FROM rules WHERE title='".$title."'";
 //    $result = $conn->query($stmt2);

 //    if ($result->num_rows > 0) {
 //        // output data of each row
 //    	$id;
 //        while($row = $result->fetch_assoc()) {
 //            $id=$row["id"];
 //        }
 //    } else {
 //        echo "0 results";
 //    }
 //    $sql = "DELETE FROM rules WHERE id='".$id."' ";

	// if ($conn->query($sql) === TRUE) {
	//     echo "delete ok   ";
	// } else {
	//     echo "Error deleting record: " . $conn->error;
	// }

 //    $id++;
 //    $id1=$id-1;
 //    $i=$id;
 //    for($i; $i<$idd; $i++){
	//     $query = "UPDATE rules
	//         SET id = ?
	//         WHERE id= ?";

	// 	if($stmt = $conn->prepare($query)) 
	// 	{
	// 		$stmt->bind_param('dd', $id1, $id);
	// 		if ($stmt->execute()) 
	// 		{
	// 			echo "ok  ";
	// 		} 
	// 		else 
	// 		{
	// 			echo "Error  ";
	// 		}
	// 	}
	// 	$id1++;
	// 	$id++;
	// }


	$stmt2= "SELECT * FROM rules WHERE title='".$title."'";
    $result = $conn->query($stmt2);

    if ($result->num_rows > 0) {
        // output data of each row
    	$id=0;
        while($row = $result->fetch_assoc()) {
            $id++;
        }
    } else {
        echo "0 results";
    }

    echo $id;
    
	$conn->close();
?>