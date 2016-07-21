$(document).ready(function(){
	pass();
	change_idx_rul(); // navigate rule closed
	load_title_nc_top();  // navigate rule closed
	hide_cont();
	load_title_nc_bot();
	load_rules();
	change_sel();
	makecopy();
	load_docs();
	create_rule();
	presave();
	initialization_rule();
	initialization_doc();
	// logout();

});

var idx=0;
var titledocs=[];
var groupdocs=[];


function change_idx_rul(){
	$(".glyphicon-chevron-right").on("click",function(){
		var selectedTit = $('select#seltit').find(":selected").next();
		var selectedTitVal = $('select#seltit').find(":selected").next().val();
		//console.log( selectedVal );
		selectedTit.prop('selected', true); //val(selectedVal);

		if(idx==(vettore_regole.length-1)){
			idx=0;
			$(".first-child").prop('selected', true);
			load_title_nc_top();
		}
		else{
			idx++;
			load_title_nc_top();
		}
	});
	$(".glyphicon-chevron-left").on("click",function(){
		var selectedTit = $('select#seltit').find(":selected").prev();
		var selectedTitVal = $('select#seltit').find(":selected").prev().val();
		//console.log( selectedVal );
		selectedTit.prop('selected', true); //val(selectedVal);
		if(idx==0){
			idx=(vettore_regole.length-1);
			$(".last-child").prop('selected', true);
			load_title_nc_top();
		}
		else{
			idx--;
			load_title_nc_top();
		}
	});
}

function load_title_nc_top(){
	$("#spantitle").empty();
	$("#spanauth").empty();
	$("#spandesc").empty();
	$("#spanjs").empty();
	$("#spancss").empty();

	$("#spantitle").append(vettore_regole[idx]["title"]);
	$("#spanauth").append(vettore_regole[idx]["author"]);
	$("#spandesc").append(vettore_regole[idx]["description"]);

	//invisible
	$("#spanjs").append(vettore_regole[idx]["js"]);
	$("#spancss").append(vettore_regole[idx]["css"]);

	$("#navigate_rule_close_top").empty();
	$("#navigate_rule_close_top").append('<span idx="'+idx+'" class="span_nc">'+vettore_regole[idx]["title"]+'</span>');
}

function load_title_nc_bot(){
	$("#seltit").append('<option class="first-child" idx="'+vettore_regole[0]["id"]+'" id="op_0" value="'+vettore_regole[0]["title"]+'">'+vettore_regole[0]["title"]+'</option>');
	for(var i=1; i<vettore_regole.length-1; i++){
		$("#seltit").append('<option idx="'+vettore_regole[i]["id"]+'" id="op_'+i+'" value="'+vettore_regole[i]["title"]+'">'+vettore_regole[i]["title"]+'</option>');
	}
	var j=vettore_regole.length-1;
	$("#seltit").append('<option class="last-child" idx="'+vettore_regole[j]["id"]+'" id="op_'+j+'" value="'+vettore_regole[j]["title"]+'">'+vettore_regole[j]["title"]+'</option>');
}

function hide_cont(){
	$("#collapse_nr").on("click", function(){
		var a_e=$(this).attr("aria-expanded");
		if(a_e=="false"){
			$("#nr_top").addClass("hide");
		}
		else{
			$("#nr_top").removeClass("hide");
		}
	});

}
function load_rules_base(){
	var js_code = vettore_regole[idx]["js"];
	var css_code = vettore_regole[idx]["css"];
	js_editor.setValue(js_code);
	css_editor.setValue(css_code);
	if(($("#collapse_er").attr("aria-expanded"))=="false"){
		$("#collapse_er").attr("aria-expanded",true);
	}

	// setTimeout(function() { evaluateJs(); }, delayDraw);
}
function load_rules(){
	var js_code = vettore_regole[idx]["js"];
	var css_code = vettore_regole[idx]["css"];
	js_editor.setValue(js_code);
	css_editor.setValue(css_code);
	if(passage==0){
		var newHREF="index_logged.php?doc=a&rule="+vettore_regole[idx]["title"]+"&pass=0";
		history.pushState('', 'New Page Title', newHREF);
	}
	// setTimeout(function() { evaluateJs(); }, delayDraw);

}
function change_sel(){
	$("option").on("click",function(){
		idx=$(this).attr("idx");
		load_title_nc_top();
	});
}

function load_docs(){
	for(var i=2; i<docs.length; i++){
		getXml(docs[i],i);
	}
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
	    loadgroup(y.nodeValue, t.nodeValue, i);
	}
}

function loadgroup(titolo,gruppo, i){
	titledocs[i]=titolo;
	groupdocs[i]=gruppo;
	if(i==2){
		$("#group").append(gruppo);
		$("#title").append(titolo);
	}
}
function loadtitle(){
	for(var i=2; i<docs.length; i++){
	}
}

function makecopy(){
	$("#mc").on("click",function(){
		var tit=$("#spantitle").text();
		var js=$("#spanjs").text();
		var css=$("#spancss").text();
		var author=$("#spanauth").text();

		$("#titlecpy").attr("value",tit);
		$("#jscpy").attr("value",js);
		$("#csscpy").attr("value",css);
		$("#authcpy").attr("value",author);
	});
	/* attach a submit handler to the form */
    $("#copy").submit(function(event) {

      /* stop form from submitting normally */
      event.preventDefault();

      /* get the action attribute from the <form action=""> element */
      var $form = $( this ),
          url = $form.attr( 'action' );

      /* Send the data using post with element id name and name2*/
      var posting = $.post( url, { title: $('#titlecpy').val(), js: $('#jscpy').val(), css: $('#csscpy').val(), author: $('#authcpy').val() } );

      /* Alerts the results */
      posting.done(function( data ) {
        alert(data);
        window.location.href = "index.php?doc=a&rule="+$('#titlecpy').val()+"?pass=0"; 
      });
    });
}


function create_rule(){
	/* attach a submit handler to the form */
    $("#create").submit(function(event) {
      alert("aspetta");

      $("#but_rules").addClass("hide");
      $("#info_create").removeClass("hide");
      $("#button_create").removeClass("hide");
      /* stop form from submitting normally */
	  event.preventDefault();
	  $("#info_create").empty();
	  $("#info_create").append("<span><b>Title: </b>"+$('#cretitle').val()+"</span><br><br><span><b>Author: </b>"+user+"</span><br><br><span><b>Description: </b>"+$('#credesc').val()+"</span><br><br><span><b>Status: </b>"+$('input[name="status"]:checked').val()+"</span><br><br>");

	  js_editor.setValue("/** JAVASCRIPT EDITOR **/ ");
	  css_editor.setValue("/** CSS EDITOR **/ ");

	  $("#create_last").on("click", function(){
	  	  /* get the action attribute from the <form action=""> element */
	      var $form = $("#create"),
	          url = $form.attr( 'action' );

	      var jscode=js_editor.getValue();
	      console.log(jscode);
		  var csscode=css_editor.getValue();
		  console.log(csscode);

	      /* Send the data using post with element id name and name2*/
	      var posting = $.post( url, { cretitle: $('#cretitle').val(), creauth: user, credesc: $('#credesc').val(), radius: $('input[name="status"]:checked').val(), js: jscode, css: csscode } );

	      /* Alerts the results */
	      posting.done(function( data ) {
	      	alert(data);
	      	window.location.href = data;
	      });
	  });
    });
}

function presave(){
	$("#save_rule").on("click", function(){
		var jscode=js_editor.getValue();
		var csscode=css_editor.getValue();
		save(jscode, csscode);
	});
}

function save(jscode, csscode){
	alert(jscode);
	$("#saveauthor").attr("value",user);
	// var jsedt=jseditor.getValue();s
	/* attach a submit handler to the form */
    $("#save").submit(function(event) {

      /* stop form from submitting normally */
      event.preventDefault();

      /* get the action attribute from the <form action=""> element */
      var $form = $( this ),
          url1 = $form.attr( 'action' );

      var posting2 = $.post ("php/get_idx.php",{});
      posting2.done(function( data ) {
      	  /* Send the data using post with element id name and name2*/
	      var posting1 = $.post( url1, { title: $('#savetitle').val(), description: $('#savedesc').val(), status: $('input[name="status_save"]:checked').val(), js: jscode, css: csscode, id: data, author: $("#saveauthor").val() } );

	      /* Alerts the results */
	      posting1.done(function( data1 ) {
	      	alert(data1);
	      	window.location.href = data1; 
	      });
      });
    });
}

function initialization_rule(){
	if(passage=="0"){
		for(var i=0; i<vettore_regole.length; i++){	
			if (curr_rule==vettore_regole[i]["title"]){
				idx=i;
				load_title_nc_top();
				load_rules();
			}
			if(($("#op_"+i).val())==curr_rule){
				idx=i;
				$("#op_"+i).prop('selected', true);
				alert($("#op_"+i).val());
			}
		}
	}
}

function initialization_doc(){
	
}

function pass(){
	if (passage=="1"){
		$("#but_rules").addClass("hide");
		$("#info_create").removeClass("hide");
		$("#button_create").removeClass("hide");
		/* stop form from submitting normally */
		$("#info_create").empty();
		$("#info_create").append("<span><b>Title: </b>"+curr_rule+"</span><br><br><span><b>Author: </b>"+user+"</span><br><br><span><b>Description: </b>"+desc+"</span><br><br><span><b>Status: </b>"+status_pass+"</span><br><br>");

		js_editor.setValue("/** JAVASCRIPT EDITOR **/ ");
		css_editor.setValue("/** CSS EDITOR **/ ");

		$("#create_last").on("click", function(){
			/* get the action attribute from the <form action=""> element */

			var $form = $("#create"),
			url = $form.attr( 'action' );


			var jscode=js_editor.getValue();
			console.log(jscode);
			var csscode=css_editor.getValue();
			console.log(csscode);

			/* Send the data using post with element id name and name2*/
			var posting = $.post( url, { cretitle: curr_rule, creauth: user, credesc: desc, radius: status_pass, js: jscode, css: csscode } );

			/* Alerts the results */
			posting.done(function( data ) {
				alert(data);
				window.location.href = "index_logged.php?doc=a&rule="+curr_rule+"&pass=0";
			});
		});
	}
}