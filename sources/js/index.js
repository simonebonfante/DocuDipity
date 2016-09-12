$(document).ready(function(){
	urld();
	login();
	change_idx_rul(); // navigate rule closed
	load_title_nc_top();  // navigate rule closed
	hide_cont();
	load_title_nc_bot();
	load_rules();
	change_sel();
	load_docs();
	loadgroup();
	initialization_rule();
	// logout();
});



var idx=0;
var id_group;
var id_title;
var titledocs_tmp=[];
var titledocs=[];
var url=[];
var all_doc=[];  // in all_doc[0] c'è il titolo (tutto l'array titledocs), in all_doc[1] c'è l'url (tutto l'array url), in all_doc[2] c'è il gruppo (tutto l'array groupdocs) !!!
var groupdocs=[];
var newgroup=[];
var newgroup1=[];
var first=1;
var first_doc=1;
var jscode;
var csscode;
var documento=curr_doc;

function allert(){
	alert("devi prima effettuare il login!");
}

function login(){
	/* attach a submit handler to the form */
    $("#login").submit(function(event) {
      
      /* stop form from submitting normally */
      event.preventDefault();

      /* get the action attribute from the <form action=""> element */
      var $form = $( this ),
          url = $form.attr( 'action' );

      /* Send the data using post with element id name and name2*/
      var posting = $.post( url, { mail: $('#logmail').val(), password: $('#logpassword').val() } );

      /* Alerts the results */
      posting.done(function( data ) {
        if(data=="acc"){
        	alert(data);
        	document.location.href="index_logged.php?doc=Informal Ontology Design&rule="+vettore_regole[0]["title"]+"&pass=0";
        }else{
        	alert(data);
			$('#loginModal').modal('show');
		    $("#logmail").addClass("has-error");
		    $("#logpassword").addClass("has-error");
        }

      });
    });
}

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
	var status;
	if (vettore_regole[idx]["status"]==0){
		status="private";
	}
	else{
		status="public";
	}
	$("#spantitle").empty();
	$("#spantitle1").empty();
	$("#spanauth").empty();
	$("#spandesc").empty();
	$("#spanstatus").empty();
	$("#spanjs").empty();
	$("#spancss").empty();

	$("#spantitle").append(vettore_regole[idx]["title"]);
	$("#spantitle1").append(vettore_regole[idx]["title"]);
	$("#spanauth").append(vettore_regole[idx]["author"]);
	$("#spandesc").append(vettore_regole[idx]["description"]);
	$("#spanstatus").append(status);

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

function load_rules(){
	$("#navTab").removeClass("active");
	$("#navact").removeClass("active");
	$("#ediTab").addClass("active");
	$("#editact").addClass("active");
	if (passage==0){
		var js_code = vettore_regole[idx]["js"];
		var css_code = vettore_regole[idx]["css"];
		js_editor.setValue(js_code);
		css_editor.setValue(css_code);
		if((curr_doc==".")||(curr_doc=="a")){
			curr_doc="Informal Ontology Design";
			var newHREF="index.php?doc=Informal Ontology Design&rule="+vettore_regole[idx]["title"]+"&pass=0";
			history.pushState('', 'New Page Title', newHREF);
		}
	}
	else if(passage==null){
		var js_code = vettore_regole[idx]["js"];
		var css_code = vettore_regole[idx]["css"];
		js_editor.setValue(js_code);
		css_editor.setValue(css_code);
		var newHREF="index.php?doc=Informal Ontology Design&rule="+vettore_regole[idx]["title"]+"&pass=0";
		history.pushState('', 'New Page Title', newHREF);

		setTimeout(function() { evaluateJs(); }, 2000);

	}
	if(user==vettore_regole[idx]["author"]){
		$("#save_rule").attr("data-target","#saveModal1");
	}else{
		$("#save_rule").attr("data-target","#saveModal");
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
		if(docs[i]!=".DS_Store"){
			getXml(docs[i],i);
		}
	}
}
function getXml(data, i){
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
	    if (xhttp.readyState == 4 && xhttp.status == 200) {
	        getTilte(xhttp, data);
	    }
	};
	xhttp.open("GET", "data/xml/"+data+"", true);
	xhttp.send();

	function getTilte(xml, data) {
		data=("data/json/"+data);
		data=data.replace('.xml', '.json');
	    var xmlDoc = xml.responseXML;
	    var x = xmlDoc.getElementsByTagName('title')[0];
	    var h = xmlDoc.getElementsByTagName('conftitle')[0];
	    var t = h.childNodes[0];
	    var y = x.childNodes[0];
	    loadtitle(y.nodeValue, t.nodeValue, i, data);
	}
}

function loadtitle(titolo,gruppo, i, data){
	if(curr_doc==titolo){
		var newHREF="index.php?doc="+titolo+"&rule="+vettore_regole[idx]["title"]+"&pass=0";
		history.pushState('', 'New Page Title', newHREF);
		newUpdateDocument(data);
	}
	titledocs[i]=titolo;
	groupdocs[i]=gruppo;
	url[i]=data;

	// if(i==2){
	// 	$("#group").append(gruppo);
	// 	$("#title").append(titolo);
	// }
}
function loadgroup(){
	var trovato=0;
	var count=1;
	$("#tabDocuments").on("click", function(){
		all_doc[0]=titledocs;
		all_doc[1]=url;
		all_doc[2]=groupdocs;
		newgroup[2]=all_doc[2][2];
		for(var j=3; j<all_doc[2].length; j++){
			newgroup[j]=0;
		}
		for(var t=3; t<all_doc[2].length; t++){
        	trovato=0;
        	for (var h=2; h<all_doc[2].length; h++){
            	if(all_doc[2][t]==newgroup[h]){
                	trovato=1;
            	}
        	}if (trovato==0){
            	newgroup[count]=all_doc[2][t];
            	count++;
        	}
    	}
    	var count1=0;
    	for (var k=2; k<newgroup.length; k++){
    		if (newgroup[k]!=0){
    			//$("#tablegroups").append('<tr><td class="td group" gr="'+newgroup[k]+'">'+newgroup[k]+'</td></tr>');
    			newgroup1[count1]=newgroup[k];
    			count1++;
    		}	
    	}
    	initialization_doc();
	});

	function initialization_doc(){

		if (first==1){
			var trovato=0;
			var h=0;
			for(var i=0; i<all_doc[0].length; i++){
				if(curr_doc==all_doc[0][i]){
					trovato=all_doc[2][i];
				}
			}if(trovato==0){
				alert("doc not found");
				trovato=newgroup1[0];
				for (var i=0; i<newgroup1.length; i++){
					if(trovato==newgroup1[i]){
						id_group=i;
					}
				}
				$("#group").append(newgroup1[id_group]);
				$("#apply_group").attr("gr",newgroup1[id_group]);
				var g=newgroup1[id_group];
				for(var j=2; j<all_doc[0].length; j++){
					if(g==all_doc[2][j]){
						titledocs_tmp[h]=all_doc[0][j];
						h++;
					}
				}
				id_title=0;
				$("#title").append(titledocs_tmp[id_title]);
				$("#apply_title").attr("tl", titledocs_tmp[id_title]);
				var newHREF="index.php?doc="+titledocs_tmp[id_title]+"&rule="+vettore_regole[idx]["title"]+"&pass=0";
				history.pushState('', 'New Page Title', newHREF);

			}else{
				for (var i=0; i<newgroup1.length; i++){
					if(trovato==newgroup1[i]){
						id_group=i;
					}
				}
				$("#group").append(newgroup1[id_group]);
				$("#apply_group").attr("gr",newgroup1[id_group]);
				var g=newgroup1[id_group];
				for(var j=2; j<all_doc[0].length; j++){
					if(g==all_doc[2][j]){
						titledocs_tmp[h]=all_doc[0][j];
						h++;
					}
				}
				for(var i=0; i<titledocs_tmp.length; i++){
					if(curr_doc==titledocs_tmp[i]){
						id_title=i;
						break;
					}
				}
				$("#title").append(titledocs_tmp[id_title]);
				$("#apply_title").attr("tl", titledocs_tmp[id_title]);
			}
			if(curr_doc==null){
				var hh=0;
				trovato=newgroup1[0];
				for (var i=0; i<newgroup1.length; i++){
					if(trovato==newgroup1[i]){
						id_group=i;
					}
				}
				$("#group").append(newgroup1[id_group]);
				$("#apply_group").attr("gr",newgroup1[id_group]);
				var g=newgroup1[id_group];
				for(var j=2; j<all_doc[0].length; j++){
					if(g==all_doc[2][j]){
						titledocs_tmp[hh]=all_doc[0][j];
						hh++;
					}
				}
				id_title=0;
				$("#title").append(titledocs_tmp[id_title]);
				$("#apply_title").attr("tl", titledocs_tmp[id_title]);
				var newHREF="index.php?doc="+titledocs_tmp[id_title]+"&rule="+vettore_regole[idx]["title"]+"&pass=0";
				history.pushState('', 'New Page Title', newHREF);
			}
			first=0;
		}
		//initialization
		// if(first==1){
		// 	var gruppo;
		// 	// $("#group").append(newgroup[id_group]);
		// 	// $("#apply_group").attr("gr",newgroup[id_group]);
		// 	// $("#title").append(titledocs_tmp[id_title]);
		// 	// $("#apply_title").attr("tl", titledocs_tmp[id_title]);
		// 	for(var j=2; j<all_doc[2]; j++){
		// 		if(curr_doc==all_doc[2][j]){
		// 			gruppo = all_doc[2][j];
		// 			alert(gruppo);
		// 			alert(j);
		// 			$("#group").append(all_doc[2][j]);
		// 			$("#apply_group").attr("gr",all_doc[2][j]);
		// 			break;
		// 		}
		// 	}
		// 	var h=0;
		// 	for(var j=2; j<all_doc[0].length; j++){
		// 		if(gruppo==all_doc[2][j]){
		// 			titledocs_tmp[h]=all_doc[0][j];
		// 			h++;
		// 		}
		// 	}
		// 	$("#title").append(titledocs_tmp[id_title]);
		// 	$("#apply_title").attr("tl", titledocs_tmp[id_title]);
		// 	first=0;
		// }

		//cambio gruppo di documenti

		$("#gruppodestra").on("click", function(){
			if(id_group==(newgroup1.length-1)){
				id_group=0;
			}
			else{
				id_group++;
			}
			$("#group").empty();
			$("#apply_group").attr("gr",newgroup1[id_group]);
			$("#group").append(newgroup1[id_group]);
		});
		$("#grupposinistra").on("click", function(){
			if(id_group==0){
				id_group=newgroup1.length-1;
			}
			else{
				id_group--;
			}
			$("#group").empty();
			$("#apply_group").attr("gr",newgroup1[id_group]);
			$("#group").append(newgroup1[id_group]);
		});

		//cambio documento

		$("#titolodestra").on("click", function(){
			if(id_title==(titledocs_tmp.length-1)){
				id_title=0;
			}
			else{
				id_title++;
			}
			$("#title").empty();
			$("#apply_title").attr("tl",titledocs_tmp[id_title]);
			$("#title").append(titledocs_tmp[id_title]);
		});

		$("#titolosinistra").on("click", function(){
			if(id_title==0){
				id_title=titledocs_tmp.length-1;
			}
			else{
				id_title--;
			}
			$("#title").empty();
			$("#apply_title").attr("tl",titledocs_tmp[id_title]);
			$("#title").append(titledocs_tmp[id_title]);
		});
	}


	//apply documents by groups 


	$("#apply_group").on("click", function(){
		id_title=0;
		var idtit_tmp=0;
		var g=$(this).attr("gr");
		for(var j=2; j<all_doc[0].length; j++){
			if(g==all_doc[2][j]){
				titledocs_tmp[idtit_tmp]=all_doc[0][j];
				idtit_tmp++;
			}
		}
		$("#title").empty();
		$("#apply_title").attr("tl", titledocs_tmp[id_title]);
		$("#title").append(titledocs_tmp[id_title]);
	});

	$("#apply_title").on("click", function(){
		for(var i=2; i<all_doc[0].length; i++){
			if(($("#apply_title").attr("tl"))==all_doc[0][i]){
				documento=all_doc[0][i];
				var newHREF="index.php?doc="+all_doc[0][i]+"&rule="+vettore_regole[idx]["title"]+"&pass=0";
				history.pushState('', 'New Page Title', newHREF);
				newUpdateDocument(all_doc[1][i]);

				setTimeout(function() { evaluateJs(); }, 2000);
			}
		}
	});
}

function newUpdateDocument(urlFile){
	d3.json(urlFile, function(json) {
		console.log(json);
		drawVisualization(json[0], false);
	});
	
	$("#document").load(urlFile.replace('/json/', '/htmlsubtree/').replace('.json', '.xml'), updateText);
	
	// carico xmlclassed per editor patternfinder
	// new FPOGGI
	$("#xmlclassed").load( urlFile.replace('/json/', '/xmlclassed/').replace('.json', '.xml') );
	//$("#xmlclassed").load( urlFile.replace('/json/', '/xmlclassed/').replace('.json', '.xml'), evaluateJs());
}




function initialization_rule(){
	if((passage=="0")||(passage=="2")){
		for(var i=0; i<vettore_regole.length; i++){	
			if (curr_rule==vettore_regole[i]["title"]){
				idx=i;
				load_title_nc_top();
				load_rules();
			}
			if(($("#op_"+i).val())==curr_rule){
				idx=i;
				$("#op_"+i).prop('selected', true);
				// alert($("#op_"+i).val());
			}
		}
		//First Evaluation
		setTimeout(function() { first_eval(); }, 2000);
	}
}
function first_eval(){
	var count;
	for(var i=0; i<vettore_regole.length; i++){
		if(vettore_regole[i]["title"]==curr_rule){
			count=i;
			i=vettore_regole.length;
		}
	}
	var css_text=vettore_regole[count]["css"];
	$('head').append('<style type="text/css" id="css_included">' + css_text + '</style>');
	var doco_text = vettore_regole[count]["js"];
	eval("function draw_doco() { try{"+ doco_text + "} catch (e) { if (e instanceof TypeError) { alert('Error in js: '+e); } else if (e instanceof RangeError) { alert('Error in js: '+e); } else if (e instanceof SyntaxError) { alert('Error in js: '+e); } else if (e instanceof EvalError) { alert('Error in js: '+e); } else { alert('Error in js: '+e);} }} draw_doco();	");

	var docosel = $("classeddocument [class*=' doco-']");
	docosel.each(function() {
		addClassToPath( $(this) );
	});
}


function urld(){
	$("#id_rules").on("click", function(){
		alert("ce la fai?");
		alert(vettore_regole[idx]["title"]);
		var js_code = vettore_regole[idx]["js"];
		var css_code = vettore_regole[idx]["css"];
		js_editor.setValue(js_code);
		css_editor.setValue(css_code);
		var newHREF="index.php?doc="+documento+"&rule="+vettore_regole[idx]["title"]+"&pass=0";
		history.pushState('', 'New Page Title', newHREF);
	});

}