export function getRandomValidAreas<T>(items: T[], count: number): T[] {
  const shuffled = [...items].sort(() => Math.random() - 0.5);

  return shuffled.slice(0, count);
}

// If you want to sort an array without changing the original one, use the newer toSorted() method instead of sort(). It returns a brand-new sorted copy
