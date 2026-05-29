"use client"

import { useCallback } from "react"
import type { Product } from "@prood/commerce/types"
import { SearchPalette } from "@prood/ui/components/search-palette"

export function Search() {
  const onSearch = useCallback(async (query: string): Promise<Product[]> => {
    const res = await fetch(`/api/commerce/search?q=${encodeURIComponent(query)}`)
    if (!res.ok) return []
    const data = (await res.json()) as { products: Product[] }
    return data.products ?? []
  }, [])

  return <SearchPalette onSearch={onSearch} />
}
