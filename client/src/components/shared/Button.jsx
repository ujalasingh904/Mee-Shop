const Button = ({ text, bgColor, textColor, handler = () => { }, onClick, type = 'button', disabled = false }) => {
  return (
    <button
      type={type}
      onClick={onClick || handler}
      disabled={disabled}
      className={`${bgColor} ${textColor} cursor-pointer hover:scale-[1.05] duration-300 py-2 px-8 rounded-full relative z-10 ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {text}
    </button>
  )
}

export default Button