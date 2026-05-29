"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { MagnifyingGlassIcon } from "@phosphor-icons/react"
import type { Product } from "@prood/types"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@prood/ui/components/command"
import { formatPrice, localized, resolveProductUrl, type Locale } from "@prood/ui/lib/commerce"
import { cn } from "@prood/ui/lib/utils"

export interface SearchPaletteProps {
  /** Async search callback returning matching products. */
  onSearch: (query: string) => Promise<Product[]>
  placeholder?: string
  locale?: Locale
  className?: string
}

export function SearchPalette({
  onSearch,
  placeholder = "Search products...",
  locale = "en",
  className,
}: SearchPaletteProps) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((o) => !o)
      }
    }
    document.addEventListener("keydown", handler)
    return () => document.removeEventListener("keydown", handler)
  }, [])

  useEffect(() => {
    let active = true
    const trimmed = query.trim()
    const id = setTimeout(async () => {
      if (!trimmed) {
        if (active) setResults([])
        return
      }
      setLoading(true)
      try {
        const products = await onSearch(trimmed)
        if (active) setResults(products)
      } finally {
        if (active) setLoading(false)
      }
    }, 200)
    return () => {
      active = false
      clearTimeout(id)
    }
  }, [query, onSearch])

  function go(product: Product) {
    setOpen(false)
    router.push(resolveProductUrl(product))
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          "text-muted-foreground hover:bg-muted inline-flex items-center gap-2 rounded-2xl border px-3 py-1.5 text-sm transition-colors",
          className,
        )}
      >
        <MagnifyingGlassIcon />
        <span className="hidden sm:inline">{placeholder}</span>
      </button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder={placeholder}
          value={query}
          onValueChange={setQuery}
        />
        <CommandList>
          {!loading && query.trim() && results.length === 0 ? (
            <CommandEmpty>No results found.</CommandEmpty>
          ) : null}
          {results.length > 0 ? (
            <CommandGroup heading="Products">
              {results.map((product) => (
                <CommandItem
                  key={product.id}
                  value={`${localized(product.name, locale)} ${product.id}`}
                  onSelect={() => go(product)}
                >
                  <span className="flex-1 truncate">{localized(product.name, locale)}</span>
                  <span className="text-muted-foreground text-xs">
                    {formatPrice(product.price, locale)}
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>
          ) : null}
        </CommandList>
      </CommandDialog>
    </>
  )
}
