import { useKV } from '@github/spark/hooks'
import { useCallback } from 'react'
import type { StickerStyle } from '@/lib/stickerStyles'

export function useFavorites() {
  const [favoriteIds, setFavoriteIds] = useKV<string[]>('stix-magic-favorites', [])

  const isFavorite = useCallback((styleId: string) => {
    return (favoriteIds || []).includes(styleId)
  }, [favoriteIds])

  const toggleFavorite = useCallback((styleId: string) => {
    setFavoriteIds((current = []) => {
      if (current.includes(styleId)) {
        return current.filter(id => id !== styleId)
      } else {
        return [...current, styleId]
      }
    })
  }, [setFavoriteIds])

  const addFavorite = useCallback((styleId: string) => {
    setFavoriteIds((current = []) => {
      if (current.includes(styleId)) return current
      return [...current, styleId]
    })
  }, [setFavoriteIds])

  const removeFavorite = useCallback((styleId: string) => {
    setFavoriteIds((current = []) => current.filter(id => id !== styleId))
  }, [setFavoriteIds])

  const clearFavorites = useCallback(() => {
    setFavoriteIds([])
  }, [setFavoriteIds])

  const getFavoriteStyles = useCallback((allStyles: StickerStyle[]) => {
    return allStyles.filter(style => (favoriteIds || []).includes(style.id))
  }, [favoriteIds])

  return {
    favoriteIds: favoriteIds || [],
    isFavorite,
    toggleFavorite,
    addFavorite,
    removeFavorite,
    clearFavorites,
    getFavoriteStyles,
    hasFavorites: (favoriteIds || []).length > 0,
    favoriteCount: (favoriteIds || []).length
  }
}
