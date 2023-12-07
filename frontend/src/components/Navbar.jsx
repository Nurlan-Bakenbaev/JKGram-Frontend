import MenuLinks from "./MenuLinks";
import SearchIcon from "@mui/icons-material/Search";
import MobileMenu from "./MobileMenu";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Navbar = () => {
  const mode = useSelector((state) => state.auth.mode);
  return (
    <nav
      className={` drop-shadow-lg h-[80px] w-full fixed top-0 ${
        mode ? "bg-[#2a2536] border-[#4f4f4f]" : "bg-white border-slate-300"
      } z-50  
    flex justify-between items-center 
    px-2 md:px-10 
    border-b-[1px]  `}
    >
      <div className="flex gap-3 items-center">
        <Link to={"/home"}>
          <h2
            className={` drop-shadow-sm uppercase hidden md:block md:text-2xl
              font-bold bg-clip-text text-transparent
              bg-gradient-to-r from-blue-500 to-purple-500`}
          >
            POSTGRAMM
          </h2>
        </Link>

        <form className="relative flex items-center">
          <input
            placeholder="Search..."
            className="p-1 pl-3 border drop-shadow-sm border-slate-300 text-[12px] 
            md:text-md outline-none
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
        <MobileMenu mode={mode} />
      </div>
    </nav>
  );
};

export default Navbar;
