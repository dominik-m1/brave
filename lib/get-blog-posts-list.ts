import hygraphClient, {gql} from "@/lib/hygraph-client";

export const getBlogPostsQuery = gql`
    query GetBlogPosts {
        blogPosts{
            title
            id
            image
            blogCategories {
                name
                slug
            }
        }
    }
`

async function getBlogPostsList() {
    const { blogPosts } = await hygraphClient.request(getBlogPostsQuery)

    return { blogPosts }
}

export default getBlogPostsList
