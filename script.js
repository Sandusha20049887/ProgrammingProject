
$(document).ready(function () {

    $.ajax({
        //url: 'http://localhost:8000/getPost',
        url:'https://moonlit-skeleton-97j65qrwrrj6f7pjq-8000.app.github.dev/getPost',
        type: 'GET',
        success: function (data) {
            appendPosts(data);
        },
        error: function (error) {
            console.log('Error:', error);
        }
    });


    $('#addPost').click(function (e) {
        e.preventDefault();

        var formData = {
            make: $('#make').val(),
            model: $('#model').val(),
            year: $('#year').val(),
            faultDescription: $('#faultDescription').val(),
            garageName: $('#garageName').val(),
            garageAddress: $('#garageAddress').val(),
            contactNo: $('#contactNo').val(),
            status: $('#status').val()
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
