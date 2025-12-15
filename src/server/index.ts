import dotenv from 'dotenv';
import http1 from 'http';

import { makeApp } from './server';

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

const port = Number.parseInt(process.env.PORT, 10) || 8080;

const main = async () => {
    const app = await makeApp(config.parsed);

    const http1Server = http1.createServer(app);

    http1Server.listen(port, '0.0.0.0');
};

main()
    .then(() => {
        console.info(`Server listening on 0.0.0.0:${port}`);
    })
    .catch((error) => {
        console.error(`Server failed with`, error);
    });
