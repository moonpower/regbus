function regist() {
    var name = $("#name").val();
    var group = $("#group").val();
    var num = $("#num").val();
    var pwd = $("#pwd").val();
    
    if (isEmpty(name) == true) {
        alert("이름을 입력해주세요.");
        $("#name").focus();
        return;
    }else if (isEmpty(num) == true) {
        alert("전화번호를 입력해주세요.");
        $("#num").focus();
        return;
    }else if (isEmpty(group) == true) {
        alert("그룹을 선택해 주세요.");
        $("#group").focus();
        return;
    }else if(isEmpty(pwd) == true ||pwd.length != 4){
        alert("비밀번호4자리를 입력해 주세요.");
        $("#pwd").focus();
        return;
    }
    
    var params = {
        "name": name,
        "group": group,
        "num": num,
        "pwd":pwd

    };
    $.ajax({
        type: "post",
        url: "./save",
        data: params,
        success: function (data, status) {
            if (data == "100") {
                alert("등록되었습니다.");
                location.reload();
            }else if(data =="111"){
                alert("더 이상 등록할 수 없습니다.");
            }else {
                alert("이미 등록되어 있습니다.");
            }
        },
        error: function (e) {
            alert("문제가 발생했습니다. 관리자에게 문의해주세요.");
        }
    })
}

function cancel(){
    var name = $("#name").val();
    var num = $("#num").val();
    var pwd = $("#pwd").val();
    
    if (isEmpty(name) == true) {
        alert("이름을 입력해주세요.");
        $("#name").focus();
        return;
    }else if (isEmpty(num) == true) {
        alert("전화번호를 입력해주세요.");
        $("#num").focus();
        return;
    }else if(isEmpty(pwd) == true ||pwd.length != 4){
        alert("비밀번호4자리를 입력해 주세요.");
        $("#pwd").focus();
        return;
    }
    
    var params = {
        "name": name,
        "num": num,
        "pwd":pwd

    };
    $.ajax({
        type: "post",
        url: "./delete",
        data: params,
        success: function (data, status) {
            if (data == "100") {
                alert("등록이 취소 되었습니다.");
                location.reload();
            } else {
                alert("일치하는 정보가 없습니다.");
            }
        },
        error: function (e) {
            alert("문제가 발생했습니다. 관리자에게 문의해주세요.");
        }
    });
}

function sendMail() {
    var name = $("#name").val();
    var pass = $("#pwd").val();
    var title = $("#title").val();
    var msg = $("#msg").val();
    var file = $("#file")[0].files[0];
    if (isEmpty(name)) {
        alert("이름을 입력해주세요.");
        return;
    }
    if (isEmpty(pass)) {
        alert("비밀번호를 입력해주세요.");
        return;
    }
    if (isEmpty(title)) {
        alert("제목 입력해주세요.");
        return;
    }
    if (isEmpty(msg)) {
        alert("내용을 입력해주세요.");
        return;
    }
    var formData = new FormData();
    formData.append("name", name);
    formData.append("pwd", pass);
    formData.append("title", title);
    formData.append("msg", msg);
    formData.append("file", file);
    $.ajax({
        type: "post",
        url: "/api/send/mail",
        processData: false,
        contentType: false,
        data: formData,
        success: function (data, status) {
            if (data.result == 1) {
                alert(data.message);
                $("#name").val("");
                $("#pwd").val("");
                $("#title").val("");
                $("#msg").val("");
                $("#file").val("");
            } else {
                alert(data.message);
            }
        },
        error: function (err) {
            alert("전송이 실패했습니다.");
        }
    })
}

function sendMission() {
    var code = $("#code").val();
    var select = $("#select").val();
    var title = $("#title").val();
    var msg = $("#msg").val();
    var file = $("#file")[0].files[0];
    if (isEmpty(code)) {
        alert("인증코드를 입력해 주세요.");
        return;
    }
    if (isEmpty(select)) {
        alert("받는 사람을 선택해 주세요.");
        return;
    }
    if (isEmpty(title)) {
        alert("제목 입력해 주세요.");
        return;
    }
    if (isEmpty(msg)) {
        alert("내용을 입력해 주세요.");
        return;
    }
    if(!confirm("보내시겠습니까?")){
        return;
    }
    var formData = new FormData();
    formData.append("code", code);
    formData.append("select", select);
    formData.append("title", title);
    formData.append("msg", msg);
    formData.append("file", file);
    $.ajax({
        type: "post",
        url: "/api/send/mission",
        processData: false,
        contentType: false,
        data: formData,
        success: function (data, status) {
            if (data.result == 1) {
                alert(data.message);
                $("#code").val("");
            } else {
                alert(data.message);
            }
        },
        error: function (err) {
            alert("전송이 실패했습니다.");
        }
    })
}

function sendMail2() {
    var name = $("#name").val();
    var pass = $("#pwd").val();
    var title = $("#title").val();
    var msg = $("#msg").val();
    var file = $("#file")[0].files[0];
    if (isEmpty(name)) {
        alert("이름을 입력해주세요.");
        return;
    }
    if (isEmpty(pass)) {
        alert("비밀번호를 입력해주세요.");
        return;
    }
    if (isEmpty(title)) {
        alert("제목 입력해주세요.");
        return;
    }
    if (isEmpty(msg)) {
        alert("내용을 입력해주세요.");
        return;
    }

    var formData = new FormData();
    formData.append("name", name);
    formData.append("pwd", pass);
    formData.append("title", title);
    formData.append("msg", msg);
    formData.append("file", file);
    $.ajax({
        type: "post",
        url: "/api/send/mail2",
        processData: false,
        contentType: false,
        data: formData,
        success: function (data, status) {
            if (data.result == 1) {
                alert(data.message);
                $("#name").val("");
                $("#pwd").val("");
                $("#title").val("");
                $("#msg").val("");
            } else {
                alert(data.message);
            }
        },
        error: function (err) {
            alert("전송이 실패했습니다.");
        }
    })
}


function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function isEmpty(str) {
    if (!str || str == "") {
        return true;
    }
    return false;
}

function draw(e) {
    //    alert("10일부터 사용이 가능합니다.");
    var name = $("#name").val();
    var pwd = $("#pwd").val();
    if (isEmpty(name) == true) {
        alert("이름을 입력해주세요.");
        return;
    }
    if (isEmpty(pwd) == true) {
        alert("비밀번호를 입력해주세요.");
        return;
    }
    var params = {
        "name": name,
        "pwd": pwd
    };
    $.ajax({
        type: "post",
        url: "./api/draw",
        data: params,
        success: function (data, status) {
            alert(data.message);
        },
        error: function (e) {
            alert("error draw");
        }
    })
}
/* Set the width of the side navigation to 250px */
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
}
/* Set the width of the side navigation to 0 */
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}