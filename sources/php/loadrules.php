<?php
	include "config_db.php";
    $host=$_SESSION["host"]; // Host name 
    $username=$_SESSION["username"]; // Mysql username 
    $password=$_SESSION["password"]; // Mysql password 
    $db_name=$_SESSION["db_name"]; 

    $title=$_POST["title"];
    $status=$_POST["status"];
    $operation=$_POST["op"];

    if ($operation=="load"){
    	echo "index_logged.php?doc=a&rule=".$title."&pass=0";
    }
    else if ($operation=="delete"){
    	// Create connection
		$conn = new mysqli($host, $username, $password, $db_name);
		// Check connection
		if ($conn->connect_error) {
		    die("Connection failed: " . $conn->connect_error);
		}
		$stmt3= "SELECT id FROM rules";
		$result2 = $conn->query($stmt3);

		if ($result2->num_rows > 0) {
		    // output data of each row
		    $jj=0;
		    while($row = $result2->fetch_assoc()) {
		        $jj++;
		    }
		} else {
		    echo "0 results";
		}
		$idd=$jj;

	    $stmt2= "SELECT id FROM rules WHERE title='".$title."'";
	    $result = $conn->query($stmt2);

	    if ($result->num_rows > 0) {
	        // output data of each row
	    	$id;
	        while($row = $result->fetch_assoc()) {
	            $id=$row["id"];
	        }
	    } else {
	        echo "0 results";
	    }
	    $sql = "DELETE FROM rules WHERE id='".$id."' ";

		if ($conn->query($sql) === TRUE) {
		} else {
		    echo "Error deleting record: " . $conn->error;
		}

	    $id++;
	    $id1=$id-1;
	    $i=$id;
	    for($i; $i<$idd; $i++){
		    $query = "UPDATE rules
		        SET id = ?
		        WHERE id= ?";

			if($stmt = $conn->prepare($query)) 
			{
				$stmt->bind_param('dd', $id1, $id);
				if ($stmt->execute()) 
				{

				} 
				else 
				{
					echo "Error  ";
				}
			}
			$id1++;
			$id++;
		}
		echo "gestione_regole_logged.php";
	    
		$conn->close();

    }
    else if ($operation=="duplicate"){
    	$js=$_POST["js"];
		$css=$_POST["css"];
		$title=$_POST["title"]."_copy";
		$author=$_POST["auth"];
		$description=$_POST["desc"];
		$status=$_POST["status"];
    	$conn = new mysqli($host, $username, $password, $db_name);

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
		  echo "Failed to prepare the query";    
		}
		$stmt->bind_param('ssssdds', $js, $css, $title, $author, $id, $status, $description);
		if (!$stmt->execute()) {
			echo "Execute failed: (" . $stmt->errno . ") " . $stmt->error;
		}
		echo "gestione_regole_logged.php";

		$conn->close();
    }
    else if ($operation=="change"){	
		$status=$_POST["status"];
		$id=$_POST["id"];
    	$conn = new mysqli($host, $username, $password, $db_name);

    	if($status=="private"){
    		$newstatus=1;
    	}
    	else if ($status=="public"){
    		$newstatus=0;
    	}

    	$query = "UPDATE rules
		        SET status = ?
		        WHERE id= ?";

			if($stmt = $conn->prepare($query)) 
			{
				$stmt->bind_param('dd', $newstatus, $id);
				if ($stmt->execute()) 
				{
					
				} 
				else 
				{
					echo "Error  ";
				}
			}
			echo "gestione_regole_logged.php";
    }

?>