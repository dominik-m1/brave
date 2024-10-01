import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const ContactForm = () => {
    const schema = yup.object().shape({
        content: yup.string().required("To pole jest wymagane"),
        email: yup.string().required("To pole jest wymagane").email("Niepoprawny format"),
        name: yup.string().required("To pole jest wymagane"),
    });

    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data) => {
        // @todo - handle sending
        console.warn('Form Submitted:', data);
    };

    return (
        <section className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg mb-20">
            <form
                className="space-y-4"
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className="grid gap-4 md:grid-cols-2">
                    <div>
                        <input
                            name="name"
                            placeholder="Imię"
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            {...register("name")}
                        />
                        {errors.name && (
                            <p className="mt-1 text-red-500 text-sm">{errors.name.message}</p>
                        )}
                    </div>

                    <div>
                        <input
                            name="email"
                            placeholder="Email"
                            type="email"
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            {...register("email")}
                        />
                        {errors.email && (
                            <p className="mt-1 text-red-500 text-sm">{errors.email.message}</p>
                        )}
                    </div>
                </div>

                <div>
                    <textarea
                        name="content"
                        placeholder="Wiadomość"
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        {...register("content")}
                    />
                    {errors.content && (
                        <p className="mt-1 text-red-500 text-sm">{errors.content.message}</p>
                    )}
                </div>
                <div className="mt-6 h-12 flex justify-center items-center uppercase relative group overflow-hidden border border-black transition-colors duration-500">
                    <button
                        type="submit"
                        className="flex items-center w-full h-full justify-center z-10 text-white group-hover:text-black "
                    >
                        Wyślij wiadomość
                    </button>

                    {/* Sliding background effect */}
                    <div className="absolute inset-0 bg-black transition-transform duration-500 ease-out group-hover:translate-x-full"></div>
                    <div className="absolute inset-0 bg-white transition-transform duration-500 ease-out translate-x-[-100%] group-hover:translate-x-0"></div>

                    {/* Font color transition and border */}
                    <div className="absolute inset-0 text-black transition-colors duration-500 ease-out flex justify-center items-center z-0 group-hover:text-black group-hover:border-black">
                        <button
                            type="submit"
                            className="flex items-center w-full h-full justify-center"
                        >
                            Wyślij wiadomość
                        </button>
                    </div>
                </div>

            </form>
        </section>
    );
};

export default ContactForm;
