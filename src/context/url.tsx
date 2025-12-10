import React, { createContext, useContext, FC, PropsWithChildren } from 'react';

export interface UrlContextT {
    activePath: string;
}

const defaultUrlContext: UrlContextT = {
    activePath: '/',
};

export const UrlContext = createContext(defaultUrlContext);

export const useUrlContext = () => {
    const urlContext = useContext(UrlContext);

    if (!urlContext) {
        throw new Error('useUrlContext must be used within a UrlContextProvider');
    }

    return urlContext;
};

export const UrlContextProvider: FC<PropsWithChildren<UrlContextT>> = ({
    activePath,
    children,
}) => {
    return <UrlContext.Provider value={{ activePath }}>{children}</UrlContext.Provider>;
};
