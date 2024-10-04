import * as React from 'react'

import getPageData from '@/lib/get-page-data'
import SectionTitle from "@/components/ui/typography/sectionTitle";
import getSingleLookbookByTitle from "@/lib/get-lookbook-by-title";
import getLookbookList from "@/lib/get-lookbook-list";

function SingleLookbook({ lookbook }) {
    return (
        <div className="mt-32 mb-20 md:mt-40">
            <SectionTitle title={lookbook.title} />
            <div className="max-w-7xl mx-auto grid grid-cols-12 gap-4 mt-10 p-4 md:p-0">
                {lookbook.images.map((img, index) => (
                    <div
                        key={index}
                        className={`relative overflow-hidden rounded-lg shadow-lg ${
                            index % 7 === 0
                                ? 'col-span-12 md:col-span-6 row-span-2'
                                : index % 3 === 0
                                    ? 'col-span-12 md:col-span-4'
                                    : 'col-span-6 md:col-span-3'
                        }`}
                    >
                        <img
                            src={img}
                            alt={`BeBrave - ${lookbook.title} thumbnail`}
                            title={`BeBrave - ${lookbook.title}`}
                            className="w-full h-full object-cover"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export async function getStaticPaths({ locales }) {
    let paths = []

    for (const locale of locales) {
        const { lookbooks } = await getLookbookList();
        paths = [
            ...paths,
            ...lookbooks.map((lookbook) => ({
                params: { title: lookbook.title },
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
    const { lookbook } = await getSingleLookbookByTitle({
        locale,
        title: params.title
    })

    return {
        props: {
            lookbook: lookbook[0],
            ...pageData
        }
    }
}

export default SingleLookbook
