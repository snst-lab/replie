import dayjsOrigin from "dayjs";
import "dayjs/locale/ja";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import relativeTime from "dayjs/plugin/relativeTime";

dayjsOrigin.locale("ja");
dayjsOrigin.extend(utc);
dayjsOrigin.extend(timezone);
dayjsOrigin.extend(relativeTime);
dayjsOrigin.tz.setDefault("Asia/Tokyo");

export const dayjs = dayjsOrigin;
