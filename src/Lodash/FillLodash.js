import React from "react";
import _ from "lodash";

const FillLodash = () => {
  var arr = [
    { id: 1, name: "IPhone" },
    { id: 2, name: "IPhone X" },
    { id: 3, name: " XS" },
  ];

  _.fill(arr, { id: 5, name: "samsung" }, 1, 2);

  console.log(arr);

  return <div>FillLodash</div>;
};

export default FillLodash;
