import { QueryClient } from '@tanstack/react-query';
import compression from 'compression';
import express, { Express } from 'express';
import morgan from 'morgan';

import { NewsDataService } from './api/newsdata';
import { makeErrorController } from './controllers/ErrorController';
import { makeHomeController } from './controllers/HomeController';
import { makeSearchController } from './controllers/SearchController';
import { countryMiddleware } from './middleware/country';
import { makeInjectLocalsMiddleware } from './middleware/injectLocals';
import { navBarMiddleware } from './middleware/navBar';
import { CacheService } from './service/cache';
import { getClientAssetPath, getManifests, getServerAssetPath } from './utils/render';

import type { DotenvParseOutput } from 'dotenv';

export const makeApp = async (env: DotenvParseOutput): Promise<Express> => {
    const manifest = await getManifests();
    await CacheService.getInstance().init();
    const clientAssetPath = getClientAssetPath();
    const serverAssetPath = getServerAssetPath();
    const queryClient = new QueryClient();
    const newsDataService = new NewsDataService(env.NEWSDATA_IO_API_KEY);

    const app = express();
    app.use(morgan('tiny'));
    app.use(compression());
    app.use('/assets', express.static(clientAssetPath, { maxAge: '1d' }));
    app.use(
        makeInjectLocalsMiddleware({
            manifest,
            clientAssetPath,
            serverAssetPath,
            queryClient,
            newsDataService,
        })
    );
    app.use(countryMiddleware);
    app.use(navBarMiddleware);

    app.get('/', makeHomeController());
    app.get('/search', makeSearchController());

    app.use(makeErrorController());

    return app;
};
