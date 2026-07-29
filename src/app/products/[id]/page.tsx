import { ProductPageContent } from "@/components/product/ProductPageContent"

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  return <ProductPageContent slug={id} />
}