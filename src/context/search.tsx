import React, { createContext, useContext, FC, PropsWithChildren } from 'react';

export interface SearchContextT {
    searchTerm?: string;
}

const defaultSearchContext: SearchContextT = {};

export const SearchContext = createContext(defaultSearchContext);

export const useSearchContext = () => useContext(SearchContext);

export const SearchContextProvider: FC<PropsWithChildren<SearchContextT>> = ({
    searchTerm,
    children,
}) => {
    return <SearchContext.Provider value={{ searchTerm }}>{children}</SearchContext.Provider>;
};
