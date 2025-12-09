import React, { FC } from 'react';
import { Article } from '../Article';
import type { NewsDataArticle } from '../../server/api/newsdata';

export interface ArticleGridProps {
    articles: Array<NewsDataArticle>;
}

export const ArticleGrid: FC<ArticleGridProps> = ({ articles }) => {
    return (
        <div className="grid md:grid-cols-2 gap-6">
            {articles.map((article, idx) => (
                <Article key={`${idx}-${article.article_id}`} {...article} />
            ))}
        </div>
    );
};
