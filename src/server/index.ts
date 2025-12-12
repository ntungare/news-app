import dotenv from 'dotenv';
import http1 from 'http';
import http2 from 'http2';
import net from 'net';

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
    const http2Server = http2.createServer(app);

    const server = net.createServer(async (socket) => {
        const chunk: Buffer = await new Promise((resolve) => socket.once('data', resolve));
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        socket._readableState.flowing = null;
        socket.unshift(chunk);
        const firstLine = chunk.toString();
        if (firstLine.startsWith('PRI * HTTP/2.0')) {
            http2Server.emit('connection', socket);
        } else {
            http1Server.emit('connection', socket);
        }
    });

    server.listen(port, '0.0.0.0').on('listening', () => {
        console.info(`Server listening on 0.0.0.0:${port}`);
    });
};

main()
    .then(() => {
        console.info(`Server listening on 0.0.0.0:${port}`);
    })
    .catch((error) => {
        console.error(`Server failed with`, error);
    })
    .finally(() => {
        console.info('Exiting');
    });
