
$(document).ready(function () {

    const userId = sessionStorage.getItem("userid");

    

    $('#uname').append(userId);
    if (userId) {
        getPosts();
    } else {
        window.location.replace("/login.html");
    }

    if (userId) {
        getUserPosts(userId)
    } else {
        window.location.replace("/login.html");
    }

    $('#userPost').click(function () {
        window.location.href = "/userPost.html";
    });

    $('#addPost').click(function (e) {
        e.preventDefault();
        const today = new Date();

        const postDetails = {
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
        console.log(postDetails);
        $.ajax({
            url: 'http://localhost:8000/addPost',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(postDetails),
            success: function (resp) {
                alert(resp);
                getUserPosts(userId);
            },
            error: function (error) {
                console.log('Error:', error);
                alert('Err - Record not added !');
            }
        });
    });

    $('#logout').click(function () {
        sessionStorage.removeItem("userid");
        window.location.href = "/login.html";
    })

    $('#home').click(function () {
        window.location.href = "/index.html";
    });

    $(this).on('click', '.updatePost', function() {
        alert("Button clicked!");
    });

    $(this).on('click', '.deletePost', function() {
        const postId = $(this).data('id');

        if (confirm("Are you sure?")) {
            $.ajax({
                url: 'http://localhost:8000/deletePost/'+postId,
                type: 'DELETE',
                contentType: 'application/json',
                success: function (resp) {
                    alert(resp);
                    $(`div[data-id=${postId}]`).remove();
                },
                error: function (error) {
                    console.log('Error:', error);
                    alert('Err - Record not Deleted !');
                }
            });
        }
        return false;
    });
});

function getPosts() {
    $.ajax({
        url: 'http://localhost:8000/getPost',
        type: 'GET',
        success: function (data) {
            appendPosts(data);
        },
        error: function (error) {
            console.log('Error:', error);
        }
    });
}

function getUserPosts(userId) {
    $.ajax({
        url: 'http://localhost:8000/getPost/' + userId,
        type: 'GET',
        success: function (data) {
            appendUserPosts(data);
        },
        error: function (error) {
            console.log('Error:', error);
        }
    });
}

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

function appendUserPosts(posts) {
    // Clear existing posts
    $('#userposts').empty();
    //loop thorugh the records
    posts.forEach(post => {
        const postItem = `<div class="list-group-item mt-1" data-id=${post._id}>
                        <div class="row">
                            <div class="col-6">
                                <h5>${post.make} ${post.model}</h5>
                            </div>
                            <div class="col-6 text-right">
                                <button class="updatePost btn btn-primary" data-id=${post._id}> Update</button>
                                <button class="deletePost btn btn-warning" data-id=${post._id}> Delete</button>
                            </div>
                        </div>
                        <p>Year of manufacture : ${post.year}</p>
                        <p>Fault Description : ${post.faultDescription}</p>
                        <p>Garage Name : ${post.garageName}</p>
                        <p>Address : ${post.garageAddress}</p>
                        <p>Contact No : ${post.contactNo}</p>
                    </div>`;
        $('#userposts').append(postItem);
    });
}
