window.onload = function(){ 
  
document.getElementById('#cpybtn') = document.querySelector("#cpybtn").onclick = function() {
  // Select the content
  document.querySelector("#copyinput").select();
  // Copy to the clipboard
  document.execCommand('copy');
  };
};
