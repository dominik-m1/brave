import ProductGrid from "@/components/product-grid";
import SectionTitle from "@/components/ui/typography/sectionTitle";

const RecommendedProducts = ({ products }) => {
    return (
        <section>
            <SectionTitle title="POLECANE"/>
            <ProductGrid products={products} />
        </section>
    )
};

export default RecommendedProducts;
