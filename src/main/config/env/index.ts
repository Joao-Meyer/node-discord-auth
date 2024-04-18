import 'dotenv/config';

export const env = {
  API: {
    JWT_EXPIRES_IN: Number(process.env.JWT_EXPIRATION),
    JWT_SECRET: String(process.env.JWT_SECRET),
    PORT: String(process.env.API_PORT)
  },
  DB: {
    URL: String(process.env.DATABASE_URL)
  },
  DC: {
    CLIENT_ID: String(process.env.DC_CLIENT_ID),
    CLIENT_SECRET: String(process.env.DC_CLIENT_SECRET),
    GRANT_TYPE: String(process.env.DC_GRANT_TYPE) as 'authorization_code' | 'refresh_token',
    REDIRECT_URI: String(process.env.DC_REDIRECT_URI),
    SCOPE: String(process.env.DC_SCOPE),
    SERVER_ID: String(process.env.DC_SERVER_ID),
    SERVER_ROLES: {
      ADMIN: String(process.env.DC_SERVER_ADMIN_ROLE_ID),
      PAYER_STUDENT: String(process.env.DC_SERVER_STUDENT_ROLE_ID)
    },
    SERVER_URL: String(process.env.DC_SERVER_URL),
    TOKEN_AUTH_URL: String(process.env.DC_TOKEN_AUTH_URL),
    USERS_URL: String(process.env.DC_USERS_URL)
  },
  FRONT: {
    URL: String(process.env.FRONT_URL)
  }
};
