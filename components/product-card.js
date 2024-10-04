import Link from 'next/link';

import { formatCurrencyValue } from '@/utils/format-currency-value';
import { useSettingsContext } from '@/context/settings';

function ProductCard({ id, images = [], name, price, slug }) {
    const [primaryImage, secondaryImage] = images.length > 1 ? images : [images[0] || {}, null];
    const { activeCurrency } = useSettingsContext();

    return (
        <article key={id} className="relative w-full h-full">
            <Link href={`/products/${slug}`} className="group no-underline w-full h-full flex">
                <div className="cursor-pointer w-full h-full overflow-hidden relative mx-4">
                    <div className="relative w-full h-0 pb-[100%]">
                        {/* Primary image */}
                        {primaryImage && (
                            <img
                                src={primaryImage}
                                alt={name}
                                title={name}
                                className={`absolute top-0 left-0 w-full h-full object-cover ${secondaryImage ? "transition-transform duration-500 ease-in-out group-hover:translate-x-full" : ""}`}
                            />
                        )}

                        {/* Secondary image (hidden by default, visible on hover) */}
                        {secondaryImage && (
                            <img
                                src={secondaryImage}
                                alt={name}
                                title={name}
                                className="absolute top-0 left-0 w-full h-full object-cover transform -translate-x-full transition-transform duration-500 ease-in-out group-hover:translate-x-0"
                            />
                        )}
                    </div>

                    {/* Product info */}
                    <div className="pt-3 md:pt-6 text-center">
                        <p className="text-gray-800 font-semibold text-lg mb-1">{name}</p>
                        <p className="text-gray-400 text-sm">
                            {formatCurrencyValue({
                                currency: activeCurrency,
                                value: price,
                            })}
                        </p>
                    </div>
                </div>
            </Link>
        </article>
    );
}

export default ProductCard;
