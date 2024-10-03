import * as React from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { useCart } from 'react-use-cart'

import Button from '@/ui/button'
import { ChevronDownSmallIcon } from '@/icons'
import { formatCurrencyValue } from '@/utils/format-currency-value'
import { useSettingsContext } from '@/context/settings'
import ReactMarkdown from 'react-markdown';
import RecommendedProducts from "@/components/recommended-products";

function ProductPageUI({ product }) {
  const { addItem } = useCart()
  const router = useRouter()
  const { activeCurrency } = useSettingsContext()
  const [variantQuantity, setVariantQuantity] = React.useState(1)
  const [activeVariantId, setActiveVariantId] = React.useState(
      router.query.variantId || product.variants[0].id
  )
  const imageRefs = React.useRef([])

  React.useEffect(() => {
    const url = `/products/${product.slug}?variant=${activeVariantId}`

    router.replace(url, url, { shallow: true })
  }, [activeVariantId])

  const activeVariant = product.variants.find(
      (variant) => variant.id === activeVariantId
  )
  const updateQuantity = (event) =>
      setVariantQuantity(Number(event.target.value))
  const updateVariant = (event) => setActiveVariantId(event.target.value)

  const addToCart = () => {
    const itemMetadata = router.locales.reduce(
        (acc, locale) => ({
          ...acc,
          [locale]: {
            ...product.localizations.find(
                (localization) => localization.locale === locale
            )
          }
        }),
        {}
    )
    addItem(
        {
          id: activeVariantId,
          productId: product.id,
          image: product.images[0],
          price: product.price,
          variant: activeVariant,
          ...itemMetadata
        },
        variantQuantity
    )
  }
  const scrollToImage = (index) => {
    if (imageRefs.current[index]) {
      const element = imageRefs.current[index];
      const offset = 100;

      const elementPosition = element.getBoundingClientRect().top + window.scrollY;

      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth',
      });
    }
  }


  return (
      <>
        <div className="mt-28 max-w-7xl mx-auto lg:flex">
          <div className="w-[70px]">
            <div className="sticky top-28">
              {product.images.map((img, index) => (
                  <div
                      key={img.id}
                      className="h-[100px] w-[70px] border flex items-center justify-center mb-4 cursor-pointer"
                      onClick={() => scrollToImage(index)}  // Add onClick to scroll to image
                  >
                    <Image
                        src={img.url}
                        alt={`BeBrave - ${product.name} thumbnail`}
                        title={`BeBrave - ${product.name}`}
                        width={img.width}
                        height={img.height}
                    />
                  </div>
              ))}
            </div>
          </div>
          <div className="mb-8 px-6 md:mb-0 lg:w-1/2">
            <div className="w-full overflow-hidden relative bg-gainsboro">
              {product.images.map((img, index) => (
                  <Image
                      key={img.id}
                      src={img.url}
                      height={img.height}
                      width={img.width}
                      alt={product.name}
                      title={product.name}
                      ref={(el) => (imageRefs.current[index] = el)} // Assign ref to each image
                  />
              ))}
            </div>
          </div>
          <div className="px-6 md:py-3 lg:w-1/2">
            <div className="sticky top-28 max-w-lg">
              <h1 className="tracking-widest uppercase font-bold md:text-4xl mb-3 text-primary leading-tight">
                {product.name}
              </h1>
              <div className="mb-2">
                <p className="font-semibold text-2xl text-slategray">
                  {formatCurrencyValue({
                    currency: activeCurrency,
                    value: product.price
                  })}
                </p>
              </div>
              <div className="mb-6">
                <div className="product-description leading-loose text-lightgray">
                  <ReactMarkdown>
                    {product.description}
                  </ReactMarkdown>
                </div>
              </div>
              <div className="md:flex md:flex-wrap -mx-3">
                {product.variants.length > 1 ? (
                    <div className="md:w-3/4 px-3 mb-6">
                      <label
                          className="block text-sm font-bold tracking-widest uppercase mb-2 text-slategray"
                          htmlFor="style"
                      >
                        Wariant
                      </label>
                      <div className="relative">
                        <select
                            id="style"
                            name="style"
                            value={activeVariantId}
                            className="block appearance-none w-full bg-gainsboro border-2 border-gainsboro focus:border-slategray px-4 py-3 pr-8 focus:outline-none focus:bg-white text-slategray focus:text-slategray"
                            onChange={updateVariant}
                        >
                          {product.variants.map((variant) => (
                              <option key={variant.id} value={variant.id}>
                                {variant.name}
                              </option>
                          ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 px-2 flex items-center">
                          <ChevronDownSmallIcon
                              className="h-4 w-4 text-gray-400"
                              aria-hidden="true"
                          />
                        </div>
                      </div>
                    </div>
                ) : null}
                <div className="md:w-1/4 px-3 mb-6">
                  <label
                      className="block text-sm font-bold tracking-widest uppercase mb-2 text-slategray"
                      htmlFor="quantity"
                  >
                    Ilość
                  </label>
                  <div className="relative">
                    <select
                        id="quantity"
                        name="quantity"
                        value={variantQuantity}
                        className="block appearance-none w-full bg-gainsboro border-2 border-gainsborofocus:border-slategray px-4 py-3 pr-8 focus:outline-none focus:bg-white text-slategray focus:text-slategray"
                        onChange={updateQuantity}
                    >
                      {Array.from({ length: 5 }, (_, i) => {
                        const value = Number(i + 1);

                        return (
                            <option key={value} value={value}>
                              {value}
                            </option>
                        );
                      })}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 px-2 flex items-center">
                      <ChevronDownSmallIcon
                          className="h-4 w-4 text-gray-400"
                          aria-hidden="true"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <Button onClick={addToCart} label="DODAJ DO KOSZYKA" />
            </div>
          </div>

        </div>
        {product.recommendedProducts.length > 0 && product.recommendedProducts && (
            <RecommendedProducts products={product.recommendedProducts}/>
        )}
      </>
  )
}

export default ProductPageUI
