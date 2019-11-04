jQuery( '#notlogged' )
    .click(function() {
      $("body")
       .transition({
         animation  : 'fade out',
         duration:2100,
         interval:0
        });
    });
