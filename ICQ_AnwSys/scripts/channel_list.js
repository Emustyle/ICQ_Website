

const channelarray = []; // All channels saved in an array with IDs, Names ...
const messageContainer = $("#message-container");

/* Get channel list */
$(document).ready(setInterval(function(){

	  	var lastchannels = "";
		
				

	  	$('.channel-list').empty();

	    $.ajax({
			url: "http://34.243.3.31:8080/channels?size=600",
			type: "GET",
			headers: {"X-Group-Token": "3NiMhdWegfyw"},
			contentType: "application/json; charset=utf-8",
			success: function(data){
						$.each(data._embedded.channelList, function(i, item){
							channelarray.push(item);
							$('.channel-list').append('<li class="channel-item dropdown-item" id="'+item.id+
							'" onclick="updateUsers(this.id)"><strong>'+ item.name + '</strong>	#'+item.topic+'</li>');
							
		            	});
					},
			failure: function(err){alert(err);}
		});		       
},10000));

/* Display active Users and messages from selcted channel */
function updateUsers(id){

		var activeChannelDisplay = $('.active-channel-display');
		var userChannelList = $(".user-channel-list");

		var name;
		var topic;

		var urlchannel = "http://34.243.3.31:8080/channels/"+id;

		$.ajax({
			url: urlchannel,
			type: 'GET',
			headers: {"X-Group-Token": "3NiMhdWegfyw"},
			contentType: 'application/json; charset=utf-8',
			success: function(data){

						name = data.name;
						topic = data.topic;
						activeChannelDisplay.empty();
						activeChannelDisplay.append('<img src="../ICQ_AnwSys/images/green_dot.ico" class="on-offline-image">'+
									'<div id="'+id+'">'+name+'	#'+topic+'</div>');
			},
			failure: function(err){
				alert(err);
			}
		});

		userChannelList.empty();
		messageContainer.empty();


		var urlusers = "http://34.243.3.31:8080/channels/"+id+"/users";
	           
		$.ajax({
			url: urlusers,
			type: 'GET',
			headers: {"X-Group-Token": "3NiMhdWegfyw"},
			contentType: 'application/json; charset=utf-8',
			success: function(data){

						$.each(data, function(i, item){
				     		 userChannelList.append('<li class="user-list dropdown-item">'+item+'</li>');
				     		 console.log(item); // Debug
				     	});
			},
			failure: function(err){
				alert(err);
			}
		});

		updatePosts(id);
};

function updatePosts (id){

		$('#message-container').empty();

		$.ajax({
		    url: "http://34.243.3.31:8080/channels/"+id+"/messages",
		    type: 'GET',
		    headers: {"X-Group-Token": "3NiMhdWegfyw"},
		    contentType: 'application/json; charset=utf-8',
			    
			success: function(posts){
			            
				console.log(posts); // Debug
		        $.each(posts._embedded.messageList, function(i, item){
		           	$('#message-container').append('<div class="messages-display ">' + 
		                    '<p>'+item.creator+'  :  ' +item.content+' <br> Time : '+
		                    new Date(item.timestamp).toGMTString() + '</p>' + '</div>') 
		          
		       		console.log(item.content); // Debug
	        	});
	    	},
	    	failure: function(err){
		        alert(err);
		        fail = true;  
		    }
		});
};
