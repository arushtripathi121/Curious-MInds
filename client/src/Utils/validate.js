import { differenceInYears, parseISO } from 'date-fns';
export const validate = (email, password, confirmPassword, dob) => {
    
    if (email) {
        const isEmailValid = /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/gm.test(email);
        if (!isEmailValid) {
            return 'email is not valid'
        }
    }
    const isPasswordValid = /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/.test(password);



    if (!isPasswordValid) {
        return 'password is not valid'
    }

    if (confirmPassword && confirmPassword != password) {
        return 'password does not match'
    }

    if (dob) {
        const currentDate = new Date();
        const dateOfBith = parseISO(dob);
        const age = differenceInYears(currentDate, dateOfBith);

        if (age < 13) {
            return 'Users age should be above 13 years'
        }
    }

} 