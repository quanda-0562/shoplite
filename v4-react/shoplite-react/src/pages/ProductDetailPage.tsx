import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { ProductDetail } from '../components/ProductDetail'

export default function ProductDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const productId = Number(id)

  if (!Number.isInteger(productId) || productId < 1) return <Navigate to="/" replace />

  return <ProductDetail productId={productId} onClose={() => navigate('/')} />
}
