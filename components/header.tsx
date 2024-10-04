import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCart } from 'react-use-cart';
import { formatCurrencyValue } from '@/utils/format-currency-value';
import { ShoppingCartIcon } from '@/icons';
import { useSettingsContext } from '@/context/settings';
import Image from 'next/image';
import logo from '@/assets/images/logo.png';
import CartSidebar from "@/components/cart-sidebar";
import { useRouter } from "next/router";

function Header({ pages = [] }) {
  const { cartTotal, isEmpty, items } = useCart();
  const { activeCurrency } = useSettingsContext();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Mobile menu state
  const router = useRouter();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
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
          <nav className="flex justify-between flex-wrap max-w-7xl mx-auto flex-col md:flex-row md:items-center">
            {/* Mobile menu icon */}
            <div className="block md:hidden">
              <button onClick={toggleMobileMenu} className="text-gray-600 focus:outline-none">
                {isMobileMenuOpen ? (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                      <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                ) : (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                      <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 6h16M4 12h16m-7 6h7"
                      />
                    </svg>
                )}
              </button>
            </div>

            {/* Desktop menu */}
            <div className="hidden md:block">
              {pages.length ? (
                  <ul className="hidden md:flex md:mx-auto md:flex-grow">
                    {pages.map((page) => (
                        <li
                            key={page.id}
                            className="block my-4 md:inline-block md:my-0 relative group"
                        >
                          <Link href={`/${page.type.toLowerCase()}/${page.slug}`} className="relative group">
                      <span className="text-xs uppercase text-lightgray hover:text-slategray py-2 px-3 font-medium">
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
                    <span className="text-xs uppercase text-lightgray hover:text-slategray py-2 px-3 font-medium">
                      O nas
                    </span>
                        <span
                            className="bg-neutral-400 absolute left-0 -bottom-4 w-full h-[1px] bg-slategray transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                        ></span>
                      </Link>
                    </li>
                    <li className="block my-4 md:inline-block md:my-0 relative group">
                      <Link href="/kontakt" className="relative group">
                    <span className="text-xs uppercase text-lightgray hover:text-slategray py-2 px-3 font-medium">
                      Kontakt
                    </span>
                        <span
                            className="bg-neutral-400 absolute left-0 -bottom-4 w-full h-[1px] bg-slategray transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                        ></span>
                      </Link>
                    </li>
                    <li className="block my-4 md:inline-block md:my-0 relative group">
                      <Link href="/blog" className="relative group">
                    <span className="text-xs uppercase text-lightgray hover:text-slategray py-2 px-3 font-medium">
                      Blog
                    </span>
                        <span
                            className="bg-neutral-400 absolute left-0 -bottom-4 w-full h-[1px] bg-slategray transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                        ></span>
                      </Link>
                    </li>
                    <li className="block my-4 md:inline-block md:my-0 relative group">
                      <Link href="/lookbook" className="relative group">
                    <span className="text-xs uppercase text-lightgray hover:text-slategray py-2 px-3 font-medium">
                      Lookbook
                    </span>
                        <span
                            className="bg-neutral-400 absolute left-0 -bottom-4 w-full h-[1px] bg-slategray transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                        ></span>
                      </Link>
                    </li>
                  </ul>
              ) : null}
            </div>

            {/* Mobile Menu (Visible when open) */}
            {isMobileMenuOpen && (
                <div className="md:hidden">
                  <ul className="mt-8 flex flex-col space-y-4 mt-4">
                    {pages.map((page) => (
                        <li key={page.id}>
                          <Link
                              href={`/${page.type.toLowerCase()}/${page.slug}`}
                              className="block text-gray-600 text-sm uppercase"
                          >
                            {page.name}
                          </Link>
                        </li>
                    ))}
                    <li>
                      <Link href="/o-nas" className="block text-gray-600 text-sm uppercase">
                        O nas
                      </Link>
                    </li>
                    <li>
                      <Link href="/kontakt" className="block text-gray-600 text-sm uppercase">
                        Kontakt
                      </Link>
                    </li>
                    <li>
                      <Link href="/blog" className="block text-gray-600 text-sm uppercase">
                        Blog
                      </Link>
                    </li>
                    <li>
                      <Link href="/lookbook" className="block text-gray-600 text-sm uppercase">
                        Lookbook
                      </Link>
                    </li>
                  </ul>
                </div>
            )}

            <div className="absolute left-1/2 -translate-x-1/2 top-[12px]">
              <Link href="/">
                <Image src={logo} alt="Logo" width={50} height={25} />
              </Link>
            </div>

            <div className="flex absolute right-[15px] md:relative">
              <div className="flex items-center cursor-pointer" onClick={toggleSidebar}>
                <div>
                  <ShoppingCartIcon
                      className="h-6 w-6 text-gray-400 mr-2"
                      aria-hidden="true"
                  />
                </div>
                <span className="text-lightgray text-xs">
                {formatCurrencyValue({
                  currency: activeCurrency,
                  value: cartTotal,
                })}
              </span>
              </div>
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
