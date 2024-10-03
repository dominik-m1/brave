interface IProps {
    label: string;
}

const Button = ({ label, onClick }: IProps) => {
  return (
      <div className="mt-6 h-12 flex justify-center items-center uppercase relative group overflow-hidden border border-black transition-colors duration-500" onClick={onClick}>
        <button
            type="submit"
            className="flex items-center w-full h-full justify-center z-10 text-white group-hover:text-black "
        >
            {label}
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
              {label}
          </button>
        </div>
      </div>
  )
}

export default Button
