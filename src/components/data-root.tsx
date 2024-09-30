import ProductPreviewProvider from "@/contexts/product-preview"

export default function DataRoot({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <ProductPreviewProvider>{children}</ProductPreviewProvider>
}
