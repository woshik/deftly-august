import * as Joi from 'joi';

export default Joi.object({
  // Application configuration
  APP_NAME: Joi.string(),
  APP_URL: Joi.string().required(),
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'testing')
    .default('development'),
  PORT: Joi.number().default(8000),

  // Database configuration
  DATABASE_HOST: Joi.string().required(),
  DATABASE_NAME: Joi.string().required(),
  DATABASE_USER: Joi.string().required(),
  DATABASE_PASSWORD: Joi.string().required(),
  DATABASE_PORT: Joi.number().required(),
});
