import { CartProvider } from 'react-use-cart';
import { AnimatePresence } from 'framer-motion';

import 'tailwindcss/tailwind.css';
import '../styles/globals.scss';

import { SettingsProvider } from '@/context/settings';
import Layout from '@/components/layout';
import BraveVerificationPopup from "@/components/brave-popup";
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';

const pageTransition = {
    hidden: { opacity: 0, x: -100 },
    enter: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 100 },
};

function App({ Component, pageProps }) {
    const router = useRouter();

    return (
        <SettingsProvider>
            <CartProvider>
                <Layout {...pageProps}>
                    <BraveVerificationPopup />
                    <AnimatePresence mode="wait" initial={false}>
                        <motion.div
                            key={router.asPath}
                            initial="hidden"
                            animate="enter"
                            exit="exit"
                            variants={pageTransition}
                            transition={{ type: 'tween', duration: 0.5 }}
                        >
                            <Component {...pageProps} />
                        </motion.div>
                    </AnimatePresence>
                </Layout>
            </CartProvider>
        </SettingsProvider>
    );
}

export default App;
