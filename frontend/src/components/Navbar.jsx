import MenuLinks from "./MenuLinks";
import MobileMenu from "./MobileMenu";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SearchFriend from "./SearchFriend";

const Navbar = () => {
  const mode = useSelector((state) => state.auth.mode);
  return (
    <nav
      className={` drop-shadow-lg h-[80px] w-full fixed top-0 ${
        mode ? "bg-[#2a2536]  hover:bg-[#4a415f] border-[#4f4f4f]" : "bg-white border-slate-300"
      } z-50  
    flex justify-between items-center 
    px-2 md:px-10 
    border-b-[1px] `}
    >
      <div className="flex gap-1 lg:gap-5 items-center">
        <Link to={"/home"}>
          <h2
            className={` drop-shadow-sm uppercase px-1 text-[15px] md:block md:text-2xl
              font-bold bg-clip-text text-transparent
              bg-gradient-to-r from-blue-500 to-purple-500`}
          >
            POSTGRAMM
          </h2>
        </Link>

        <SearchFriend />
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
