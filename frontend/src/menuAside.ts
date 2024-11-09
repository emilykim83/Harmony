import * as icon from '@mdi/js';
import { MenuAsideItem } from './interfaces';

const menuAside: MenuAsideItem[] = [
  {
    href: '/dashboard',
    icon: icon.mdiViewDashboardOutline,
    label: 'Dashboard',
  },

  {
    href: '/users/users-list',
    label: 'Users',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiAccountGroup ? icon.mdiAccountGroup : icon.mdiTable,
    permissions: 'READ_USERS',
  },
  {
    href: '/lessons/lessons-list',
    label: 'Lessons',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiMusicNote ? icon.mdiMusicNote : icon.mdiTable,
    permissions: 'READ_LESSONS',
  },
  {
    href: '/progress/progress-list',
    label: 'Progress',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiProgressCheck ? icon.mdiProgressCheck : icon.mdiTable,
    permissions: 'READ_PROGRESS',
  },
  {
    href: '/sections/sections-list',
    label: 'Sections',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiViewList ? icon.mdiViewList : icon.mdiTable,
    permissions: 'READ_SECTIONS',
  },
  {
    href: '/roles/roles-list',
    label: 'Roles',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiShieldAccountVariantOutline
      ? icon.mdiShieldAccountVariantOutline
      : icon.mdiTable,
    permissions: 'READ_ROLES',
  },
  {
    href: '/permissions/permissions-list',
    label: 'Permissions',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiShieldAccountOutline
      ? icon.mdiShieldAccountOutline
      : icon.mdiTable,
    permissions: 'READ_PERMISSIONS',
  },
  {
    href: '/profile',
    label: 'Profile',
    icon: icon.mdiAccountCircle,
  },

  {
    href: '/home',
    label: 'Home page',
    icon: icon.mdiHome,
    withDevider: true,
  },
  {
    href: '/api-docs',
    target: '_blank',
    label: 'Swagger API',
    icon: icon.mdiFileCode,
    permissions: 'READ_API_DOCS',
  },
];

export default menuAside;
