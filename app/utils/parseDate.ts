export function parseDate(DATE: Date) {
  const year = String(DATE.getFullYear()).substr(2, 3);
  const month = leftPad(DATE.getMonth() + 1);
  const day = leftPad(DATE.getDate());

  return [year, month, day].join("-");
}

function leftPad(value: number) {
  if (value >= 10) {
    return value;
  }
  return `0${value}`;
}
