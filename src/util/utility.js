


export function validateEmail(email) {

    let isEmailValid = true;
    if (email) {
        let emailRegex = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        isEmailValid = emailRegex.test(email);
    }
    return isEmailValid;
}


export function validatePhoneNumber(phonenumber) {
    return (phonenumber && phonenumber.length === 10);
}

export function validatePassword(password) {
    return (password && password.length === 6);
}

export function isUser(role) {
    return role === 'user';
}