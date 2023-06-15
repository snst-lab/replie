import axiosBase from "axios";
import { constants } from "@constants";

const { config, chain } = constants.evm;
const { baseUrl, query } = config[chain].explorer;

const axios = axiosBase.create({
  baseURL: baseUrl + query.price.endpoint,
  headers: query.price.headers,
  responseType: "json",
});

const params = "?=" + new URLSearchParams(query.price.data).toString();

export const getAssetPrice = axios.get(params);
