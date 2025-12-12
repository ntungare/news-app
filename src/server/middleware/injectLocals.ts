import { AppLocals, Middleware } from './type';

export const makeInjectLocalsMiddleware =
    (locals: Partial<AppLocals>): Middleware =>
    (_request, response, next) => {
        const { manifest, clientAssetPath, serverAssetPath, queryClient, newsDataService } = locals;

        response.locals.manifest = manifest;
        response.locals.clientAssetPath = clientAssetPath;
        response.locals.serverAssetPath = serverAssetPath;
        response.locals.queryClient = queryClient;
        response.locals.newsDataService = newsDataService;
        next();
    };
