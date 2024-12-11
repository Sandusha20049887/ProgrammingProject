// function to check empty fields

function checkRequiredFields(element) {
    let isValid = true;
    var form = element.closest('form')
    $(form).find('input[required], select[required]').each(function(){
        //console.log($(this).val().trim());
        if ($(this).val().trim() === '') {
            isValid = false;
            return false;
        }
    })
    return isValid
}

//function to validate email
function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
    return regex.test(String(email).toLowerCase()); 
}