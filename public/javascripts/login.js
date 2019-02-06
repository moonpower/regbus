function login() {
    
    var num = $("#num").val();
    var pwd = $("#pwd").val();
    
    if (isEmpty(num) == true || num.length != 11) {
        alert("전화번호를 11자리를 입력해주세요.");
        $("#num").focus();
        return;
    }else if(isEmpty(pwd) == true ||pwd.length != 4){
        alert("비밀번호4자리를 입력해 주세요.");
        $("#pwd").focus();
        return;
    }
    
    var params = {
        "num": num,
        "pwd":pwd
    };
    $.ajax({
        type: "post",
        url: "./login",
        data: params,
        success: function (data, status) {
            if (data == "100") {
                alert("로그인되었습니다.");
                location.href ='/list';
            }else if(data =="111"){
                alert("로그인 권한이 없습니다.");
            }else if(data="101") {
                alert("이미 로그인 되어 있습니다.");
            }else if(data="110"){
                alert("잘 못된 아이디 또는 비밀번호입니다.");
            }
        },
        error: function (e) {
            alert("문제가 발생했습니다. 관리자에게 문의해주세요.");
        }
    })
}

