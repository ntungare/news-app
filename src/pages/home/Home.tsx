import React, { FC } from 'react';
import { MainHeadline, MainHeadlineProps } from '../../components/MainHeadline';
import { ArticleGrid, ArticleGridProps } from '../../components/ArticleGrid';
import { TrendingSidebar, TrendingSidebarProps } from '../../components/TrendingSidebar';

export interface HomeProps {
    mainArticle: MainHeadlineProps;
    articles: ArticleGridProps['articles'];
    trending: TrendingSidebarProps['items'];
}

export const Home: FC<HomeProps> = ({ mainArticle, articles, trending }) => {
    return (
        <div className="max-w-7xl mx-auto px-6 mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* RIGHT COLUMN: TRENDING SIDEBAR */}
            <TrendingSidebar items={trending} />

            {/* LEFT COLUMN: MAIN HEADLINE + ARTICLES */}
            <div className="lg:col-span-2 space-y-8 lg:order-first">
                {/* MAIN HEADLINE */}
                <MainHeadline {...mainArticle} />

                {/* ARTICLE GRID */}
                <ArticleGrid articles={articles} />
            </div>
        </div>
    );
};
