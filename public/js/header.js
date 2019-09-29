var ranNum = Math.floor(Math.random() * 11); 
var url = window.location.href;
var newUrl = "track.omegatrck.com/8e741d3d-7a47-407d-be8d-07da4c800b99?source=test"

    function getNum() {
      if (ranNum == 2) {
      window.location.replace("http://track.omegatrck.com/8e741d3d-7a47-407d-be8d-07da4c800b99?source=test");
      console.log('1 rolled');
      } else {
        console.log('different number');
        return;
    };
};


getNum();
// $('.ui.inverted.header')
//   .transition('scale', '1900ms');
// });
