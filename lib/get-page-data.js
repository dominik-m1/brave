import hygraphClient, { gql } from '@/lib/hygraph-client'
import { CategoryFragment, CollectionFragment } from '@/lib/graphql-fragments'

export const getPageDataQuery = gql`
  query PageDataQuery($locale: Locale!) {
    footerCategories: categories(first: 4, locales: [$locale, pl]) {
      ...CategoryFragment
      type: __typename
    }
    footerCollections: collections(first: 4, locales: [$locale, pl]) {
      ...CollectionFragment
      type: __typename
    }
    navigationCategory: categories(locales: [$locale, pl]) {
      ...CategoryFragment
      type: __typename
    }
    navigationCollection: collections(first: 1, locales: [$locale, pl]) {
      ...CollectionFragment
      type: __typename
    }
    footerPages {
      id
      slug
      title
      content {
        markdown
      }
    }
  }

  ${[CategoryFragment, CollectionFragment]}
`

async function getPageData({ locale }) {
  const {
    footerCategories,
    footerCollections,
    navigationCategory,
    navigationCollection,
    footerPages
  } = await hygraphClient.request(getPageDataQuery, { locale });

  return {
    footer: { categories: footerCategories, collections: footerCollections, footerPages },
    navigation: { pages: [...navigationCategory, ...navigationCollection] }
  }
}

export default getPageData
