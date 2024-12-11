// function to check empty fields

function checkRequiredFields(form) {
    let isValid = true;

    $(form).find(':input[required]').each(function () {
        if ($(this).val().trim() === '') {
            isValid = false;
            return isValid
        }
    })
}