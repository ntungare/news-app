import React, { FC } from 'react';
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
                className="bg-white shadow rounded-lg p-4 grid gap-4 overflow-y-auto max-h-[60dvh] lg:max-h-none lg:overflow-visible"
                style={{
                    gridTemplateAreas: articles.map((_, i) => `"article-${i}"`).join(' '),
                }}
            >
                {articles.map((article, idx) => (
                    <TrendingArticle
                        key={`${idx}-${article.article_id}`}
                        {...article}
                        articleIdx={idx}
                    />
                ))}
            </div>
        </aside>
    );
};
