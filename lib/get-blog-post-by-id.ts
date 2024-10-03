import hygraphClient, { gql } from '@/lib/hygraph-client';

export const getBlogPostByIdQuery = gql`
  query BlogPostById($id: ID!) {
    blogPost(where: {id: $id}) {
      id
      title
      tags
      content {
        markdown
      }
      image
      additionalText {
        subTitle
        description
        image
      }
      owner {
        name
        description
        instagramUrl
        imageUrl
        mail
      }
    }
  }
`

async function getBlogPostById({ locale = 'pl', id }) {
  const { blogPost } = await hygraphClient.request(getBlogPostByIdQuery, {
    locale,
    id
  });


  return {
    blogPost
  }
}

export default getBlogPostById
