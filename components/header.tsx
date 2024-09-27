import Link from 'next/link';
import { useCart } from 'react-use-cart';

import { formatCurrencyValue } from '@/utils/format-currency-value';
import { ShoppingCartIcon } from '@/icons';
import { useSettingsContext } from '@/context/settings';
import Image from 'next/image';
import logo from '@/assets/images/logo.png';

function Header({ pages = [] }) {
  const { cartTotal } = useCart();
  const { activeCurrency } = useSettingsContext();

  return (
      <header className="mx-auto bg-white flex-grow flex items-center justify-between">
        <div className="p-6 w-full fixed top-0 bg-white z-10 shadow-lg	">
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
                      <Link
                          href="/o-nas"
                          className="relative group"
                      >
                        <span className="uppercase text-lightgray hover:text-slategray py-2 px-3 font-medium">
                            O nas
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
            <div className="flex items-center">
              <Link href="/cart" className="flex">
                <ShoppingCartIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                <span className="text-gray-900">
                {formatCurrencyValue({
                  currency: activeCurrency,
                  value: cartTotal,
                })}
              </span>
              </Link>
            </div>
          </nav>
        </div>
      </header>
  );
}

export default Header;
