import React, { FC } from 'react';

export const Footer: FC = () => {
    return (
        <footer className="[grid-area:footer] mt-12 bg-white py-6 shadow-inner grid grid-cols-6 [grid-template-areas:'._main_main_main_main_.']">
            <div className="[grid-area:main] px-6 text-center text-sm text-gray-500">
                © 2025 DailyNews • All rights reserved.
            </div>
        </footer>
    );
};
