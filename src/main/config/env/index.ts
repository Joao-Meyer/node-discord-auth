import 'dotenv/config';

export const env2 = {
  apiPort: process.env.API_PORT ?? '',
  hashSalt: Number(process.env.HASH_SALT),
  imageUrl: process.env.IMAGE_URL ?? '',
  jwtExpiresIn: process.env.JWT_EXPIRATION ?? '',
  jwtSecret: process.env.JWT_SECRET ?? ''
};

export const env = {
  ALLOWED_FILE_EXTENSIONS: String(process.env.ALLOWED_FILE_EXTENSIONS),
  API_PORT: String(process.env.API_PORT),
  AZ_BLOB_ACCOUNT_KEY: String(process.env.AZ_BLOB_ACCOUNT_KEY),
  AZ_BLOB_ACCOUNT_NAME: String(process.env.AZ_BLOB_ACCOUNT_NAME),
  AZ_BLOB_CONTAINER_NAME: String(process.env.AZ_BLOB_CONTAINER_NAME),
  AZ_BLOB_URL: String(process.env.AZ_BLOB_URL),
  AZ_CS_ENDPOINT: String(process.env.AZ_CS_ENDPOINT),
  AZ_CS_KEY: String(process.env.AZ_CS_KEY),
  AZ_OAI_API_BASE_URL: String(process.env.AZ_OAI_API_BASE_URL),
  AZ_OAI_API_KEY: String(process.env.AZ_OAI_API_KEY),
  AZ_OAI_API_TYPE: String(process.env.AZ_OAI_API_TYPE),
  AZ_OAI_API_VERSION: String(process.env.AZ_OAI_API_VERSION),
  DATABASE_URL: String(process.env.DATABASE_URL)
};
