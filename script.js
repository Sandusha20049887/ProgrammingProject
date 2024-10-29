
$(document).ready(function() {

    $.ajax({
        url: 'http://localhost:8080/getPost', // Replace with your API URL
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
    $('#post').empty();
    //loop thorugh the records
    posts.forEach(post => {
        console.log(post.make);
    });
}
