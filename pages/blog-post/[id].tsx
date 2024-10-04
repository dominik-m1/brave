import * as React from 'react';
import getPageData from '@/lib/get-page-data';
import getBlogPostsList from "@/lib/get-blog-posts-list";
import getBlogPostById from "@/lib/get-blog-post-by-id";
import ReactMarkdown from "react-markdown";
import Image from 'next/image';
import Owner from "@/components/owner";
import Link from "next/link";
import getBlogCategoriesList from "@/lib/get-blog-categories";

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
        image: string[];
    }[];
    owner: {
        name: string;
        description: string;
        instagramUrl: string;
        imageUrl: string;
        mail: string;
    };
}

interface IProps {
    blogPost: IPost;
}

function BlogPost({ blogPost, lastFourPosts, blogCategories }: IProps) {
    const tags = blogPost.tags.split("/");

    return (
        <section className="max-w-7xl mx-auto flex flex-col md:flex-row">
            <div className="flex-grow">
                <div className="mt-10 mx-auto max-w-5xl p-4 grid grid-cols-1 md:grid-cols-2 gap-8 md:mt-20">
                    <div className="relative w-full h-64 md:h-auto overflow-hidden shadow-lg">
                        <img
                            src={blogPost.image}
                            alt={blogPost.title}
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                        <div className="absolute bottom-0 left-0 p-2 space-x-2 bg-opacity-75 flex flex-wrap bg-transparent">
                            <span className="bg-red-600 text-white text-sm font-semibold py-1 px-2 mb-2">
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
                    <div className="mt-4">
                        {tags.map((tag, index) => (
                            <span
                                key={index}
                                className="bg-red-600 text-white text-sm font-semibold py-1 px-2 rounded-lg mr-2">
                                {tag.trim()}
                            </span>
                        ))}
                    </div>
                    <Owner
                        name={blogPost.owner.name}
                        description={blogPost.owner.description}
                        imageUrl={blogPost.owner.imageUrl}
                        instagramUrl={blogPost.owner.instagramUrl}
                        mail={blogPost.owner.mail}
                    />
                </div>
            </div>

            <aside className="mt-4 md:mt-0 w-full md:w-1/4 p-4 md:mt-20">
                <h2 className="text-2xl font-bold mb-4">Kategorie</h2>
                <div className="mb-4">
                    {blogCategories.map(category => (
                        <Link
                            key={category.id}
                            href={`/blog/${category.slug}`}
                            className="block uppercase font-bold hover:text-red-600"
                        >
                            {category.name}
                        </Link>
                    ))}
                </div>
                <h2 className="text-2xl font-bold mb-4">Ostatnie posty</h2>
                {lastFourPosts.map((post) => (
                    <div key={post.id} className="border mb-4 rounded-lg">
                        <Link href={`${post.id}`}>
                            <div className="relative w-full h-32 overflow-hidden rounded-lg shadow-lg">
                                <Image
                                    src={post.image}
                                    alt={post.title}
                                    width={75}
                                    height={150}
                                    className="absolute inset-0 w-full h-full object-cover"
                                />
                            </div>
                            <p className="block font-semibold text-lg p-4 hover:text-red-600">
                                {post.title}
                            </p>
                        </Link>
                    </div>
                ))}
            </aside>
        </section>
    );
}

export async function getStaticPaths({ locales }) {
    let paths = [];

    for (const locale of locales) {
        const { blogPosts } = await getBlogPostsList();

        paths = [
            ...paths,
            ...blogPosts.map((post) => ({
                params: { id: post.id },
                locale
            }))
        ];
    }

    return {
        paths,
        fallback: false
    };
}

export async function getStaticProps({ locale, params }) {
    const pageData = await getPageData({ locale });
    const { blogPost } = await getBlogPostById({
        locale,
        id: params.id
    });
    const { blogPosts } = await getBlogPostsList();

    const { blogCategories } = await getBlogCategoriesList();

    const lastFourPosts = blogPosts
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 3);

    return {
        props: {
            blogCategories,
            blogPost,
            lastFourPosts,
            ...pageData
        }
    };
}

export default BlogPost;
