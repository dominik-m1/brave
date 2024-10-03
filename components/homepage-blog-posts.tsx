import Link from "next/link";
import * as React from "react";
import {getExcerpt} from "@/pages/blog/[slug]";
import SectionTitle from "@/components/ui/typography/sectionTitle";
const HomepageBlogPosts = ({posts}) => {
    return (
        <section>
            <SectionTitle title="NIE PRZEGAP OSTATNICH WPISÓW NA BLOGU"/>
            <div className="my-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {posts.map((post) => (
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
        </section>
    )
};

export default HomepageBlogPosts;
