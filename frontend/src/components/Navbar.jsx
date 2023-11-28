import MenuLinks from "./MenuLinks";
import SearchIcon from "@mui/icons-material/Search";
import MobileMenu from "./MobileMenu";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const Navbar = () => {
  const mode = useSelector((state) => state.auth.mode);
  return (
    <nav
      className={`h-[80px]  
    flex justify-between items-center 
    px-2 md:px-10 ${!mode && "drop-shadow-xl"} 
    border-b-[1px] border-slate-500 `}
    >
      <div className="flex gap-5 items-center">
        <Link to={"/home"}>
          <h2
            className={`uppercase hidden md:block md:text-2xl
              font-bold bg-clip-text text-transparent
              bg-gradient-to-r from-blue-500 to-purple-500`}
          >
            POSTGRAMM
          </h2>
        </Link>

        <form className="relative flex items-center">
          <input
            placeholder="Search..."
            className="p-1 pl-3 outline-none
             text-black rounded"
            type="text"
          />
          <span
            className="absolute right-3 text-blue-500 
           hover:text-green-500  hover:scale-110"
          >
            <SearchIcon />
          </span>
        </form>
      </div>
      <div>
        <div className="hidden md:flex">
          <MenuLinks flex={"row"} />
        </div>
        <MobileMenu />
      </div>
    </nav>
  );
};

export default Navbar;
