
export const formatPrice = (price) => {
  if (!price) return '—'
  const sym =
    price.currency === 'INR' ? '₹'
    : price.currency === 'USD' ? '$'
    : price.currency === 'EUR' ? '€'
    : price.currency === 'GBP' ? '£'
    : price.currency
  return `${sym}${Number(price.amount).toLocaleString('en-IN')}`
}