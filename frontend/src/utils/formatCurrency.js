const audFormatter = new Intl.NumberFormat("en-AU", {
  style: "currency",
  currency: "AUD"
});

export function formatCurrency(value) {
  return audFormatter.format(value);
}