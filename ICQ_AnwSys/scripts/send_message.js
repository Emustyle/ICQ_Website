$(document).ready(function() {

	const messageContainer = $('#message-container');
	const comment = $('#comment');

	comment.click(() => submitMessage());
  	comment.keypress((f) => {
    // If enter pressed...
    if (f.keyCode == 13){
      submitMessage();
    }

	/* Send messsage */
	function submitMessage() {

		
	    var creator = $('#username').val();
	    var content = $('#content').val();
	    var channelID = $('#active-channel-display').attr('data-id');

	    $.ajax({
	        url: "http://34.243.3.31:8080/channels/"+channelID+"/messages",
	        type: 'POST',
	        headers: {"X-Group-Token": "3NiMhdWegfyw"},
	        contentType: 'application/json; charset=utf-8',
	        data: JSON.stringify({ "creator": creator, "content": content }),
	        success: function(data){
	            messageContainer.prepend('<div class="messages-display ">' + 
		                    '<p>'+data._embeded.messageList.creator+'  :  ' +data._embeded.messageList.content+' <br> Time : '+
		                    new Date(data._embeded.messageList.timestamp).toGMTString() + '</p>' + '</div>');
	            messageContainer.val('');
	        },
	        failure: function(err){
	            alert(err);
	        }
		});

		$('#comment').val('');
	};
});