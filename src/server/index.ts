import http from 'http';

import { makeApp } from './server';
import { loadConfig } from './utils/loadConfig';

const config = loadConfig();
const port = Number.parseInt(process.env.PORT, 10) || 8080;

const main = async () => {
    const app = await makeApp(config.parsed);
    const httpServer = http.createServer(app);
    httpServer.listen(port, '0.0.0.0');
};

main()
    .then(() => {
        console.info(`Server listening on 0.0.0.0:${port}`);
    })
    .catch((error) => {
        console.error(`Server failed with`, error);
    });
