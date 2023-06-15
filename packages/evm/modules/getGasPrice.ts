import axiosBase from "axios";
import { constants } from "@constants";

const { config, chain } = constants.evm;
const { baseUrl, query } = config[chain].explorer;

const axios = axiosBase.create({
  baseURL: baseUrl + query.gasReporter.endpoint,
  headers: query.gasReporter.headers,
  responseType: "json",
});
const params = "?=" + new URLSearchParams(query.gasReporter.data).toString();

export const getGasPrice = axios.get(params);
