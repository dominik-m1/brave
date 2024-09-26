import getAllProducts from '@/lib/get-all-products'
import getPageData from '@/lib/get-page-data'
import ProductGrid from '@/components/product-grid'
import getHomepageBanners from "@/lib/get-homepage-banners";
import HomepageBanners from "@/components/homepage-banners";

function IndexPage({ products, homepageBanners }) {
  return (
      <main>
        <HomepageBanners banners={homepageBanners} />
        <ProductGrid products={products} />
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
