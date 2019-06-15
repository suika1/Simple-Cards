const AUTH_TOKEN_NAME = 'auth_token';

export const getAuthToken = () => localStorage.getItem(AUTH_TOKEN_NAME);
export const setAuthToken = (value) => localStorage.setItem(AUTH_TOKEN_NAME, value);
