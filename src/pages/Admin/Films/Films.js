import React, { Fragment, useEffect } from "react";
import { Button, Table } from "antd";
import {
  AudioOutlined,
  CalendarOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import Search from "antd/es/transfer/search";
import { useDispatch, useSelector } from "react-redux";
import {
  getMoviesAction,
  layDanhSachPhimAction,
  xoaPhimAction,
} from "redux/actions/CarouselActions";
import { truncateString } from "utils/truncate";
import { NavLink } from "react-router-dom";

const Films = () => {
  const { arrFilmDefault } = useSelector((state) => state.CarouselReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMoviesAction());
  }, []);

  const columns = [
    {
      title: "Mã phim",
      dataIndex: "maPhim",
      sorter: (a, b) => a.maPhim - b.maPhim,
      sortDirections: ["descend", "ascend"],
      // sortOrder: "descend",
      defaultSortOrder: "descend",
      width: 120,
    },
    {
      title: "Hình ảnh",
      dataIndex: "hinhAnh",
      render: (text, film) => {
        return (
          <Fragment>
            <img
              src={film.hinhAnh}
              alt={film.tenPhim}
              width={50}
              height={50}
              onError={(e) => {
                e.target.onError = null;
                e.target.src = `https://pisum.photos/id/${film.maPhim}/50/50`;
              }}
            />
          </Fragment>
        );
      },
      width: 100,
      //   sorter: (a, b) => a.age - b.age,
    },
    {
      title: "Tên phim",
      dataIndex: "tenPhim",
      sorter: (a, b) => {
        let tenPhimA = a.tenPhim.toLowerCase().trim();
        let tenPhimB = b.tenPhim.toLowerCase().trim();
        if (tenPhimA > tenPhimB) {
          return 1;
        }
        return -1;
      },
    },
    {
      title: "Mô tả",
      dataIndex: "moTa",
      sorter: (a, b) => {
        let tenPhimA = a.tenPhim.toLowerCase().trim();
        let tenPhimB = b.tenPhim.toLowerCase().trim();
        if (tenPhimA > tenPhimB) {
          return 1;
        }
        return -1;
      },
      render: (text, film) => {
        return <Fragment>{truncateString(film.moTa, 50)}</Fragment>;
      },
    },
    {
      title: "Hành động",
      dataIndex: "hanhDong",
      render: (text, film) => {
        return (
          <Fragment>
            <NavLink
              to={`/admin/films/edit/${film.maPhim}`}
              className="bg-black text-white mr-2 p-2 rounded"
            >
              <EditOutlined />
            </NavLink>
            <NavLink
              onClick={() => {
                if (
                  window.confirm("Bạn có chắc muốn xóa phim " + film.tenPhim)
                ) {
                  dispatch(xoaPhimAction(film.maPhim));
                }
              }}
              className="bg-red-700 text-white p-2 rounded"
            >
              <DeleteOutlined />
            </NavLink>
            <NavLink
              to={`/admin/films/schedule-cinema/${film.maPhim}`}
              className="bg-black text-white ml-2 p-2 rounded"
            >
              <CalendarOutlined />
            </NavLink>
          </Fragment>
        );
      },
    },
  ];

  const data = arrFilmDefault;

  const suffix = (
    <AudioOutlined
      style={{
        fontSize: 16,
        color: "#1890ff",
      }}
    />
  );
  const onSearch = (value) => {
    dispatch(layDanhSachPhimAction(value));
  };

  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h3 className="text-3xl">Quản lý Phim</h3>
        <NavLink to="/admin/films/addnew">
          <Button type="primary">Thêm phim</Button>
        </NavLink>
      </div>
      <Search
        placeholder="Tìm kiếm"
        enterButton="Tìm kiếm"
        size="large"
        suffix={suffix}
        onSearch={onSearch}
      />
      <Table
        className="mt-4"
        columns={columns}
        dataSource={data}
        onChange={onChange}
      />
    </div>
  );
};

export default Films;
