import * as React from 'react'

import getPageData from '@/lib/get-page-data'
import SectionTitle from "@/components/ui/typography/sectionTitle";
import getSingleLookbookByTitle from "@/lib/get-lookbook-by-title";
import getLookbookList from "@/lib/get-lookbook-list";
import Image from "next/image";

function SingleLookbook({ lookbook }) {
    return (
        <div className="mt-40 mb-20">
            <SectionTitle title={lookbook.title} />

            <div className="grid grid-cols-12 gap-4 mt-10">
                {lookbook.image.map((img, index) => (
                    <div
                        key={img.id}
                        className={`relative overflow-hidden rounded-lg shadow-lg ${
                            index % 7 === 0
                                ? 'col-span-12 md:col-span-6 row-span-2'
                                : index % 3 === 0
                                    ? 'col-span-12 md:col-span-4'
                                    : 'col-span-6 md:col-span-3'
                        }`}
                    >
                        <Image
                            src={img.url}
                            alt={`BeBrave - ${lookbook.title} thumbnail`}
                            title={`BeBrave - ${lookbook.title}`}
                            width={img.width}
                            height={img.height}
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
