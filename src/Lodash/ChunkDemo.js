import React from "react";
import _ from "lodash";

const ChunkDemo = () => {
  const arr = ["id", 1, "name", "Lộc", "info", "cybersoft", "abc"];

  const result = _.chunk(arr, 2);
  console.log(result);

  return <div>ChunkDemo</div>;
};

export default ChunkDemo;
