import React, { FC } from 'react';
import type { NewsDataArticle } from '../../server/api/newsdata';

export const TrendingArticle: FC<NewsDataArticle> = ({
    title,
    description,
    source_icon,
    source_name,
    link,
}) => {
    return (
        <div className="py-3 border-b last:border-0 border-gray-100 snap-start">
            <div className="flex items-center gap-2 mb-1">
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

            <a href={link} target="_blank" rel="noopener noreferrer" className="block group">
                <h3 className="text-sm font-semibold leading-snug mb-1 line-clamp-1 group-hover:text-blue-600">
                    {title}
                </h3>

                {description && <p className="text-xs line-clamp-2">{description}</p>}
            </a>
        </div>
    );
};
