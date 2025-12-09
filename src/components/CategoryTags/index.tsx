import React, { FC, useEffect, useState } from 'react';
import classnames from 'classnames';
import qs from 'qs';
import type { Category } from '../../constants/categories';

export interface CategoryTagsProps {
    activeTagId: Category;
    tags: Array<{ id: Category; name: string }>;
}

export const CategoryTags: FC<CategoryTagsProps> = ({ activeTagId, tags }) => {
    const [queryParams, setQueryParams] = useState<qs.ParsedQs>({});
    const [href, setHref] = useState<string>('/');
    useEffect(() => {
        if (typeof window !== 'undefined') {
            setQueryParams(qs.parse(window.location.search.replace('?', '')));
            setHref(window.location.pathname);
        }
    }, []);

    return (
        <div className="bg-white shadow-sm mb-2">
            <div className="max-w-7xl mx-auto px-6 py-3 flex space-x-4 overflow-x-auto">
                {tags.map((tag, idx) => {
                    const isActive = tag.id === activeTagId;

                    return (
                        <a
                            key={`${idx}-${tag.id}`}
                            href={`${href}?${qs.stringify({ ...queryParams, tag: tag.id })}`}
                            className={classnames(
                                'px-4 py-2',
                                {
                                    'bg-blue-600 text-white rounded-full': isActive,
                                },
                                {
                                    'bg-gray-200 rounded-full hover:bg-gray-300': !isActive,
                                }
                            )}
                        >
                            {tag.name}
                        </a>
                    );
                })}
            </div>
        </div>
    );
};
