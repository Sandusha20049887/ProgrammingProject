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
        const validEmail = validateEmail($('#email').val());
         if (!isValid){
            alert("Please fill the required fields !")
        } else if(!validEmail){
            alert("Please enter a valid Email !")
        } else{
            const credentials = {
                email: $('#email').val(),
                password: $('#password').val()
            };        
    
            $.ajax({
                //url: 'http://localhost:8000/login',
                url: 'https://smarlk.uksouth.cloudapp.azure.com/login',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(credentials),
                success: function (resp) {
                    console.log(resp.userId);
                    sessionStorage.setItem("userid", resp.userId);
                    sessionStorage.setItem("usern", resp.usern);
                    window.location.href = "/index.html";
                },
                error: function (error) {
                    console.log('Error:', error.responseText);
                    alert(error.responseText);
                }
            });
            
        }
    });

    $('#register').click(function (e) {

        const isValid = checkRequiredFields(this); 
        const validEmail = validateEmail($('#emailregister').val());
         if (!isValid){
            alert("Please fill the required fields !")
        } else if(!validEmail){
            alert("Please enter a valid Email !")
        } else{
            const credentials = {
                name: $('#name').val(),
                email: $('#emailregister').val(),
                password: $('#passwordregister').val()
            };
    
            $.ajax({
                //url: 'http://localhost:8000/register',
                url: 'https://smarlk.uksouth.cloudapp.azure.com/register', 
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
        }
    });
})

