import React from "react";
import "./CustomCss.css";

const CustomCss = () => {
  return (
    <div className="container mt-1">
      <article className="bg-gray-500 p-5 shadow-lg">
        <p className="text-4xl text-white">Tiêu đề</p>
        <p className="content">Hello cybersoft</p>

        <button className="p-5 animation-scale">Hover me</button>
      </article>
    </div>
  );
};

export default CustomCss;
