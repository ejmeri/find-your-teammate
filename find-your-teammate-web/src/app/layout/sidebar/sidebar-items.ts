import { RouteInfo } from './sidebar.metadata';

export const ROUTES: RouteInfo[] = [
  {
    path: '',
    title: 'home',
    icon: 'menu-icon fas fa-home',
    class: '',
    groupTitle: false,
    submenu: [],
  },
  {
    path: '',
    title: 'Minha conta',
    icon: 'menu-icon fas fa-user',
    class: 'menu-toggle',
    groupTitle: false,
    submenu: [
      {
        path: 'perfil',
        title: 'Perfil',
        icon: '',
        class: '',
        groupTitle: false,
        submenu: [],
      },
      {
        path: 'alterar-senha',
        title: 'Alterar senha',
        icon: '',
        class: '',
        groupTitle: false,
        submenu: [],
      },
    ],
  },
];
