import * as React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useCart } from 'react-use-cart'
import { loadStripe } from '@stripe/stripe-js'

import {
  ChevronDownSmallIcon,
  ChevronUpSmallIcon,
  XSmallIcon
} from '@/components/icons'
import { formatCurrencyValue } from '@/utils/format-currency-value'
import getPageData from '@/lib/get-page-data'
import SEO from '@/components/seo'
import { useSettingsContext } from '@/context/settings'
import useSubmissionState from 'hooks/use-form-submission'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)

function Cart() {
  const {
    cartTotal,
    isEmpty,
    items,
    removeItem,
    updateItemQuantity
  } = useCart()
  const router = useRouter()
  const { activeCurrency } = useSettingsContext()
  const {
    setSubmissionError,
    setSubmissionLoading,
    submissionError,
    submissionLoading,
    submissionState
  } = useSubmissionState()

  const decrementItemQuantity = (item) =>
    updateItemQuantity(item.id, item.quantity - 1)

  const incrementItemQuantity = (item) =>
    updateItemQuantity(item.id, item.quantity + 1)

  const handleClick = async () => {
    try {
      setSubmissionLoading()

      const stripe = await stripePromise

      const res = await fetch('/api/stripe/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          cancel_url: window.location.href,
          currency: activeCurrency.code,
          items,
          locale: router.locale,
          success_url: `${window.location.origin}/success`
        })
      })

      if (!res.ok) {
        const error = new Error(
          'An error occurred while performing this request'
        )

        error.info = await res.json()
        error.status = res.status

        throw error
      }

      const { session } = await res.json()

      await stripe.redirectToCheckout({
        sessionId: session.id
      })

      setSubmissionSuccess()
    } catch (error) {
      setSubmissionError(error.info.message)
    }
  }

  if (isEmpty) return <p className="text-center mt-28 font-bold text-xl">Twój koszyk jest pusty</p>

  return (
    <section className="max-w-7xl mx-auto mt-28 p-4 md:p-0">
      <SEO title="Cart" />
      {items.map((item) => {
        return (
          <div
            className="md:bg-gray-50 md:rounded-lg flex items-center py-3 md:py-6 md:px-6 md:mb-3"
            key={item.id}
          >
            <div className="w-3/5 flex flex-grow items-center">
              <div className="h-16 md:h-20 w-16 md:w-20 mr-4 bg-gray-50 p-1 rounded-lg">
                <img
                  src={item.image}
                  alt={item.name}
                  className="object-cover w-full h-full"
                />
              </div>
              <div>
                <Link href={`/products/${item[router.locale].slug}`} className="text-gray-800 font-medium text-sm md:text-base">
                  {item[router.locale].name}
                </Link>
                {item.variant && (
                    <p className="text-gray-500 text-xs">
                      {item.variant.name}
                    </p>
                )}
                <button
                  className="text-gray-400 hover:text-indigo-600 text-xs flex items-center focus:outline-none"
                  onClick={() => removeItem(item.id)}
                  disabled={submissionLoading}
                >
                  <XSmallIcon className="h-3 w-3 mr-2" />
                  USUŃ
                </button>
              </div>
            </div>
            <div className="hidden md:flex flex-col items-center ml-auto">
              <button
                className="text-gray-400 hover:text-indigo-600 focus:outline-none p-1"
                onClick={() => incrementItemQuantity(item)}
                disabled={submissionLoading}
              >
                <ChevronUpSmallIcon className="h-4 w-4" />
              </button>
              <span className="mx-3 md:mx-6 p-1">{item.quantity}</span>
              <button
                className="text-gray-400 hover:text-indigo-600 focus:outline-none p-1"
                onClick={() => decrementItemQuantity(item)}
                disabled={submissionLoading}
              >
                <ChevronDownSmallIcon className="h-4 w-4" />
              </button>
            </div>
            <div className="text-right md:w-1/5">
              <p className="font-medium text-gray-800">
                {formatCurrencyValue({
                  currency: activeCurrency,
                  value: item.itemTotal
                })}
              </p>
              {item.quantity > 1 && (
                <p className="text-gray-400 text-sm">
                  {formatCurrencyValue({
                    currency: activeCurrency,
                    value: item.price
                  })}{' '}
                  - cena 1 szt.
                </p>
              )}
            </div>
          </div>
        )
      })}
      <div className="mt-3 md:mt-6 py-3 md:py-6 border-t-2 border-gray-50">
        <div className="flex flex-col items-end">
          <div className="flex flex-col items-end mb-3">
            <span className="text-gray-700">Łączna kwota</span>
            <span className="text-xl font-bold">
              {formatCurrencyValue({
                currency: activeCurrency,
                value: cartTotal
              })}
            </span>
          </div>
          <div className="w-[200px] h-12 flex justify-center items-center uppercase relative group overflow-hidden border border-black transition-colors duration-500">
            <Link
                href="/cart"
                className="flex font-bold items-center w-full h-full justify-center z-10 text-white group-hover:text-black "
                onClick={handleClick}
            >
              <span className="mr-1">Zamów - </span>
              <span>
                {formatCurrencyValue({
                  currency: activeCurrency,
                  value: cartTotal,
                })}
              </span>
            </Link>

            {/* Sliding background effect */}
            <div className="absolute inset-0 bg-black transition-transform duration-500 ease-out group-hover:translate-x-full"></div>
            <div className="absolute inset-0 bg-white transition-transform duration-500 ease-out translate-x-[-100%] group-hover:translate-x-0"></div>

            {/* Font color transition and border */}
            <div className="absolute inset-0 text-black transition-colors duration-500 ease-out flex justify-center items-center z-0 group-hover:text-black group-hover:border-black">
              <Link
                  href="/cart"
                  className="flex items-center w-full h-full justify-center font-bold"
                  onClick={handleClick}
              >
                <span className="mr-1">Zamów - </span>
                <span>
                {formatCurrencyValue({
                  currency: activeCurrency,
                  value: cartTotal,
                })}
              </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export async function getStaticProps({ locale }) {
  const pageData = await getPageData({ locale })

  return {
    props: {
      ...pageData
    }
  }
}

export default Cart
