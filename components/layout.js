import * as React from 'react';
import { DefaultSeo } from 'next-seo';
import { motion } from 'framer-motion';

import { defaultSeo } from 'next-seo.config';
import Footer from '@/components/footer';
import Header from '@/components/header';

const pageTransition = {
    hidden: { opacity: 0, x: -100 },
    enter: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 100 },
};

function Layout({ children, footer, navigation }) {
    return (
        <React.Fragment>
            <DefaultSeo {...defaultSeo} />
            <Header {...navigation} />
            <motion.div
                key={children.key}
                initial="hidden"
                animate="enter"
                exit="exit"
                variants={pageTransition}
                transition={{ type: 'tween', duration: 0.5 }}
                className="mt-[72px]"
            >
                {children}
            </motion.div>
            <Footer {...footer} />
        </React.Fragment>
    );
}

export default Layout;
