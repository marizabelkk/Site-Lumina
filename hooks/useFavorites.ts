"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  FAVORITES_UPDATED_EVENT,
  readFavorites,
  toggleFavoriteProduct,
} from "@/lib/favorites";

export function useFavorites() {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);

  const refreshFavorites = useCallback(() => {
    setFavoriteIds(readFavorites());
  }, []);

  useEffect(() => {
    const loadFavoritesTimer = window.setTimeout(refreshFavorites, 0);

    window.addEventListener(FAVORITES_UPDATED_EVENT, refreshFavorites);
    window.addEventListener("storage", refreshFavorites);

    return () => {
      window.clearTimeout(loadFavoritesTimer);
      window.removeEventListener(FAVORITES_UPDATED_EVENT, refreshFavorites);
      window.removeEventListener("storage", refreshFavorites);
    };
  }, [refreshFavorites]);

  const favoriteCount = favoriteIds.length;

  const favoriteSet = useMemo(() => new Set(favoriteIds), [favoriteIds]);

  const toggleFavorite = useCallback((productId: string) => {
    toggleFavoriteProduct(productId);
    refreshFavorites();
  }, [refreshFavorites]);

  const isFavorite = useCallback(
    (productId: string) => favoriteSet.has(productId),
    [favoriteSet],
  );

  return {
    favoriteCount,
    favoriteIds,
    isFavorite,
    toggleFavorite,
  };
}
