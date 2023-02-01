import React from "react";
import _ from "lodash";

const SortLodash = () => {
  const users = [
    { name: "Fred", age: 48 },
    { name: "Kaito", age: 36 },
    { name: "Bake", age: 40 },
    { name: "Juld", age: 34 },
  ];

  const resultSortByAge = _.sortBy(users, [(item) => item.age]);
  console.log(resultSortByAge);

  const result = _.sortBy(users, ["name", "age", "id"]);
  console.log(result);

  return <div>SortLodash</div>;
};

export default SortLodash;
