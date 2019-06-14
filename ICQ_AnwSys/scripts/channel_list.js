/* Get channel list */
$(document).ready(function () {


  setInterval(function(){

  			var lastchannels = "";
			var channelarray = []; // All channels saved in an array with IDs, Names ...
			

  			$('.channel_list').empty();

           $.ajax({
				url: "http://34.243.3.31:8080/channels?size=5",
				type: "GET",
				headers: {"X-Group-Token": "3NiMhdWegfyw"},
				contentType: "application/json; charset=utf-8",
				success: function(data){
						$.each(data._embedded.channelList, function(i, item){
							channelarray.push(item);
							$('.channel_list').append('<li class="channel_item dropdown-item" id="'+item.id+'" onclick="update_users()"><strong>'+ item.name + '</strong>	#'+item.topic+'</li>');

							
            			});
				},
				failure: function(err){alert(err);}
			});		

              
	},10000);



});


/* Get active users in channel */
