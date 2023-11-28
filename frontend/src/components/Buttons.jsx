const Buttons = ({ text, icon, onclick }) => {
  return (
    <div>
      <button
        className="text-sm md:text-sm  flex items-center
        transition duration-500 
        hover:scale-110
         border-slate-500  py-2
          hover:text-blue-400 hover:border-b"
        onClick={onclick}
      >
        {icon}
        <span className="hidden md:flex">{text}</span>
      </button>
    </div>
  );
};

export default Buttons;
