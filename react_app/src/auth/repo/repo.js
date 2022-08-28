import {
  RefreshTokenResponseCodes,
  TestResponseCodes,
  CreateUserResponseCodes,
  LoginUserResponseCodes,
  LogOutResponseCodes,
  LoginGoogleTokenResponseCodes,
  SendResetPasswordEmailResponseCodes,
  ResendConfirmationEmailResponseCodes
} from "./ApiAuthResponseCodes";
import axios from "axios";
import { toInteger } from "lodash";

const root = "http://localhost";
const apiKey = "_zUYQ83k!x34%nh(";

const AuthEndpoints = Object.freeze({
  Api: "/api",
  ApiUsers: "/api/web/users",
  ApiUserPassword: "/api/user/password",
  ApiUserPasswordReset: "/api/web/user/password_reset",
  ApiUserRefreshToken: "/api/web/user/refresh_token",
  ApiUserLogout: "/api/user/logout",
  ApiUsersGoogleToken: "/api/users/google_token",
  ApiUsersResendConfirmation: "/api/users/email_confirmation",
});

const Methods = Object.freeze({
  PUT: "PUT",
  GET: "GET",
  POST: "POST",
  DELETE: "DELETE",
  HEAD: "HEAD",
  PATCH: "PATCH",
});

const TokenType = Object.freeze({
  ACCESS: "x-access-token",
  BEARER: "x-refresh-token",
});

class AuthApiRequestParameters {
  constructor(endpoint = AuthEndpoints.Api, data = null, method = Methods.GET) {
    this.endpoint = endpoint;
    this.data = data;
    this.method = method;
  }
}

function extractResponseCode(possibleResponseCodes, res) {
  let code = null;
  for (let [key, value] of Object.entries(possibleResponseCodes)) {
    if (res["code"] === value) {
      code = key;
    }
  }
  return code;
}

async function getAuthApiResponse(parameters, token = null) {
  const response = await axios({
    data: parameters.data,
    headers: {
      "api-key": apiKey,
    },
    method: parameters.method,
    url: root + parameters.endpoint,
    withCredentials:true
  });
  return response.data;
}

export async function refreshToken(token = "") {
  class RefreshTokenResponse {
    constructor(res) {
      this.responseCode = extractResponseCode(RefreshTokenResponseCodes, res);
      this.accessToken = res.accessData;
      this.refreshToken = res.bearerData;
      return this;
    }
  }

  const params = new AuthApiRequestParameters(
    AuthEndpoints.ApiUserRefreshToken,
    "{}",
    Methods.GET
  );
  const response = await getAuthApiResponse(params, token);

  return new RefreshTokenResponse(response);
}

export async function testAuthApi(token = "") {
  class TestResponse {
    constructor(res) {
      this.responseCode = extractResponseCode(TestResponseCodes, res);
      this.sucess = res.sucess;
      this.message = res.msg;
      return this;
    }
  }

  const params = new AuthApiRequestParameters(
    AuthEndpoints.Api,
    "{}",
    Methods.GET
  );
  const response = await getAuthApiResponse(params, token);
  return new TestResponse(response);
}

export async function createUser(email, password, userName) {
  class CreateUserResponse {
    constructor(res) {
      this.responseCode = extractResponseCode(CreateUserResponseCodes, res);
      this.sucess = res.sucess;
      this.message = res.msg;
      return this;
    }
  }
  let user = JSON.parse("{}");
  user.email = email;
  user.password = password;
  user.userName = userName;

  const params = new AuthApiRequestParameters(
    AuthEndpoints.ApiUsers,
    user,
    Methods.PUT
  );
  const response = await getAuthApiResponse(params);
  return new CreateUserResponse(response);
}

export async function login(email, password) {
  class LoginUserResponse {
    constructor(res) {
      this.responseCode = extractResponseCode(LoginUserResponseCodes, res);
      this.sucess = res.sucess;
      this.message = res.msg;
      this.refreshToken = res.bearerData;
      this.accessToken = res.accessData;
      return this;
    }
  }
  let user = JSON.parse("{}");
  user.email = email;
  user.password = password;

  const params = new AuthApiRequestParameters(
    AuthEndpoints.ApiUsers,
    user,
    Methods.POST
  );
  const response = await getAuthApiResponse(params);
  return new LoginUserResponse(response);
}

export async function logOut(token) {
  class LogoutResponse {
    constructor(res) {
      this.responseCode = extractResponseCode(LogOutResponseCodes, res);
      return this;
    }
  }

  const params = new AuthApiRequestParameters(
    AuthEndpoints.ApiUserLogout,
    "{}",
    Methods.GET
  );
  const response = await getAuthApiResponse(params, token);
  return new LogoutResponse(response);
}

export async function loginGoogleToken(googleToken) {
  class LoginGoogleTokenResponse {
    constructor(res) {
      this.responseCode = extractResponseCode(
        LoginGoogleTokenResponseCodes,
        res
      );
      this.refreshToken = res.bearerData;
      this.accessToken = res.accessData;
      return this;
    }
  }
  let data = JSON.parse("{}");
  data.googleToken = googleToken;

  const params = new AuthApiRequestParameters(
    AuthEndpoints.ApiUsersGoogleToken,
    data,
    Methods.POST
  );
  const response = await getAuthApiResponse(params);
  return new LoginGoogleTokenResponse(response);
}

export async function sendResetPasswordEmail(email) {
    class SendResetPasswordEmailResponse {
      constructor(res) {
        this.responseCode = extractResponseCode(
          SendResetPasswordEmailResponseCodes,
          res
        );
        return this;
      }
    }
    let data = JSON.parse("{}");
    data.email = email;
  
    const params = new AuthApiRequestParameters(
      AuthEndpoints.ApiUserPasswordReset,
      data,
      Methods.POST
    );
    const response = await getAuthApiResponse(params);
    return new SendResetPasswordEmailResponse(response);
  }

  export async function resendConfirmationEmail(email) {
    class ResendConfirmationEmailResponse {
      constructor(res) {
        this.responseCode = extractResponseCode(
          ResendConfirmationEmailResponseCodes,
          res
        );
        return this;
      }
    }
    let data = JSON.parse("{}");
    data.email = email;
  
    const params = new AuthApiRequestParameters(
      AuthEndpoints.ApiUsersResendConfirmation,
      data,
      Methods.POST
    );
    const response = await getAuthApiResponse(params);
    return new ResendConfirmationEmailResponse(response);
  }
