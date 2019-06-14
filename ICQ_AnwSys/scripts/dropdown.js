// Change dropdown behavior on small devices
$(window).on('resize', function() {
    if($(window).width() < 767) {
      $('#switch-drop').removeClass('dropright');
      $('#switch-drop').addClass('dropdown');
    }
    else {
      $('#switch-drop').addClass('dropright');
      $('#switch-drop').removeClass('dropdown');
    }
});