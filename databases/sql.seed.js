import { Instrument } from "../models/mysql.models/instrument.model.js";
import { Style } from "../models/mysql.models/style.model.js";

const seedStyles = async () => {
    const styles = [
        'Rock', 
        'Jazz', 
        'Pop', 
        'Clásica', 
        'Blues', 
        'Hip-Hop', 
        'Reggae', 
        'Country', 
        'Electrónica', 
        'Folk', 
        'Soul', 
        'Punk', 
        'R&B', 
        'Metal', 
        'Disco', 
        'Funk', 
        'Indie', 
        'House', 
        'Techno', 
        'Latina', 
        'Mundial', 
        'K-Pop', 
        'Gospel', 
        'Ópera', 
        'Ambiente',
        'Experimental'
    ];
    
    for (const style of styles) {
        await Style.findOrCreate({ where: { style_name: style } });
    }

    return console.log('MySQL - Seeding "styles" table')
};

const seedInstruments = async () => {
    const instruments = [
        "Guitarra",
        "Guitarra acústica",
        "Guitarra eléctrica",
        "Guitarra clásica",
        "Bajo",
        "Batería",
        "Teclados",
        "Piano",
        "Órgano",
        "Ukelele",
        "Banjo",
        "Violín",
        "Flauta",
        "Saxofón",
        "Trompeta",
        "Clarinete",
        "Chelo",
        "Arpa",
        "Trombón",
        "Oboe",
        "Mandolina",
        "Acordeón",
        "Cítara",
        "Xilófono",
        "Marimba",
        "Tambor",
        "Conga",
        "Timbal",
        "Cajón flamenco",
        "Campanas tubulares",
        "Lira"
    ];

    for (const instrument of instruments) {
        await Instrument.findOrCreate({ where: { instrument_name: instrument } });
    }

    return console.log('MySQL - Seeding "instruments" table')
}

export { seedStyles, seedInstruments };