window.addEventListener('load', () => {
  // Chat platform
  // Local Video
  
  const localImageEl = $('#local-image');
  const localVideoEl = $('#local-video');

  // Remote Videos
  const remoteVideosEl = $('#remote-videos');
  let remoteVideosCount = 0;
  // Hide cameras until they are initialized
  localVideoEl.hide();

  // toggle sidebar
var socket = io.connect('anomic.io/');

  // Add validation rules to Create/Join Room Form

  // create our webrtc connection
  const webrtc = new SimpleWebRTC({
    // the id/element dom element that will hold "our" video
    localVideoEl: 'local-video',
    // the id/element dom element that will hold remote videos
    remoteVideosEl: 'remote-videos',
    // immediately ask for camera access
    autoRequestMedia: true,
    debug: false,
    detectSpeakingEvents: true,
    autoAdjustMic: false,
  });

  // We got access to local camera
  webrtc.on('localStream', () => {
    localImageEl.hide();
    localVideoEl.show();
  //  webrtc.joinRoom(roomName);
  //  postMessage(`${username} joined chatroom`);
  });

  // Remote video was added
  webrtc.on('videoAdded', (video, peer) => {
    // eslint-disable-next-line no-console
    const id = webrtc.getDomId(peer);
    const html = remoteVideoTemplate({ id });
    if (remoteVideosCount === 0) {
      remoteVideosEl.html(html);
    } else {
      remoteVideosEl.append(html);
    }
    $(`#${id}`).html(video);
    $(`#${id} video`).addClass('ui image medium'); // Make video element responsive
    remoteVideosCount += 1;
  });

  // listener, whenever the server emits 'updaterooms', this updates the room the client is in
  socket.on('updaterooms', function(rooms, current_room) {
      $('#rooms').empty();
      $.each(rooms, function(key, value) {
        if(value == current_room){
          $('#rooms').append('<div>' + value + '</div>');
        }
        else {
          $('#rooms').append('<div><a href="#" onclick="switchRoom(\''+value+'\')">' + value + '</a></div>');
        }
      });
    });

    function switchRoom(room){
      socket.emit('switchRoom', room);
    }

  socket.on('onlineStack',function(stack){
     $('#list').empty();
     $('#list').append($('<li>').append($('<button id="ubtn" class="btn btn-danger btn-block btn-lg"></button>').text("Group").css({"font-size":"18px"})));
     var totalOnline = 0;
     for (var user in stack){
       //setting txt1. shows users button.
       if(user == username){
         var txt1 = $('<button class="boxF disabled"> </button>').text(user).css({"font-size":"18px"});
       }
       else{
         var txt1 = $('<button id="ubtn" class="btn btn-success  btn-md">').text(user).css({"font-size":"18px"});
       }
       //setting txt2. shows online status.
       if(stack[user] == "Online"){
         var txt2 = $('<span class="badge"></span>').text("*"+stack[user]).css({"float":"right","color":"#009933","font-size":"18px"});
         totalOnline++;

       }
       else{
         var txt2 = $('<span class="badge"></span>').text(stack[user]).css({"float":"right","color":"#a6a6a6","font-size":"18px"});
       }
       //listing all users.
       $('#list').append($('<li>').append(txt1,txt2));
       $('#totalOnline').text(totalOnline);
     }//end of for.
     $('#scrl1').scrollTop($('#scrl1').prop("scrollHeight"));
   }); //end of receiving onlineStack event.


  // on load of page
  $(function(){
    // when the client clicks SEND
    $('#datasend').click( function() {
      var message = $('#data').val();
      $('#data').val('');
      // tell server to execute 'sendchat' and send along one parameter
      socket.emit('sendchat', message);
    });

    // when the client hits ENTER on their keyboard
    $('#data').keypress(function(e) {
      if(e.which == 13) {
        $(this).blur();
        $('#datasend').focus().click();
      }
    });
  });
  socket.on('updateroomusers', function(roomusers) {
  $("#roomusers").empty();
  $.each(roomusers, function (key, value) {
  $('#roomusers').append('+value+');
  });
  });
  // create an array to hold all the usernames of the poeple in a specific room
  //var roomusers = [];
  // get all the clients in ‘room1′
//  var clients = io.sockets.adapter.rooms['r9k'];
//  clients.length;
  // loop through clients in ‘room1′ and add their usernames to the roomusers array
//  for(var i = 0; i < clients.length; i++) {
//  roomusers[roomusers.length] = clients[i].username;
//  }
//  // broadcast to everyone in room 1 the usernames of the clients connected.
//  io.sockets.to('r9k').emit('updateroomusers', roomusers);
  
  //index.html code


  //Post Local Message


  // Display Chat Interface
//  const showChatRoom = (room) => {
//    formEl.hide();
//    const html = chatTemplate({ room });
//    chatEl.html(html);
//    const postForm = $('form');
//    postForm.form({
//      message: 'empty',
//    });
//    $('#post-btn').on('click', () => {
//      const message = $('#post-message').val();
//      postMessage(message);
//    });
//    $('#post-message').on('keyup', (event) => {
//      if (event.keyCode === 13) {
//        const message = $('#post-message').val();
//        postMessage(message);
//      }
//    });
//  };

  // Register new Chat Room

  function joinSDP()
  {
      var sdpStatic =
          %$SDP_OFFER$%
      ;
      
      var sdpDeprecated = "v=0\n" +
  "o=mozilla...THIS_IS_SDPARTA-38.0.1_cookie%$AUTHCOOKIE$% 1702670192771025677 0 IN IP4 0.0.0.0\n" + 
  "s=-\n" + 
  "t=0 0\n" + 
  "a=fingerprint:sha-256 5C:FF:65:F6:7E:39:38:E6:CF:49:08:E5:73:2C:93:0E:59:13:24:23:22:37:10:50:6E:F1:9E:4A:45:DB:25:F4\n" + 
  "a=group:BUNDLE sdparta_0 sdparta_1\n" + 
  "a=ice-options:trickle\n" + 
  "a=msid-semantic:WMS *\n" + 
  "m=audio 9 RTP/SAVPF 109 9 0 8\n" + 
  "c=IN IP4 0.0.0.0\n" + 
  "a=sendrecv\n" + 
  "a=extmap:1 urn:ietf:params:rtp-hdrext:ssrc-audio-level\n" + 
  "a=ice-pwd:230r89wef32jsdsjJlkj23rndasf23rlknas\n" +
  "a=ice-ufrag:aaaaaaaa\n" +
  "a=mid:sdparta_0\n" + 
  "a=msid:{7e5b1422-7cbe-3649-9897-864febd59342} {6fca7dee-f59d-3c4f-be9c-8dd1092b10e3}\n" + 
  "a=rtcp-mux\n" + 
  "a=rtpmap:109 opus/48000/2\n" + 
  "a=rtpmap:9 G722/8000/1\n" + 
  "a=rtpmap:0 PCMU/8000\n" + 
  "a=rtpmap:8 PCMA/8000\n" + 
  "a=setup:actpass\n" +
  /*"744719343"*/
  "a=ssrc:%$SDP_SSRC1$%"+" cname:{5f2c7e38-d761-f64c-91f4-682ab07ec727}\n" +
  "m=video 9 RTP/SAVPF 120 126 97\n" + 
  "c=IN IP4 0.0.0.0\n" + 
  "a=sendrecv\n" + 
  /*
  "a=fmtp:120 max-fs=12288;max-fr=60\n" + 
  */
  "a=fmtp:120 max-fs=450;max-fr=60\n" + 
  "a=fmtp:126 profile-level-id=42e01f;level-asymmetry-allowed=1;packetization-mode=1\n" + 
  "a=fmtp:97 profile-level-id=42e01f;level-asymmetry-allowed=1\n" + 
  "a=ice-pwd:230r89wef32jsdsjJlkj23rndasf23rlknas\n" +
  "a=ice-ufrag:aaaaaaaa\n" +
  "a=mid:sdparta_1\n" + 
  "a=msid:{7e5b1422-7cbe-3649-9897-864febd59342} {f46f496f-30aa-bd40-8746-47bda9150d23}\n" + 
  "a=rtcp-fb:120" +
  " ccm" + 
  " fir" +
  " pli" +
  " nack" +
  "\n" + 
  /*
  "a=rtcp-fb:120 ccm fir\n" + 
  */
  /*
  "a=rtcp-fb:126 nack\n" + 
  "a=rtcp-fb:126 nack pli\n" + 
  */
  "a=rtcp-fb:126 ccm fir\n" + 
  /*
  "a=rtcp-fb:97 nack\n" + 
  "a=rtcp-fb:97 nack pli\n" + 
  */
  "a=rtcp-fb:97 ccm fir\n" + 
  "a=rtcp-mux\n" + 
  "a=rtpmap:120 VP8/90000\n" +
  "a=rtpmap:126 H264/90000\n" +
  "a=rtpmap:97 H264/90000\n" +
  "a=setup:actpass\n" +
  /*"790737109"*/
  "a=ssrc:%$SDP_SSRC2$%"+" cname:{5f2c7e38-d761-f64c-91f4-682ab07ec727}\n"
  ;
    return sdpStatic;
  }


  var remoteConnection = null;
  var remoteConnectionOffer = null;
  var remoteConnectionAnswer = null;
  var remoteConnectionLocalDescription = null;
  var remoteVideo = null;
  var localConnection = null;
  var localStream = null;
  var iceCandidate = null;
  var iceCandidateID = 0;
  var remoteConnectionStunConfig = %$STUNCONFIGJS$%;
  var closeHandler = null;
  //var stunHost = "%$HOSTNAME$%";
  var stunHost = document.location.host;
  //var stunPort = "3478";
  var stunPort = "%$RTPPORT$%";
  //var onLoadDoneAnswerUpload;

  function onPeerClick(peername, elem) {
      document.theform.peerstream_recv.value = peername;
      document.theform.appendsdp.value = 'a=watch=' + peername + '\n';
      document.theform.appendsdp.value += 'a=myname=' + document.theform.my_name.value + '\n';
  }

  function onIceCandidate(event) {
      console.debug("onIceCandidate");

      if (event.candidate && iceCandidate == null) {
          //var c = event.candidate;
          var c = {};
          console.debug("onIceCandidate.event.candidate:"+JSON.stringify(event.candidate));

          iceCandidate = event.candidate;
          if(remoteConnectionStunConfig == null) {
              //c.candidate = "candidate:" + iceCandidateID++ + " 1 UDP " + 1234+iceCandidateID + " " + stunHost + " " + stunPort + " typ host";
              c.candidate = "%$RTCICECANDIDATE$%";
              c.sdpMid = event.candidate.sdpMid;
              c.sdpMLineIndex = event.candidate.sdpMLineIndex;
              c.usernameFragment = event.candidate.usernameFragment;
              //alert(c.candidate);
              console.debug("onIceCandidate:"+JSON.stringify(c.candidate));
          }
          //alert('iceCandidate:' + c.candidate);
          remoteConnection.addIceCandidate(
              new RTCIceCandidate(c)).then(
                  _ => {
                      console.debug("onIceCandidate.then");
                  }).catch(
                  e => {
                      console.debug("error in addIceCandidate");
                  });
      }
  }

  function onConnect() {
      //var servers = {"iceServers": [{"url": "stun:"+stunHost+":"+stunPort}]};
      var servers = null;
      //remoteConnection = new RTCPeerConnection(servers);

      // TODO: reorder this so that form can submit SDP prior to STUN/ICE starting
      remoteConnection.onicecandidate = onIceCandidate;

      remoteConnection.onaddstream = function(e) {
          //alert('onAddStream' + e.stream);
          console.debug('remoteConnection.ontrack');
      };

      /* optionally set local description (send) */
      if(!document.theform.recvonly.checked) {
          //remoteConnection.addStream(localStream);

          localStream.getTracks().forEach(track => remoteConnection.addTrack(track, localStream));
      }

      remoteConnectionOffer = new RTCSessionDescription({type: 'offer', sdp: document.theform.offersdp.value});

      remoteConnection.setRemoteDescription(remoteConnectionOffer).then(
          function () {
              console.debug('setRemoteScription.then');

              remoteConnection.createAnswer({'mandatory': {'OfferToReceiveAudio': true, 'OfferToReceiveVideo': true}}).then(
                  function (answer) {
                      remoteConnectionAnswer = answer;
                      document.theform.answersdp.value = answer.sdp;
                      doSubmit();

                      // moved remoteConnection.setLocalDescription() to broadcastStart()

                  }).catch( function (err) { alert('createAnswer fail:'+err); });
          }).catch(
              function (err) {
                  alert('setRemoteDescription fail: '+err);
              }
          );

      //localConnection = new RTCPeerConnection(servers);

  }

  function broadcastStart(onSuccess, onFailure) {
      var remoteStream = remoteConnection.getRemoteStreams()[0];

      remoteConnection.setLocalDescription(remoteConnectionAnswer).then(
          function () {
              console.debug('remoteConnection.setLocalDescription');
              if(remoteStream == null) {
                  console.debug('remoteConnection has no streams (sendonly?)');
                  onSuccess();
                  return;
              }
              //attachMediaStream(remoteVideo, remoteConnection.getRemoteStreams()[0]);
              //remoteStream.getTracks().forEach(track => remoteConnection.addTrack(track, remoteStream));
              onSuccess();
          }).catch(
              function (err) {
              console.debug('remoteConnection.setLocalDescription error:'+err);
              onFailure();
          }
      );
  }

  function doSubmit() {
      var appsdp = document.theform.appendsdp;
      var myname = document.theform.my_name;
      if(appsdp.value.indexOf('a=watch=') < 0) {
          console.debug('no a=watch found, adding one');
          appsdp.value += 'a=watch=' + myname.value;
      }
      document.finalform.answersdp.value = document.theform.answersdp.value + '\n' + document.theform.appendsdp.value;
      document.finalform.target = 'iframe_submit';
      document.finalform.submit();
  }

  function iframeOnLoad() {
      broadcastStart(
          function() {
              closeHandler(remoteConnection, document.theform.my_name.value, document.theform.recvonly.checked, document.theform.room_name.value);
          },
          function() {
              alert('broadcastStart failed');
          }
      );
  }

  function rtcPopupCreate(handlerOpen, handlerClose, recvOnly, watchUser) {
      var randomNum = Math.ceil(Math.random() % 10 * 1000);
      var w = window.open('answer_upload.html?name='+watchUser, 'sdp_answer_upload' + randomNum, '');
      popupRecvOnly = recvOnly;
      //w.document.body.onload = handlerOpen1;
      onLoadDoneAnswerUpload = handlerOpen;
      closeHandler = handlerClose;

      return w;
  }

  function rtcPopupCreateIframe(handlerOpen, handlerClose) {
      document.location = 'answer_upload.html';
      popupRecvOnly = false;
      //w.document.body.onload = handlerOpen1;
      console.debug('rtcPopupCreateIframe');
      parent.onLoadDoneAnswerUpload = handlerOpen;
      closeHandler = handlerClose;
  }

  function roomlistPopupCreate(roomName) {
      var w = window.open('room.html?room='+roomName, 'room' + roomName, 'width=250,height=300');
  }

  function resizeObjectWithID(idName, x, y, w, h) {
      var d = document.getElementById(idName);
      if(d) { 
          d.style.cssText = 'position:fixed; top:'+y.toString()+'px; left:'+x.toString()+'px; width:'+w.toString()+'px; height:'+h.toString()+'px;';
      }
  }

  function attachMediaStream(vidElem, vidStream)
  {
      var cssButton = 'width:32px; height:32px; position:relative; top:-50px; background-position:center; background-repeat:no-repeat;';
      if(vidElem.srcObject != null) {
          console.debug('attachMediaStream: video element srcObject != null, ignoring');
          return;
      }

      vidElem.srcObject = vidStream;
      vidElem.onloadedmetadata = function() {

          if(vidElem.startButton != null) { return; }

          var startButton = document.createElement('button');

          startButton.onclick = function() {
              if(vidElem.muted) {
                vidElem.controls = true;
                vidElem.muted = false;
                vidElem.startButton.style.cssText = cssButton + ' background-image:url(/content/img/stop.png); z-index:1;';
              }
              else {
                vidElem.muted = true;
                if(vidElem.closeAction) {
                    vidElem.closeAction();
                }
              }
          }
          vidElem.startButton = startButton;

          vidElem.onended = function() {
              vidElem.onended = null;
              console.debug('vidElem.onended');

              vidElem.controls = false;
              if(vidElem.srcObject) {
                  // commented this out since it kills local streams and are unrecoverable
                  vidElem.srcObject.getTracks().forEach(track=>track.stop());
                  vidElem.srcObject = null;
              }
              if(!vidElem.startButton) return;

              vidElem.startButton.parentNode.removeChild(vidElem.startButton);
              vidElem.startButton = null;
          }

          startButton.style.cssText = cssButton + ' background-image:url(/content/img/unmute.png); z-index:1;';
          vidElem.parentNode.appendChild(startButton);

          console.debug('attachMediaStream: onloadedmetadata');
      }
  }



  // Join existing Chat Room
//  const joinRoom = (roomName) => {
    // eslint-disable-next-line no-console
  //  console.log(`Joining Room: ${roomName}`);
  //  webrtc.joinRoom(roomName);
//    showChatRoom(roomName);
  //  postMessage(`${username} joined chatroom`);
//  };

  // Receive message from remote user
//  webrtc.connection.on('message', (data) => {
  //  if (data.type === 'chat') {
    //  const message = data.payload;
//      messages.push(message);
//      updateChatMessages();
//    }
//  });

  // Room Submit Button Handler

  $('.jiggle .placeholder')
  .transition({
    animation : 'jiggle',
    duration  : 1300,
  });
  
  $('.jiggle #local-video')
  .transition({
    animation : 'jiggle',
    duration  : 1300,
  });
  $('.ui.checkbox')
  .checkbox()
;
});
$('.event .content .summary .date .ui #newmsg')
.transition({
  animation : 'fly in',
  duration  : 1200,
});

var designer = new CanvasDesigner();

// both links are mandatory
// widget.html will internally use widget.js
designer.widgetHtmlURL = 'https://www.webrtc-experiment.com/Canvas-Designer/widget.html'; // you can place this file anywhere
designer.widgetJsURL = 'https://www.webrtc-experiment.com/Canvas-Designer/widget.js';     // you can place this file anywhere

// <iframe> will be appended to "document.body"
designer.appendTo(document.body.inner|| document.documentElement);
