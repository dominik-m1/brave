import Link from 'next/link';
import Image from 'next/image';
import { formatCurrencyValue } from '@/utils/format-currency-value';
import {useCart} from "react-use-cart";
import {ChevronDownSmallIcon, ChevronUpSmallIcon, XSmallIcon} from "@/icons";
const CartSidebar = ({ onClick, activeCurrency, isSidebarOpen }) => {
    const {
        items,
        cartTotal,
        removeItem,
        submissionLoading,
        updateItemQuantity
    } = useCart()

    const decrementItemQuantity = (item) =>
        updateItemQuantity(item.id, item.quantity - 1)

    const incrementItemQuantity = (item) =>
        updateItemQuantity(item.id, item.quantity + 1)


    return (
        <div
            className={`fixed top-0 right-0 h-full bg-white shadow-lg z-20 transform transition-transform duration-300 ease-in-out w-full md:w-[400px] ${
                items.length && isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
        >
            <button
                onClick={onClick}
                className="absolute top-6 right-4 text-gray-600 text-xl"
            >
                X
            </button>

            <div className="p-6 flex flex-col content-between h-full">
                <div className="flex-1">
                    <h2 className="font-semibold text-xl mb-4 border-b pb-4">Koszyk</h2>
                    <div className="cart-items-list space-y-4 overflow-y-auto h-[calc(100vh-220px)] pr-2">
                        {items.map((item) => (
                            <div key={item.id} className="flex items-center space-x-4 border-b pb-4">
                                <div className="flex items-center w-48">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        width={100}
                                        height={100}
                                        className="object-cover rounded-md"
                                    />
                                    <div className="ml-4">
                                        <Link href={`/product/${item.slug}`}>
                                            {item.name}
                                        </Link>
                                        <p className="text-gray-500 text-xs">
                                            Ilość: {item.quantity}
                                        </p>
                                        {item.variant && (
                                            <p className="text-gray-500 text-xs">
                                                {item.variant.name}
                                            </p>
                                        )}
                                        <p className="text-gray-500 text-xs">
                                            {formatCurrencyValue({
                                                currency: activeCurrency,
                                                value: item.itemTotal,
                                            })}
                                        </p>
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
                                <div>
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
                        ))}
                    </div>
                </div>
                <p className="text-gray-400">Koszty dostawy poznasz w kolejnych krokach</p>
                <div className="mt-6 h-12 flex justify-center items-center uppercase relative group overflow-hidden border border-black transition-colors duration-500">
                    <Link
                        href="/cart"
                        className="flex items-center w-full h-full justify-center z-10 text-white group-hover:text-black "
                        onClick={onClick}
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
                            className="flex items-center w-full h-full justify-center"
                            onClick={onClick}
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
    );
};

export default CartSidebar;
