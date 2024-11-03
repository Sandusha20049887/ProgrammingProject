$(document).read(function () {

    const userId = sessionStorage.getItem("userid");
    const postId = sessionStorage.getItem("postid");

    $('#uname').append(userId);

    if (userId) {
        getUserPosts(userId)
    } else {
        window.location.replace("/login.html");
    }

    if (postId) {
        $('.addPost').hide();
        $('.updatePost').show();
    }else{
        $('.updatePost').hide();
        $('.addPost').show();
    }

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
                //getUserPosts(userId);
            },
            error: function (error) {
                console.log('Error:', error);
                alert('Err - Record not added !');
            }
        });
    });

    $('#updatePost').click(function (e) {
        e.preventDefault();
        const postId = $('#postId').val();

        const postDetails = {
            make: $('#make').val(),
            model: $('#model').val(),
            year: $('#year').val(),
            faultDescription: $('#faultDescription').val(),
            garageName: $('#garageName').val(),
            garageAddress: $('#garageAddress').val(),
            contactNo: $('#contactNo').val(),
            status: $('#status').val(),
            userId: userId
        };
        console.log(postDetails);
        $.ajax({
            url: 'http://localhost:8000/updatePost/' + postId,
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(postDetails),
            success: function (resp) {
                alert(resp);
                //getUserPosts(userId);
            },
            error: function (error) {
                console.log('Error:', error);
                alert('Err - Record not added !');
            }
        });
    });
});