import { Rate, Tabs, Tag } from "antd";
import moment from "moment";
import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { layThongTinLichChieuPhimAction } from "redux/actions/CarouselActions";
import "../../assets/styles/circle.scss";

const Detail = () => {
  const params = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const movieId = params.id;
    dispatch(layThongTinLichChieuPhimAction(movieId));
  }, [params]);

  const { filmDetail } = useSelector((state) => state.CarouselReducer);

  const items = [
    {
      key: "1",
      label: `Lịch chiếu`,
      children: (
        <Tabs
          className="my-12"
          tabPosition="left"
          items={filmDetail.heThongRapChieu?.map((htr, index) => {
            return {
              label: (
                <Fragment>
                  <img
                    src={htr.logo}
                    alt={htr.tenHeThonghRap}
                    className="w-24"
                  />
                  <p className="text-sm">{htr.tenHeThongRap}</p>
                </Fragment>
              ),
              key: index,
              children: htr.cumRapChieu.map((cumRap, index) => {
                return (
                  <div key={index} className="p-1">
                    <div className="flex">
                      <div className="flex">
                        <img
                          src={cumRap.hinhAnh}
                          alt={cumRap.tenCumRap}
                          className="w-12 mr-2"
                          onError={(e) => {
                            if (e.target.src !== "image_path_here") {
                              e.target.onerror = null;
                              e.target.src = "image_path_here";
                            }
                          }}
                        />
                        <div>
                          <p className="my-1">{cumRap.tenCumRap}</p>
                          <p className="text-xs">{cumRap.diaChi}</p>
                        </div>
                      </div>
                      <div className="ml-8">
                        {cumRap.lichChieuPhim.map((lichChieu, index) => {
                          return (
                            <NavLink to={`/checkout/${lichChieu.maLichChieu}`}>
                              <Tag color="magenta">
                                Ngày chiếu:{" "}
                                {moment(lichChieu.ngayKhoiChieu).format(
                                  "DD.MM.YYYY ~ hh:mm A"
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
    },
    {
      key: "2",
      label: `Thông tin`,
      children: `Thông tin`,
    },
    {
      key: "3",
      label: `Đánh giá`,
      children: `Đánh giá`,
    },
  ];

  return (
    <div className="container">
      <div className="grid grid-cols-12 my-12">
        <div className="col-span-7 col-start-2">
          <div className="grid grid-cols-2">
            <img src={filmDetail.hinhAnh} alt="" className="w-full" />
            <div className="ml-8">
              <p className="text-sm">
                Ngày chiếu:{" "}
                {moment(filmDetail.ngayKhoiChieu).format(
                  "DD.MM.YYYY ~ hh:mm A"
                )}
              </p>
              <p className="text-2xl my-4">{filmDetail.tenPhim}</p>
              <p>{filmDetail.moTa}</p>
            </div>
          </div>
        </div>
        <div className="col-span-2">
          <div className="pie-wrapper progress-60">
            <span className="label">
              {filmDetail.danhGia}
              <span className="smaller">sao</span>
            </span>
            <div className="pie">
              <div className="left-side half-circle"></div>
              <div className="right-side half-circle"></div>
            </div>
          </div>
          <Rate
            className="text-center block"
            disabled
            value={filmDetail.danhGia}
            count={10}
          />
        </div>
      </div>
      <Tabs defaultActiveKey="1" items={items} />
    </div>
  );
};

export default Detail;
