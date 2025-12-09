import React, { createContext, useContext, FC, PropsWithChildren } from 'react';
import type { Category } from '../constants/categories';

export interface TagContextT {
    activeTagId: Category;
}

const defaultTagContext: TagContextT = {
    activeTagId: 'technology',
};

export const TagContext = createContext(defaultTagContext);

export const useTagContext = () => {
    const tagContext = useContext(TagContext);

    if (!tagContext) {
        throw new Error('useTagContext must be used within a TagContextProvider');
    }

    return tagContext;
};

export const TagContextProvider: FC<PropsWithChildren<TagContextT>> = ({
    activeTagId,
    children,
}) => {
    return <TagContext.Provider value={{ activeTagId }}>{children}</TagContext.Provider>;
};
