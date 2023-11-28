import React from "react";

const Buttons = ({ text,title,onclick }) => {
  return (
    <div>
      <button className="" onClick={onclick}>{text}{title}</button>
    </div>
  );
};

export default Buttons;
