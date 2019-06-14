
/* Display active Users and messages from selcted channel */
function update_users(){


	var id = this.attr('id');
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

};
