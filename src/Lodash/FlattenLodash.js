import React from "react";
import _ from "lodash";

const FlattenLodash = () => {
  const arr = [[1, [2, [3, [4]]], 5]];
  const resultFlatten = _.flatten(arr);
  const resultFlattenDeep = _.flattenDeep(arr);
  console.log("resultFlatten", resultFlatten);
  console.log("resultFlattenDeep", resultFlattenDeep);

  return <div>FlattenLodash</div>;
};

export default FlattenLodash;
