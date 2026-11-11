require("dotenv").config();

const baseConfig = {
  username: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "12345",
  database: process.env.DB_NAME || "anrf_pair_db",
  host: process.env.DB_HOST || "127.0.0.1",
  port: Number(process.env.DB_PORT) || 3306,
  dialect: "mysql",
};

module.exports = {
  development: { ...baseConfig },
  test: {
    ...baseConfig,
    database: process.env.DB_TEST_NAME || "anrf_pair_test_db",
  },
  production: { ...baseConfig },
};

