import getPageData from "@/lib/get-page-data";
import getAboutUsPageData from "@/lib/get-about-us-page-data";
import Image from "next/image";
import SectionTitle from "@/components/ui/typography/sectionTitle";
import ReactMarkdown from 'react-markdown';

interface IProps {
   aboutUs: {
       title: string;
       description: string;
       image: string;
   }
}

function AboutUs({ aboutUs }: IProps) {
    return (
        <section className="mt-28">
            <SectionTitle title={aboutUs.title}/>
            <p className="p-4 mx-auto max-w-3xl text-justify text-base text-gray-500">
                <ReactMarkdown>
                    {aboutUs.description}
                </ReactMarkdown>
            </p>
            <img
                src={aboutUs.image}
                alt="BeBrave"
                className="mx-auto max-w-full my-4 px-4 md:my-10 md:max-w-3xl"
            />
        </section>
    )
}

export async function getStaticProps({ locale, params }) {
    const pageData = await getPageData({ locale })
    const { aboutUs } = await getAboutUsPageData({
        locale,
    })

    return {
        props: {
            aboutUs: aboutUs[0],
            ...pageData
        }
    }
}

export default AboutUs;
