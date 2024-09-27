import Link from 'next/link';
import Image from 'next/image';

import { formatCurrencyValue } from '@/utils/format-currency-value';
import { useSettingsContext } from '@/context/settings';

function ProductCard({ id, images = [], name, price, slug }) {
  const [primaryImage, secondaryImage] = images.length > 1 ? images : [images[0] || {}, null];
  const { activeCurrency } = useSettingsContext();

  return (
      <article key={id}>
        <Link href={`/products/${slug}`} className="group no-underline w-full h-full flex">
          <div className="rounded-lg cursor-pointer w-full overflow-hidden relative px-3 py-6 md:px-6">
            {primaryImage && (
                <Image
                    src={primaryImage.url}
                    height={primaryImage.height}
                    width={primaryImage.width}
                    alt={name}
                    title={name}
                    className={`${secondaryImage ? "transition-transform duration-500 ease-in-out group-hover:translate-x-full" : ""}`}
                />
            )}

            {/* Secondary image (hidden by default, visible on hover) */}
            {secondaryImage && secondaryImage.url && (
                <div className="absolute top-0 left-0 w-full h-full">
                  <Image
                      src={secondaryImage.url}
                      height={secondaryImage.height}
                      width={secondaryImage.width}
                      alt={name}
                      title={name}
                      className="transform -translate-x-full transition-transform duration-500 ease-in-out group-hover:translate-x-0"
                  />
                </div>
            )}

            <div className="pt-3 md:pt-6 text-center">
              <p className="text-gray-800 font-semibold text-lg group-hover:text-customRed mb-1">{name}</p>
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
