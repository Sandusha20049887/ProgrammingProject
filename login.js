$(document).ready(function () {

    $('#login').click(function () {
        sessionStorage.removeItem("userid");
        $(this).redirect("/login.html");
    })

    //sessionStorage.setItem("userid", "123");
    $('#logout').click(function () {
        sessionStorage.removeItem("userid");
        $(this).redirect("/login.html");
    })
})