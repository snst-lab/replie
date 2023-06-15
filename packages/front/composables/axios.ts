import { default as axiosOrigin } from "axios";
axiosOrigin.defaults.timeout = 10000;

export const axios = axiosOrigin;
