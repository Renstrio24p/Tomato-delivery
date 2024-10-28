import { getEnvVariable } from "../helpers/getEnv.mts";
import { Config, MongoConfig } from "./types/config.type.mts";
import checker from 'vite-plugin-checker';
import dotenv from 'dotenv';

dotenv.config();

export const config: Config = {
    host: 'localhost',
    port: 8080,
    collection: "food-delivery",
    driver: {
        port: 27017
    }
}


const account = {
    user: getEnvVariable('MONGO_USER'),
    pass: getEnvVariable('MONGO_PASS'),
}

export const mongo: MongoConfig = {
    online: `mongodb+srv://${account.user}:${account.pass}@gp2-cloud.pefe5tc.mongodb.net/${config.collection}?retryWrites=true&w=majority&appName=GP2-Cloud`,
    offline: `mongodb://localhost:${config.driver.port}/${config.collection}`,
}

export default {
    plugins: [checker({ typescript: true /** or an object config */ })],
}


