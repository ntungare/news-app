import React, { FC } from 'react';

export interface NavBarProps {
    title: string;
    navItems: Array<{ id: string; name: string; href: string }>;
}

export const NavBar: FC<NavBarProps> = ({ title, navItems }) => {
    return (
        <nav className="bg-white shadow mb-2">
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold">{title}</h1>
                <ul className="flex space-x-6 font-medium">
                    {navItems.map((navItem, idx) => (
                        <li key={`${idx}-${navItem.id}`}>
                            <a href={navItem.href} className="hover:text-blue-600">
                                {navItem.name}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
};
