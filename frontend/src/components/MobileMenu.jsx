import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import MenuLinks from "./MenuLinks";

const MobileMenu = ({ mode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <div className="relative flex md:hidden ">
      <div className="z-30">
        {isMenuOpen ? (
          <div onClick={() => setIsMenuOpen(false)}>
            <CloseIcon sx={{ fontSize: "40px" }} />
          </div>
        ) : (
          <div onClick={() => setIsMenuOpen(true)}>
            <MenuIcon sx={{ fontSize: "40px" }} />
          </div>
        )}
      </div>
      <>
        {isMenuOpen && (
          <>
            <div
              className={`fixed top-[80px] ${
                mode ? "bg-[#4c4361]" : "bg-slate-300"
              } 
               bottom-0
                w-[250px] h-[100vh] right-0 border-[1px] border-slate-500
            z-50`}
            >
              <MenuLinks setIsMenuOpen={setIsMenuOpen} />
            </div>
          </>
        )}
      </>
    </div>
  );
};

export default MobileMenu;
