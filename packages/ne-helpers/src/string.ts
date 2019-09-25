import * as R from 'ramda';

export const weakContains = (s1: string, s2: string) => s1.toLowerCase().includes(s2.toLowerCase());

export const capitalizeString = (str: string) =>
  str[0].toUpperCase() + str.substring(1, str.length);

export const pretifyString = (str: string) =>
  capitalizeString(str.replace(/_/gm, ' ').toLocaleLowerCase());
