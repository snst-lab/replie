import * as dotenv from "dotenv";
import * as path from "path";

dotenv.config({
  path: path.join(__dirname, "../../../.env"),
});

export default {
  baseUrl: `https://${process.env.MICRO_CMS_ID}.microcms.io/api/v1`,
  apiKey: process.env.MICRO_CMS_API_KEY,
};
