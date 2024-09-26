import hygraphClient, {gql} from "@/lib/hygraph-client";

export const getHomepageBannersQuery = gql`
    query HomepageBannersQuery {
        homepageBanners {
            id
            banner {
                url
            }
        }
    }
`

async function getHomepageBanners() {
    const { homepageBanners } = await hygraphClient.request(getHomepageBannersQuery)

    return { homepageBanners }
}

export default getHomepageBanners
