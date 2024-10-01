import hygraphClient, { gql } from '@/lib/hygraph-client';

export const getSingleLookbookQuery = gql`
  query SingleLookbookQuery($title: String!) {
    lookbooks(where: { title: $title }, locales:  [pl]) {
      title
      image {
        height
        width
        url
        id
      }
    }
  }
`

async function getSingleLookbookByTitle({ locale = 'pl', title }) {
  const { lookbooks } = await hygraphClient.request(getSingleLookbookQuery, {
    locale,
    title
  });


  return {
    lookbook: lookbooks
  }
}

export default getSingleLookbookByTitle
