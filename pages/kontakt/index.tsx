import getPageData from "@/lib/get-page-data";
import SectionTitle from "@/components/ui/typography/sectionTitle";
import ContactForm from "@/components/contact-form";

function ContactPage() {

    return (
        <section className="mt-40 max-w-7xl mx-auto">
            <SectionTitle title="SKONTAKTUJ SIĘ Z NAMI"/>
            <ContactForm />
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
