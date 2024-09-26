import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Autoplay } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
interface IBanner {
    banner: {
        url: string;
    };
    id: string;
}

interface IProps {
    banners: IBanner[];
}

const HomepageBanners = ({ banners }: IProps) => {
    return (
        <section>
            <Swiper
                className="my-8"
                modules={[Autoplay, EffectFade]}
                effect="fade"
                slidesPerView={1}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                fadeEffect={{
                    crossFade: true,
                }}
            >
                {banners.map((banner) => (
                    <SwiperSlide key={banner.id}>
                        <img
                            src={banner.banner.url}
                            alt="BeBrave"
                            style={{
                                width: '100%'
                            }}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
};

export default HomepageBanners;
