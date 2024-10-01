import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCart } from 'react-use-cart';
import { formatCurrencyValue } from '@/utils/format-currency-value';
import { ShoppingCartIcon } from '@/icons';
import { useSettingsContext } from '@/context/settings';
import Image from 'next/image';
import logo from '@/assets/images/logo.png';
import CartSidebar from "@/components/cart-sidebar";
import {useRouter} from "next/router";

function Header({ pages = [] }) {
  const { cartTotal, isEmpty, items } = useCart();
  const { activeCurrency } = useSettingsContext();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter()
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    if (router.pathname.includes('/cart')) {
      return;
    }
    if (!isEmpty) {
      setIsSidebarOpen(true);
    }
  }, [cartTotal, isEmpty]);

  return (
      <header className="mx-auto bg-white flex-grow flex items-center justify-between">
        <div className="p-6 w-full fixed top-0 bg-white z-10 shadow-lg">
          <nav className="flex items-center justify-between flex-wrap">
            <div>
              {pages.length ? (
                  <ul className="hidden md:mx-auto md:block md:flex-grow">
                    {pages.map((page) => (
                        <li
                            key={page.id}
                            className="block my-4 md:inline-block md:my-0 relative group"
                        >
                          <Link
                              href={`/${page.type.toLowerCase()}/${page.slug}`}
                              className="relative group"
                          >
                      <span className="uppercase text-lightgray hover:text-slategray py-2 px-3 font-medium">
                        {page.name}
                      </span>
                            <span
                                className="bg-neutral-400 absolute left-0 -bottom-4 w-full h-[1px] bg-slategray transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                            ></span>
                          </Link>
                        </li>
                    ))}
                    <li className="block my-4 md:inline-block md:my-0 relative group">
                      <Link href="/o-nas" className="relative group">
                    <span className="uppercase text-lightgray hover:text-slategray py-2 px-3 font-medium">
                      O nas
                    </span>
                        <span
                            className="bg-neutral-400 absolute left-0 -bottom-4 w-full h-[1px] bg-slategray transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                        ></span>
                      </Link>
                    </li>
                    <li className="block my-4 md:inline-block md:my-0 relative group">
                      <Link href="/kontakt" className="relative group">
                    <span className="uppercase text-lightgray hover:text-slategray py-2 px-3 font-medium">
                      Kontakt
                    </span>
                        <span
                            className="bg-neutral-400 absolute left-0 -bottom-4 w-full h-[1px] bg-slategray transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                        ></span>
                      </Link>
                    </li>
                  </ul>
              ) : null}
            </div>
            <div className="absolute left-1/2 -translate-x-1/2">
              <Link href="/">
                <Image src={logo} alt="Logo" width={50} height={25} />
              </Link>
            </div>
            <div className="flex items-center cursor-pointer" onClick={toggleSidebar}>
              <div>
                <ShoppingCartIcon
                    className="h-6 w-6 text-gray-400 mr-2"
                    aria-hidden="true"
                />
              </div>
              <span className="text-gray-900">
              {formatCurrencyValue({
                currency: activeCurrency,
                value: cartTotal,
              })}
            </span>
            </div>
          </nav>
        </div>

        <CartSidebar
            onClick={toggleSidebar}
            activeCurrency={activeCurrency}
            isSidebarOpen={isSidebarOpen}
        />

        {/* Overlay when sidebar is open */}
        {items.length > 0 && isSidebarOpen && (
            <div
                onClick={toggleSidebar}
                className="fixed inset-0 bg-black bg-opacity-50 z-10"
            ></div>
        )}
      </header>
  );
}

export default Header;
