import dotenv from 'dotenv';

export const loadConfig = (): dotenv.DotenvConfigOutput => {
    const envFiles = [];
    if (process.env.ENV_FILE) {
        envFiles.push(process.env.ENV_FILE);
    } else {
        envFiles.push(`.env.${process.env.NODE_ENV.toLowerCase()}`);
    }
    const config = dotenv.config({ path: envFiles, quiet: true });
    if (config.error) {
        throw config.error;
    } else if (!config.parsed) {
        throw new Error('No configuration found');
    }

    return config;
};
