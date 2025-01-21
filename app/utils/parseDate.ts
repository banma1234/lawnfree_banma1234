export function parseDate(DATE: Date) {
  const year = DATE.getFullYear();
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
