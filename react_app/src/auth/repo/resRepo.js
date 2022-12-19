import axios from "axios";
const root = "";
const apiKey = "_zUYQ83k!x34%nh(";

const ResEndpoints = Object.freeze({
    Api: "/api_res",
    ApiStocksList: "/api_res/stocks/list/",
    ApiStocksListDaysAgo:"/api_res/stocks/",
    ApiStockData:"/api_res/stock/",
    ApiStockChartData:"/api_res/stock/graph/",
    ApiStocksSegmentsList:"/api_res/stocks/segments",
    ApiStocksFromSegment:"/api_res/stock/segment/"


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
///TODO:fazer a filtragem por segmento chegar até aqui
  export async function getStocksList(segment) {
    
    class GetStoksListResponse {
      constructor(res) {
        this.sucess = res.sucess;
        this.stocksList = res.list;
        return this;
      }
    }
  
    const params = new AuthApiRequestParameters(
      ResEndpoints.ApiStocksList+segment,
      "{}",
      Methods.GET
    );
    
    const response = await getResApiResponse(params);
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

  export async function getStockData(id) {
    class GetStockData {
      constructor(res) {
        this.sucess = res.sucess;
        this.data = res.balance;
        return this;
      }
    }
  
    const params = new AuthApiRequestParameters(
      ResEndpoints.ApiStockData+String(id),
      "{}",
      Methods.GET
    );
    const response = await getResApiResponse(params);
    return new GetStockData(response);
  }

  export async function getStockChartData(id) {
    class GetStockChartData {
      constructor(res) {
        this.sucess = res.sucess;
        this.data = res.graphData;
        return this;
      }
    }
  
    const params = new AuthApiRequestParameters(
      ResEndpoints.ApiStockChartData+String(id),
      "{}",
      Methods.GET
    );
    const response = await getResApiResponse(params);
    return new GetStockChartData(response);
  }

  export async function getSegmentsList() {
    class GetSegmentsList {
      constructor(res) {
        this.sucess = res.sucess;
        this.segmentos = res.segmentos;
        return this;
      }
    }
  
    const params = new AuthApiRequestParameters(
      ResEndpoints.ApiStocksSegmentsList,
      "{}",
      Methods.GET
    );
    const response = await getResApiResponse(params);
    return new GetSegmentsList(response);
  }