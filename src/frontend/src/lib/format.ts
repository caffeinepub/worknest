export function formatINR(amount: bigint): string {
  const num = Number(amount);
  return `₹${num.toLocaleString('en-IN')}`;
}

export function formatBookingTime(timestamp: bigint): string {
  const date = new Date(Number(timestamp) / 1_000_000);
  return date.toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}
