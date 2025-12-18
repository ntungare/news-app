import React, { createContext, useContext, FC, PropsWithChildren } from 'react';

import type { Category } from '../constants/categories';

export interface TagContextT {
    activeTagId?: Category;
}

const defaultTagContext: TagContextT = {};

export const TagContext = createContext(defaultTagContext);

export const useTagContext = () => useContext(TagContext);

export const TagContextProvider: FC<PropsWithChildren<TagContextT>> = ({
    activeTagId,
    children,
}) => {
    return <TagContext.Provider value={{ activeTagId }}>{children}</TagContext.Provider>;
};
