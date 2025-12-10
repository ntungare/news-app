import qs from 'qs';

export interface UrlFormatterParams {
    path: string;
    params: {
        country: string;
        tag: string;
        page?: string;
    };
}

export const formatUrl = ({ path, params: { country, tag, page } }: UrlFormatterParams): string => {
    return `${path}?${qs.stringify({ country, tag, page }, { arrayFormat: 'comma' })}`;
};
