const Buttons = ({ text, title, onclick }) => {
  return (
    <div>
      <button
        className="text-sm 
        transition duration-500 
        hover:scale-110
         border-slate-500 px-4 py-2
          hover:text-blue-400 hover:border-b"
        onClick={onclick}
      >
        {text}
        {title}
      </button>
    </div>
  );
};

export default Buttons;
