window.onload = function(){ 
  
var copybutton;  
document.getElementById('#cpybtn') = copybutton;
copybutton = document.querySelector("#cpybtn").onclick = function() {
  // Select the content
  document.querySelector("#copyinput").select();
  // Copy to the clipboard
  document.execCommand('copy');
  };
};
