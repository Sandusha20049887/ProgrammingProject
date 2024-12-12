var postId;
$(document).ready(function () {

    const userId = sessionStorage.getItem("userid");
    const userName = sessionStorage.getItem("usern");
    $('#uname').append(userName);

    if (userId) {
    } else {
        window.location.replace("/login.html");
    }

    $('#home').click(function () {
        window.location.href = "/index.html";
    });

    $('#userPost').click(function () {
        window.location.href = "/userPost.html";
    });

    const urlParams = new URLSearchParams(window.location.search);
    postId = urlParams.get('postid')

    if (postId) {
        $('.addPost').hide();
        $('.updatePost').show();
        getPostDetails(postId);
    } else {
        $('.updatePost').hide();
        $('.addPost').show();
    }

    $('#addPost').click(function (e) {
        e.preventDefault();

        const isValid = checkRequiredFields(this);
        if (!isValid) {
            alert("Please fill the required fields !")
        } else {
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
                //url: 'http://localhost:8000/addPost',
                url: 'https://smarlk.uksouth.cloudapp.azure.com/addPost',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(postDetails),
                success: function (resp) {
                    alert(resp);
                    //getUserPosts(userId);
                    window.location.replace("/index.html");
                },
                error: function (error) {
                    console.log('Error:', error);
                    alert('Record not added !');
                }
            });
        }
    });

    $('#updatePost').click(function (e) {
        e.preventDefault();
        //const postId = $('#postId').val();

        const isValid = checkRequiredFields(this);
        if (!isValid) {
            alert("Please fill the required fields !")
        } else {
            const postDetails = {
                _id: postId,
                make: $('#umake').val(),
                model: $('#umodel').val(),
                year: $('#uyear').val(),
                faultDescription: $('#ufaultDescription').val(),
                garageName: $('#ugarageName').val(),
                garageAddress: $('#ugarageAddress').val(),
                contactNo: $('#ucontactNo').val(),
                status: $('#ustatus').val(),
                userId: userId
            };
            console.log(postDetails);
            $.ajax({
                // url: 'http://localhost:8000/updatePost/' + postId,
                url: 'https://smarlk.uksouth.cloudapp.azure.com/updatePost/' + postId,
                type: 'PUT',
                contentType: 'application/json',
                data: JSON.stringify(postDetails),
                success: function (resp) {
                    alert(resp);
                    //getUserPosts(userId);
                    window.location.replace("/userPost.html");
                },
                error: function (error) {
                    console.log('Error:', error);
                    alert('Err - Record not added !');
                }
            });
        }
    });
});

function getPostDetails(postId) {
    $.ajax({
        //url: 'http://localhost:8000/getPostById/' + postId,
        url: 'https://smarlk.uksouth.cloudapp.azure.com/getPostById/' + postId,
        type: 'GET',
        success: function (postDtl) {
            $("#umake").val(postDtl[0].make);
            $("#umodel").val(postDtl[0].model);
            $("#uyear").val(postDtl[0].year);
            $("#ufaultDescription").val(postDtl[0].faultDescription);
            $("#ugarageName").val(postDtl[0].garageName);
            $("#ugarageAddress").val(postDtl[0].garageAddress);
            $("#ucontactNo").val(postDtl[0].contactNo);
            $("#ustatus").val(postDtl[0].status);
        },
        error: function (error) {
            console.log('Error:', error);
        }

    });
};
