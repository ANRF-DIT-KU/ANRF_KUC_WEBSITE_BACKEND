import dotenv from "dotenv";

dotenv.config();

export const env = {
  port: Number(process.env.PORT) || 5000,
  nodeEnv: process.env.NODE_ENV || "development",
  corsOrigin: process.env.CORS_ORIGIN || "http://localhost:5173",
  db: {
    host: process.env.DB_HOST || "127.0.0.1",
    port: Number(process.env.DB_PORT) || 3306,
    name: process.env.DB_NAME || "anrf_pair_db",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    sync: process.env.DB_SYNC === "true",
  },
  jwt: {
    secret: process.env.JWT_SECRET || "change-this-secret-in-production-anrf-pair-2026",
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  },
  defaultSeedPassword: process.env.DEFAULT_SEED_PASSWORD || "Anrf@2026",
};

