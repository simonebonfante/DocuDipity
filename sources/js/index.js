$(document).ready(function(){
	login();
  pass();
  change_idx_rul();
  load_title_nc_top();
  hide_cont();
  load_title_nc_bot();
  load_rules();
  change_sel();
  load_docs();
  initialization_rule();
  initialization_doc();
  // logout();
	// signup();
});

var idx=0;
var titledocs=[];
var groupdocs=[];

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

// function signup(){
// 	/* attach a submit handler to the form */
//     $("#signup").submit(function(event) {

//       /* stop form from submitting normally */
//       event.preventDefault();

//       /* get the action attribute from the <form action=""> element */
//       var $form = $( this ),
//           url = $form.attr( 'action' );

//       /* Send the data using post with element id name and name2*/
//       var posting = $.post( url, { signname: $('#signname').val(), signmail: $('#signmail').val(), signpassword: $('#signpassword').val() } );
//       /* Alerts the results */
//       posting.done(function( data ) {
//       	alert(data);
//       });
//     });
// }

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
  $("#navTab").removeClass("active");
  $("#navact").removeClass("active");
  $("#ediTab").addClass("active");
  $("#editact").addClass("active");
  var js_code = vettore_regole[idx]["js"];
  var css_code = vettore_regole[idx]["css"];
  js_editor.setValue(js_code);
  css_editor.setValue(css_code);
  if(passage==0){
    var newHREF="index_logged.php?doc=a&rule="+vettore_regole[idx]["title"]+"&pass=0";
    history.pushState('', 'New Page Title', newHREF);
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
  eval("function draw_doco() {"+ doco_text + "} draw_doco();  ");

  var docosel = $("classeddocument [class*=' doco-']");
  docosel.each(function() {
    addClassToPath( $(this) );
  });
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