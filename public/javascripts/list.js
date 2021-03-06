function logout() {
    if(!confirm("로그아웃 하시겠습니까?")){
        return;
    }    

    $.ajax({
        type: "post",
        url: "./logout",
        success: function (data, status) {
            if (data == "100") {
                location.reload();
            }else if(data =="111"){
                alert("로그아웃에 실패했습니다.");
            }else {
                alert("이미 로그아웃 되어 있습니다.");
            }
        },
        error: function (e) {
            alert("문제가 발생했습니다. 관리자에게 문의해주세요.");
        }
    })
}

function checkManager(input){
    var num=input.getAttribute("data-num");
    var checked = input.checked;
    $.ajax({
        type: "post",
        data:{num:num,checked:checked},
        url: "./check/manager",
        success: function (data, status) {
            if(data =="111"){
                alert("설정에 실패 했습니다.");
            }
        },
        error: function (e) {
            alert("문제가 발생했습니다. 관리자에게 문의해주세요.");
        }
    })
}

function checkin(input){
    var num=input.getAttribute("data-num");
    var name=input.getAttribute("name");
    var checked = input.checked;
    $.ajax({
        type: "post",
        data:{num:num,checked:checked,name:name},
        url: "./checkin/user",
        success: function (data, status) {
            if(data =="111"){
                alert("설정에 실패 했습니다.");
            }else{
                if(name=="seoul"){
                    updateCheckin1Total();
                }else{
                    updateCheckin2Total();
                }
            }
        },
        error: function (e) {
            alert("문제가 발생했습니다. 관리자에게 문의해주세요.");
        }
    })
}

function updateCheckin1Total(){
    var ele = document.querySelector(".checkin1-total");
    var nodes = document.querySelectorAll("[name='seoul']:checked");
    ele.innerHTML = nodes.length+"명";
}

function updateCheckin2Total(){
    var ele = document.querySelector(".checkin2-total");
    var nodes = document.querySelectorAll("[name='suncheon']:checked");
    ele.innerHTML = nodes.length+"명";
}