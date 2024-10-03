import getPageData from "@/lib/get-page-data";
import Image from "next/image";
import Link from 'next/link'
import getBlogCategoriesList from "@/lib/get-blog-categories";

function Blog({ blogCategories }) {
    return (
        <section className="flex flex-col gap-6 p-6">
            {blogCategories.map(blogCategory => (
                <Link
                    href={`/blog/${blogCategory.slug}`}
                    key={blogCategory.id}
                    className="relative w-full h-64 sm:h-80 md:h-96 overflow-hidden rounded-lg shadow-lg"
                >
                    <Image
                        src={blogCategory.imageUrl}
                        layout="fill"
                        objectFit="cover"
                        alt={blogCategory.name}
                        className="absolute inset-0 w-full h-full"
                    />

                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <p className="uppercase text-white text-2xl sm:text-3xl md:text-4xl font-bold">
                            {blogCategory.name}
                        </p>
                    </div>
                </Link>
            ))}
        </section>
    );
}

export async function getStaticProps({ locale }) {
    const pageData = await getPageData({ locale });
    const { blogCategories } = await getBlogCategoriesList();
    return {
        props: {
            ...pageData,
            blogCategories
        },
    };
}

export default Blog;
