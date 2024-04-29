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
         submenu: [
        //   {
        //     path: '/component/accordion',
        //     title: 'Accordion',
        //     icon: 'mdi mdi-adjust',
        //     class: '',
        //     extralink: false,
        //     ddclass: "",
        //     submenu: []
        //   },
         ]
        },
];
