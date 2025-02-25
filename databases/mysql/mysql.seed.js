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
                username: "aldaymailing",
                email: "aldaymailing@gmail.com",
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
            //Taking and converting json data
            const data = await fs.readFile('./databases/mysql/seeds/regions.json', 'utf8');
            const regions = JSON.parse(data);

            //Forming batch to upload
            const batchData = regions.map(region => ({ 
                code: parseInt(region.code),
                name: region.label
            }));

            //Uploading to MySQL
            await Region.bulkCreate(batchData);

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
            //Taking and converting json data
            const data = await fs.readFile('./databases/mysql/seeds/provinces.json', 'utf8');
            const provinces = JSON.parse(data);

            //Forming batch to upload
            const batchData = provinces.map(province => ({ 
                code: parseInt(province.code),
                parent_code: parseInt(province.parent_code),
                name: province.label
            }));
            
            //Uploading to MySQL
            await Province.bulkCreate(batchData);

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
            //Taking and converting json data
            const data = await fs.readFile('./databases/mysql/seeds/towns.json', 'utf8');
            const towns = JSON.parse(data);

            //Forming batch to upload
            const batchData = towns.map(town => ({
                code: parseInt(town.code),
                parent_code: parseInt(town.parent_code),
                name: town.label
            }));
            
            //Uploading to MySQL
            await Town.bulkCreate(batchData);
            
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
            //Taking and converting json data
            const data = await fs.readFile('./databases/mysql/seeds/styles.json', 'utf8');
            const styles = JSON.parse(data);
            
            //Uploading to MySQL
            await Style.bulkCreate(styles);

            return logger.info('MySQL - "styles" table seeded');
        }else{
            return logger.info('MySQL - "styles" table already seeded');
        }

    } catch (error) {
        logger.error('MySQL - Error at seeding "styles" table,');
    }

};

const seedInstruments = async () => {

    try {
        // Verifying if "musicians" already seeded
        const count = await Instrument.count();

        if(count === 0){
            //Taking and converting json data
            const data = await fs.readFile('./databases/mysql/seeds/instruments.json', 'utf8');
            const instruments = JSON.parse(data);
            
            //Uploading to MySQL
            await Instrument.bulkCreate(instruments);

            return logger.info('MySQL - "instruments" table seeded');
        }else{
            return logger.info('MySQL - "instruments" table already seeded');
        }
    } catch (error) {
        logger.error('MySQL - Error at seeding "instruments" table');
    }

}


export { seedStyles, seedInstruments, seedMusicians, seedRegions, seedProvinces, seedTowns };