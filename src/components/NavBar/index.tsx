import classnames from 'classnames';
import IE from 'country-flag-icons/react/3x2/IE';
import IN from 'country-flag-icons/react/3x2/IN';
import US from 'country-flag-icons/react/3x2/US';
import React, { FC, useState, useMemo, memo } from 'react';
import { FaBars, FaXmark } from 'react-icons/fa6';

import { useUrlState } from '../../hooks/urlState';
import { formatUrl } from '../../utils/urlFormatter';
import { Search } from '../Search';

import type { FlagComponent } from 'country-flag-icons/react/3x2';

import type { Country } from '../../constants/countries';

export interface NavBarProps {
    title: string;
    navItems: Array<{ id: string; name: string; href: string }>;
    queryParams?: Record<string, any>;
}

const CountryFlags: Record<Country, FlagComponent> = {
    us: memo(() => <US className="w-full h-full block shadow-sm" />),
    ie: memo(() => <IE className="w-full h-full block shadow-sm" />),
    in: memo(() => <IN className="w-full h-full block shadow-sm" />),
} as const;

export const NavBar: FC<NavBarProps> = ({ title }) => {
    const { path, country } = useUrlState();
    const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const ActiveCountryFlag = useMemo(() => CountryFlags[country], [country]);

    // Toggle dropdown
    const toggleCountryDropdown = () => setIsCountryDropdownOpen((prev) => !prev);
    const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);

    return (
        <div className="[grid-area:navbar] bg-white shadow mb-2 relative z-50">
            <nav className="min-h-16 flex items-center">
                <div className="px-6 py-3 size-full flex justify-between items-center">
                    <a
                        href={formatUrl({ path: '/', params: { country } })}
                        className="hover:text-blue-600"
                    >
                        <h1 className="text-2xl font-bold">{title}</h1>
                    </a>
                    <div className="flex items-center gap-4 lg:gap-8">
                        {/* Desktop Search */}
                        <div className="hidden lg:inline">
                            <Search />
                        </div>

                        {/* Country Selector */}
                        <div className="relative">
                            {/* Trigger Button: Displays current selection */}
                            <button
                                onClick={toggleCountryDropdown}
                                className={classnames(
                                    'w-9 flex items-center justify-center hover:scale-105',
                                    {
                                        'ring-2 ring-blue-500 ring-offset-2 rounded-[1px]':
                                            isCountryDropdownOpen,
                                    }
                                )}
                                title={`Current: ${country.toUpperCase()}`}
                            >
                                <ActiveCountryFlag />
                            </button>

                            {/* Country Dropdown Menu */}
                            {isCountryDropdownOpen && (
                                <div
                                    className={classnames(
                                        'absolute right-0 min-w-32',
                                        'bg-white mt-2 py-1 rounded-md shadow-lg border border-gray-100',
                                        'flex flex-col items-center gap-1 overflow-hidden z-20'
                                    )}
                                >
                                    {Object.keys(CountryFlags).map((countryCode: Country) => {
                                        const CountryFlagComponent = CountryFlags[countryCode];
                                        const isSelected = country === countryCode;

                                        return (
                                            <a
                                                key={countryCode}
                                                href={formatUrl({
                                                    path,
                                                    params: { country: countryCode },
                                                })}
                                                className={classnames(
                                                    'w-full px-4 py-2 flex items-center justify-between gap-3',
                                                    'text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50',
                                                    {
                                                        'bg-blue-50': isSelected,
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
                                                    <CountryFlagComponent />
                                                </div>
                                            </a>
                                        );
                                    })}
                                </div>
                            )}
                        </div>

                        {/* Mobile Menu Toggle */}
                        <button
                            className="lg:hidden p-1 text-gray-600 hover:text-gray-900"
                            onClick={toggleMobileMenu}
                        >
                            {isMobileMenuOpen ? (
                                <FaXmark className="w-6 h-6" />
                            ) : (
                                <FaBars className="w-6 h-6" />
                            )}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Dropdown */}
            {isMobileMenuOpen && (
                <div className="lg:hidden border-t px-6 py-3 bg-white">
                    <Search />
                </div>
            )}
        </div>
    );
};
