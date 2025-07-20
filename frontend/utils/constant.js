const BASE_URL = import.meta.env.PROD
  ? "https://mern-chat-backend-6gnb.onrender.com"
  : "http://localhost:8080";

export const USER_END_POINT = `${BASE_URL}/api/v1/user`;
export const MESSAGE_END_POINT = `${BASE_URL}/api/v1/message`;
export const SOCKET_URL = BASE_URL;
