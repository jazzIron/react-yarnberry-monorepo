export const setSession = (key: string, value: unknown) => {
  sessionStorage.setItem(key, JSON.stringify(value));
};

export const getSession = (key: string) => {
  const getItem = sessionStorage.getItem(key);
  return getItem ? JSON.parse(getItem) : null;
};

export const removeSession = (key: string) => {
  sessionStorage.removeItem(key);
};

export const clearSession = () => {
  sessionStorage.clear();
};
