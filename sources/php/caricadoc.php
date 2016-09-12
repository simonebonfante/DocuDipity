<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
$controllo=1;
$filetoreturn=array();
$target_dir = "../data/intermezzo/";
$target_file = $target_dir . basename($_FILES["file"]["name"]);
$uploadOk = 1;
$FileZip = pathinfo($target_file,PATHINFO_EXTENSION);

// Check if file already exists
if (file_exists($target_file)) {
    echo json_encode("Sorry, file already exists.");
    $uploadOk = 0;
}
// Check file size
if ($_FILES["file"]["size"] > 50000000000000000) {
    echo json_encode("Sorry, your file is too large.");
    $uploadOk = 0;
}
// Allow certain file formats
if($FileZip != "zip" ) {
    echo json_encode("Sorry, only ZIP files are allowed.");
    $uploadOk = 0;
}
// Check if $uploadOk is set to 0 by an error
if ($uploadOk == 0) {
    echo json_encode("Sorry, your file was not uploaded.");
// if everything is ok, try to upload file
} else {
    if (move_uploaded_file($_FILES["file"]["tmp_name"], $target_file)) {
        //unzip file.zip      NECESSARIA LA DIRECTORY INTERMEZZO?    CONTROLLO QUELLI CHE GIA ESISTONO?? DIFFICILE PERò CHE ABBIANO LO STESSO NOME
        $zip = new ZipArchive;
        $name_dir=str_replace(".zip", "", $_FILES["file"]["name"]);
        $res = $zip->open('../data/intermezzo/'. $_FILES["file"]["name"]);
        if ($res === TRUE) {
          $zip->extractTo('../data/intermezzo/');
          $zip->close();
          $dir    = '../data/intermezzo/'.$name_dir;
          $files = scandir($dir, 1);
          $countfile=0;
          for($i=0; $i<count($files)-3; $i++){
            $fileType=pathinfo($files[$i],PATHINFO_EXTENSION);
            if($fileType != "xml" ) {
                $controllo=0;
                break;
            }
            $filetoreturn[$countfile]=$files[$i];
            $countfile++;
          }
          if($controllo==0){
            //rimuovo le cartelle
            unlink("../data/intermezzo/".$_FILES["file"]["name"]);
            $dirrm= scandir('../data/intermezzo/'.$name_dir, 1);
            for($i=0; $i<count($dirrm); $i++){
                if(($dirrm[$i]!=".")){
                    unlink("../data/intermezzo/".$name_dir."/".$dirrm[$i]);
                }
              }
            rmdir("../data/intermezzo/".$name_dir);
            echo json_encode("Sorry, only XML files are allowed.");
          }
          else{
            $controllo2=1;
            unlink("../data/intermezzo/".$_FILES["file"]["name"]);
            $countfilextsit=1;
            $arrret[0]="Ok! Not exists yet!";
            for ($i=0; $i<count($files)-3; $i++){
                if(file_exists("../data/xml/".$files[$i])){
                    $arrret[0]="Sorry, file already exists.";
                    $arrret[$countfilextsit]="this file: '".$files[$i]."' already exists" ;
                    $countfilextsit++;
                    $controllo2=0;
                }
                
            }
            if($controllo2==0){
                echo json_encode($arrret);
            }
            else{
                for ($i=0; $i<count($files)-3; $i++){
                    $old="../data/intermezzo/".$name_dir."/".$files[$i];
                    $new="../data/xml/".$files[$i];
                    rename($old , $new);
                }
            }
            //rimuovo le cartelle
            $dirrm= scandir('../data/intermezzo/'.$name_dir, 1);
            for($i=0; $i<count($dirrm); $i++){
                if(($dirrm[$i]!="..")&&($dirrm[$i]!=".")){
                    unlink("../data/intermezzo/".$name_dir."/".$dirrm[$i]);
                }
              }
            rmdir("../data/intermezzo/".$name_dir);
            if($controllo2==1){
                echo json_encode($filetoreturn);
            }
          }
        } else {
          echo json_encode('doh!');
        }
    } else {
        echo json_encode("Sorry, there was an error uploading your file.");
    }

}
?>