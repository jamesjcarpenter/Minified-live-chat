window.onload = function(){ 
  
var copyText = document.getElementById("#copyinput");
document.getElementById("#cpybtn").onclick = function() {
  // Select the content
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    document.execCommand("copy");
  };
};
