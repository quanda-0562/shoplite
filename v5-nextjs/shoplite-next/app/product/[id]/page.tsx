import { RoutePlaceholder } from "../../components/RoutePlaceholder";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;

  return <RoutePlaceholder title={`Chi tiết sản phẩm #${id}`} description="Route động /product/[id] đã sẵn sàng để fetch và hiển thị dữ liệu sản phẩm ở bài sau." />;
}
