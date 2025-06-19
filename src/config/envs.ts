import 'dotenv/config';
import * as joi from 'joi'

interface EnvVars {
    PORT: number;
    NATS_SERVERS: string[];
    WIX_SITE_ID: string;
    WIX_ACC_ID: string;
    WIX_API_KEY: string;
    WIX_URL: string;
}

const envsSchema = joi.object({
    PORT: joi.number().required(),
    NATS_SERVERS: joi.array().items(joi.string()).required(),
    WIX_SITE_ID: joi.string().required(),
    WIX_ACC_ID: joi.string().required(),
    WIX_API_KEY: joi.string().required(),
    WIX_URL: joi.string().required(),
}).unknown(true)

const { error, value } = envsSchema.validate({
    ...process.env,
    NATS_SERVERS: process.env.NATS_SERVERS?.split(',')

})
if (error) {
    throw new Error('Config validation error: ' + error.message)
}

const envVars: EnvVars = value;

export const envs = {
    port: envVars.PORT,
    natsServers: envVars.NATS_SERVERS,
    WIX_SITE_ID: envVars.WIX_SITE_ID,
    WIX_ACC_ID: envVars.WIX_ACC_ID,
    WIX_API_KEY: envVars.WIX_API_KEY,
    WIX_URL: envVars.WIX_URL,

}