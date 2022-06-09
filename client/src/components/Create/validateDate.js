/* regexp más general para yyyy-mm-dd
const dateRegexp = /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/
*/
const dateRegexp = /^[1-2][089]\d{2}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])$/

export const validDate = (date) => {
  return dateRegexp.test(date)
}
