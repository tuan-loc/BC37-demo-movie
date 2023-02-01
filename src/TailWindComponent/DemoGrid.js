import React from "react";

const DemoGrid = () => {
  return (
    <div className="container">
      <div className="grid grid-cols-3 gap-8">
        <div className="bg-red-400">1</div>
        <div className="bg-blue-400">2</div>
        <div className="bg-green-400">3</div>
      </div>
    </div>
  );
};

export default DemoGrid;
