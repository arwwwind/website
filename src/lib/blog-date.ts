function ordinal(n: number): string {
  const v = n % 100;
  if (v >= 11 && v <= 13) return `${n}th`;
  switch (n % 10) {
    case 1:
      return `${n}st`;
    case 2:
      return `${n}nd`;
    case 3:
      return `${n}rd`;
    default:
      return `${n}th`;
  }
}

function timeOfDay(date: Date): string {
  const hour = date.getHours();
  if (hour < 5) return 'Late Night';
  if (hour < 12) return 'Morning';
  if (hour < 17) return 'Afternoon';
  if (hour < 21) return 'Evening';
  return 'Late Eve';
}

/** e.g. "Late Eve of the 30th of July 2026" */
export function formatBlogTimestamp(date: Date = new Date()): string {
  const month = date.toLocaleString('en-US', { month: 'long' });
  return `${timeOfDay(date)} of the ${ordinal(date.getDate())} of ${month} ${date.getFullYear()}`;
}
