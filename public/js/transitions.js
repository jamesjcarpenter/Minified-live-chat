window.addEventListener('load', () => {
   $(".pusher")
    .transition({
      animation  : 'scale in',
      duration:700,
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
       }
     });
  });
