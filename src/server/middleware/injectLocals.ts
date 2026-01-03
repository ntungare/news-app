import { AppLocals, Middleware } from './type';

export const makeInjectLocalsMiddleware = (locals: Partial<AppLocals>): Middleware =>
    function injectLocalsMiddleware(_request, response, next) {
        Object.entries(locals).forEach(([key, value]) => {
            Object.defineProperty(response.locals, key, {
                value,
                writable: false,
            });
        });
        next();
    };
