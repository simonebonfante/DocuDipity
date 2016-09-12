$(document).ready(function(){
    pre_create();
    loadtable_altre();
    loadtable_pub();
    loadtable_priv();
    getfilename();
    loadgroup();
    create_passage();
    editpub();
    editpriv();
    editaltre();
    loaddoc();
    caricadoc();
    //loadzip();
});


var flag_altre=0;
var flag_pub=0;
var flag_priv=0;
var flag_docs=[];
flag_docs[0]=0;
flag_docs[1]=0;
var titledocs=[];
var groupdocs=[];
var newgroupdocs=[];
var controllo_gruppo=1;
var namespace=[];

function caricadoc(){
	$("#loadrules").on("click",function(){
		$(".td").removeClass("red");
		$(this).addClass("red");
		$(".table-striped").addClass("hide");
		$("#prerules").addClass("hide");
		$(".spantab").addClass("hide");
		$("#caricadoc").removeClass("hide");
		loadzip();
	});
}

function getXml(data, i){
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
	    if (xhttp.readyState == 4 && xhttp.status == 200) {
	        getTilte(xhttp);
	    }
	};
	xhttp.open("GET", "data/xml/"+data+"", true);
	xhttp.send();

	function getTilte(xml) {
	    var xmlDoc = xml.responseXML;
	    var x = xmlDoc.getElementsByTagName('title')[0];
	    var h = xmlDoc.getElementsByTagName('conftitle')[0];
	    var t = h.childNodes[0];
	    var y = x.childNodes[0];
	    loadtitle(y.nodeValue, t.nodeValue, i);
	}
}
function loadtitle(titolo,gruppo, i){
	titledocs[i]=titolo;
	groupdocs[i]=gruppo;
	console.log(gruppo);
}

function pre_create(){
	$("#createrules").on("click",function(){
		$(".td").removeClass("red");
		$("#createrules").addClass("red");
		$(".table-striped").addClass("hide");
		$("#prerules").removeClass("hide");
		$("#caricadoc").addClass("hide");
		$(".spantab").addClass("hide");
	});
}

function prerules(){
	var title1=$("#title").val();
	var author1=user;
	var description1=$("#description").val();
	var stat1=$('input[name="status"]:checked').val();
	$("#main2").addClass("hide");
	$("#main1").removeClass("hide");
	create(title1,author1,description1, stat1);
}

function create(tit, auth, des, stat){
	$("#spantitle").append(tit);
	$("#spanauth").append(auth);
	$("#spandesc").append(des);
	$("#spanstatus").append(stat);

    $("#rultitle").attr("value",tit);
	$("#rulauth").attr("value",auth);
	$("#ruldes").attr("value",des);
}

function create_passage(){
	$("#create").submit(function(event) {

	  var title=$("#spantitle").text();
	  var author=$("#spanauth").text();	
	  var desc=$("#spandesc").text();	
	  var status=$("#spanstatus").text();
	
      /* stop form from submitting normally */
      event.preventDefault();

      /* get the action attribute from the <form action=""> element */
      var $form = $( this ),
          url = $form.attr( 'action' );

      /* Send the data using post with element id name and name2*/
      var posting = $.post( url, { title: title, author: user, desc: desc, radius: status } );

      /* Alerts the results */
      posting.done(function( data ) {
      	alert(data);
      	window.location.href = data;

      });
    });
}

function loadtable_altre(){
	$("#altrerules").on("click", function(){
		var statustmp;
		$(".td").removeClass("red");
		$(this).addClass("red");
		$("#prerules").addClass("hide");
		$(".table-striped").addClass("hide");
		$("#spanpub").addClass("hide");
		$("#spanpriv").addClass("hide");
		$("#spandoc").addClass("hide");
		$("#caricadoc").addClass("hide");
		$("#spanaltre").removeClass("hide");
		$("#altre").removeClass("hide");
		if(flag_altre==0){
			for(var j=0; j<vettore_regole.length; j++){
				if((vettore_regole[j]["author"]!=user)&&(vettore_regole[j]["status"]!=0)){
					$("#altre").append('<tr><td id="tit'+j+'"></td><td id="auth'+j+'"></td><td id="desc'+j+'"><td id="stat'+j+'"></td></td><td id="edit'+j+'"><button class="btn btn-default edit" idx="'+vettore_regole[j]["id"]+'" type="submit" name="Submit">edit</button></td><td id="dup'+j+'"><button class="btn btn-default duplicate" idx="'+vettore_regole[j]["id"]+'">duplicate</button></td><td id="del'+j+'"></td></tr>');
				}
			}
			for(var i=0; i<vettore_regole.length; i++){
				if((vettore_regole[i]["author"]!=user)&&(vettore_regole[i]["status"]!=0))
					$("#tit"+i).append(vettore_regole[i]["title"]);
					$("#auth"+i).append(vettore_regole[i]["author"]);
					$("#desc"+i).append(vettore_regole[i]["description"]);
					$("#stat"+i).append("public");
			}
			flag_altre=1;
		}
	});
}

function loadtable_pub(){
	$("#pubrules").on("click",function(){
		$(".td").removeClass("red");
		$(this).addClass("red");
		$("#prerules").addClass("hide");
		$(".table-striped").addClass("hide");
		$("#spanpub").removeClass("hide");
		$("#spanpriv").addClass("hide");
		$("#spandoc").addClass("hide");
		$("#caricadoc").addClass("hide");
		$("#spanaltre").addClass("hide");
		$("#miepub").removeClass("hide");
		if(flag_pub==0){
			for(var j=0; j<vettore_regole.length; j++){
				if((user==vettore_regole[j]["author"])&&(vettore_regole[j]["status"]==1)){
					$("#miepub").append('<tr><td id="titp'+j+'"></td><td id="authp'+j+'"></td><td id="descp'+j+'"><td id="statp'+j+'"></td></td><td id="editp'+j+'"><button class="btn btn-default edit" id="id'+vettore_regole[j]["id"]+'" idx="'+vettore_regole[j]["id"]+'" type="submit" name="Submit">edit</button></td><td id="dupp'+j+'"><button class="btn btn-default duplicate" idx="'+j+'">duplicate</button></td><td id="delp'+j+'"><button class="btn btn-default delete" idx="'+j+'">delete</button></td></tr>');
				}		
			}
			for(var i=0; i<vettore_regole.length; i++){
				if(user==vettore_regole[i]["author"]){
					if(vettore_regole[i]["status"]==1){
						$("#titp"+i).append(vettore_regole[i]["title"]);
						$("#authp"+i).append(vettore_regole[i]["author"]);
						$("#descp"+i).append(vettore_regole[i]["description"]);
						$("#statp"+i).append("<button style='font-size: 8px; margin-right:8px;' class='btn btn-default changestatus' id='"+vettore_regole[i]['id']+"' idx='"+vettore_regole[i]['id']+"' type='submit' name='Submit'><span class='glyphicon glyphicon-chevron-down'></span></button><span style='text-decoration:none; cursor:auto; font-size:100%;'>public</span> ");
					}
				}
			}
			flag_pub=1;
		}
	});
	
}
function loadtable_priv(){
	$("#privrules").on("click", function(){
		$(".td").removeClass("red");
		$(this).addClass("red");
		$("#prerules").addClass("hide");
		$(".table-striped").addClass("hide");
		$("#spanpub").addClass("hide");
		$("#spanpriv").removeClass("hide");
		$("#spandoc").addClass("hide");
		$("#caricadoc").addClass("hide");
		$("#spanaltre").addClass("hide");
		$("#miepriv").removeClass("hide");
		if(flag_priv==0){
			for(var j=0; j<vettore_regole.length; j++){
				if((user==vettore_regole[j]["author"])&&(vettore_regole[j]["status"]==0)){
					$("#miepriv").append('<tr><td id="titpp'+j+'"></td><td id="authpp'+j+'"></td><td id="descpp'+j+'"><td id="statpp'+j+'"></td></td><td id="editpp'+j+'"><button class="btn btn-default edit" idx="'+vettore_regole[j]["id"]+'" type="submit" name="Submit">edit</button></td><td id="duppp'+j+'"><button class="btn btn-default duplicate" idx="'+vettore_regole[j]["id"]+'">duplicate</button></td><td id="delpp'+j+'"><button class="btn btn-default delete" idx="'+vettore_regole[j]["id"]+'">delete</button></td></tr>');
				}		
			}
			for(var i=0; i<vettore_regole.length; i++){
				if((user==vettore_regole[i]["author"])&&(vettore_regole[i]["status"]==0)){
					$("#titpp"+i).append(vettore_regole[i]["title"]);
					$("#authpp"+i).append(vettore_regole[i]["author"]);
					$("#descpp"+i).append(vettore_regole[i]["description"]);
					$("#statpp"+i).append("<button style='font-size: 8px; margin-right:8px;' class='btn btn-default changestatus' id='"+vettore_regole[i]['id']+"' idx='"+vettore_regole[i]['id']+"' type='submit' name='Submit'><span class='glyphicon glyphicon-chevron-up'></span></button><span id='statppp"+i+"' style='text-decoration:none; cursor:auto; font-size:100%;'>private</span> ");
				}
			}
			flag_priv=1;
		}
	});
	
}


function getfilename(){
	for(var i=2; i<docs.length; i++){
		getXml(docs[i],i);
	}
}

function loadgroup(){
	var newgroup=[];
	var trovato=0;
	var count=1;
	$("#tabDocuments").on("click", function(){
		newgroup[2]=groupdocs[2];
		for(var j=3; j<groupdocs.length; j++){
			newgroup[j]=0;
		}
		for(var t=3; t<groupdocs.length; t++){
        	trovato=0;
        	for (var h=2; h<groupdocs.length; h++){
            	if(groupdocs[t]==newgroup[h]){
                	trovato=1;
            	}
        	}if (trovato==0){
            	newgroup[count]=groupdocs[t];
            	count++;
        	}
    	}
    	for (var k=2; k<newgroup.length; k++){
    		if (newgroup[k]!=0){
    			$("#tablegroups").append('<tr><td class="td group" gr="'+newgroup[k]+'">'+newgroup[k]+'</td></tr>');
    		}	
    	}
		loadtable_doc();
	});

	function loadtable_doc(){
		$(".group").on("click", function(){
			var g=$(this).attr("gr");
			$(".td").removeClass("red");
			$(this).addClass("red");
			$("#prerules").addClass("hide");
			$(".table-striped").addClass("hide");
			$("#spanpub").addClass("hide");
			$("#spanpriv").addClass("hide");
			$("#spandoc").removeClass("hide");
			$("#spanaltre").addClass("hide");
			$("#tabdocs").removeClass("hide");
			$("#tabdocs").empty();
			$("#tabdocs").append("<tr><th>Title</th><th>Author</th><th>Group</th><th>Load</th></tr>");
			for(var j=2; j<titledocs.length; j++){
				if(g==groupdocs[j]){
					$("#tabdocs").append('<tr><td id="titd'+j+'"></td><td id="authd'+j+'"></td><td id="groupd'+j+'"></td><td><button id="loadd'+j+'" class="btn btn-default load" idx="'+j+'">Load</button></td></tr>');
					$("#titd"+j).append(titledocs[j]);
					$("#authd"+j).append("Simone");
					$("#groupd"+j).append(groupdocs[j]);
				
				}
			}
		});
	}
}

function editpub(){
	var op;
	var title;
	var idx;
	var status;
	$('#miepub').on('click', '.edit', function() {
		idx=$(this).attr("idx");
		title=$("#titp"+idx).text();
		status=$("#statp"+idx).text();
		op="load";
		alert(op);
	});
	$("#miepub").on('click', '.delete', function(){
		idx=$(this).attr("idx");
		title=$("#titp"+idx).text();
		status=$("#statp"+idx).text();
		op="delete";
		alert(op);
	});
	$("#miepub").on('click', '.duplicate', function(){
		idx=$(this).attr("idx");
		title=$("#titp"+idx).text();
		status=$("#statp"+idx).text();
		op="duplicate";
		alert(op);
	});
	$("#miepub").on('click', '.changestatus', function(){
		idx=$(this).attr("idx");
		title=$("#titp"+idx).text();
		status=$("#statp"+idx+" span").text();
		alert(status);
		op="change";
		alert(op);
	});
	/* attach a submit handler to the form */
    $("#formpub").submit(function(event) {

      event.preventDefault();
  	  /* get the action attribute from the <form action=""> element */
      var $form = $("#formpub"),
          url = $form.attr( 'action' );
      var js=vettore_regole[idx]["js"];
      var css=vettore_regole[idx]["css"];
      var desc=vettore_regole[idx]["description"];
      /* Send the data using post with element id name and name2*/
      var posting = $.post( url, {status:status, title:title, op:op, auth:user, css:css, js:js, desc:desc, id:idx} );

      /* Alerts the results */
      posting.done(function( data ) {
      	window.location.href=data;
      });
    });
}

function editpriv(){
	var op;
	var title;
	var idx;
	var status;
	$('#miepriv').on('click', '.edit', function() {
		idx=$(this).attr("idx");
		title=$("#titpp"+idx).text();
		status=$("#statppp"+idx).text();
		alert(status);
		op="load";
	});
	$("#miepriv").on('click', '.delete', function(){
		idx=$(this).attr("idx");
		title=$("#titpp"+idx).text();
		status=$("#statppp"+idx).text();
		alert(status);
		op="delete";
		alert(op);
	});
	$("#miepriv").on('click', '.duplicate', function(){
		idx=$(this).attr("idx");
		title=$("#titpp"+idx).text();
		status=$("#statppp"+idx).text();
		alert(status);
		op="duplicate";
		alert(op);
	});
	$("#miepriv").on('click', '.changestatus', function(){
		idx=$(this).attr("idx");
		title=$("#titpp"+idx).text();
		status=$("#statppp"+idx).text();
		alert(status);
		op="change";
		alert(op);
	});

	/* attach a submit handler to the form */
    $("#formpriv").submit(function(event) {

      event.preventDefault();
  	  /* get the action attribute from the <form action=""> element */
      var $form = $("#formpriv"),
          url = $form.attr( 'action' );
      var js=vettore_regole[idx]["js"];
      var css=vettore_regole[idx]["css"];
      var desc=vettore_regole[idx]["description"];
      /* Send the data using post with element id name and name2*/
      var posting = $.post( url, {status:status, title:title, op:op, auth:user, css:css, js:js, desc:desc, id:idx} );

      /* Alerts the results */
      posting.done(function( data ) {
      	window.location.href=data;
      });
    });
}

function editaltre(){
	var op;
	var title;
	var idx;
	var status;
	$('#altre').on('click', '.edit', function() {
		idx=$(this).attr("idx");
		title=$("#tit"+idx).text();
		status=$("#stat"+idx).text();
		op="load";
	});
	$("#altre").on('click', '.duplicate', function(){
		idx=$(this).attr("idx");
		title=$("#tit"+idx).text();
		status=$("#stat"+idx).text();
		op="duplicate";
		alert(op);
	});
	/* attach a submit handler to the form */
    $("#formaltre").submit(function(event) {

      event.preventDefault();
  	  /* get the action attribute from the <form action=""> element */
      var $form = $("#formpub"),
          url = $form.attr( 'action' );

      var js=vettore_regole[idx]["js"];
      var css=vettore_regole[idx]["css"];
      var desc=vettore_regole[idx]["description"];

      /* Send the data using post with element id name and name2*/
      var posting = $.post( url, {status:status, title:title, op:op, auth:user, css:css, js:js, desc:desc} );

      /* Alerts the results */
      posting.done(function( data ) {
      	window.location.href=data;
      });
    });
}

function loaddoc(){
	var title;
	var idx;
	var group;
	$('#formdocs').on('click', '.load', function() {
		idx=$(this).attr("idx");
		title=$("#titd"+idx).text();
		group=$("#groupd"+idx).text();
	});

	/* attach a submit handler to the form */
    $("#formdocs").submit(function(event) {

      event.preventDefault();
  	  /* get the action attribute from the <form action=""> element */
      var $form = $("#formdocs"),
          url = $form.attr( 'action' );	

      /* Send the data using post with element id name and name2*/
      var posting = $.post( url, {title:title, group:group} );

      /* Alerts the results */
      posting.done(function( data ) {
      	alert(data);
      	window.location.href=data;
      });
    });

}

function loadzip(){
	var count_contr_gr=0;
	var version;
	var xmlns;
	/* attach a submit handler to the form */
   $('#uploadSubmitBtn').on('click', function() {
        var file_data = $('#uploadBrowseBtn').prop('files')[0];   
        var form_data = new FormData();
        form_data.append('file', file_data);                        
        $.ajax({
            url: 'php/caricadoc.php',
            dataType: 'json',
            cache: false,
            contentType: false,
            processData: false,
            data: form_data,                         
            type: 'post',
            success: function(data){
            	if((data=="Sorry, your file is too large.")||(data=="Sorry, file already exists.")||(data=="Sorry, only ZIP files are allowed")||(data=="Sorry, your file was not uploaded.")||(data=="Sorry, only XML files are allowed.")||(data=="doh!")||(data=="Sorry, there was an error uploading your file.")){
            		alert(data);
                	window.location.href="gestione_regole.php";
            	}else if(data[0]=="Sorry, file already exists."){
            		for (var i=1; i<data.length; i++){
            			alert(data[i]);
            		}
            		window.location.href="gestione_regole.php";
            	}
            	else{
            		console.log(data);
            		var i;
            		for(i=0; i<data.length; i++){
	            		var xhttp = new XMLHttpRequest();
						xhttp.onreadystatechange = function() {
						   if (this.readyState == 4 && this.status == 200) {
						   		count_contr_gr=count_contr_gr+1;
						       myFunction(this, count_contr_gr);
						   }
						};
						xhttp.open("GET", "data/xml/"+data[i]+"", true);
						xhttp.send();
            		}
            		function myFunction(xml, idx) {
					    var x, xmlDoc, a;
					    xmlDoc = xml.responseXML;
					    txt = "";
					    x = xmlDoc.getElementsByTagName('article');
					    if(idx==1){
            				version = x[0].getAttribute('version');
					    	xmlns = x[0].getAttribute('xmlns');
					    	console.log("ecco: "+version);
            			}
            			else{
            				if((version!=x[0].getAttribute('version'))||(xmlns!=x[0].getAttribute('xmlns'))){
            					controllo_gruppo=0;
            				}
            			}
					    //count_group(version,xmlns, idx);
					}
					alert(controllo_gruppo);
            		if(controllo_gruppo==0){
            			alert("Non sono dello stesso gruppo");
            			for(var j=0; j<data.length; j++){
            				var file_data = data[j];   
					        var form_data = new FormData();
					        form_data.append('file', file_data);
	            			$.ajax({
					            url: 'php/delete_xml.php',
					            dataType: 'json',
					            cache: false,
					            contentType: false,
					            processData: false,
					            data: form_data,                         
					            type: 'post',
					            success: function(data){
					                console.log(data);
					            }
					        });
	            		}
	            		window.location.href="gestione_regole.php";

			        }
            		else{
            			alert("Documento caricato");
            			//controlla_gruppo();
            		}
            		// for (var j=0; j<data.length; j++){
            		// 	console.log( namespace[j][0]);
            		// 	console.log( namespace[j][1]);
            		// }
            	}
            }
        });
    });
}