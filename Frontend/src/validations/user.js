export const firstName = (firstName = '') => {
    let result = { isValid: true, message: '' };
    if (firstName === null || firstName === undefined || firstName.trim().length === 0)
        result = {
            ...result,
            isValid: false,
            message: 'Họ và tên lót không hợp lệ.'
        }
    return result;
}

export const lastName = (lastName = '') => {
    let result = { isValid: true, message: '' };
    if (lastName === null || lastName === undefined || lastName.trim().length === 0)
        result = {
            ...result,
            isValid: false,
            message: 'Tên không hợp lệ.'
        }
    return result;
}

export const gender = (gender = '') => {
    let result = { isValid: true, message: '' };
    const genders = ['Nam', 'Nữ', 'Khác'];
    if (gender === null || gender === undefined || gender.trim().length === 0 || genders.includes(gender) === false)
        result = {
            ...result,
            isValid: false,
            message: 'Giới tính không hợp lệ.'
        }
    return result;
}

export const dayOfBirth = (dayOfBirth = '') => {
    let result = { isValid: true, message: '' };
    const regex = /\d{4}-\d{2}-\d{2}/;
    if (dayOfBirth === null || dayOfBirth === undefined || dayOfBirth.trim().length === 0 || regex.test(dayOfBirth) === false)
        result = {
            ...result,
            isValid: false,
            message: 'Ngày sinh không hợp lệ.'
        }
    return result;
}

export const username = (username = '') => {
    let result = { isValid: true, message: '' };
    if (username === null || username === undefined || username.trim().length === 0 || (username.trim().length >= 8 && username.trim().length <= 20) === false)
        result = {
            ...result,
            isValid: false,
            message: 'Tên đăng nhập không hợp lệ.'
        }
    return result;
}

export const email = (email = '') => {
    let result = { isValid: true, message: '' };
    const regex = /[\d|\w|\.]+@[\d|\w|\.]+\.\w+/;
    if (email === null || email === undefined || email.trim().length === 0 || regex.test(email) === false)
        result = {
            ...result,
            isValid: false,
            message: 'Email không hợp lệ.'
        }
    return result;
}

export const password = (password = '') => {
    let result = { isValid: true, message: '' };
    const regexDigits = /\d+/;
    const regexCapChars = /[A-Z]+/;
    const regexNorChars = /[a-z]+/;
    const regexSpecialChars = /\W+/;
    if (
        password === null
        || password === undefined
        || password.trim().length === 0
        || (password.trim().length >= 8 && password.trim().length <= 20) === false
        || regexDigits.test(password) === false
        || regexCapChars.test(password) === false
        || regexNorChars.test(password) === false
        || regexSpecialChars.test(password) === false
    )
        result = {
            ...result,
            isValid: false,
            message: 'Mật khẩu không hợp lệ.'
        }
    return result;
}

export const passwordSecondary = (passwordSecondary = '', password) => {
    let result = { isValid: true, message: '' };
    if (
        passwordSecondary !== password
    )
        result = {
            ...result,
            isValid: false,
            message: 'Mật khẩu không khớp.'
        }
    return result;
}