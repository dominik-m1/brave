import { Swiper, SwiperSlide } from 'swiper/react';
import ProductCard from '@/components/product-card'
import { Navigation } from 'swiper/modules';

interface IProductImage {
    height: number,
    width: number,
    id: string,
    url: string,
}
interface IProduct {
    id: string,
    images: IProductImage[],
    name: string,
    price: number,
    slug: string
}

interface IProps {
    products: IProduct[]
}
const ProductSlider = ({products}: IProps) => {
    return (
        <Swiper
            className="product-slider"
            slidesPerView={4}
            navigation
            modules={[Navigation]}
            breakpoints={{
                640: {
                    slidesPerView: 2,
                },
                768: {
                    slidesPerView: 3,
                },
                1024: {
                    slidesPerView: 4,
                },
                0: {
                    slidesPerView: 1,
                },
            }}
        >
            {products.map((product) => (
                <SwiperSlide key={product.id}>
                    <ProductCard
                        id={product.id}
                        slug={product.slug}
                        price={product.price}
                        images={product.images}
                        name={product.name}
                    />
                </SwiperSlide>
            ))}
        </Swiper>
    )
};

export default ProductSlider;
