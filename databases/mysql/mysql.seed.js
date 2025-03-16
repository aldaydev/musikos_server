import logger from "../../config/logger.config.js";
import { Instrument } from "../../models/mysql.models/instrument.model.js";
import { Style } from "../../models/mysql.models/style.model.js";
import { Profile } from "../../models/mysql.models/profile.model.js";
import { encryptPassword } from "../../utils/bcrypt.js";
import fs from "fs/promises";
import { Province } from "../../models/mysql.models/province.model.js";
import { Town } from "../../models/mysql.models/town.model.js";
import Profile_Instrument from "../../models/mysql.models/profile_instrument.model.js";
import Profile_Style from '../../models/mysql.models/profile_style.model.js';
import { User } from "../../models/mysql.models/user.model.js";

const seedUsers = async () => {
    try {
        // Verifying if "Profiles" already seeded
        const count = await User.count();

    } catch (error) {
        
    }
}

const seedProfiles = async () => {
    try {
        // Verifying if "Profiles" already seeded
        const count = await Profile.count();

        if(!count){
            //Taking and converting json data
            const data = await fs.readFile(
                "./databases/mysql/seeds/Profiles.json", "utf8"
            );
            const Profiles = JSON.parse(data);
        
            //Uploading to MySQL
            await Profile.bulkCreate(Profiles, {
            validate: true // Esto asegurará que las validaciones se ejecuten
            });

            return logger.info('MySQL - "Profiles" table seeded');
        }else{
            return logger.info('MySQL - "Profiles" table already seeded');
        }

        
    } catch (error) {
        logger.error({ message: 'MySQL - Error at seeding "Profiles" table', error});
    }
};

const seedProvinces = async () => {
    try {

        //Taking and converting json data
        const data = await fs.readFile(
            "./databases/mysql/seeds/provinces.json", "utf8"
        );
        const provinces = JSON.parse(data);
        //Forming batch to upload
        const batchData = provinces.map((province) => ({
            code: parseInt(province.code),
            parent_code: parseInt(province.parent_code),
            name: province.label,
        }));
        //Uploading to MySQL
        await Province.bulkCreate(batchData);
        return logger.info('MySQL - "provinces" table seeded');
        
    } catch (error) {
        logger.error('MySQL - Error at seeding "provinces" table');
    }
};

const seedTowns = async () => {
    try {

        //Taking and converting json data
        const data = await fs.readFile(
            "./databases/mysql/seeds/towns.json", "utf8"
        );
        const towns = JSON.parse(data);
        //Forming batch to upload
        const batchData = towns.map((town) => ({
            code: parseInt(town.code),
            parent_code: parseInt(town.parent_code),
            name: town.label,
        }));
        //Uploading to MySQL
        await Town.bulkCreate(batchData);
        return logger.info('MySQL - "towns" table seeded');

    } catch (error) {
        logger.error('MySQL - Error at seeding "towns" table');
    }
};

const seedStyles = async () => {
    try {

        //Taking and converting json data
        const data = await fs.readFile(
            "./databases/mysql/seeds/styles.json", "utf8"
        );
        const styles = JSON.parse(data);
        //Uploading to MySQL
        await Style.bulkCreate(styles);
        return logger.info('MySQL - "styles" table seeded');

    } catch (error) {
        logger.error('MySQL - Error at seeding "styles" table,');
    }
};

const seedInstruments = async () => {
    try {
        
        //Taking and converting json data
        const data = await fs.readFile(
            "./databases/mysql/seeds/instruments.json",
            "utf8"
        );
        const instruments = JSON.parse(data);
        //Uploading to MySQL
        await Instrument.bulkCreate(instruments);
        return logger.info('MySQL - "instruments" table seeded');
        
    } catch (error) {
        logger.error('MySQL - Error at seeding "instruments" table');
    }
};

const seedProfilesIntruments = async () => {
    try {
        
        //Taking and converting json data
        const data = await fs.readFile(
            "./databases/mysql/seeds/Profiles_instruments.json",
            "utf8"
        );
        const Profiles_instruments = JSON.parse(data);
        //Uploading to MySQL
        await Profile_Instrument.bulkCreate(Profiles_instruments);
        return logger.info('MySQL - "Profiles_instruments" table seeded');
        
    } catch (error) {
        logger.error('MySQL - Error at seeding "Profiles_instruments" table', error);
    }
};

const seedProfilesStyles = async () => {
    try {
        
        //Taking and converting json data
        const data = await fs.readFile(
            "./databases/mysql/seeds/Profiles_styles.json",
            "utf8"
        );
        const Profiles_styles = JSON.parse(data);
        //Uploading to MySQL
        await Profile_Style.bulkCreate(Profiles_styles);
        return logger.info('MySQL - "Profiles_styles" table seeded');
        
    } catch (error) {
        logger.error('MySQL - Error at seeding "Profiles_styles" table', error);
    }
};

export {
    seedStyles,
    seedInstruments,
    seedProfiles,
    seedProvinces,
    seedTowns,
    seedProfilesIntruments,
    seedProfilesStyles
};
