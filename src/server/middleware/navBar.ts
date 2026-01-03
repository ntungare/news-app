import { NavBarProps } from '../../components/NavBar';
import { Middleware } from './type';

export interface NavBarState {
    navBarProps: NavBarProps;
}

export const navBarMiddleware: Middleware = (_request, response, next) => {
    response.locals.navBarProps = {
        title: 'DailyNews',
    };

    next();
};
