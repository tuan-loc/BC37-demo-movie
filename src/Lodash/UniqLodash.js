import React from "react";
import _ from "lodash";

const UniqLodash = () => {
  const arr = [1, 2, 3, 4, 2, 3, 6, 8, 9, 9, 6];
  console.log(_.uniq(arr));

  const arr1 = [
    { id: "1", name: "iphoneX", price: 100 },
    { id: "1", name: "iphoneXS", price: 100 },
    { id: "3", name: "iphoneMAx", price: 100 },
    { id: "3", name: "iphonePro", price: 100 },
    { id: "5", name: "iphonePro", price: 100 },
  ];
  console.log(_.unionBy(arr1, "name"));

  return <div>UniqLodash</div>;
};

export default UniqLodash;
