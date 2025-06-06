export const WHITE_LIST = [
  { name: 'notFound', children: [] },
  { name: 'login', children: [] },
  {
    name: 'settings',
    children: [{ name: 'adminList' }, { name: 'depmentList' }],
  },
];

export const NOT_FOUND = {
  name: 'notFound',
};

export const REDIRECT_ROUTE_NAME = 'Redirect';

export const DEFAULT_ROUTE_NAME = 'Workplace';

export const DEFAULT_ROUTE = {
  title: '',
  name: DEFAULT_ROUTE_NAME,
  fullPath: '/dashboard/workplace',
};
