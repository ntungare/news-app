import React, { FC } from 'react';
import { ArticleGrid, ArticleGridProps } from '../../components/ArticleGrid';
import { TrendingSidebar, TrendingSidebarProps } from '../../components/TrendingSidebar';

export interface HomeProps {
    articleProps: ArticleGridProps;
    trendingSidebarProps: TrendingSidebarProps;
}

export const Home: FC<HomeProps> = ({ articleProps, trendingSidebarProps }) => {
    return (
        <div className="px-6 mt-8 grid gap-8 lg:grid-cols-3 [grid-template-areas:'sidebar'_'main'] lg:[grid-template-areas:'main_main_sidebar']">
            {/* RIGHT COLUMN: TRENDING SIDEBAR */}
            <div className="[grid-area:sidebar]">
                <TrendingSidebar {...trendingSidebarProps} />
            </div>

            {/* LEFT COLUMN: MAIN HEADLINE + ARTICLES */}
            <div className="[grid-area:main]">
                {/* ARTICLE GRID */}
                <ArticleGrid {...articleProps} />
            </div>
        </div>
    );
};
