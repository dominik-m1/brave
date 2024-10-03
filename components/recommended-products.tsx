import ProductGrid from "@/components/product-grid";
import SectionTitle from "@/components/ui/typography/sectionTitle";

const RecommendedProducts = ({ products }) => {
    return (
        <section className="mt-20">
            <SectionTitle title="POLECANE"/>
            <ProductGrid products={products} />
        </section>
    )
};

export default RecommendedProducts;
