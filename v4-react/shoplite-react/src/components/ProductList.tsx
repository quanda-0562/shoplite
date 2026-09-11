import type { Product } from '../types'
import { ProductCard } from './ProductCard'

interface ProductListProps {
  products: Product[]
  onViewDetail: (productId: number) => void
}

export function ProductList({ products, onViewDetail }: ProductListProps) {
  return <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">{products.map((product) => <ProductCard key={product.id} product={product} onViewDetail={onViewDetail} />)}</div>
}
