import React from "react";

const Card = () => {
  return (
    <div className="card w-full">
      <div className="card-body bg-gray-100 py-8 rounded-tl-lg rounded-tr-lg px-7">
        <h3 className="text-purple-800 font-bold text-sm">Category</h3>
        <p className="text-black text-xl">Cybersoft frontend developer</p>
        <p className="text-black text-xs my-2">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusantium
          expedita placeat, obcaecati omnis recusandae earum qui eveniet
          adipisci laborum laudantium sint excepturi, voluptatem, doloremque
          enim neque necessitatibus at libero ullam? Ratione corporis eius
          commodi modi itaque neque perspiciatis aliquid, eos quibusdam vero,
          non impedit, reprehenderit magnam nihil quidem quos! Deserunt!
        </p>
      </div>
      <div className="card-footer bg-gray-200 rounded-bl-lg rounded-br-lg flex justify-between w-full px-8 py-4">
        <p>1 USD</p>
        <button className="rounded-lg bg-purple-600 text-white px-2 py-2 hover:text-purple-600 hover:bg-gray-300 transition duration-500 cursor-pointer outline-none border-none">
          Register
        </button>
      </div>
    </div>
  );
};

export default Card;
