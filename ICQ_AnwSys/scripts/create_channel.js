/* Create a channel */
$(document).ready(function createChannel() {

  const createChannelTag = $('#create-channel');
  const channelNameTag = $('#channel-name');
  const channelTopicTag = $('#channel-topic');

  createChannelTag.click(() => submitChannel());
  createChannelTag.keypress((e) => {
    // If enter pressed...
    if (e.keyCode == 13){
      submitChannel();
    }
  });

  function submitChannel() {
    if (channelNameTag.checkValidity() === true && channelTopicTag.checkValidity() === true) {
      createChannel()
    } else if (channelNameTag.checkValidity() === false && channelTopicTag.checkValidity() === true){
      channelNameTag.addattr('required', 'true');
    } else {
      channelTopicTag.addattr('required', 'true');

    }
  }

  function createChannel() {
    // jquery AJAX-Method 
    $.ajax({
      url: 'http://34.243.3.31:8080/channels',
      type: 'POST',
      headers: {'X-Group-Token': '3NiMhdWegfyw'},
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify({
        'name': channelNameTag.val(),
        'topic': channelTopicTag.val(),
      }),
      dataType: 'json',
      success: function(data){
        console.log(data); // Debug
        // Append the new created channel
        $('.user_channel_list').text('<li class="channel-list dropdown-item">' + 	data.name + ' - ' + data.topic + '</li>');
        channelNameTag.val('');
        channelTopicTag.val('');
      },
      failure: (err) => { console.log(err) }
    });
  }
});

