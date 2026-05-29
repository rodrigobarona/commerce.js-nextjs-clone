import 'server-only'
import type {
  Brand,
  Category,
  GetCategoriesParams,
  GetProductParams,
  Product,
  SearchParams,
  SearchResult,
  StoreInfo,
} from '@commercejs/types'
import { getAdapter } from './adapter'

/** Search / list products with filters, sort and pagination. */
export async function getProducts(params: SearchParams = {}): Promise<SearchResult> {
  return (await getAdapter()).getProducts(params)
}

/** Fetch a single product by id or slug. */
export async function getProduct(params: GetProductParams): Promise<Product> {
  return (await getAdapter()).getProduct(params)
}

/** Fetch the category tree. */
export async function getCategories(params?: GetCategoriesParams): Promise<Category[]> {
  return (await getAdapter()).getCategories(params)
}

/** Fetch store metadata (name, currency, locale, branding). */
export async function getStoreInfo(): Promise<StoreInfo> {
  return (await getAdapter()).getStoreInfo()
}

/** Fetch the list of brands. */
export async function getBrands(): Promise<Brand[]> {
  return (await getAdapter()).getBrands()
}
