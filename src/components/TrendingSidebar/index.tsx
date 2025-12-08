import React, { FC } from 'react';

export interface TrendingItem {
    badge: string;
    title: string;
    description: string;
}

export interface TrendingSidebarProps {
    items: Array<TrendingItem>;
}

export const TrendingSidebar: FC<TrendingSidebarProps> = ({ items }) => {
    return (
        <aside className="space-y-4">
            <h2 className="text-xl font-bold">Trending</h2>
            <div className="bg-white shadow rounded-lg p-4 space-y-4">
                {items.map((item, idx) => (
                    <div
                        key={idx}
                        className="border-b last:border-0 border-gray-100 pb-3 last:pb-0"
                    >
                        <h3 className="font-semibold text-gray-900 hover:text-blue-600 cursor-pointer">
                            <span className="mr-2">{item.badge}</span>
                            {item.title}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                    </div>
                ))}
            </div>
        </aside>
    );
};
