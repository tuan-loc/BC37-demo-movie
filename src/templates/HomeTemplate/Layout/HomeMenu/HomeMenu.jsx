import React, { Fragment } from "react";
import { Tabs, Tag } from "antd";
import { truncateString } from "utils/truncate";
import { NavLink } from "react-router-dom";
import moment from "moment/moment";

const HomeMenu = (props) => {
  return (
    <div className="container">
      <h1 className="text-center">Hệ thống rạp chiếu phim</h1>
      <Tabs
        className="my-12"
        tabPosition="left"
        items={props.heThongRapChieu.map((heThongRap, index) => {
          return {
            label: (
              <img
                key={index}
                className="w-12"
                src={heThongRap.logo}
                alt={heThongRap.tenHeThongRap}
              />
            ),
            key: heThongRap.maHeThongRap,
            children: (
              <Tabs
                tabPosition="left"
                items={heThongRap.lstCumRap.map((cumRap, index) => {
                  return {
                    label: (
                      <Fragment key={index}>
                        <img
                          src={cumRap.hinhAnh}
                          alt={cumRap.tenCumRap}
                          className="w-10"
                        />
                        <div className="inline-block text-start ml-4 flex-col">
                          <span>{cumRap.tenCumRap}</span>
                          <br />
                          <span className="text-xs">
                            {truncateString(cumRap.diaChi, 40)}
                          </span>
                        </div>
                      </Fragment>
                    ),
                    key: cumRap.maCumRap,
                    children: cumRap.danhSachPhim.map((phim, index) => {
                      return (
                        <div key={index} className="p-1">
                          <div className="flex">
                            <div>
                              <img
                                src={phim.hinhAnh}
                                alt={phim.tenPhim}
                                className="w-12 mr-2"
                                onError={(e) => {
                                  if (e.target.src !== "image_path_here") {
                                    e.target.onerror = null;
                                    e.target.src = "image_path_here";
                                  }
                                }}
                              />
                            </div>
                            <div>
                              {phim.hot && <Tag color="red">Hot</Tag>}
                              <span>{phim.tenPhim}</span>
                              <hr />
                              {phim.dangChieu && (
                                <Tag color="green">Đang chiếu</Tag>
                              )}
                              {phim.sapChieu && (
                                <Tag color="purple">Sắp chiếu</Tag>
                              )}
                              <hr />
                              {phim.lstLichChieuTheoPhim.map((lich, index) => {
                                return (
                                  <NavLink
                                    key={index}
                                    to={`/checkout/${lich.maLichChieu}`}
                                  >
                                    <Tag color="blue">
                                      {moment(lich.ngayChieuGioChieu).format(
                                        "DD/MM/YYYY ~ hh:mm A"
                                      )}
                                    </Tag>
                                  </NavLink>
                                );
                              })}
                            </div>
                          </div>
                          <hr />
                        </div>
                      );
                    }),
                  };
                })}
              />
            ),
          };
        })}
      />
    </div>
  );
};

export default HomeMenu;
