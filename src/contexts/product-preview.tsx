"use client"

import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react"

import { CreateProductTypes } from "@/app/(admin)/admin/products/create/create-product-form"

type ProductPreviewContextProvider = {
  product_preview: CreateProductTypes | null
  setProductPreview: Dispatch<SetStateAction<CreateProductTypes>>
}

export const ProductPreviewContext =
  createContext<ProductPreviewContextProvider>(
    {} as ProductPreviewContextProvider
  )

const DEFAULT_PRODUCT_PREVIEW: CreateProductTypes = {
  name: "",
  price: 0,
  image_file: null,
  image_url: "",
  description: "",
  sub_description: "",
  categories: [],
}

export default function ProductPreviewProvider({
  children,
}: {
  children: ReactNode
}) {
  const [productPreview, setProductPreview] = useState<CreateProductTypes>(
    DEFAULT_PRODUCT_PREVIEW
  )

  return (
    <ProductPreviewContext.Provider
      value={{
        product_preview: productPreview,
        setProductPreview,
      }}
    >
      {children}
    </ProductPreviewContext.Provider>
  )
}
