import getAllProducts from '@/lib/get-all-products'
import getPageData from '@/lib/get-page-data'
import getHomepageBanners from "@/lib/get-homepage-banners";
import HomepageBanners from "@/components/homepage-banners";
import SectionTitle from "@/components/ui/typography/sectionTitle";
import ProductSlider from "@/components/product-slider";
import getAllCategories from '@/lib/get-all-categories'
import HomepageCategories from "@/components/homepage-categories";

function IndexPage({ products, homepageBanners, highlightedCategories }) {
  return (
      <main>
        <HomepageBanners banners={homepageBanners} />
        <SectionTitle title="FEATURED"/>
        <ProductSlider products={products} />
        <HomepageCategories categories={highlightedCategories}/>
      </main>
  )
}

export async function getStaticProps({ locale }) {
  const pageData = await getPageData({ locale })
  const { products } = await getAllProducts({ locale })
  const { homepageBanners } = await getHomepageBanners();
  const { categories } = await getAllCategories();
  const highlightedCategories = categories.filter(category => category.isHighlighted);
  return {
    props: { ...pageData, products, homepageBanners, highlightedCategories}
  }
}

export default IndexPage
