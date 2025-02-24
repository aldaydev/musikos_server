import logger from "../../config/logger.config.js";
import { Instrument } from "../../models/mysql.models/instrument.model.js";
import { Style } from "../../models/mysql.models/style.model.js";
import { Musician } from "../../models/mysql.models/musician.model.js";
import { encryptPassword } from "../../utils/bcrypt.js";
import { Region } from "../../models/mysql.models/region.model.js";
import fs from 'fs/promises';
import { Province } from "../../models/mysql.models/province.model.js";
import { Town } from "../../models/mysql.models/town.model.js";

const seedMusicians = async () => {

    try {
        // Verifying if "musicians" already seeded
        const count = await Musician.count();

        if(count === 0){
            const encryptedPass = await encryptPassword('123_abcD');

            await Musician.findOrCreate({ where: {
                username: "ejemplo",
                email: "ejemplo@ejemplo.es",
                password: encryptedPass
            }});

            return logger.info('MySQL - "musicians" table seeded');
        }else{
            return logger.info('MySQL - "musicians" table already seeded');
        }
    } catch (error) {
        logger.error('MySQL - Error at seeding "musicians" table');
    }

}

const seedRegions = async () => {

    try {
        // Verifying if "musicians" already seeded
        const count = await Region.count();

        if(count === 0){

            const data = await fs.readFile('./databases/mysql/seeds/regions.json', 'utf8');
            const regions = JSON.parse(data);

            for (const region of regions) {
                await Region.findOrCreate({ where: { 
                    code: parseInt(region.code),
                    name: region.label
                } });
            }

            return logger.info('MySQL - "regions" table seeded');
        }else{
            return logger.info('MySQL - "regions" table already seeded');
        }
    } catch (error) {
        logger.error('MySQL - Error at seeding "regions" table');
    }

}

const seedProvinces = async () => {

    try {
        // Verifying if "musicians" already seeded
        const count = await Province.count();

        if(count === 0){

            const data = await fs.readFile('./databases/mysql/seeds/provinces.json', 'utf8');
            const provinces = JSON.parse(data);

            for (const province of provinces) {
                await Province.findOrCreate({ where: { 
                    code: parseInt(province.code),
                    parent_code: parseInt(province.parent_code),
                    name: province.label
                } });
            }

            return logger.info('MySQL - "provinces" table seeded');
        }else{
            return logger.info('MySQL - "provinces" table already seeded');
        }
    } catch (error) {
        logger.error('MySQL - Error at seeding "provinces" table');
    }

}

const seedTowns = async () => {
    try {
        // Verifying if "towns" already seeded
        const count = await Town.count();

        if(count === 0){

            const data = await fs.readFile('./databases/mysql/seeds/towns.json', 'utf8');
            const towns = JSON.parse(data);


            // for (const town of towns) {
            //     await Town.findOrCreate({ where: { 
            //         code: parseInt(town.code),
            //         parent_code: parseInt(town.parent_code),
            //         name: town.label
            //     } }).catch(error => console.log(error))
            // }
            console.log('MySQL - Seeding "towns" by batching');
            const batchSize = 500;
            let batch = [];

            for (let i = 0; i < towns.length; i++){
                // Agregar el objeto al lote
                batch.push({
                    code: parseInt(towns[i].code),
                    parent_code: parseInt(towns[i].parent_code),
                    name: towns[i].label
                });
            
                // Si el tamaño del lote es alcanzado, inserta los registros
                if (batch.length >= batchSize || i === towns.length - 1) {
                    console.log('MySQL - On batch done');
                    await Town.bulkCreate(batch); // Inserta el lote
                    batch = []; // Vaciar el lote para el siguiente
                }
            }


            // const batchData = towns.map(town => ({
            //     code: parseInt(town.code),
            //     parent_code: parseInt(town.parent_code),
            //     name: town.label
            // }));
            
            // await Town.bulkCreate(batchData);
            
            return logger.info('MySQL - "towns" table seeded');
        }else{
            return logger.info('MySQL - "towns" table already seeded');
        }
    } catch (error) {
        logger.error('MySQL - Error at seeding "towns" table');
    }

}

const seedStyles = async () => {

    try {
        // Verifying if "musicians" already seeded
        const count = await Style.count();

        if(count === 0){

            const data = await fs.readFile('./databases/mysql/seeds/styles.json', 'utf8');
            const styles = JSON.parse(data);

            for (const style of styles) {
                await Style.findOrCreate({ where: { style_name: style } });
            }

            return logger.info('MySQL - "styles" table seeded');
        }else{
            return logger.info('MySQL - "styles" table already seeded');
        }

    } catch (error) {
        logger.error('MySQL - Error at seeding "styles" table,', error);
    }

};

const seedInstruments = async () => {

    try {
        // Verifying if "musicians" already seeded
        const count = await Instrument.count();

        if(count === 0){

            const data = await fs.readFile('./databases/mysql/seeds/styles.json', 'utf8');
            const instruments = JSON.parse(data);

            for (const instrument of instruments) {
                await Instrument.findOrCreate({ where: { instrument_name: instrument } });
            }

            return logger.info('MySQL - "instruments" table seeded');
        }else{
            return logger.info('MySQL - "instruments" table already seeded');
        }
    } catch (error) {
        logger.error('MySQL - Error at seeding "instruments" table');
    }

}


export { seedStyles, seedInstruments, seedMusicians, seedRegions, seedProvinces, seedTowns };