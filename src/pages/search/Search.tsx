import classnames from 'classnames';
import React, { FC } from 'react';

import { ArticleGrid, ArticleGridProps } from '../../components/ArticleGrid';
import { SearchContextProvider } from '../../context/search';

export interface SearchProps {
    searchTerm: string;
    articleProps: ArticleGridProps;
}

export const Search: FC<SearchProps> = ({ searchTerm, articleProps }) => {
    return (
        <SearchContextProvider searchTerm={searchTerm}>
            <div
                className={classnames(
                    '[grid-area:main] px-6 mt-8 grid gap-8 lg:grid-cols-3',
                    "[grid-template-areas:'articles'] lg:[grid-template-areas:'articles_articles_articles']"
                )}
            >
                {/* LEFT COLUMN: MAIN HEADLINE + ARTICLES */}
                <div className="[grid-area:articles]">
                    {/* ARTICLE GRID */}
                    <ArticleGrid
                        {...articleProps}
                        articlesClassName="grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                    />
                </div>
            </div>
        </SearchContextProvider>
    );
};
