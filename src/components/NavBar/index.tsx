import React, { FC, useEffect, useState, useMemo } from 'react';
import classnames from 'classnames';
import qs from 'qs';
import US from 'country-flag-icons/react/3x2/US';
import IE from 'country-flag-icons/react/3x2/IE';
import IN from 'country-flag-icons/react/3x2/IN';
import { useCountryContext } from '../../context/country';
import type { FlagComponent } from 'country-flag-icons/react/3x2';
import type { Country } from '../../constants/countries';

export interface NavBarProps {
    title: string;
    navItems: Array<{ id: string; name: string; href: string }>;
    queryParams?: Record<string, any>;
}

const CountryFlags: Record<Country, FlagComponent> = {
    us: US,
    ie: IE,
    in: IN,
} as const;

export const NavBar: FC<NavBarProps> = ({ title, navItems }) => {
    const { activeCountry } = useCountryContext();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [queryParams, setQueryParams] = useState<qs.ParsedQs>({});
    const [href, setHref] = useState<string>('/');
    const ActiveCountryFlag = useMemo(() => CountryFlags[activeCountry], [activeCountry]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setQueryParams(qs.parse(window.location.search.replace('?', '')));
            setHref(window.location.pathname);
        }
    }, []);

    // Toggle dropdown
    const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

    return (
        <nav className="bg-white shadow mb-2 relative z-50">
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold">{title}</h1>
                <div className="flex items-center gap-8">
                    <ul className="flex space-x-6 font-medium">
                        {navItems.map((navItem, idx) => (
                            <li key={`${idx}-${navItem.id}`}>
                                <a href={navItem.href} className="hover:text-blue-600">
                                    {navItem.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                    <div className="relative">
                        {/* Trigger Button: Displays current selection */}
                        <button
                            onClick={toggleDropdown}
                            className={classnames(
                                'w-9 h-6 flex items-center justify-center transition-all duration-200 hover:scale-105',
                                {
                                    'ring-2 ring-blue-500 ring-offset-2 rounded-[1px]':
                                        isDropdownOpen,
                                }
                            )}
                            title={`Current: ${activeCountry.toUpperCase()}`}
                        >
                            <ActiveCountryFlag className="w-full h-full block shadow-sm" />
                        </button>

                        {/* Dropdown Menu */}
                        {isDropdownOpen && (
                            <div className="absolute right-0 mt-2 min-w-32 bg-white rounded-md shadow-lg py-1 border border-gray-100 flex flex-col items-center gap-1 overflow-hidden">
                                {Object.keys(CountryFlags).map((countryCode: Country) => {
                                    const CountryFlagComponent = CountryFlags[countryCode];
                                    const isSelected = activeCountry === countryCode;

                                    return (
                                        <a
                                            key={countryCode}
                                            href={`${href}?${qs.stringify({ ...queryParams, country: countryCode })}`}
                                            className={classnames(
                                                'w-full px-4 py-2 flex items-center justify-between hover:bg-gray-50 transition-colors gap-3 text-sm font-medium text-gray-700',
                                                {
                                                    'bg-blue-50 cursor-default': isSelected,
                                                }
                                            )}
                                            title={countryCode.toUpperCase()}
                                        >
                                            <span className="uppercase">{countryCode}</span>
                                            <div
                                                className={classnames('w-6 h-4', {
                                                    'opacity-100': isSelected,
                                                    'opacity-80': !isSelected,
                                                })}
                                            >
                                                <CountryFlagComponent className="w-full h-full block shadow-sm" />
                                            </div>
                                        </a>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};
