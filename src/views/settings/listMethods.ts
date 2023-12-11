import {
  create as createRole,
  update as updateRole,
  info as roleInfo,
  grid as roleGrid,
  roleUserGrid,
  getMeunDataByRole as getRoleMenu,
  buildRoleMenu,
} from '@/api/member';
import { reject } from 'lodash';

export const getRoleGrid = async () => {
  const { data } = await roleGrid();
  return new Promise((resolve) => {
    resolve(data);
  });
};
export const getRoleUserGrid = async (params: any) => {
  const { data } = await roleUserGrid(params);
  return new Promise((resolve) => {
    resolve(data);
  });
};
export const getRoleInfoByRoleId = async (roleId: number) => {
  const { data } = await roleInfo({ roleId });
  return new Promise((resolve) => {
    resolve(data);
  });
};
export const createRoleT = async (params: any) => {
  const res = await createRole(params);
  return new Promise((resolve) => {
    resolve(res);
  });
};
export const updateRoleT = async (params: any) => {
  const res = await updateRole(params);
  return new Promise((resolve) => {
    resolve(res);
  });
};
export const getMeunDataByRole = async (params: any) => {
  const { data } = await getRoleMenu(params);
  return new Promise((resolve) => {
    resolve(data);
  });
};
export const insetMenuInRole = async (params: any) => {
  const res = await buildRoleMenu(params);
  return new Promise((resolve) => {
    resolve(res);
  });
};
