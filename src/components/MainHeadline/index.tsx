import React, { FC } from 'react';

export interface MainHeadlineProps {
    title: string;
    description: string;
    image: string;
    category: string;
}

export const MainHeadline: FC<MainHeadlineProps> = ({ title, description, image, category }) => {
    return (
        <div className="bg-white rounded-lg shadow overflow-hidden">
            <img src={image} className="w-full h-96 object-cover" alt={title} />
            <div className="p-6">
                <div className="text-blue-600 font-bold text-sm mb-2 uppercase tracking-wide">
                    {category}
                </div>
                <h2 className="text-3xl font-bold mb-3 hover:text-blue-800 cursor-pointer">
                    {title}
                </h2>
                <p className="text-gray-700 leading-relaxed">{description}</p>
            </div>
        </div>
    );
};
