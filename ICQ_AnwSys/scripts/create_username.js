


$(document).ready(function() {
	// Show alert for 5s and remove it
	$(".user-container").prepend('<div class="alert alert-warning text-left" id="channel_create_alert" role="alert" style="max-width: 95%;">'+ 
	'<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
	'<div aria-hidden="true">&times;</div></button><strong>Please choose a username</strong></div>');

	setTimeout(function() {
		$('#channel_create_alert').remove();
			}, 5000);

		// Change dropdown behavior on small devices
		$(window).on('resize', function() {
		if($(window).width() < 767) {
			$('#switch_drop').removeClass('dropright');
			$('#switch_drop').addClass('dropdown');
		}
		else {
			$('#switch_drop').addClass('dropright');
			$('#switch_drop').removeClass('dropdown');
		}
	});
	// Check enter-press in username_input
	$( '#username' ).keypress( function (create_username) {

		// If enter pressed...
		if (create_username.keyCode == 13) {
			var username = $('#username').val();
			console.log(username); // Debug

			// If username not empty...
			if(username != '') {
				$( '.username_display' ).text(username).css('visibility' , 'visible').css('padding-top', '4%').css('color', 'rgba(8, 8, 43, 1)'); // Show username
				$( '.username' ).remove();	// Hide Username_input
				// Enable all bouttons and inputs on website
				$("#channel-topic").removeAttr("disabled");
	            $("#channel-name").removeAttr("disabled");
	            $("#channel-topic").removeAttr("disabled");
	            $("#comment").removeAttr("disabled");
	            $("#submit").removeAttr("disabled");
	            $("#reset").removeAttr("disabled");
	            $("#dropdown_users").removeAttr("disabled");
	            $("#dropdown_channels").removeAttr("disabled");
			}          
		}
	});	                
});


