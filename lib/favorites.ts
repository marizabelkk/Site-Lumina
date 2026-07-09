export const FAVORITES_STORAGE_KEY = "lumina-favorites";
export const FAVORITES_UPDATED_EVENT = "lumina-favorites-updated";

function normalizeFavorites(productIds: string[]) {
  return Array.from(new Set(productIds.filter(Boolean)));
}

export function readFavorites(): string[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const rawFavorites = window.localStorage.getItem(FAVORITES_STORAGE_KEY);
    if (!rawFavorites) {
      return [];
    }

    const parsedFavorites = JSON.parse(rawFavorites);
    if (!Array.isArray(parsedFavorites)) {
      return [];
    }

    return normalizeFavorites(parsedFavorites);
  } catch {
    return [];
  }
}

export function writeFavorites(productIds: string[]) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(
    FAVORITES_STORAGE_KEY,
    JSON.stringify(normalizeFavorites(productIds)),
  );
  window.dispatchEvent(new Event(FAVORITES_UPDATED_EVENT));
}

export function toggleFavoriteProduct(productId: string) {
  const currentFavorites = readFavorites();

  if (currentFavorites.includes(productId)) {
    writeFavorites(currentFavorites.filter((currentId) => currentId !== productId));
    return;
  }

  writeFavorites([...currentFavorites, productId]);
}
