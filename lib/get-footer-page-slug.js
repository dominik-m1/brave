import hygraphClient, { gql } from '@/lib/hygraph-client';

export const getFooterMenuSlugQuery = gql`
  query FooterMenuSlugQuery($locale: Locale!, $slug: String!) {
    footerPages(where: { slug: $slug }, locales: [$locale, pl]) {
      title
      content {
        markdown
      }
    }
  }
`

async function getFooterPageBySlug({ locale = 'pl', slug }) {
  const data = await hygraphClient.request(getFooterMenuSlugQuery, {
    locale,
    slug
  });


  return {
    footerPageData: data
  }
}

export default getFooterPageBySlug
