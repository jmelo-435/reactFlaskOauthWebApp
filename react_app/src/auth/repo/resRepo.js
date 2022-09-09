import axios from "axios";
const root = "";
const apiKey = "_zUYQ83k!x34%nh(";

const ResEndpoints = Object.freeze({
    Api: "/api_res",
    ApiStocksList: "/api_res/stocks/list",
    ApiStocksListDaysAgo:"/api_res/stocks/"
  });

  const Methods = Object.freeze({
    PUT: "PUT",
    GET: "GET",
    POST: "POST",
    DELETE: "DELETE",
    HEAD: "HEAD",
    PATCH: "PATCH",
  });

  class AuthApiRequestParameters {
    constructor(endpoint = AuthEndpoints.Api, data = null, method = Methods.GET) {
      this.endpoint = endpoint;
      this.data = data;
      this.method = method;
    }
  }

  async function getResApiResponse(parameters, token = null) {
    const response = await axios({
      data: parameters.data,
      headers: {
        "api-key": apiKey,
      },
      method: parameters.method,
      url: root + parameters.endpoint,
    });
    return response.data;
  }

  export async function getStocksList(token = "") {
    class GetStoksListResponse {
      constructor(res) {
        this.sucess = res.sucess;
        this.stocksList = res.list;
        return this;
      }
    }
  
    const params = new AuthApiRequestParameters(
      ResEndpoints.ApiStocksList,
      "{}",
      Methods.GET
    );
    const response = await getResApiResponse(params, token);
    return new GetStoksListResponse(response);
  }
  export async function getStocksListDaysAgo(days, token ="") {
    class GetStoksListOneYearAgoResponse {
      constructor(res) {
        this.sucess = res.sucess;
        this.stocksList = res.list;
        return this;
      }
    }
  
    const params = new AuthApiRequestParameters(
      ResEndpoints.ApiStocksListDaysAgo+String(days),
      "{}",
      Methods.GET
    );
    const response = await getResApiResponse(params, token);
    return new GetStoksListOneYearAgoResponse(response);
  }