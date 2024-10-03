import Link from 'next/link'

interface ICategory {
    id: string;
    description: string;
    name: string;
    slug: string;
    isHighlighted: boolean;
    categoryImage: {
        url: string;
    };
}

interface IProps {
    categories: ICategory[];
}

const HomepageCategories = ({ categories }: IProps) => {
    return (
        <section className="flex justify-between items-center my-20 gap-16">
            {categories.map((category) => (
                <Link key={category.id} className="relative w-1/3 overflow-hidden" href={`category/${category.slug}`}>
                    <div className="relative w-full h-[600px] overflow-hidden">
                        <img
                            src={category.categoryImage.url}
                            alt={`${category.name} thumbnail`}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 transform hover:scale-110"
                        />
                    </div>
                    <div className="py-4 px-10 absolute bottom-0 bg-white border-b border-l">
                        <h3 className="text-2xl font-semibold">{category.name}</h3>
                        <p className="text-gray-500">{category.description}</p>
                    </div>
                </Link>
            ))}
        </section>
    );
};

export default HomepageCategories;
