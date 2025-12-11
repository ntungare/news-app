import express, { Express } from 'express';
import morgan from 'morgan';
import compression from 'compression';
import { getClientAssetPath, getManifests, getServerAssetPath } from './utils/render';
import { QueryClient } from '@tanstack/react-query';
import { CacheService } from './service/cache';
import { NewsDataService } from './api/newsdata';
import { countryMiddlware } from './middleware/country';
import { navBarMiddlware } from './middleware/navBar';
import { makeHomeController } from './controllers/HomeController';
import type { DotenvParseOutput } from 'dotenv';
import { makeErrorController } from './controllers/ErrorController';

export const makeApp = async (_env: DotenvParseOutput): Promise<Express> => {
    const manifest = await getManifests();
    await CacheService.getInstance().init();
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
    app.use(countryMiddlware);
    app.use(navBarMiddlware);

    app.get('/', makeHomeController());

    app.use(makeErrorController());

    return app;
};
