$(document).ready(function(){
	// $.getJSON(
 //         '../sources/data/json/esempio/ex1.json',
 //         function(data){
 //            // ciclo l'array
 //            for(i=0; i<data.length; i++){
 //               	console.log(data[i]);
 //            }
 //            console.log(data["glossary"]);
 //            console.log(data["glossary"]["title"]);
 
 //         }
 //      );
 	// prova();

});
function prova(){
	jsonObj = [];
    $("input[class=email]").each(function() {

        var id = $(this).attr("title");
        var email = $(this).val();

        item = {}
        item ["title"] = id;
        item ["email"] = email;

        jsonObj.push(item);
    });
    jsonString = JSON.stringify(jsonObj); // transform json in string
    console.log(jsonObj);
}
