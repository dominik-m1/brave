import * as React from 'react'

import getPageData from '@/lib/get-page-data'
import getBlogPostsList from "@/lib/get-blog-posts-list";
import getBlogPostById from "@/lib/get-blog-post-by-id";
import ReactMarkdown from "react-markdown";
import Image from 'next/image'

interface IPost {
    id: string;
    image: string;
    title: string;
    tags: string;
    content: {
        markdown: string;
    }
    additionalText: {
        subTitle: string;
        description: string;
        image: string[]
    }[]
}

interface IProps {
    blogPost: IPost
}
function BlogPost({ blogPost }: IProps) {
    return (
        <section className="blog-post">
            <div className="mt-20 mx-auto max-w-5xl p-4 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="relative w-full h-64 md:h-auto md:w-full overflow-hidden shadow-lg">
                    <Image
                        src={blogPost.image}
                        alt={blogPost.title}
                        layout="fill"
                        objectFit="cover"
                        className="absolute inset-0 w-full h-full"
                    />

                    <div className="absolute bottom-0 left-0 p-2 space-x-2 bg-opacity-75 flex flex-wrap bg-transparent">
                    <span
                        className="bg-red-600 text-white text-sm font-semibold py-1 px-2 mb-2">
                            {blogPost.tags}
                        </span>
                    </div>
                </div>

                <div className="flex flex-col justify-center">
                    <h1 className="text-3xl md:text-4xl font-bold mb-6">{blogPost.title}</h1>
                    <ReactMarkdown className="prose prose-lg text-justify">
                        {blogPost.content.markdown}
                    </ReactMarkdown>
                </div>
            </div>
            <div className="mx-auto max-w-5xl p-4">
                {blogPost.additionalText.map(t => (
                    <div key={t.subTitle} className="mt-6">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">{t.subTitle}</h2>
                        <ReactMarkdown className="prose prose-lg text-justify">
                            {t.description}
                        </ReactMarkdown>
                        <div
                            className={`mt-6 grid gap-4 ${
                                t.image.length === 1
                                    ? 'grid-cols-1'
                                    : t.image.length === 2
                                        ? 'grid-cols-2'
                                        : t.image.length === 3
                                            ? 'grid-cols-3'
                                            : t.image.length >= 4
                                                ? 'grid-cols-4'
                                                : ''
                            }`}
                        >
                            {t.image.map((imgSrc, index) => (
                                <div key={index} className="relative w-full h-64 overflow-hidden rounded-lg shadow-lg">
                                    <Image
                                        src={imgSrc}
                                        alt={`Additional Image ${index + 1}`}
                                        layout="fill"
                                        objectFit="cover"
                                        className="absolute inset-0 w-full h-full"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export async function getStaticPaths({ locales }) {
    let paths = []

    for (const locale of locales) {
        const { blogPosts } = await getBlogPostsList();

        paths = [
            ...paths,
            ...blogPosts.map((post) => ({
                params: { id: post.id},
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
    const { blogPost } = await getBlogPostById({
        locale,
        id: params.id
    })

    return {
        props: {
            blogPost,
            ...pageData
        }
    }
}

export default BlogPost
