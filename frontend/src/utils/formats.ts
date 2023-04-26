import moment from "moment"

export function dollarFormat(amount: number) {
  const dollar = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    currencyDisplay: "narrowSymbol",
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  })
  return dollar.format(amount)
}

export function timeFormat(time: string, formatType: string) {
  return moment(time).format(formatType)
}

export function fromNowFormat(time: string) {
  return moment(time).fromNow()
}
