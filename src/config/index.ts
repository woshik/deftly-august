const config = () => ({
  port: parseInt(process.env.PORT, 10),

  isProduction: process.env.NODE_ENV === 'production',
  isDevelopment: process.env.NODE_ENV === 'development',

  db_host: process.env.DATABASE_HOST,
  db_name: process.env.DATABASE_NAME,
  db_user: process.env.DATABASE_USER,
  db_password: process.env.DATABASE_PASSWORD,
  db_port: parseInt(process.env.DATABASE_PORT, 10),
});

export default config;

export type ConfigType = ReturnType<typeof config>;
