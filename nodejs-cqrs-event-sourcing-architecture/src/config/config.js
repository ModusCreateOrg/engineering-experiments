const dotenv = require('dotenv');
const Joi = require('joi');

dotenv.config();

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string()
      .valid('production', 'development', 'test')
      .required(),
    PORT: Joi.number().default(3001),
    MONGODB_URL: Joi.string().required().description('Mongo DB url'),
    LOGGING_LEVEL: Joi.string()
      .valid('debug', 'info', 'warn', 'error')
      .default('info')
      .description('Logging threshold'),
    LOGGING_FILE_ENABLED: Joi.boolean()
      .default(false)
      .description('Enable or disable file-based logging'),
    LOGGING_FILE_MAX_SIZE: Joi.string()
      .default('20m')
      .description('Maximum log file size'),
    LOGGING_FILE_DIR: Joi.string()
      .default('logs')
      .description('Log file directory'),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema
  .prefs({ errors: { label: 'key' } })
  .validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  logging: {
    level: envVars.LOGGING_LEVEL,
    file: {
      enabled: envVars.LOGGING_FILE_ENABLED,
      dir: envVars.LOGGING_FILE_DIR,
      maxSize: envVars.LOGGING_FILE_MAX_SIZE,
    },
  },
  mongoose: {
    url: envVars.MONGODB_URL + (envVars.NODE_ENV === 'test' ? '-test' : ''),
    options: {},
  },
};
