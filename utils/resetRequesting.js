import logger from "../config/logger.config.js";
import musicianService from "../services/mysql/musician.service.js"

export default (time, username) => {
    setTimeout(async ()=> {
        await musicianService.updateIsRequesting(
            username,
            false
        );
    }, time)
}

// //Reset is_requesting field in every user if server goes down
// const shutdown = async () => {
//     try {

//         logger.info("MySQL - Reseted is_requesting fields");
//     } catch (error) {
//         logger.error("MySQL - Error at reseting is_requesting fields", error);
//     }
// };

// process.on("SIGINT", shutdown); //When server is closed manually
// process.on("SIGTERM", shutdown); //When server is shut down