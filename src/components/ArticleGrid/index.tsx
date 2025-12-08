import React, { FC } from 'react';

export interface Article {
    title: string;
    description: string;
    image: string;
    category: string;
}

export interface ArticleGridProps {
    articles: Array<Article>;
}

export const ArticleGrid: FC<ArticleGridProps> = ({ articles }) => {
    return (
        <div className="grid md:grid-cols-2 gap-6">
            {articles.map((article, idx) => (
                <div
                    key={idx}
                    className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                    <img
                        src={article.image}
                        className="w-full h-48 object-cover"
                        alt={article.title}
                    />
                    <div className="p-4">
                        <div className="text-blue-600 font-bold text-xs mb-1 uppercase">
                            {article.category}
                        </div>
                        <h3 className="text-xl font-bold mb-2 hover:text-blue-600 cursor-pointer">
                            {article.title}
                        </h3>
                        <p className="text-gray-600 text-sm line-clamp-3">{article.description}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};
