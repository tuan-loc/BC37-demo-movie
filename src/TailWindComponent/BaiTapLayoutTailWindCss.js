import React from "react";
import Card from "./Card";

const BaiTapLayoutTailWindCss = () => {
  return (
    <div className="container">
      <h1 className="text-center text-4xl text-green-700">
        Welcome to the cybersoft frontend with tailwindcss
      </h1>
      <div className="grid grid-cols-3 gap-4 my-3">
        <div className="text-center">
          <Card />
        </div>
        <div className="text-center">
          <Card />
        </div>
        <div className="text-center">
          <Card />
        </div>
      </div>
    </div>
  );
};

export default BaiTapLayoutTailWindCss;
