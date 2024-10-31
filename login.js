$(document).ready(function () {

    $('#login').click(function () {

        const credentials = {
            email: $('#email').val(),
            password: $('#password').val()
        };

        $.ajax({
            url: 'http://localhost:8000/login',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(credentials),
            success: function (resp) {
                console.log(resp);
            },
            error: function (error) {
                console.log('Error:', error.responseText);
            }
        });
    })

    //sessionStorage.setItem("userid", "123");
    $('#logout').click(function () {
        sessionStorage.removeItem("userid");
        $(this).redirect("/login.html");
    })
})