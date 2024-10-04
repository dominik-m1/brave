import Link from 'next/link';

interface ICategory {
    id: string;
    description: string;
    name: string;
    slug: string;
    isHighlighted: boolean;
    categoryImage: string;
}

interface IProps {
    categories: ICategory[];
}

const HomepageCategories = ({ categories }: IProps) => {
    return (
        <section className="flex flex-wrap justify-between items-center my-10 gap-8 p-4 md:p-0 md:my-20 md:flex-nowrap">
            {categories.map((category) => (
                <Link
                    key={category.id}
                    className="relative w-full sm:w-1/2 lg:w-1/3 overflow-hidden"
                    href={`category/${category.slug}`}
                >
                    <div className="relative w-full h-[300px] sm:h-[400px] lg:h-[600px] overflow-hidden">
                        <img
                            src={category.categoryImage}
                            alt={`${category.name} thumbnail`}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 transform hover:scale-110"
                        />
                    </div>
                    <div className="py-4 px-6 absolute bottom-0 bg-white border-b border-l">
                        <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold">{category.name}</h3>
                        <p className="text-gray-500 text-sm sm:text-base">{category.description}</p>
                    </div>
                </Link>
            ))}
        </section>
    );
};

export default HomepageCategories;
