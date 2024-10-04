import { gql } from '@/lib/hygraph-client'

export const CategoryFragment = gql`
  fragment CategoryFragment on Category {
    id
    description
    name
    slug
    isHighlighted
    categoryImage
  }
`
export const CollectionFragment = gql`
  fragment CollectionFragment on Collection {
    id
    description
    name
    slug
  }
`

export const ImageFragment = gql`
  fragment ImageFragment on Asset {
    id
    height
    url
    width
  }
`

export const ProductVariantFragment = gql`
  fragment ProductVariantFragment on ProductVariants {
    __typename
    ... on ProductColorVariant {
      id
      name
    }
    ... on ProductSizeColorVariant {
      id
      name
    }
    ... on ProductSizeVariant {
      id
      name
    }
  }
`

export const ProductFragment = gql`
  fragment ProductFragment on Product {
    id
    description
    images
    name
    price
    slug
    variants {
      ...ProductVariantFragment
    }
    recommendedProducts {
      name
      slug
      price
      images
    }
  }

  ${[ProductVariantFragment]}
`

export const ProductCardFragment = gql`
  fragment ProductCardFragment on Product {
    id
    images
    name
    price
    slug
    variants(first: 1) {
      ...ProductVariantFragment
    }
  }

  ${[ProductVariantFragment]}
`
