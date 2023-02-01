import React from "react";
import _ from "lodash";

const Include = () => {
  const arr = ["1", "2", "3"];
  console.log(_.includes(arr, "1"));

  const object = { id: 1, name: "Nguyễn Văn A", age: 18 };
  console.log(_.includes(object, 18));

  return <div>Include</div>;
};

export default Include;
