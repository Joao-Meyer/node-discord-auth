import 'dotenv/config';

export const env2 = {
  apiPort: process.env.API_PORT ?? '',
  hashSalt: Number(process.env.HASH_SALT),
  imageUrl: process.env.IMAGE_URL ?? '',
  jwtExpiresIn: process.env.JWT_EXPIRATION ?? '',
  jwtSecret: process.env.JWT_SECRET ?? ''
};

export const env = {
  DB: {
    URL: String(process.env.DATABASE_URL)
  },
  DC: {
    API_URL: String(process.env.DC_API_URL),
    CLIENT_ID: String(process.env.DC_CLIENT_ID)
  }
  // API_PORT: String(process.env.API_PORT),
};
