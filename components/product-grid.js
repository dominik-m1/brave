import ProductCard from '@/components/product-card'

function ProductGrid({ products }) {
  return (
     <div className="pt-8 max-w-7xl mx-auto gap-8 grid sm:grid-cols-2 lg:grid-cols-4">
       {products.map(ProductCard)}
     </div>
  )
}

export default ProductGrid
