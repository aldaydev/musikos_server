export default (musicianBirthdate) => {
    const birthdate = new Date(musicianBirthdate);
    const today = new Date();
    let age = today.getFullYear() - birthdate.getFullYear();
    const month = today.getMonth();
    const day = today.getDate();
    // Ajustar la edad si el cumpleaños aún no ha ocurrido este año
    if (month < birthdate.getMonth() || (month === birthdate.getMonth() && day < birthdate.getDate())) {
        age--;
    }

    return age;
}
