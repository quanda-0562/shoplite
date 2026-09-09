import { useQuery } from '@tanstack/react-query'
import { getProduct, getProducts } from '../api/products'

export function useProducts() {
  return useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
  })
}

export function useProduct(id: number | null) {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => getProduct(id as number),
    enabled: id !== null,
  })
}
