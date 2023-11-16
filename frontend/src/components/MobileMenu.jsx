import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import MenuLinks from "./MenuLinks";

const MobileMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
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
              className={`fixed z-20 top-[80px] bottom-0
          bg-slate-700 w-[250px] right-0 `}
            >
              <MenuLinks />
            </div>
          </>
        )}
      </>
    </div>
  );
};

export default MobileMenu;
