$( '.create_channel' ).keypress( function (create_channel) {

	if (create_channel.keyCode == 13) {
		var topic = $('#channel_topic').val();
		var name = $('#channel_name').val();


		if (topic != '' && name != ''){

			$.ajax({
				url: "http://34.243.3.31:8080/channels",
				type: "POST",
				headers: {"X-Group-Token": "3NiMhdWegfyw"},
				contentType: "application/json; charset=utf-8",
				data: JSON.stringify({
					"name": name,
					"topic": topic
				}),
				dataType: "json",
				success: function(data){

							console.log(data);


							$(".user_channel_list").append('<li class="channel_list dropdown-item">' + 	data.name + ' - ' + data.topic + '</li>');
				},
				failure: function(err){alert(err);}
			});

			console.log(name);
			console.log(topic);

		}
		create_channel.preventDefault();
	}
});