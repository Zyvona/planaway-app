export function sanitizeInput(input: string): string {
  if (!input) return '';

  return input
    .trim()
    .replace(/[<>{}]/g, '')
    .replace(/[\u0000-\u001F\u007F-\u009F]/g, '')
    .slice(0, 200);
}

export function sanitizeTripData(data: {
  origin: string;
  destination: string;
  budget: string;
  days: string;
}) {
  return {
    origin: sanitizeInput(data.origin),
    destination: sanitizeInput(data.destination),
    budget: data.budget,
    days: data.days,
  };
}
