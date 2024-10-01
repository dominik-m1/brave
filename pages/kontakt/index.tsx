import getPageData from "@/lib/get-page-data";

function ContactPage() {

    return (
        <section className="mt-40 max-w-7xl mx-auto">
            introduce contact form
        </section>
    );
}

export async function getStaticProps({ locale }) {
    const pageData = await getPageData({ locale });
    return {
        props: {
            ...pageData,
        },
    };
}

export default ContactPage;
