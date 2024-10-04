import getPageData from "@/lib/get-page-data";
import getLookbookList from "@/lib/get-lookbook-list";
import Link from 'next/link'

function Lookbook({ lookbooks }) {
    return (
        <section className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
            {lookbooks.map(lookbook => (
                <Link
                    href={`/lookbook/${lookbook.title}`}
                    key={lookbook.images[0]}
                    className="group relative overflow-hidden rounded-lg shadow-lg transform transition duration-300 hover:scale-105"
                >
                    <img
                        src={lookbook.images[0]}
                        alt={lookbook.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">
                        <p className="text-white text-4xl font-bold">{lookbook.title}</p>
                    </div>
                </Link>
            ))}
        </section>
    );
}

export async function getStaticProps({ locale }) {
    const pageData = await getPageData({ locale });
    const { lookbooks } = await getLookbookList();
    return {
        props: {
            ...pageData,
            lookbooks
        },
    };
}

export default Lookbook;
