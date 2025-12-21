import React, { FC } from 'react';
import classnames from 'classnames';

import { useUrlState } from '../../hooks/urlState';
import { formatUrl } from '../../utils/urlFormatter';

import type { Category, TagData } from '../../constants/categories';

export interface CategoryTagsProps {
    activeTagId?: Category;
    tags: Array<TagData>;
}

export const CategoryTags: FC<CategoryTagsProps> = ({ activeTagId, tags }) => {
    const { path, country } = useUrlState();

    return (
        <div className="[grid-area:tags] bg-white shadow-sm mb-2">
            <div className="mx-4 pt-3 pb-4 flex gap-3 overflow-x-auto snap-x scroll-px-2">
                {tags.map((tag, idx) => {
                    const isActive = tag.id === activeTagId;

                    return (
                        <a
                            key={`${idx}-${tag.id}`}
                            href={formatUrl({ path, params: { country, tag: tag.id } })}
                            className={classnames('px-4 py-2 mx-1 rounded-full snap-start', {
                                'bg-blue-600 text-white': isActive,
                                'bg-gray-200 hover:bg-gray-300': !isActive,
                            })}
                        >
                            {tag.name}
                        </a>
                    );
                })}
            </div>
        </div>
    );
};
