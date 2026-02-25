// export const URL="https://devtinder-evho.onrender.com"

// export const LOGIN_URL="http://localhost:7777/login"
// export const PROFILE_URL="http://localhost:7777/profile/view"
// export const LOGOUT_URL="http://localhost:7777/logout"
// export const FEED_URL="http://localhost:7777/user/feed"
// export const EDIT_URL="http://localhost:7777/profile/edit"
// export const USER_CONNECTION="http://localhost:7777/user/connection"
// export const REQUEST_RECEIVED="http://localhost:7777/user/requests/received"
// export const BASE_URL="http://localhost:7777";
// export const SEND_REQUEST="http://localhost:7777/request/send"
// export const SIGNUP="http://localhost:7777/signup"; 
// export const CHAT="http://localhost:7777/chat/"




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


