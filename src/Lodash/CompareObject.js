import React from "react";
import _ from "lodash";

const CompareObject = () => {
  const arrA = [1, 2];
  const arrB = [1, 2];

  const arrObject1 = [
    { id: 1, name: "Loc" },
    { id: 2, name: "Minh" },
  ];

  const arrObject2 = [
    { id: 1, name: "Loc" },
    { id: 2, name: "Hoa" },
  ];

  const result1 = _.differenceWith(arrObject1, arrObject2, _.isEqual);

  const result = _.isEqual(arrA.sort(), arrB.sort());

  console.log(result);
  console.log(result1);

  return <div>CompareObject</div>;
};

export default CompareObject;
