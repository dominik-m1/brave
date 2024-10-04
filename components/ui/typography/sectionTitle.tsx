interface IProps {
    title: string;
}
const SectionTitle = ({ title}: IProps) => {
    return (
        <h2 className="my-4 text-center font-20 text-lightgray text-3xl md:my-10">
            {title}
        </h2>
    )
};

export default SectionTitle;
