import qs from 'qs';

import { Country } from '../constants/countries';

export interface UrlFormatterParams {
    path: string;
    params: {
        country: Country;
        tag?: string;
        search?: string;
        page?: string;
    };
}

export const formatUrl = ({
    path,
    params: { country, tag, search, page },
}: UrlFormatterParams): string => {
    return `${path}?${qs.stringify({ country, tag, search, page }, { arrayFormat: 'comma' })}`;
};
