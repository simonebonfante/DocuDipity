$(document).ready(function(){
	login();
	// signup();
});

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
        	document.location.href="index_logged.php?doc=a&rule=doco_doco&pass=0";
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

