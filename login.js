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

        const isValid = checkRequiredFields(this); 
        if (isValid){
            const credentials = {
                email: $('#email').val(),
                password: $('#password').val()
            };        
    
            // $.ajax({
            //     url: 'http://localhost:8000/login',
            //     //url: 'https://20.0.156.77/login',
            //     type: 'POST',
            //     contentType: 'application/json',
            //     data: JSON.stringify(credentials),
            //     success: function (resp) {
            //         console.log(resp.userId);
            //         sessionStorage.setItem("userid", resp.userId);
            //         sessionStorage.setItem("usern", resp.usern);
            //         window.location.href = "/index.html";
            //     },
            //     error: function (error) {
            //         console.log('Error:', error.responseText);
            //         alert(error.responseText);
            //     }
            // });
        }else{
            alert("Please fill the required fields !")
        }
        
    });

    $('#register').click(function (e) {

        const credentials = {
            name: $('#name').val(),
            email: $('#emailregister').val(),
            password: $('#passwordregister').val()
        };

        $.ajax({
            url: 'http://localhost:8000/register',
            //url: 'https://20.0.156.77/register', 
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(credentials),
            success: function (resp) {
                sessionStorage.setItem("userid", resp.userId);
                sessionStorage.setItem("usern", resp.usern);
                alert('Successfully registered!');
                window.location.href = "/index.html";
            },
            error: function (error) {
                alert(error.responseText);
                console.log('Error:', error.responseText);
            }
        });
    });
})

