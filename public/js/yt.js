var conn;
var destId;
var peer = new Peer({key: '3hqzt80o2crz4cxr'});
var request = ["start", "restart", "pause", "chat"];

function showOnStatus() {
    document.getElementById("dst-id").diabled = "disabled";
    document.getElementById("status").innerHTML = "connect";
}

function showOffStatus() {
    document.getElementById("status").innerHTML = "no connection";
}

function showWhileStatus() {
    document.getElementById("dst-id").diabled = "disabled";
    document.getElementById("status").innerHTML = "connecting...";
}

function setHistory(msg) {
    console.log(msg);
}

function setChatHistory(msg) {
    var msg_history_obj = document.getElementById("msg-history");
    msg_history_obj.value = msg + "\n" + msg_history_obj.value;
}

function sendContent(data) {
    conn.send(JSON.stringify(data));
}

//YouTube操作リクエストの送信
function sendRequest(request_num, ytId, time, message) {
    var data = {
        "kind": request[request_num],
        "id": ytId,
        "time": time,
        "msg": message
    };
    
    sendContent(data);
}

//チャット送信
function msgSend() {
    var msg_obj = document.getElementById("msg");
    var message = msg_obj.value;
    msg_obj.value = "";
    var data = {
        "kind": "chat",
        "id": "-1",
        "time": "-1",
        "msg": message
    };
    sendContent(data);
    var msg_history_obj = document.getElementById("msg-history");
    msg_history_obj.value = "You : " + message + "\n" + msg_history_obj.value;
    
}

//受信
function receivedContent(json_data) {
    var rcv_data = JSON.parse(json_data);
    requestHandler(rcv_data);
}

//接続ボタンリスナー
function ConnectButtonListener() {
    document.getElementById("cnt-btn").disabled = "disabled";
    destId = document.getElementById("dst-id").value;
    showWhileStatus();
    conn = peer.connect(destId);
    conn.on('open', function() {
        conn.on('data', function(data) {
            receivedContent(data);
            //console.log("received: " + data);
        });
    });
    showOnStatus();
}


/* イベントリスナ */

//PeerJsサーバと接続完了した場合に発生
peer.on('open', function(id) {
    document.getElementById("myId").innerHTML = id;
});

//相手のホストと接続完了した時に発生 接続ボタンを押したホストは実行しない
peer.on('connection', function(con) {
    showOnStatus();
    conn = con;
    conn.on('data', function(data) {
        receivedContent(data);
        //console.log("received: " + data);
    });
    
});
