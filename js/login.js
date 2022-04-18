var form = document.getElementById('login');
var acc = document.getElementById('acc');
var passwd = document.getElementById('passwd');

function login() {
    if (acc.value == "" || passwd.value == "") {
        alert("账号或密码不能为空(可以选择游客登录)\n账号：admin，密码：123456");
        return false;
    } else if (acc.value != "admin" || passwd.value != "123456") {
        alert("账号或密码错误(可以选择游客登录)\n账号：admin，密码：123456");
        return false;
    }
}

form.onsubmit = function () {
    return login();
}