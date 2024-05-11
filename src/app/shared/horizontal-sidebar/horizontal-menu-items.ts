import { RouteInfo } from './horizontal-sidebar.metadata';

export const ROUTES: RouteInfo[] = [
    {
        path: '/playteca',
        title: 'Playteca',
        icon: 'home',
        class: '',
        ddclass: '',
        extralink: false,
        submenu: []
    },
    {
        path: '/juegos',
        title: 'Listado juegos',
        icon: 'grid',
        class: 'has-arrow',
        ddclass: 'mega-dropdown',
        extralink: false,
         submenu: []
        },
        {
            path: '/mapa',
            title: 'Mapa',
            icon: 'map',
            class: '',
            ddclass: '',
            extralink: false,
            submenu: []
        },
        {
            path: '/calendario',
            title: 'Calendario',
            icon: 'calendar',
            class: '',
            ddclass: '',
            extralink: false,
            submenu: []
        },
        
];
