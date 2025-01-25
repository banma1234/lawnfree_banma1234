/**
 * 전달받은 `Date`를 임의의 형태 `YY-MM-DD`로 변환, 반환하는 함수
 * @param DATE 변환할 `날짜(Date)`
 * @returns `YY-MM-DD`로 변환된 `string`값 반환
 */
export function parseDate(DATE: Date) {
  const targetDate = new Date(DATE);

  const year = String(targetDate.getFullYear()).substr(2, 3);
  const month = leftPad(targetDate.getMonth() + 1);
  const day = leftPad(targetDate.getDate());

  return [year, month, day].join("-");
}

/**
 * `Month`와 `Day`의 값을 2자리수로 변환, 반환하는 함수
 * `1월`은 `01`로, `7일`은 `07`로 변환한다
 * @param value
 * @returns 변환된 `string`값 반환
 */
function leftPad(value: number) {
  if (value >= 10) {
    return value;
  }
  return `0${value}`;
}
