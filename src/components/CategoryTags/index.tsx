import React, { FC } from 'react';
import classnames from 'classnames';
import qs from 'qs';
import { useUrlState } from '../../hooks/urlState';
import type { Category, TagData } from '../../constants/categories';

export interface CategoryTagsProps {
    activeTagId: Category;
    tags: Array<TagData>;
}

export const CategoryTags: FC<CategoryTagsProps> = ({ activeTagId, tags }) => {
    const { path, country } = useUrlState();

    return (
        <div className="bg-white shadow-sm mb-2">
            <div className="mx-4 py-3 flex gap-4 overflow-x-auto snap-x scroll-px-2">
                {tags.map((tag, idx) => {
                    const isActive = tag.id === activeTagId;

                    return (
                        <a
                            key={`${idx}-${tag.id}`}
                            href={`${path}?${qs.stringify({ country, tag: tag.id })}`}
                            className={classnames('px-4 py-2 rounded-full snap-start', {
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
