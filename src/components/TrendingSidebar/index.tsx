import React, { FC } from 'react';
import classnames from 'classnames';
import { NewsDataArticle } from '../../server/api/newsdata';
import { TrendingArticle } from '../TrendingArticle';

export interface TrendingSidebarProps {
    articles: Array<NewsDataArticle>;
}

export const TrendingSidebar: FC<TrendingSidebarProps> = ({ articles }) => {
    return (
        <aside className="space-y-4">
            <h2 className="text-xl font-bold">Breaking News</h2>
            <div
                className={classnames(
                    'bg-white shadow rounded-lg px-4',
                    'flex flex-col max-h-100 lg:max-h-none',
                    'overflow-y-auto lg:overflow-visible snap-y'
                )}
            >
                {articles.map((article, idx) => (
                    <TrendingArticle key={`${idx}-${article.article_id}`} {...article} />
                ))}
            </div>
        </aside>
    );
};
