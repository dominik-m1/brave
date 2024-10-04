import Image from "next/image";
import Link from "next/link";
import { InstagramIcon } from "@/icons";

interface IProps {
    name: string;
    description: string;
    instagramUrl: string;
    imageUrl: string;
    mail: string;
}

const Owner = ({ name, description, instagramUrl, imageUrl, mail }: IProps) => {
    return (
        <section className="bg-gray-100 flex flex-col md:flex-row items-center my-14 p-8 rounded-lg shadow-lg">
            <div className="mr-0 md:mr-8 mb-4 md:mb-0">
                <Image
                    src={imageUrl}
                    alt={name}
                    width={150}
                    height={150}
                    className="rounded-full"
                />
            </div>
            <div className="flex-grow">
                <p className="font-bold text-xl uppercase">{name}</p>
                <p className="text-base text-gray-500 my-2 text-justify md:max-w-[75%]">{description}</p>
                <div className="flex items-center justify-between">
                    <p className="text-base">{mail}</p>
                    <Link href={instagramUrl} className="ml-4" target="_blank">
                        <InstagramIcon className="h-6 w-6" aria-hidden="true" />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Owner;
