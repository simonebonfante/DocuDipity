<?php
	// Inizio la sessione
  	session_start();
  	if (isset($_SESSION['user'])){
      	header("location: index_logged.php?doc=a&rule=doco_code&pass=0");
  	}
  	$dir    = 'data/xml';
  	$dir_json='data/json';
	$files1 = scandir($dir);
	$file_json = scandir($dir_json);
	$files2 = scandir($dir, 1);
	include "php/config_db.php";
	$host=$_SESSION["host"]; // Host name 
	$username=$_SESSION["username"];// Mysql username 
	$password=$_SESSION["password"]; // Mysql password 
	$db_name=$_SESSION["db_name"]; // Database name 

	//get param from url
	$url=$_SERVER['REQUEST_URI'];
	$parts = parse_url($url);
	parse_str($parts['query'], $query);
	$curr_document=$query["doc"];
	$curr_rule=$query["rule"];
	$passage=$query["pass"];
	$desc=$query["desc"];
	$status_pass=$query["status"];

	// Connect to server and select databse.
	$conn = new mysqli("$host", "$username", "$password", "$db_name");

	// Check connection to database
	if ($conn->connect_errno) {
	  // header('refresh: 3; url = /gestione_regole.php');
	  echo "Failed to connect";
	}

	$sql = "SELECT id, author, title, status, description, js, css FROM rules";
	$result = $conn->query($sql);

	if ($result->num_rows > 0) {
	    // output data of each row
	    $j=0;
	    while($row = $result->fetch_assoc()) {
	        $vettore_regole[$j]["id"] = $row["id"];
	        $vettore_regole[$j]["author"] = $row["author"];
	        $vettore_regole[$j]["title"] = $row["title"];
	        $vettore_regole[$j]["status"] = $row["status"];
	        $vettore_regole[$j]["description"] = $row["description"];
	        $vettore_regole[$j]["js"] = $row["js"];
	        $vettore_regole[$j]["css"] = $row["css"];
	        $j++;
	    }
	} else {
	    echo "0 results";
	}
	$conn->close();
?>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>DoCoVis - Sunburst View</title>
<!--	<script src="http://d3js.org/d3.v3.min.js"></script>  -->
		<script src="lib/d3.min.js" charset="utf-8"></script>
<!--
	<script type='text/javascript' src='http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js'></script>
	<script type='text/javascript' src='http://demos.flesler.com/jquery/scrollTo/js/jquery.scrollTo-min.js?1.4.11'></script>
-->
		<script type='text/javascript' src='lib/jquery-2.1.1.min.js'></script>
		<script type='text/javascript' src='lib/jquery.scrollTo.min.js'></script>
		
		<script src="lib/codemirror-4.7/lib/codemirror.js"></script>
		<script src="lib/codemirror-4.7/mode/javascript/javascript.js"></script>
		<script src="lib/codemirror-4.7/mode/css/css.js"></script>
        
        <link rel="stylesheet" type="text/css" href="bootstrap/css/bootstrap.css">
		<link rel="stylesheet" type="text/css" href="lib/codemirror-4.7/lib/codemirror.css">
		<link rel="stylesheet" type="text/css" href="css/patternsHTML.css">
		<link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css?family=Open+Sans:400,600">
		<link rel="stylesheet" type="text/css" href="css/draw.css"/>
		<link rel="stylesheet" type="text/css" href="css/rec.css"/>
		<script type="text/javascript">var user = <?php echo json_encode($user); ?></script>
		<script type="text/javascript">var vettore_regole = <?php echo json_encode($vettore_regole); ?></script>
		<script type="text/javascript">var docs = <?php echo json_encode($files1); ?></script>
		<script type="text/javascript">var docs_json = <?php echo json_encode($file_json); ?></script>
		<script type="text/javascript">var curr_doc = <?php echo json_encode($curr_document); ?></script>
		<script type="text/javascript">var curr_rule = <?php echo json_encode($curr_rule); ?></script>
		<script type="text/javascript">var passage = <?php echo json_encode($passage); ?></script>
		<script type="text/javascript">var desc = <?php echo json_encode($desc); ?></script>
		<script type="text/javascript">var status_pass = <?php echo json_encode($status_pass); ?></script>

	</head>
	<body>
		<!-- Modal Sign up-->
		<div class="modal fade" id="signupModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
		  <div class="modal-dialog" role="document">
		    <div class="modal-content">
		      <div class="modal-header">
		        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
		        <h4 class="modal-title" id="myModalLabel">Sign up</h4>
		      </div>
		      <form method="post" id="signup" name="signup" action="php/signup.php">
			      <div class="modal-body">
			      	<div class="form-group">
						<label for="signname">Name</label>
						<input type="text" class="form-control" name="signname" id="signname" placeholder="Name">
					</div>
			      	<div class="form-group">
						<label for="signmail">Email address</label>
						<input type="email" class="form-control" name="signmail" id="signmail" placeholder="Email">
					</div>
					<div class="form-group">
						<label for="signpassword">Password</label>
						<input type="password" class="form-control" name="signpassword" id="signpassword" placeholder="Password">
					</div>
					<div class="form-group">
						<label for="signrepassword">Re-password</label>
						<input type="password" class="form-control" name="signrepassword" id="signrepassword" placeholder="Re-Password">
					</div>
			      </div>
			      <div class="modal-footer">
			        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
			        <button type="submit" name="Submit" value="signup" class="btn btn-primary">Sing up</button>
			      </div>
		      </form>
		    </div>
		  </div>
		</div>
		
		<!-- Modal  Login-->
		<div class="modal fade" id="loginModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
		  <div class="modal-dialog" role="document">
		    <div class="modal-content">
		      <div class="modal-header">
		        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
		        <h4 class="modal-title" id="myModalLabel">Login</h4>
		      </div>
		      <form id="login" method="post" name="login" action="php/checklogin_index.php">
			      <div class="modal-body">
			      	<div class="form-group">
						<label for="logmail">Email</label>
						<input type="email" class="form-control" name="logmail" id="logmail" placeholder="Email">
					</div>
					<div class="form-group">
						<label for="logpassword">Password</label>
						<input type="password" class="form-control" name="logpassword" id="logpassword" placeholder="Password">
					</div>
			      </div>
			      <div class="modal-footer">
			        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
			        <button type="submit" name="Submit" value="login" class="btn btn-primary">Login</button>
			      </div>
		      </form>
		    </div>
		  </div>
		</div>

		<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" style="padding: 5px; border-bottom:1px solid black; border-radius:4px;">
			<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 text-left">
				<span style="cursor:pointer; font-size:130%;" class='glyphicon glyphicon-chevron-left'><a style="color:black; margin-left:5px;" href="gestione_regole.php">Management</a></span>
			</div>
			<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
	      		<h1>Docudipity</h1>
			</div>
			<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 text-right right">
				<button type="button" class="btn btn-default" id="login" data-toggle="modal" data-target="#loginModal">Login</button>
				<button class="text-left btn btn-default" style="margin-left: 5px;" data-toggle="modal" data-target="#signupModal">Sign up</button>
			</div>
		</div>
		<div class="panel-group" id="collapse_title" role="tablist" aria-multiselectable="true">
			<div class="panel panel-default">
			    <div class="panel-heading" role="tab" id="headingTre" style="height:30px;">
			      <h4 class="panel-title">
			        <a id="tabDocuments" class="collapsed" role="button" data-toggle="collapse" data-parent="#collapse_title" href="#collapseTre" aria-expanded="false" aria-controls="collapseTre">
			          Conferences & Papers
			        </a>
			      </h4>
			    </div>
			    <div id="collapseTre" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingTre">
			      <div class="panel-body">
			        <div id="sez_docs" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 text-center">
						<div class="col-md-12 col-lg-12" id="doc_group">
							<span class="glyphicon glyphicon-arrow-left col-md-2" id="grupposinistra"></span>
							<span class="col-md-4" id="group"></span>
							<span class="glyphicon glyphicon-arrow-right col-md-2" id="gruppodestra"></span>
							<button class="col-md-1 btn btn-default" gr="" id="apply_group">view</button>
						</div>
						<div class="col-md-12 col-lg-12" style="margin-top:2%;" id="doc_title">
							<span class="glyphicon glyphicon-arrow-left col-md-2" id="titolosinistra"></span>
							<span class="col-md-4" id="title"></span>
							<span class="glyphicon glyphicon-arrow-right col-md-2" id="titolodestra"></span>
							<button class="col-md-1 btn btn-default" tl="" id="apply_title">apply</button>
						</div>
					</div>
			      </div>
			    </div>
			</div>
		</div>
	    <div id="intro" style="text-align: center;" class="hide">
	      <p>Pick a document: 
			<select id='docSelection'>
			  <?php
			    $files = glob("data/json/*.json");
			    foreach ($files as $file) {
			      $file_name = str_replace("data/json/", "", str_replace(".json", ".xml", $file));
			      echo "<option value='$file'>$file_name</option>\n";
			    }
			  ?>
			</select>
			<input id="nextdoc" type='submit' value='next' />
			<input id="openxml" type='submit' value='open XML' />
	      </p>
	    </div>
	    <div id="page">
	    	<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
				<div id="main" class="col-xs-6 col-sm-6 col-md-6 col-lg-6">

					<div id="chart" >
						
					</div>
				</div>
				<div id="sidebar">
				</div>
		    	<div id="document" class="col-xs-6 col-sm-6 col-md-6 col-lg-6"></div>
		    </div>
		    <div class="col-xs-4 col-md-4 col-sm-4 col-lg-4 "></div>
		    <div class="col-xs-4 col-md-4 col-sm-3 col-lg-4 " style="font-size:120%;">
				<span class="glyphicon glyphicon-arrow-down col-xs-4 col-md-4 col-sm-3 col-lg-4"></span>
				<div class="col-xs-4 col-md-4 col-sm-3 col-lg-4"> <span id="spantitle1"></span></div>
				<span class="glyphicon glyphicon-arrow-down col-xs-4 col-md-4 col-sm-3 col-lg-4"></span>
			</div>
		</div>
		<!-- Inizio Tab-->
		<div id="features" class="col-xs-12 col-sm-12 col-md-12 col-lg-12" style="margin-top:-30px;">
			<div>
				<ul class="nav nav-tabs" role="tablist">
					<li id="editact" class="active" role="presentation">
						<a data-toggle="tab" role="tab" aria-controls="ediTab" href="#ediTab" style="color:grey; text-decoration:none; font-size:120%;">Edit Rules</a>
					</li>
					<li id="navact" role="presentation">
						<a id="tabDocuments" data-toggle="tab" role="tab" aria-controls="navTab" href="#navTab" style="color:grey; text-decoration:none; font-size:120%;">Nav Rules</a>
					</li>
				</ul>
				<div class="tab-content">
					<div id="navTab" class="tab-pane" role="tabpanel">
						<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" id="nr_bot" style="margin-top:5%;">
							<div style="margin-top:10px;" class="col-xs-6 col-sm-6 col-md-6 col-lg-6" ><span class="glyphicon glyphicon-chevron-left col-md-1 col-lg-1"></span><div id="navigate_rule_close_bot" class="col-md-3 col-lg-3"><select id="seltit"></select></div><span class="glyphicon glyphicon-chevron-right text-right col-md-2 col-lg-2"></span></div>
							<div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 text-right"><button id="id_rules" onclick="load_rules()" class="btn btn-default doco_go">load</button></div>
						</div><br>
						<div id="info_rules" class="col-xs-12 col-sm-12 col-md-12 col-lg-12" style="height:350px;">
							<div class="col-xs-6 col-sm-6 col-md-6 col-lg-6" style="margin-top:2%; padding:15px; border:1px solid black; border-radius:5px;">
								<div class="form-group col-xs-8 col-sm-8 col-md-8 col-lg-8">
									<label class="col-md-4 col-lg-4 control-label" for="spantitle">Title:</label>
									<div class="col-md-8 col-lg-8">
										<span name ="spantitle" id="spantitle" class=""></span>
									</div>
								</div><div class="col-md-4 col-lg-4"></div>
								<div class="form-group col-xs-8 col-sm-8 col-md-8 col-lg-8">
									<label class="col-md-4 col-lg-4 control-label" for="spanauth">Author:</label>
									<div class="col-md-8 col-lg-8">
										<span name="spanauth" id="spanauth" class=""></span>
									</div>
								</div><div class="col-md-4 col-lg-4"></div>
								<div class="form-group col-xs-8 col-sm-8 col-md-8 col-lg-8">
									<label class="col-md-4 col-lg-4  control-label" for="spandesc">Description:</label>
									<div class="col-md-8 col-lg-8">
										<span name="spandesc" id="spandesc" class=""></span>
									</div>
									<div class="col-md-8 col-lg-8 hide">
										<span name="spanjs" id="spanjs" class=""></span>
									</div>
									<div class="col-md-8 col-lg-8 hide">
										<span name="spancss" id="spancss" class=""></span>
									</div>
								</div>
								<div class="form-group col-xs-8 col-sm-8 col-md-8 col-lg-8">
									<label class="col-md-4 col-lg-4  control-label" for="spanstatus">Status:</label>
									<div class="col-md-8 col-lg-8">
										<span name="spanstatus" id="spanstatus" class=""></span>
									</div>
								</div>
							</div>
							<div class="col-md-6 col-lg-6 text-right">
								<button id="mc" class="btn btn-default" value="copy" style="margin-top:24%;" data-toggle="modal" data-target="#loginModal" onclick="allert()">Make a copy</button>
							</div>
						</div>
					</div>
					<div id="ediTab" class="tab-pane active" role="tabpanel">
						<div id="doco_container" class="col-xs-12 col-sm-12 col-md-12 col-lg-12" style="margin-top:10px;">
					    	<div >
								<!-- <input id="doco_go" type="submit" value="evaluate" class="hide"> -->
					    		<input id="doco_reset" type="reset" value="reset" class="hide">
								<div style="display: inline; float: right;" class="hide">
									<label for="js_example">Load an example: </label>
									<select name="js_example" id="js_example">
										<option value="doco_code" id="doco_code">DoCO structures</option>
										<option value="biblioref_code" id="biblioref_code" selected="selected">Bilbiographic references</option>
										<option value="para_length_code" id="para_length_code">Paragraph length</option>
										<option value="uk_vs_usa_code" id="uk_vs_usa_code">UK vs. USA English</option>
									</select>
								</div>
								<div id="editor_container" clss="col-xs-12 col-sm-12 col-md-12 col-lg-12">
									<textarea id="js_editor" rows="40" cols="30"></textarea>
								<!-- </div> -->

				<!--
									var sections = $("div.section");
									var filtered = sections.filter(function() {
										return ( $(this).children(".title").length != 0);
									});
									filtered.each(function() {
									  var eid = getStructuralClass( $(this).attr("class") );
									  $("path."+eid).attr("style", "fill: red");
									});
				-->
									<textarea id="css_editor" rows="40" cols="50" class="text-right"></textarea>
								</div>
							</div>
							<div id="but_rules" class="text-right">
								<button class="btn btn-default" onclick="allert()" style="margin-top:5%; width:100px;" data-toggle="modal" data-target="#loginModal">save</button><br>
								<button class="btn btn-default" onclick="allert()" id="create_rule" style="margin-top:5%; width:100px;" data-toggle="modal" data-target="#loginModal">create</button><br>
								<!-- <button class="btn btn-default" id="preview_rule" style="margin-top:5%; width:100px;">preview</button> -->
								<input class="doco_go" type="submit" value="preview" style="margin-top:5%; width:100px; padding:10px; border-radius:4px;">
							</div>
							<div id="info_create" class="text-right hide">

							</div>
							<div id="button_create" class="text-right hide">
								<button id='modify_create' class='btn btn-default' data-toggle='modal' data-target='#createModal'>Modify</button>
								<button id="create_last" class="btn btn-default">Create</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>


		<!-- Inizio pannelli-->
		<!-- <div class="panel panel-default">
			<div class="panel-heading" role="tab" id="headingTwo">
				<h4 class="panel-title">
					<a id="collapse_nr" class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo" >
					Navigate Rule
					</a>
				</h4>
				<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" id="nr_top">
					<div style="margin-top:10px;" class="col-xs-6 col-sm-6 col-md-6 col-lg-6" ><span class="glyphicon glyphicon-chevron-left col-md-1 col-lg-1"></span><div id="navigate_rule_close_top" class="col-md-2 col-lg-2"></div><span class="glyphicon glyphicon-chevron-right text-right col-md-2 col-lg-2"></span></div>
					<div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 text-right"><button class="doco_go btn btn-default" onclick="load_rules()">load</button></div>
				</div>
			</div>
			<div id="collapseTwo" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingTwo">
				<div class="panel-body">
					<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" id="nr_bot">
						<div style="margin-top:10px;" class="col-xs-6 col-sm-6 col-md-6 col-lg-6" ><span class="glyphicon glyphicon-chevron-left col-md-1 col-lg-1"></span><div id="navigate_rule_close_bot" class="col-md-3 col-lg-3"><select id="seltit"></select></div><span class="glyphicon glyphicon-chevron-right text-right col-md-2 col-lg-2"></span></div>
						<div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 text-right"><button id="id_rules" onclick="load_rules()" class="btn btn-default doco_go">load</button></div>
					</div><br>
					<div id="info_rules" class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
						<div class="col-xs-6 col-sm-6 col-md-6 col-lg-6" style="margin-top:2%; padding:15px; border:1px solid black; border-radius:5px;">
							<div class="form-group col-xs-8 col-sm-8 col-md-8 col-lg-8">
								<label class="col-md-4 col-lg-4 control-label" for="spantitle">Title:</label>
								<div class="col-md-8 col-lg-8">
									<span name ="spantitle" id="spantitle" class=""></span>
								</div>
							</div><div class="col-md-4 col-lg-4"></div>
							<div class="form-group col-xs-8 col-sm-8 col-md-8 col-lg-8">
								<label class="col-md-4 col-lg-4 control-label" for="spanauth">Author:</label>
								<div class="col-md-8 col-lg-8">
									<span name="spanauth" id="spanauth" class=""></span>
								</div>
							</div><div class="col-md-4 col-lg-4"></div>
							<div class="form-group col-xs-8 col-sm-8 col-md-8 col-lg-8">
								<label class="col-md-4 col-lg-4  control-label" for="spandesc">Description:</label>
								<div class="col-md-8 col-lg-8">
									<span name="spandesc" id="spandesc" class=""></span>
								</div>
								<div class="col-md-8 col-lg-8 hide">
									<span name="spanjs" id="spanjs" class=""></span>
								</div>
								<div class="col-md-8 col-lg-8 hide">
									<span name="spancss" id="spancss" class=""></span>
								</div>
							</div>
						</div>
						<div class="col-md-6 col-lg-6 text-right">
							<button id="mc" class="btn btn-default" value="copy" style="margin-top:24%;" data-toggle="modal" data-target="#copyModal">Make a copy</button>
						</div>
					</div>
				</div>
			</div>
		</div> -->




		<!-- <div class="panel panel-default">
		    <div class="panel-heading" role="tab" id="headingOne" style="height:50px;">
		      <h4 class="panel-title">
		        <a id="collapse_er" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
		          Rule Editor
		        </a>
		      </h4>
		    </div>
		    <div id="collapseOne" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne">
		      <div class="panel-body">
		      	<div id="doco_container" class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
			    	<div > -->
						<!-- <input id="doco_go" type="submit" value="evaluate" class="hide"> ERA GIA HIDE--> 
			    		<!-- <input id="doco_reset" type="reset" value="reset" class="hide">
						<div style="display: inline; float: right;" class="hide">
							<label for="js_example">Load an example: </label>
							<select name="js_example" id="js_example">
								<option value="doco_code" id="doco_code">DoCO structures</option>
								<option value="biblioref_code" id="biblioref_code" selected="selected">Bilbiographic references</option>
								<option value="para_length_code" id="para_length_code">Paragraph length</option>
								<option value="uk_vs_usa_code" id="uk_vs_usa_code">UK vs. USA English</option>
							</select>
						</div>
						<div id="editor_container" clss="col-xs-12 col-sm-12 col-md-12 col-lg-12">
							<textarea id="js_editor" rows="40" cols="30"></textarea> -->
						<!-- </div> DA QUI ERA HIDE -->

		<!--
							var sections = $("div.section");
							var filtered = sections.filter(function() {
								return ( $(this).children(".title").length != 0);
							});
							filtered.each(function() {
							  var eid = getStructuralClass( $(this).attr("class") );
							  $("path."+eid).attr("style", "fill: red");
							});
		FINO A QUI ERA HIDE-->
							<!-- <textarea id="css_editor" rows="40" cols="50" class="text-right"></textarea>
						</div>
					</div>
					<div id="but_rules" class="text-right">
						<button class="btn btn-default" id="save_rule" style="margin-top:5%; width:100px;" data-toggle="modal" data-target="#saveModal">save</button><br>
						<button class="btn btn-default" id="create_rule" style="margin-top:5%; width:100px;" data-toggle="modal" data-target="#createModal">create</button><br> -->
						<!-- <button class="btn btn-default" id="preview_rule" style="margin-top:5%; width:100px;">preview</button> ERA GIA HIDE-->
						<!-- <input class="doco_go" type="submit" value="preview" style="margin-top:5%; width:100px; padding:10px; border-radius:4px;">
					</div>
					<div id="info_create" class="text-right hide">

					</div>
					<div id="button_create" class="text-right hide">
						<button id='modify_create' class='btn btn-default' data-toggle='modal' data-target='#createModal'>Modify</button>
						<button id="create_last" class="btn btn-default">Create</button>
					</div>
				</div>
		      </div>
		    </div> -->
	  	</div>
		<script type="text/javascript" src="js/init_param.js"></script> 
    	<script type="text/javascript" src="js/draw.js"></script> 
    	<script type="text/javascript" src="js/editor.js"></script>
    	<script type='text/javascript' src='bootstrap/js/bootstrap.js'></script>
    	<script type="text/javascript" src="js/index.js"></script>
		<script type="text/javascript">
		// Hack to make this example display correctly in an iframe on bl.ocks.org
      		d3.select(self.frameElement).style("height", "700px");
		</script>
		<script type="text/javascript">
			$(document).ready(function(){
				console.log(d3.selectAll("path"));
			});
		</script>
  </body>
</html>
