import hygraphClient, {gql} from "@/lib/hygraph-client";

export const getBlogCategoriesQuery = gql`
    query GetBlogCategories {
        blogCategories {
            id
            name
            imageUrl
            slug
        }
    }
`

async function getBlogCategoriesList() {
    const { blogCategories } = await hygraphClient.request(getBlogCategoriesQuery)

    return { blogCategories }
}

export default getBlogCategoriesList
