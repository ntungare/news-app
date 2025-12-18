import { useCountryContext } from '../context/country';
import { useSearchContext } from '../context/search';
import { useTagContext } from '../context/tag';
import { useUrlContext } from '../context/url';

import type { Category } from '../constants/categories';
import type { Country } from '../constants/countries';

export interface UrlState {
    tag: Category;
    country: Country;
}

export const useUrlState = () => {
    const { activePath } = useUrlContext();
    const { activeCountry } = useCountryContext();
    const { activeTagId } = useTagContext();
    const { searchTerm } = useSearchContext();

    return { path: activePath, country: activeCountry, tag: activeTagId, search: searchTerm };
};
