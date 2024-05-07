import { RouteInfo } from './vertical-sidebar.metadata';

export const ROUTES: RouteInfo[] = [
  // {
  //   path: '',
  //   title: 'Personal',
  //   icon: 'mdi mdi-dots-horizontal',
  //   class: 'nav-small-cap',
  //   extralink: true,
  //   label: '',
  //   labelClass: '',
  //   submenu: []
  // }
  {
    path: '/auth/login',
    title: 'Iniciar sesión',
    icon: 'Lock',
    class: '',
    extralink: false,
    label: '',
    labelClass: '',
    submenu: []
  },
  {
    path: '/playteca',
    title: 'Playteca',
    icon: 'Home',
    class: '',
    extralink: false,
    label: '',
    labelClass: '',
    submenu: []
  },
  // {
  //   path: '/starter',
  //   title: 'UI',
  //   icon: 'mdi mdi-dots-horizontal',
  //   class: 'nav-small-cap',
  //   extralink: true,
  //   label: '',
  //   labelClass: '',
  //   submenu: []
  // },
  {
    path: '/juegos',
    title: 'Listado juegos',
    icon: 'grid',
    class: '',
    extralink: false,
    label: '',
    labelClass: '',
    submenu: [
      // {
      //   path: '/component/accordion',
      //   title: 'Accordion',
      //   icon: 'mdi mdi-adjust',
      //   class: '',
      //   extralink: false,
      //   label: '',
      //   labelClass: '',
      //   submenu: []
      // },
    ]
  },
  {
    path: '/mapa',
    title: 'Mapa',
    icon: 'map',
    class: '',
    extralink: false,
    label: '',
    labelClass: '',
      submenu: []
  },
  {
    path: '/calendario',
    title: 'Calendario',
    icon: 'calendar',
    class: '',
    extralink: false,
    label: '',
    labelClass: '',
      submenu: []
  },
];

