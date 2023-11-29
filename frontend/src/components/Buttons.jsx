import { useSelector } from "react-redux";
const Buttons = ({ text, icon, onclick }) => {
  const mode = useSelector((state) => state.auth.mode);
  return (
    <div>
      <button
        className={` drop-shadow-xl  md:text-sm  
        flex items-center
        transition duration-500 
        hover:scale-110
         border-slate-500
         rounded-md p-1 mt-1
          hover:text-blue-600  gap-1 ${!mode && "border"}`}
        onClick={onclick}
      >
        {icon}
        <span className="hidde te md:flex">{text}</span>
      </button>
    </div>
  );
};

export default Buttons;
