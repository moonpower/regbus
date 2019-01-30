$(document).ready(function () {
    var socket = io.connect('http://localhost');
//아이디,채팅방 이름을 입력 후 번트을 누르면 이벤트 실행
    $('#enter').click(function () {
        var userid = document.getElementById('userid');
        var roomname = document.getElementById('roomname');

//서버로 접속 유저아이디와 접속한 채팅방 이름을 전송
        socket.emit('join', {
            'userid': userid.value,
            'roomname': roomname.value
        });

        document.getElementById('log').style.display = 'none';
        document.getElementById('chat').style.display = 'block';
    });
//새로 접속한 사용자가 있을 경우 알림
    socket.on('join', function (data) {
        alert(data);
        $('#txtappend').append('<dd style="margin:0px;>' + data + '님이 접속하셨습니다.</dd>');

    });

//메시지 전송 이벤트
    $('#btn').click(function () {
        var message = $('#txt').val();
        socket.emit('message', message);
    });
    socket.on('message', function (data) {
        $('#txtappend').append('<dd style="margin:0px;">' + data + '</dd>');
        $('#txt').val('');
    });
});