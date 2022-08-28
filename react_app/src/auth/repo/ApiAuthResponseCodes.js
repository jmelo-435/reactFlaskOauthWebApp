export const RefreshTokenResponseCodes = Object.freeze({
  INVALID_REFRESH_TOKEN: 12401,
  EXPIRED_SESSION: 12440,
  INVALID_API_KEY: 15401,
  INTERNAL_ERROR: 40500,
  SUCCESS: 20200,
  SESSION_CREATION_ERROR: 20501,
});

export const TestResponseCodes = Object.freeze({
  INVALID_API_KEY: 15401,
  SUCCESS: 200,
});

export const CreateUserResponseCodes = Object.freeze({
  INVALID_API_KEY: 15401,
  INTERNAL_ERROR: 10500,
  SUCCESS: 10200,
  SERVER_CONNECTION_ERROR: 10501,
  EMAIL_ALREADY_IN_USE: 10409,
  NO_PASSWORD: 10402,
  INVALID_PASSWORD: 10404,
});

export const LoginUserResponseCodes = Object.freeze({
  INVALID_API_KEY: 15401,
  INTERNAL_ERROR: 20500,
  SUCCESS: 10200,
  EMAIL_NOT_CONFIRMED: 20409,
  WRONG_CREDENTIALS: 20404,
});

export const LoginGoogleTokenResponseCodes = Object.freeze({
  INVALID_API_KEY: 15401,
  INTERNAL_ERROR: 11500,
  SUCCESS: 20200,
  SESSION_CREATION_ERROR: 20501,
});
export const LogOutResponseCodes = Object.freeze({
  INVALID_REFRESH_TOKEN: 12401,
  INVALID_API_KEY: 15401,
  INTERNAL_ERROR: 80500,
  SUCCESS: 80200,
});

export const SendResetPasswordEmailResponseCodes = Object.freeze({
  INVALID_API_KEY: 15401,
  USER_DO_NOT_EXIST: 50404,
  INTERNAL_ERROR: 50500,
  SUCCESS: 50200,
});
export const ResendConfirmationEmailResponseCodes = Object.freeze({
  INVALID_API_KEY: 15401,
  EMAIL_ALREADY_CONFIRMED: 13409,
  INTERNAL_ERROR: 13500,
  SUCCESS: 13200,
});
