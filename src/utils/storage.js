import { LOCAL_STORAGE_PREFIX } from '../constants/common';

export const getItem = key => localStorage.getItem(`${LOCAL_STORAGE_PREFIX}.${key}`);

export const setItem = (key, value) => localStorage.setItem(`${LOCAL_STORAGE_PREFIX}.${key}`, value);

export const removeItem = key => localStorage.removeItem(`${LOCAL_STORAGE_PREFIX}.${key}`);