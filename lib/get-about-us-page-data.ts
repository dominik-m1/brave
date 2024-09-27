import hygraphClient, {gql} from "@/lib/hygraph-client";

export const getAboutUsPageDataQuery = gql`
    query AboutUsPageDataQuery {
        aboutUs {
            title
            description
            image {
                url
                width
                height
            }
        }
    }
`

async function getAboutUsPageData({ locale = 'pl' } = {}) {
    const { aboutUs }  = await hygraphClient.request(getAboutUsPageDataQuery, {
        locale
    })

    return { aboutUs }
}

export default getAboutUsPageData
