import { useContext } from 'react';
import { CountryContext } from '../context/country';
import { TagContext } from '../context/tag';
import { UrlContext } from '../context/url';
import type { Category } from '../constants/categories';
import type { Country } from '../constants/countries';

export interface UrlState {
    tag: Category;
    country: Country;
}

export const useUrlState = () => {
    const { activePath } = useContext(UrlContext);
    const { activeCountry } = useContext(CountryContext);
    const { activeTagId } = useContext(TagContext);

    return { path: activePath, tag: activeTagId, country: activeCountry };
};
