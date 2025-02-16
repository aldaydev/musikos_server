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
    }
}