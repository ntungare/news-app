import { AppError } from '../errors/error';
import { Page } from '../utils/fileMappings';
import { getHtml, renderFile } from '../utils/render';

import type { ErrorRequestHandler } from 'express';

import type { Country } from '../../constants/countries';
import type { ErrorRenderState } from '../../pages/error/Error.server';
import type { AppLocals } from '../middleware/type';

export type ErrorHandler = ErrorRequestHandler<
    unknown,
    string,
    unknown,
    {
        country: Country;
    },
    AppLocals
>;

export const makeErrorController = (): ErrorHandler =>
    async function ErrorController(thrown, request, response, _next) {
        let statusCode: number;
        let message: string;
        if (thrown instanceof AppError) {
            statusCode = thrown.statusCode;
            message = thrown.message;
        } else if (thrown instanceof Error) {
            statusCode = 500;
            message = thrown.message;
        } else {
            statusCode = 500;
            message = 'Unknown Error Occurred';
        }

        const { activeCountry, navBarProps } = response.locals;

        const state: ErrorRenderState = {
            activeCountry: activeCountry,
            activePath: request.path,
            navBarProps: navBarProps,
            data: {
                statusCode,
                message,
                redirectUrl: '/',
            },
        };

        console.log(state);

        const { queryClient, manifest } = response.locals;
        const page = Page.ERROR;

        const rootHtml = await renderFile(page, queryClient, state);

        response.status(statusCode).send(getHtml({ rootHtml, state }, { page, manifest }));
    };
