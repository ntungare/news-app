import React, { FC } from 'react';
import type { NewsDataArticle } from '../../server/api/newsdata';
import { useUrlState } from '../../hooks/urlState';
import { formatUrl } from '../../utils/urlFormatter';

export const Article: FC<NewsDataArticle> = ({
    image_url,
    title,
    description,
    source_icon,
    source_name,
    category = [],
    link,
}) => {
    const { path, country } = useUrlState();

    return (
        <div className="bg-white rounded-lg shadow">
            {image_url && (
                <img
                    src={image_url}
                    alt={title}
                    className="w-full h-48 object-cover"
                    loading="lazy"
                    onError={(event) => (event.currentTarget.style.display = 'none')}
                />
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
                    {source_name && (
                        <span className="text-xs text-gray-500 font-medium">{source_name}</span>
                    )}
                </div>

                <div className="flex flex-row items-center gap-2 mb-2">
                    {category.map((cat, idx) => (
                        <React.Fragment key={`${idx}-${cat}`}>
                            <a
                                href={formatUrl({ path, params: { country, tag: cat } })}
                                className="text-blue-600 font-bold text-xs uppercase hover:underline"
                            >
                                {cat}
                            </a>
                            {idx < category.length - 1 && <span className="text-gray-500">|</span>}
                        </React.Fragment>
                    ))}
                </div>

                <a href={link} target="_blank" rel="noopener noreferrer" className="block group">
                    <h3 className="text-xl font-bold mb-2 line-clamp-2 group-hover:text-blue-600">
                        {title}
                    </h3>

                    {description && <p className="text-sm line-clamp-3">{description}</p>}
                </a>
            </div>
        </div>
    );
};
