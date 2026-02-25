export const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const LOGIN_URL = `${BASE_URL}/login`;
export const PROFILE_URL = `${BASE_URL}/profile/view`;
export const LOGOUT_URL = `${BASE_URL}/logout`;
export const FEED_URL = `${BASE_URL}/user/feed`;
export const EDIT_URL = `${BASE_URL}/profile/edit`;
export const USER_CONNECTION = `${BASE_URL}/user/connection`;
export const REQUEST_RECEIVED = `${BASE_URL}/user/requests/received`;
export const SEND_REQUEST = `${BASE_URL}/request/send`;
export const SIGNUP = `${BASE_URL}/signup`;
export const CHAT = `${BASE_URL}/chat`;