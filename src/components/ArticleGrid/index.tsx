import React, { FC } from 'react';
import { Article } from '../Article';
import { Pagination } from '../Pagination';
import type { NewsDataArticle } from '../../server/api/newsdata';

export interface ArticleGridProps {
    articles: Array<NewsDataArticle>;
    previousPageUrl?: string;
    nextPage?: string;
}

export const ArticleGrid: FC<ArticleGridProps> = ({ articles, previousPageUrl, nextPage }) => {
    return (
        <div className="space-y-4">
            <h2 className="text-xl font-bold">Articles</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {articles.map((article, idx) => (
                    <Article key={`${idx}-${article.article_id}`} {...article} />
                ))}
            </div>
            <Pagination previousPageUrl={previousPageUrl} nextPage={nextPage} />
        </div>
    );
};
