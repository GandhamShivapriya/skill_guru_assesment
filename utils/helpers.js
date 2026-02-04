export const cleanString = (value = "") =>
    value.trim().replace(/\s+/g, " ");

export const isEmptyString = (value = "") =>
    cleanString(value).length === 0;

