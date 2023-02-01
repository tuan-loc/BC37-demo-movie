import { Button, Card } from "antd";
import React from "react";
import { NavLink } from "react-router-dom";
import { truncateString } from "utils/truncate";

const Film = (props) => {
  return (
    <Card
      className="m-4"
      hoverable
      cover={
        <img
          style={{ height: "300px" }}
          alt={props.film.tenPhim}
          className="object-cover"
          src={props.film.hinhAnh}
        />
      }
    >
      <h1 className="text-xl">{props.film.tenPhim}</h1>
      <p className="text-sm mt-2">{truncateString(props.film.moTa, 100)}</p>
      <NavLink to={`/detail/${props.film.maPhim}`}>
        <Button className="mt-6" type="primary" size="middle">
          Đặt vé
        </Button>
      </NavLink>
    </Card>
  );
};

export default Film;
