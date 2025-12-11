import { NavBarProps } from '../../components/NavBar';
import { Middleware } from './type';

export interface NavBarState {
    navBarProps: NavBarProps;
}

export const navBarMiddlware: Middleware = (_request, response, next) => {
    response.locals.navBarProps = {
        title: 'DailyNews',
        navItems: [
            {
                id: 'home',
                name: 'Home',
                href: '/',
            },
            {
                id: 'world',
                name: 'World',
                href: '/world',
            },
            {
                id: 'politics',
                name: 'Politics',
                href: '/politics',
            },
            {
                id: 'tech',
                name: 'Tech',
                href: '/tech',
            },
            {
                id: 'sports',
                name: 'Sports',
                href: '/sports',
            },
        ],
    };

    next();
};
