import React from "react";
import Button from "./Button";

const ButtonList = () => {
  const buttonNames = ["All", "Gaming", "Songs", "Live", "Cricket", "News", "Cooking"];

  return (
    <div className="flex">
      {buttonNames.map((name, index) => (
        <Button key={index} name={name} />
      ))}
    </div>
  );
};

export default ButtonList;
