export const weakContains = (s1, s2) => s1.toLowerCase().includes(s2.toLowerCase());

export const capitalizeString = str => str[0].toUpperCase() + str.substring(1, str.length);

export const pretifyString = str => capitalizeString(str.replace(/_/gm, ' ').toLocaleLowerCase());

// Removes dublication of white space, so
// \s\s\s will be replaced with \s
export const clearWhitespace = text => text.replace(/\s\s+/g, ' ');
