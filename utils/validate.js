export default {
    pass: (password) => {
        // Validate pass with regex
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!-_%*?&])[A-Za-z\d@$!-_%*?&]{8,}$/;
        return regex.test(password);
    },

    email: (email) => {
        // Validate email with regex
        const regex = /^(?!.*\.\.)[a-zA-Z0-9._%+-]{1,64}@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return regex.test(email);
    },

    username: (username) => {
        // Validate username with regex
        const regex = /^(?!.*[_-]{2})(?![_-])([a-z0-9_-]{3,30})(?<![_-])$/;
        return regex.test(username);
    },

    birthdate: (date) => {
        //Creating object from birthdate
        const birthdate = new Date(date);
        //Selecting today
        const today = new Date();
        //Calculating age, month and day
        let age = today.getFullYear() - birthdate.getFullYear();
        const month = today.getMonth();
        const day = today.getDate();

        //Checking if has turned years this year
        const hasNoTurnedYears = 
            month < birthdate.getMonth() ||
            (month === birthdate.getMonth() && day < birthdate.getDay())

        //If not...
        if(hasNoTurnedYears){
            age--;
        }

        if(age > 100 || age < 14) {
            console.log('Formato de fecha incorrecta');
            throw new Error('La edad no puede ser mayor que 100 años ni menor que 10.')
        }
    }
}