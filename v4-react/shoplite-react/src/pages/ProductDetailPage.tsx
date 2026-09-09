import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { ProductDetail } from '../components/ProductDetail'
import type { Product } from '../types'

interface ProductDetailPageProps {
  onAddToCart: (product: Product) => void
}

export function ProductDetailPage({ onAddToCart }: ProductDetailPageProps) {
  const { id } = useParams()
  const navigate = useNavigate()
  const productId = Number(id)

  if (!Number.isInteger(productId) || productId < 1) return <Navigate to="/" replace />

  return <ProductDetail productId={productId} onClose={() => navigate('/')} onAddToCart={onAddToCart} />
}
