import express, { Express } from 'express';
import compression from 'compression';
import { getClientAssetPath, getManifests, getServerAssetPath } from './utils/render';
import { QueryClient } from '@tanstack/react-query';
import { makeHomeController } from './controllers/HomeController';
import type { Manifest } from './utils/render';

export interface AppLocals {
    manifest: Manifest;
    clientAssetPath: string;
    serverAssetPath: string;
    queryClient: QueryClient;
}

export const makeApp = (): Express => {
    const manifest = getManifests();
    const clientAssetPath = getClientAssetPath();
    const serverAssetPath = getServerAssetPath();
    const queryClient = new QueryClient();

    const app = express();
    app.use(compression());
    app.use('/assets', express.static(clientAssetPath));
    app.use((_request, response, next) => {
        response.locals.manifest = manifest;
        response.locals.clientAssetPath = clientAssetPath;
        response.locals.serverAssetPath = serverAssetPath;
        response.locals.queryClient = queryClient;
        next();
    });

    app.get('/', makeHomeController());

    return app;
};
