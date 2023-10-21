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
  const formattedDate = dateObj.format("YYYY年MM月DD日HH時mm分");

  return formattedDate;
};

// コメントのcreateAtをフォーマットする関数
// "2023-10-10T00:31:14.280Z"
export const formatJapaneseDate = (inputTimestamp) => {
  // Dateオブジェクトを生成
  const date = new Date(inputTimestamp);
  const y = date.getFullYear();
  const m = date.getMonth() + 1;
  const d = date.getDate();
  const h = date.getHours();
  const min = date.getMinutes();
  return `${y}年${m}月${d}日${h}時${min}分`;
};
