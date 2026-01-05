import {
    type MetricWithAttribution,
    onCLS,
    onFCP,
    onINP,
    onLCP,
    onTTFB,
} from 'web-vitals/attribution';

import type { MetricsBody } from '../server/controllers/MetricsController';

const sendMetrics = (metric: MetricWithAttribution) => {
    if (typeof window === 'undefined') {
        return;
    }

    const location = window.location;
    const navigator = window.navigator;
    const dataToSend: MetricsBody = {
        pathname: location.pathname,
        search: location.search,
        hash: location.hash,
        userAgent: navigator.userAgent ?? 'unknown',
        languages: navigator.languages as string[],
        metric: metric,
    };
    const stringifiedData = JSON.stringify(dataToSend);
    if (navigator.sendBeacon) {
        navigator.sendBeacon('/metrics', stringifiedData);
    } else {
        fetch('/metrics', { method: 'POST', body: stringifiedData, keepalive: true })
            .then(() => {})
            .catch(() => {});
    }
};

onCLS(sendMetrics);
onFCP(sendMetrics);
onINP(sendMetrics);
onLCP(sendMetrics);
onTTFB(sendMetrics);
