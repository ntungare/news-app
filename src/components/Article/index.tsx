import React, { FC, useMemo, useEffect, useState } from 'react';
import qs from 'qs';
import type { NewsDataArticle } from '../../server/api/newsdata';

export const Article: FC<NewsDataArticle> = ({
    image_url,
    title,
    description,
    source_icon,
    source_name,
    category = [],
    link,
}) => {
    const [queryParams, setQueryParams] = useState<qs.ParsedQs>({});
    const [href, setHref] = useState<string>('/');
    useEffect(() => {
        if (typeof window !== 'undefined') {
            setQueryParams(qs.parse(window.location.search.replace('?', '')));
            setHref(window.location.pathname);
        }
    }, []);

    const categories = useMemo(
        () =>
            category.map((cat, idx) => (
                <React.Fragment key={`${idx}-${cat}`}>
                    <a
                        href={`${href}?${qs.stringify({ ...queryParams, tag: cat })}`}
                        className="text-blue-600 font-bold text-xs mb-1 uppercase hover:underline"
                    >
                        {cat}
                    </a>
                    {idx < category.length - 1 && <span className="text-gray-500">{' | '}</span>}
                </React.Fragment>
            )),
        [category, href, queryParams]
    );

    return (
        <div className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow duration-300">
            {image_url ? (
                <img
                    src={image_url}
                    alt={title}
                    className="w-full h-48 object-cover"
                    loading="lazy"
                    onError={(event) => (event.currentTarget.style.display = 'none')}
                />
            ) : (
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-400">
                    No Image
                </div>
            )}
            <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                    {source_icon && (
                        <img
                            src={source_icon}
                            alt={source_name}
                            className="w-4 h-4 rounded-full"
                            loading="lazy"
                            onError={(event) => (event.currentTarget.style.display = 'none')}
                        />
                    )}
                    <span className="text-xs text-gray-500 font-medium">{source_name}</span>
                </div>

                {categories}

                <a href={link} target="_blank" rel="noopener noreferrer" className="block group">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 line-clamp-2">
                        {title}
                    </h3>

                    {description && (
                        <p className="text-gray-600 text-sm line-clamp-3 group-hover:text-gray-800">
                            {description}
                        </p>
                    )}
                </a>
            </div>
        </div>
    );
};
