import * as React from 'react'

import getPageData from '@/lib/get-page-data'
import getBlogPostsByCategory from "@/lib/get-blog-posts-by-category";
import getBlogPostsList from "@/lib/get-blog-posts-list";
import Link from "next/link";


interface IBlogPost {
    title: string;
    id: string;
    content: {
        text: string;
    }
    image: string;
}
interface IProps {
    blogPosts: IBlogPost[]
}
export const getExcerpt = (content: string, length: number = 100) => {
    if (content.length <= length) return content;
    return content.substring(0, length) + '...';
};

function BlogPostsByCategory({ blogPosts }: IProps) {

    return (
        <div className="px-4 max-w-7xl mx-auto mt-36 mb-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
                <Link
                    href={`/blog-post/${post.id}`}
                    className="bg-white shadow-lg rounded-lg overflow-hidden hover:scale-110 transition cursor-pointer"
                >
                    <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
                    <div className="p-4">
                        <h2 className="text-lg font-semibold mb-2 text-justify">{post.title}</h2>
                        <p className="text-gray-600 text-justify">
                            {getExcerpt(post.content.text, 80)}
                        </p>
                    </div>
                </Link>
            ))}
        </div>
    );
}

export async function getStaticPaths({ locales }) {
    let paths = []

    for (const locale of locales) {
        const { blogPosts } = await getBlogPostsList();

        paths = [
            ...paths,
            ...blogPosts.map((post) => ({
                params: { slug: post.blogCategories.slug },
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
    const { blogPosts } = await getBlogPostsByCategory({
        locale,
        slug: params.slug
    })

    return {
        props: {
            blogPosts,
            ...pageData
        }
    }
}

export default BlogPostsByCategory
