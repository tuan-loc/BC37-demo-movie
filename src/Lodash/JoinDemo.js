import React from "react";
import _ from "lodash";

const JoinDemo = () => {
  let arr = ["Lộc", "Nam", "Minh"];
  let arrPerson = [
    { id: 1, name: "Lộc" },
    { id: 2, name: "Nam" },
    { id: 3, name: "Minh" },
  ];

  // es6
  const result = arr.join("-");

  // lodash
  const resultLodash = _.join(arr, "*");

  const person = _.find(arrPerson, (item) => item.id === 2);

  return (
    <div>
      {result}
      <br></br>
      {resultLodash}
      <br></br>
      {person.name}
    </div>
  );
};

export default JoinDemo;
