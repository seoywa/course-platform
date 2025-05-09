export function formatPlural(
  count: number,
  {singular, plural} : {singular: string; plural: string},
  {includeCount = true} = {}
) {
  const word = count === 1 ? singular : plural

  return includeCount ? `${count} ${word}` : word
}

export function formatPrice(
  amount: number,
  {showZeroAsNUmber = false} = {}
) {
  const formatter = new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: Number.isInteger(amount) ? 0 : 2
  })

  if (amount === 0 && !showZeroAsNUmber) return 'Free'
  return formatter.format(amount)
}