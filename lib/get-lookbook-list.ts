import hygraphClient, {gql} from "@/lib/hygraph-client";

export const getLookbookListQuery = gql`
    query GetLookbookList {
        lookbooks {
            title
            images
        }
    }
`

async function getLookbookList() {
    const { lookbooks } = await hygraphClient.request(getLookbookListQuery);

    return { lookbooks }
}

export default getLookbookList
