import React, { FC } from 'react';
import { MainHeadline, MainHeadlineProps } from '../../components/MainHeadline';
import { ArticleGrid, ArticleGridProps } from '../../components/ArticleGrid';
import { TrendingSidebar, TrendingSidebarProps } from '../../components/TrendingSidebar';

export interface HomeProps {
    mainArticle: MainHeadlineProps;
    articles: ArticleGridProps['articles'];
    trending: TrendingSidebarProps['articles'];
}

export const Home: FC<HomeProps> = ({ mainArticle, articles, trending }) => {
    return (
        <div className="max-w-7xl mx-auto px-6 mt-8 grid gap-8 lg:grid-cols-3 [grid-template-areas:'sidebar'_'main'] lg:[grid-template-areas:'main_main_sidebar']">
            {/* RIGHT COLUMN: TRENDING SIDEBAR */}
            <div className="[grid-area:sidebar]">
                <TrendingSidebar articles={trending} />
            </div>

            {/* LEFT COLUMN: MAIN HEADLINE + ARTICLES */}
            <div className="space-y-8 [grid-area:main]">
                {/* MAIN HEADLINE */}
                <MainHeadline {...mainArticle} />

                {/* ARTICLE GRID */}
                <ArticleGrid articles={articles} />
            </div>
        </div>
    );
};
