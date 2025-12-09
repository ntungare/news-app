import React, { FC } from 'react';
import type { NewsDataArticle } from '../../server/api/newsdata';

export const TrendingArticle: FC<NewsDataArticle & { articleIdx: number }> = ({
    title,
    description,
    source_icon,
    source_name,
    link,
    articleIdx,
}) => {
    return (
        <div
            className="border-b last:border-0 border-gray-100 pb-3 last:pb-0"
            style={{ gridArea: `article-${articleIdx}` }}
        >
            <div className="flex items-center gap-2 mb-1">
                {source_icon && (
                    <img
                        src={source_icon}
                        alt={source_name}
                        className="w-4 h-4 rounded-full"
                        onError={(event) => (event.currentTarget.style.display = 'none')}
                    />
                )}
                {source_name && (
                    <span className="text-xs text-gray-500 font-medium">{source_name}</span>
                )}
            </div>

            <a href={link} target="_blank" rel="noopener noreferrer" className="block group">
                <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 text-sm leading-snug">
                    {title}
                </h3>
                {description && (
                    <p className="text-xs text-gray-600 mt-1 line-clamp-2">{description}</p>
                )}
            </a>
        </div>
    );
};
