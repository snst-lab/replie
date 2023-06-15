import * as dotenv from "dotenv";
import * as path from "path";

dotenv.config({
  path: path.join(__dirname, "../../../.env"),
});

export default {
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  youtubeApiKey: process.env.YOUTUBE_API_KEY,
};
