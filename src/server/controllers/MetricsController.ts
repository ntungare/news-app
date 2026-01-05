import type { MetricWithAttribution } from 'web-vitals/attribution';

import type { Controller } from '../middleware/type';

export type Handler = Controller;

export interface MetricsBody {
    pathname: string;
    search: string;
    hash: string;
    userAgent: string;
    languages: Array<string>;
    metric: MetricWithAttribution;
}

export const makeMetricsController = (): Handler =>
    async function MetricsController(request, response) {
        if (typeof request.body !== 'string') {
            response.status(401).send('Invalid request');
            return;
        }

        // const requestBody: MetricsBody = JSON.parse(request.body);
        // const dateNow = new Date(Date.now());
        // console.log(`Received on ${dateNow.toString()}`, requestBody);
        response.status(200).send();
    };
