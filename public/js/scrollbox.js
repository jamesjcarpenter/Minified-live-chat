$(".ui.button.left").click(function( event ) {
  event.preventDefault();
  $('.shape').shape('flip left');
});
$(".ui.button.right").click(function( event ) {
  event.preventDefault();
  $('.shape').shape('flip right');
});
