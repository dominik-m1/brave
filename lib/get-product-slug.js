import hygraphClient, { gql } from '@/lib/hygraph-client'
import { ProductFragment } from '@/lib/graphql-fragments'

export const getProductsSlugQuery = gql`
  query CollectionSlugQuery($locale: Locale!, $slug: String!) {
    products(where: { slug: $slug }, locales: [$locale, pl]) {
      ...ProductFragment
      localizations(includeCurrent: true) {
        locale
        name
        slug
      }
    }
  }

  ${ProductFragment}
`

async function getProductBySlug({ locale = 'pl', slug }) {
  const {
    products: [product]
  } = await hygraphClient.request(getProductsSlugQuery, {
    locale,
    slug
  })

  return { product }
}

export default getProductBySlug
