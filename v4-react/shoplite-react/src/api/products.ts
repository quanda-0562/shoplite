import type { Product } from '../types'

const API_URL = 'https://dummyjson.com/products'

interface ProductsResponse {
  products: Product[]
}

export async function getProducts(): Promise<Product[]> {
  const response = await fetch(`${API_URL}?limit=12`)

  if (!response.ok) throw new Error(`Không thể tải sản phẩm (${response.status}).`)

  const result: ProductsResponse = await response.json()
  return result.products
}

export async function getProduct(id: number): Promise<Product> {
  const response = await fetch(`${API_URL}/${id}`)

  if (!response.ok) throw new Error(`Không thể tải chi tiết sản phẩm (${response.status}).`)

  return response.json()
}
