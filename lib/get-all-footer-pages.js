import hygraphClient, { gql } from '@/lib/hygraph-client'

export const getAllFooterPagesQuery = gql`
  query AllFooterPagesQuery {
    footerPages {
      title
      slug
      content {
        markdown
      }
    }
  }
`

async function getAllFooterPages({ locale = 'pl' } = {}) {
  const {footerPages} = await hygraphClient.request(getAllFooterPagesQuery, {
    locale
  })

  return { footerPages }
}

export default getAllFooterPages
