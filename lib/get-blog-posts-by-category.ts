import hygraphClient, { gql } from '@/lib/hygraph-client';

export const getBlogPostsByCategoryQuery = gql`
  query BlogPostsByCategory($slug: String!) {
    blogPosts(where: {blogCategories: {slug: $slug}}, locales: [pl]) {
      title
      id
      image
      content{
        text
      }
    }
  }
`

async function getBlogPostsByCategory({ locale = 'pl', slug }) {
  const { blogPosts } = await hygraphClient.request(getBlogPostsByCategoryQuery, {
    locale,
    slug
  });


  return {
    blogPosts
  }
}

export default getBlogPostsByCategory
