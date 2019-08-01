window.addEventListener('load', () => {
   $(".pusher")
    .transition({
      animation  : 'horizontal flip in',
      duration:2100,
      interval:0
     });
       
     $('.scroll.container .ui.container')
     .visibility({
       once: false,
       // update size when new content loads
       observeChanges: true,
       // load content on bottom edge visible
       onBottomVisible: function() {
         // loads a max of 5 times
         $('body').dimmer('show');
         $('body').load('show');
       }
     });
  });
