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
            success: function (userId) {
                sessionStorage.setItem("userid", userId);
                window.location.href = "/index.html";
            },
            error: function (error) {
                console.log('Error:', error.responseText);
            }
        });
    })
})