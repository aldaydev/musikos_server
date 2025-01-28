import { Style } from "../models/style.model.js";

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
};

export { seedStyles };