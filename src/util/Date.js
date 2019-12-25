let dateFormater = null;

export function formatDate(t, flagShort) {
  if (dateFormater == null) {
    dateFormater = new Date();
  }
  dateFormater.setTime(t * 1000);
  const month = dateFormater.getMonth() + 1;
  const date = dateFormater.getDate();
  return `${(!flagShort ? `${dateFormater.getFullYear()}-` : '') + (String(month).length < 2 ? `0${month}` : month)}-${String(date).length < 2 ? `0${date}` : date}`;
}

export function formatLongDate(t, withoutYear) {
  const dateStr = formatDate(t, withoutYear);
  const hour = dateFormater.getHours();
  const minute = dateFormater.getMinutes();
  return `${dateStr} ${String(hour).length < 2 ? `0${hour}` : hour}:${String(minute).length < 2 ? `0${minute}` : minute}`;
}

export function formatLongDate2(t) {
  const dateStr = formatLongDate(t);
  const seconds = dateFormater.getSeconds();
  return `${dateStr}:${String(seconds).length < 2 ? `0${seconds}` : seconds}`;
}
