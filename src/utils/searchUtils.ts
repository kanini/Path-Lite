export const ALPHANUMERIC_SPACE_PATTERN = /^[a-zA-Z0-9\s]*$/;

export const sanitizeSearchInput = (input: string): string => {
  return input.replace(/[^a-zA-Z0-9\s]/g, '').trim().toLowerCase();
};

export const isValidSearchInput = (input: string): boolean => {
  return ALPHANUMERIC_SPACE_PATTERN.test(input);
};
