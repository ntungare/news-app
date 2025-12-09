import express, { Express } from 'express';
import morgan from 'morgan';
import compression from 'compression';
import { getClientAssetPath, getManifests, getServerAssetPath } from './utils/render';
import { QueryClient } from '@tanstack/react-query';
import { NewsDataService } from './api/newsdata';
import { makeHomeController } from './controllers/HomeController';
import type { DotenvParseOutput } from 'dotenv';
import type { Manifest } from './utils/render';

export interface AppLocals {
    manifest: Manifest;
    clientAssetPath: string;
    serverAssetPath: string;
    queryClient: QueryClient;
    newsDataService: NewsDataService;
}

export const makeApp = (_env: DotenvParseOutput): Express => {
    const manifest = getManifests();
    const clientAssetPath = getClientAssetPath();
    const serverAssetPath = getServerAssetPath();
    const queryClient = new QueryClient();
    const newsDataService = new NewsDataService(process.env.NEWSDATA_IO_API_KEY);

    const app = express();
    app.use(morgan('tiny'));
    app.use(compression());
    app.use('/assets', express.static(clientAssetPath));
    app.use((_request, response, next) => {
        response.locals.manifest = manifest;
        response.locals.clientAssetPath = clientAssetPath;
        response.locals.serverAssetPath = serverAssetPath;
        response.locals.queryClient = queryClient;
        response.locals.newsDataService = newsDataService;
        next();
    });

    app.get('/', makeHomeController());

    return app;
};
