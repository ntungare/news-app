import React, { FC } from 'react';
import { Article } from '../Article';
import type { NewsDataArticle } from '../../server/api/newsdata';

export interface ArticleGridProps {
    articles: Array<NewsDataArticle>;
}

export const ArticleGrid: FC<ArticleGridProps> = ({ articles }) => {
    return (
        <div className="space-y-4">
            <h2 className="text-xl font-bold">Articles</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {articles.map((article, idx) => (
                    <Article key={`${idx}-${article.article_id}`} {...article} />
                ))}
            </div>
        </div>
    );
};
