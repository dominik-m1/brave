function Button({ children, ...props }) {
  return (
    <button
      className="bg-customRed hover:bg-green-300 px-4 py-3 rounded-lg text-white text-sm font-bold tracking-widest uppercase focus:outline-none"
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
