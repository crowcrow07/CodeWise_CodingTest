// 시간 변환 함수

export default function convertDateTime(originalDateTime) {
  const date = new Date(originalDateTime);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hour = String(date.getUTCHours()).padStart(2, "0");
  const minute = String(date.getUTCMinutes()).padStart(2, "0");

  const convertedDateTime = `${year}-${month}-${day} ${hour}:${minute}`;

  return convertedDateTime;
}
