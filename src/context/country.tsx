import React, { createContext, useContext, FC, PropsWithChildren } from 'react';

import type { Country } from '../constants/countries';

export interface CountryContextT {
    activeCountry: Country;
}

const defaultCountryContext: CountryContextT = {
    activeCountry: 'ie',
};

export const CountryContext = createContext(defaultCountryContext);

export const useCountryContext = () => {
    const countryContext = useContext(CountryContext);

    if (!countryContext) {
        throw new Error('useCountryContext must be used within a CountryContextProvider');
    }

    return countryContext;
};

export const CountryContextProvider: FC<PropsWithChildren<CountryContextT>> = ({
    activeCountry,
    children,
}) => {
    return <CountryContext.Provider value={{ activeCountry }}>{children}</CountryContext.Provider>;
};
