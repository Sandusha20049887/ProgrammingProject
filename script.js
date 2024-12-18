
$(document).ready(function () {

    const userId = sessionStorage.getItem("userid");
    const userName = sessionStorage.getItem("usern");
    $('#uname').append(userName);

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

    $('#newPost').click(function () {
        window.location.href = "/addUpdatePost.html";
    });
    
    $('#userPost').click(function () {
        window.location.href = "/userPost.html";
    });

    $("#searchAll").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        //alert(value);
        var noResults = true;
        $(".post-box").filter(function () {
          var isVisible = $(this).text().toLowerCase().indexOf(value) > -1;
          $(this).toggle(isVisible);
          if (isVisible) {
            noResults = false;
          }
        });
        if (noResults) {
          $("#no-results").show();
        } else {
          $("#no-results").hide();
        }
      });

    $('#logout').click(function () {
        sessionStorage.removeItem("userid");
        window.location.href = "/login.html";
    })

    $('#home').click(function () {
        window.location.href = "/index.html";
    });

    $(this).on('click', '.updatePost', function() {
        
        const postId = $(this).data('id');
        window.location.href = "/addUpdatePost.html?postid="+postId;
    });

    $(this).on('click', '.deletePost', function() {
        const postId = $(this).data('id');

        if (confirm("Are you sure?")) {
            $.ajax({
                // url: 'http://localhost:8000/deletePost/'+postId,
                url: 'https://smarlk.uksouth.cloudapp.azure.com/deletePost/'+postId,
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
        //url: 'http://localhost:8000/getPost',
        url: 'https://smarlk.uksouth.cloudapp.azure.com/getPost',    
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
        //url: 'http://localhost:8000/getPost/' + userId,
        url: 'https://smarlk.uksouth.cloudapp.azure.com/getPost/' + userId,
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
    //$('#posts').empty();
    //loop thorugh the records

    //posts.sort((a, b) => new Date(a.datePosted) - new Date(b.datePosted));

    posts.forEach(post => {
        var status = post.status;
        var color = "";

        var date = new Date(post.datePosted); 
        var formattedDate =   date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();

        switch(status) {
            case "unresolved":
               color = "bg-secondary"
             break;
            case "progressing":
                color = "bg-primary"
             break;
            case "resolved":
                color = "bg-success"
             break;
            default:
           }
        const postItem = `<div class="post-box list-group-item mt-1">
                            <div class="row">
                                <div class="col-6">
                                    <h5>${post.make} ${post.model}</h5>
                                </div>
                                <div class="col-6 text-right">
                                    <span class="${color} status">${status}</span>
                                </div>
                            </div>
                        <p>Year of manufacture : ${post.year}</p>
                        <p>Fault Description : ${post.faultDescription}</p>
                        <p>Garage Name : ${post.garageName}</p>
                        <p>Address : ${post.garageAddress}</p>
                        <p>Contact No : ${post.contactNo}
                         <span style="float:right; font-size: small;font-weight: bold;">${formattedDate}</span>
                        </p>
                    </div>`;
        $('#posts').append(postItem);
    });
}

function appendUserPosts(posts) {
    // Clear existing posts
    $('#userposts').empty();
    
    //loop thorugh the records
    posts.forEach(post => {

        var status = post.status;
        var color = "";

        var date = new Date(post.datePosted); 
        var formattedDate =   date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
        
        switch(status) {
            case "unresolved":
               color = "bg-secondary"
             break;
            case "progressing":
                color = "bg-primary"
             break;
            case "resolved":
                color = "bg-success"
             break;
            default:
           }

        const postItem = `<div class="list-group-item mt-1" data-id=${post._id}>
                        <div class="row">
                            <div class="col-6" style="display: flex; align-items: center;">
                                <h5>${post.make} ${post.model}</h5>
                                <span class="${color} status">${status}</span>
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
                        <p>Contact No : ${post.contactNo}
                         <span style="float:right; font-size: small;font-weight: bold;">${formattedDate}</span>
                        </p>
                    </div>`;
        $('#userposts').append(postItem);
    });
}
