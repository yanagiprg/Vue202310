import dayjs from "dayjs";
import "dayjs/locale/ja";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale("ja");

type Timestamp = {
  seconds: number;
  nanoseconds: number;
};

export const formatTimestamp = (timestamp: Timestamp): string => {
  // Convert the Timestamp to milliseconds (JavaScript uses milliseconds for dates)
  const dateInMs = timestamp.seconds * 1000 + timestamp.nanoseconds / 1e6;

  // Convert to date object
  const dateObj = dayjs(dateInMs).tz("Asia/Tokyo");

  // Format date
  const formattedDate = dateObj.format("YYYY年MM月DD日HH時mm分ss秒");

  return formattedDate;
};
