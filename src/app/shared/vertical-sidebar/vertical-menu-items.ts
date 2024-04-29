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
  // },
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
    icon: 'Cpu',
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
  }
];
