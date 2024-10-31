$(document).ready(function () {

    $('#registerpage').click(function () {
        $('.login').hide();
        $('.register').show();
    });

    $('#loginpage').click(function () {
        $('.register').hide();
        $('.login').show();
    });

    $('#login').click(function (e) {
        
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
    });

    $('#register').click(function (e) {
        
        const credentials = {
            name: $('#name').val(),
            email: $('#emailregister').val(),
            password: $('#passwordregister').val()
        };

        $.ajax({
            url: 'http://localhost:8000/register',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(credentials),
            success: function (userId) {
                sessionStorage.setItem("userid", userId);
                alert('Successfully registered!');
            },
            error: function (error) {
                alert(error.responseText);
                console.log('Error:', error.responseText);
            }
        });
    });
})