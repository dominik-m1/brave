import * as React from 'react'

import getPageData from '@/lib/get-page-data'
import getFooterPageBySlug from "@/lib/get-footer-page-slug";
import getAllFooterPages from "@/lib/get-all-footer-pages";
import SectionTitle from "@/components/ui/typography/sectionTitle";
import ReactMarkdown from "react-markdown";

function FooterPageData({ footerPageData }) {
    return (
        <div className="mt-36 mb-20">
            <SectionTitle title={footerPageData.title} />
            <div className="footer-menu max-w-2xl mx-auto text-justify">
                <ReactMarkdown>
                    {footerPageData.content.markdown}
                </ReactMarkdown>
            </div>
        </div>
    )
}

export async function getStaticPaths({ locales }) {
    let paths = []

    for (const locale of locales) {
        const { footerPages } = await getAllFooterPages({ locale });
        paths = [
            ...paths,
            ...footerPages.map((footerPage) => ({
                params: { slug: footerPage.slug },
                locale
            }))
        ]
    }

    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({ locale, params }) {
    const pageData = await getPageData({ locale })
    const { footerPageData } = await getFooterPageBySlug({
        locale,
        slug: params.slug
    })

    return {
        props: {
            footerPageData: footerPageData.footerPages[0],
            ...pageData
        }
    }
}

export default FooterPageData
