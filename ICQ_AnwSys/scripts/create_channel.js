
/* Create a channel */
$(document).ready(function createChannel() {

	const createChannel = $('#create-channel');
	const channelName = $('#channel-name');
	const channelTopic = $('#channel-topic');

	createChannel.keypress((e) => {
		// If enter pressed...
		if (e.keyCode == 13){

			channelName.val('');
			channelTopic.val('');

			// If topic and name not empty...
			if (topic != '' && name != ''){

				// jquery AJAX-Method 
				$.ajax({
					url: 'http://34.243.3.31:8080/channels',
					type: 'POST',
					headers: {'X-Group-Token': '3NiMhdWegfyw'},
					contentType: 'application/json; charset=utf-8',
					data: JSON.stringify({
						'name': name,
						'topic': topic
					}),
					dataType: 'json',
					success: function(data){

						console.log(data); // Debug
						// Append the new created channel
						$('.user_channel_list').text('<li class="channel_list dropdown-item">' + 	data.name + ' - ' + data.topic + '</li>');
						channelName.val('');
						channelTopic.val('');
					},
					failure: function(err){alert(err);}
				});

				console.log(name); // Debug
				console.log(topic);// Debug
				
				// ... else if no valid input ...
			} else if (topic != '' && name === '') {
				channelName.css('border-color', 'rgba(195,27,24,1)');

			} else if (topic === '' && name != '') {
				channelTopic.css('border-color', 'rgba(195,27,24,1)');

			}
		}
	});
});