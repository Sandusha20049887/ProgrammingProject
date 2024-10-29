
$(document).ready(function() {

    $.ajax({
        url: 'http://localhost:8000/getPost', // Replace with your API URL
        type: 'GET',
        success: function(data) {
            appendPosts(data);
        },
        error: function(error) {
            console.error('Error:', error);
        }
    });


    $('#addPost').click(function(e){
        e.preventDefault();
        alert("clicked");
    });
});

function appendPosts(posts) {
    // Clear existing posts
    $('#posts').empty();
    //loop thorugh the records
    posts.forEach(post => {
        var postItem = `<div class="list-group-item mt-1">
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
