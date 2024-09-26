import * as React from 'react'
import { DefaultSeo } from 'next-seo'

import { defaultSeo } from 'next-seo.config'
import Footer from '@/components/footer'
import Header from '@/components/header'

function Layout({ children, footer, navigation }) {
  return (
    <React.Fragment>
      <DefaultSeo {...defaultSeo} />
      <Header {...navigation} />
      <div className="mx-auto px-4 sm:px-6 mt-26">{children}</div>
      <Footer {...footer} />
    </React.Fragment>
  )
}

export default Layout
