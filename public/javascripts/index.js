function regist() {
    var name = $("#name").val();
    var group = $("#group").val();
    var num = $("#num").val();
    var pwd = $("#pwd").val();
    var trip = $("#trip").val();
   
    if (isEmpty(group) == true) {
        alert("그룹을 선택해 주세요.");
        $("#group").focus();
        return;
    }else if (isEmpty(name) == true) {
        alert("이름을 입력해주세요.");
        $("#name").focus();
        return;
    }else if (isEmpty(num) == true || num.length != 11) {
        alert("전화번호를 11자리를 입력해주세요.");
        $("#num").focus();
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
        "pwd":pwd,
        "trip":trip

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
    if(!confirm("등록 취소 하시겠습니까?")){
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