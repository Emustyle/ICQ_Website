/* Create a username to use the app */
$(document).ready(function() {
  const createUsernameTag = $('#create-username');
  const usernameTag = $('#username');
  const displayUsernameTag = $('#display-username');
  const usernameForm = $('#username-form');
  const channelInputs = $('.channel-input');
  let channelArray = [];

  // initial check what to display
  checkForUsername();

  // disable channel inputs if no username exists otherwise display username and disable username form
  function checkForUsername() {
    if (sessionStorage.getItem('username') === null) {
      channelInputs
        .prop('disabled', true)
        .prop('placeholder', 'Choose username first');
    } else {
      displayUsernameTag.css('visibility', 'visible').addClass('username-display').text(sessionStorage.getItem('username'))
      usernameForm.css('display', 'none');
      usernameTag.remove();
      $('.active-user-list').css('visibility', 'visible');
      $("#channel-topic").removeAttr("disabled");
	  $("#channel-name").removeAttr("disabled");
	  $("#comment").removeAttr("disabled");
	  $("#submit").removeAttr("disabled");
	  $("#reset").removeAttr("disabled");
	  $("#dropdown-channels").removeAttr("disabled");
      channelInputs
        .prop('disabled', false)
      // get existing channels
      getChannelList();
    }
  }

  // if submit button is clicked 
  createUsernameTag.click(() => setUsername());

  // If enter pressed call setUsername
  usernameTag.keypress( function (create_username) {
    if (create_username.keyCode == 13) {
      setUsername();
    }
  });	                


  // validate the username
  function setUsername() {

    if (usernameTag.val() != '') {
      let username = usernameTag.val();
      sessionStorage.setItem('username', username); 
      checkForUsername();
    } else {
      alert('Username must be at least 4 characters long');
    }
  };

  function getChannelList() {
    $.ajax({
      url: "http://34.243.3.31:8080/channels?size=5",
      type: "GET",
      headers: {"X-Group-Token": "3NiMhdWegfyw"},
      contentType: "application/json; charset=utf-8",
      success: function(data){
        $.each(data._embedded.channelList, function(i, item){
          channelArray.push(item);
          $('.channel_list').append('<li class="channel-item dropdown-item" id="'+item.id+'" onclick="update_users()"><strong>'+ item.name + '</strong>	#'+item.topic+'</li>');


        });
      },
      failure: function(err){alert(err);}
    });		
  }
});


