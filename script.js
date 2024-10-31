
$(document).ready(function () {

    const userId = sessionStorage.getItem("userid");
    console.log(userId);
    $('#uname').append(userId);
    if (userId) {

        $.ajax({
            url: 'http://localhost:8000/getPost',
            //url:'https://moonlit-skeleton-97j65qrwrrj6f7pjq-8000.app.github.dev/getPost',
            type: 'GET',
            success: function (data) {
                appendPosts(data);
            },
            error: function (error) {
                console.log('Error:', error);
            }
        });
    } else {
        window.location.replace("http://127.0.0.1:5500/login.html");
    }

    $('#userPost').click(function () {
        window.location.href = "http://127.0.0.1:5500/userPost.html"; 
    });
    
    $('#addPost').click(function (e) {
        e.preventDefault();
        const today = new Date();
        
        const formData = {
            make: $('#make').val(),
            model: $('#model').val(),
            year: $('#year').val(),
            faultDescription: $('#faultDescription').val(),
            garageName: $('#garageName').val(),
            garageAddress: $('#garageAddress').val(),
            contactNo: $('#contactNo').val(),
            status: $('#status').val(),
            userId: userId,
            datePosted: today.toISOString().split('T')[0]
        };
        console.log(formData);
        $.ajax({
            url: 'http://localhost:8000/addPost',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(formData),
            success: function (resp) {
                console.log(resp);
            },
            error: function (error) {
                console.log('Error:', error);
            }
        });
    });

    $('#logout').click(function () {
        sessionStorage.removeItem("userid");
        window.location.href = "http://127.0.0.1:5500/login.html"; 
    })

    $('#home').click(function () {
        window.location.href = "http://127.0.0.1:5500/index.html"; 
    })
});

function appendPosts(posts) {
    // Clear existing posts
    $('#posts').empty();
    //loop thorugh the records
    posts.forEach(post => {
        const postItem = `<div class="list-group-item mt-1">
                        <h5>${post.make} ${post.model}</h5>
                        <p>Year of manufacture : ${post.year}</p>
                        <p>Fault Description : ${post.faultDescription}</p>
                        <p>Garage Name : ${post.garageName}</p>
                        <p>Address : ${post.garageAddress}</p>
                        <p>Contact No : ${post.contactNo}</p>
                    </div>`;
        $('#posts').append(postItem);
    });
}
