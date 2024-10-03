import getAllProducts from '@/lib/get-all-products'
import getPageData from '@/lib/get-page-data'
import getHomepageBanners from "@/lib/get-homepage-banners";
import HomepageBanners from "@/components/homepage-banners";
import SectionTitle from "@/components/ui/typography/sectionTitle";
import ProductSlider from "@/components/product-slider";
import getAllCategories from '@/lib/get-all-categories'
import HomepageCategories from "@/components/homepage-categories";
import HomepageBlogPosts from "@/components/homepage-blog-posts";
import getBlogPostsList from "@/lib/get-blog-posts-list";

function IndexPage({ products, homepageBanners, highlightedCategories, lastThreePosts }) {
  return (
      <main>
        <HomepageBanners banners={homepageBanners} />
        <SectionTitle title="NASZE PRODUKTY"/>
        <ProductSlider products={products} />
        <HomepageCategories categories={highlightedCategories}/>
        <HomepageBlogPosts posts={lastThreePosts}/>
      </main>
  )
}

export async function getStaticProps({ locale }) {
  const pageData = await getPageData({ locale })
  const { products } = await getAllProducts({ locale })
  const { homepageBanners } = await getHomepageBanners();
  const { categories } = await getAllCategories();
  const { blogPosts } = await getBlogPostsList();

    const lastThreePosts = blogPosts
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 3);

  const highlightedCategories = categories.filter(category => category.isHighlighted);

  return {
    props: { ...pageData, products, homepageBanners, highlightedCategories, lastThreePosts}
  }
}

export default IndexPage
