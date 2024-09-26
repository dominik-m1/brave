interface IProps {
    title: string;
}
const SectionTitle = ({ title}: IProps) => {
    return (
        <h2 className="my-20 text-center font-20 text-lightgray text-6xl">
            {title}
        </h2>
    )
};

export default SectionTitle;
