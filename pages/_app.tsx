import { CartProvider } from 'react-use-cart'

import 'tailwindcss/tailwind.css'
import '../styles/globals.scss';

import { SettingsProvider } from '@/context/settings'
import Layout from '@/components/layout'
import BraveVerificationPopup from "@/components/brave-popup";

function App({ Component, pageProps }) {
  return (
      <SettingsProvider>
          <CartProvider>
              <Layout {...pageProps}>
                  <BraveVerificationPopup />
                  <Component {...pageProps} />
              </Layout>
          </CartProvider>
      </SettingsProvider>
  )
}

export default App
