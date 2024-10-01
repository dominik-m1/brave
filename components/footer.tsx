import Link from 'next/link'

import { GitHubIcon, TwitterIcon } from '@/icons'

function Footer({ categories = [], footerPages = [] }) {
  return (
    <footer className="max-w-7xl mx-auto bg-white" aria-labelledby="footerHeading">
      <h2 id="footerHeading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 border-t border-gray-200">
        <div className="pb-8 xl:grid xl:grid-cols-5 xl:gap-8">
          <div className="grid grid-cols-2 gap-8 xl:col-span-4">
            <div className="space-y-12 md:grid md:grid-cols-2 md:gap-8 md:space-y-0">
              {categories.length ? (
                <div>
                  <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                    Kategorie
                  </h3>
                  <ul className="mt-4 space-y-4">
                    {categories.map((category) => (
                      <li key={category.id}>
                        <Link
                          href={`/${category.type.toLowerCase()}/${
                            category.slug
                          }`}
                          className="text-base text-gray-500 hover:text-gray-900"
                        >
                            {category.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
            <div className="space-y-12 md:grid md:grid-cols-2 md:gap-8 md:space-y-0">
              {footerPages.length ? (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                      Pomoc
                    </h3>
                    <ul className="mt-4 space-y-4">
                      {footerPages.map((page) => (
                          <li key={page.id}>
                            <Link
                                href={`/menu/${page.slug}`}
                                className="text-base text-gray-500 hover:text-gray-900"
                            >
                              {page.title}
                            </Link>
                          </li>
                      ))}
                    </ul>
                  </div>
              ) : null}
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 md:flex md:items-center md:justify-between">
          <div className="flex space-x-6 md:order-2">
            <Link href="https://twitter.com/hygraphcom" className="text-gray-400 hover:text-gray-500">
              <span className="sr-only">Twitter</span>
              <TwitterIcon className="h-6 w-6" aria-hidden="true" />
            </Link>
            <Link href="https://github.com/Hygraph" className="text-gray-400 hover:text-gray-500">
              <span className="sr-only">GitHub</span>
              <GitHubIcon className="h-6 w-6" aria-hidden="true" />
            </Link>
          </div>
          <p className="mt-8 text-base text-gray-400 md:mt-0 md:order-1">
            &copy; 2024 DMCorp. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
