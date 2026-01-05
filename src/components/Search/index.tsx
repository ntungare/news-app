import React, { FC, useState } from 'react';

import { useUrlState } from '../../hooks/urlState';

export const Search: FC = () => {
    const { country } = useUrlState();
    const [searchText, setSearchText] = useState<string>('');

    return (
        <form method="get" action="/search" autoComplete="off" target="_self">
            <input type="hidden" id="country" name="country" value={country} />
            <label
                htmlFor="search"
                className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
                Search
            </label>
            <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg
                        className="w-4 h-4 text-body"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeWidth="2"
                            d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
                        />
                    </svg>
                </div>
                <input
                    id="search"
                    name="search"
                    type="search"
                    className="w-full rounded-full p-2 ps-9 border border-default-medium text-sm focus:ring-brand focus:border-brand placeholder:text-body"
                    placeholder="Search"
                    required
                    value={searchText}
                    onChange={(event) => setSearchText(event.target.value)}
                />
            </div>
        </form>
    );
};
