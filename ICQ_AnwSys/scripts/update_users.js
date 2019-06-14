
/* Display active Users and messages from selcted channel */
$(document).ready(function update_users(id){

	console.log(id);

	var urlusers = "http://34.243.3.31:8080/channels/"+id+"/users";
           
			$.ajax({
				url: urlusers,
				type: 'GET',
				headers: {"X-Group-Token": "3NiMhdWegfyw"},
				contentType: 'application/json; charset=utf-8',
				success: function(data){

							$.each(data, function(i, item){
					     		 $(".user_channel_list").append('<li class="user_list dropdown-item">'+item+'</li>');
					     		 console.log(item); // Debug
					     	});
   
				},
				failure: function(err){
					alert(err);
				}
			});

			updatePosts();

			function updatePosts (){

			    $.ajax({
			        url: "http://34.243.3.31:8080/channels/"+id+"/messages",
			        type: 'GET',
			        headers: {"X-Group-Token": "3NiMhdWegfyw"},
			        contentType: 'application/json; charset=utf-8',
			    
			        success: function(posts){
			            
			            console.log(posts); // Testing purposes

			            $(".message-container").empty();
			            $.each(posts._embedded.messageList, function(i, item){
			                 $(".message-container").append(
			                    '<div class="messages_display ">' + 
			                        '<p>'+item.creator+'  :  ' +item.content+' <br> Time : '+ new Date(item.timestamp).toGMTString() + '</p>' + 
			                    '</div>'
			                ) 
			                

			               	console.log(item.content);
			               	
			            });

			        },
			        failure: function(err){
			            alert(err);
			            fail = true;  
			        }
			    })

			}

		function createPost (){

	    creator = $("#username").val();
	    content = $("#comment").val();

	    $.ajax({
	        url: "http://34.243.3.31:8080/channels/"+id+"/messages",
	        type: 'POST',
	        headers: {"X-Group-Token": "3NiMhdWegfyw"},
	        contentType: 'application/json; charset=utf-8',
	        data: JSON.stringify({ "creator": creator, "content": content }),
	        success: function(data){
	            console.log(data)
	            updatePosts();
	        },
	        failure: function(err){
	            alert(err);
	        }
	    });

	    
	}

});
