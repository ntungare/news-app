import { countriesSet, Country } from '../../constants/countries';
import { AppError } from '../errors/error';

import type { Middleware } from './type';

export const DEFAULT_COUNTRY: Country = 'ie';

export const inputIsCountry = (country: string): country is Country => {
    return countriesSet.has(country);
};

export interface CountryState {
    activeCountry: Country;
}

export const countryMiddlware: Middleware = (request, response, next) => {
    if (!!request.query.country && !inputIsCountry(request.query.country)) {
        throw new AppError(400, 'Invalid country');
    }

    const activeCountry = inputIsCountry(request.query.country)
        ? request.query.country
        : DEFAULT_COUNTRY;

    if (!request.query.country) {
        response.redirect(302, `/?country=${activeCountry}`);
        return;
    }

    response.locals.activeCountry = activeCountry;

    next();
};
