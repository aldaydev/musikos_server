class Validate {
    pass (pass){
        //Debe contener al menos: 1 número, 1 letra, 1 caracter especial y >6 digitos
        const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!-_%*?&])[A-Za-z\d@$!-_%*?&]{6,}$/;
        return regex.test(pass);
    }

    email (email){
        // Expresión regular para validar un email
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    username (username){
        //Username = between 3 and 30 chars | Only _ - . symbols permitted
        const regex = /^[a-zA-Z0-9._-]{3,30}$/;
        return regex.test(username);
    }
}

export default new Validate;