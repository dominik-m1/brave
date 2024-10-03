import hygraphClient, {gql} from "@/lib/hygraph-client";

export const getBlogPostsQuery = gql`
    query GetBlogPosts {
        blogPosts {
            createdAt
            title
            id
            image
            blogCategories {
                name
                slug
            }
            content {
                text
            }
        }
    }
`

async function getBlogPostsList() {
    const { blogPosts } = await hygraphClient.request(getBlogPostsQuery)

    return { blogPosts }
}

export default getBlogPostsList
