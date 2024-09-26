import getAllProducts from '@/lib/get-all-products'
import getPageData from '@/lib/get-page-data'
import getHomepageBanners from "@/lib/get-homepage-banners";
import HomepageBanners from "@/components/homepage-banners";
import SectionTitle from "@/components/ui/typography/sectionTitle";
import ProductSlider from "@/components/product-slider";

function IndexPage({ products, homepageBanners }) {
  return (
      <main>
        <HomepageBanners banners={homepageBanners} />
        <SectionTitle title="FEATURED"/>
        <ProductSlider products={products} />
      </main>
  )
}

export async function getStaticProps({ locale }) {
  const pageData = await getPageData({ locale })
  const { products } = await getAllProducts({ locale })
  const {homepageBanners} = await getHomepageBanners();

  return {
    props: { ...pageData, products, homepageBanners }
  }
}

export default IndexPage
