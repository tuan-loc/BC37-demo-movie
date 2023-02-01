import { Button, Tag, Tabs } from "antd";
import React, { Fragment } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  datVeAction,
  layChiTietPhongVeAction,
  lichSuDatVeAction,
} from "redux/actions/CarouselActions";
import style from "./Checkout.module.css";
import "./Checkout.css";
import {
  CloseOutlined,
  UserOutlined,
  CheckOutlined,
  SmileOutlined,
} from "@ant-design/icons";
import actions from "redux/types/type";
import _ from "lodash";
import moment from "moment";
import { connection } from "index";

const Checkout = (props) => {
  const { userLogin, chiTietPhongVe, danhSachGheDangDat, danhSachGheKhachDat } =
    useSelector((state) => state.CarouselReducer);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(layChiTietPhongVeAction(id));

    // Vừa vào trang load tất cả ghế của các người khác đang đặt
    connection.invoke("loadDanhSachGhe", id);

    // Load danh sách ghế đang đặt từ server về
    connection.on("loadDanhSachGheDaDat", (dsGheKhachDat) => {
      console.log(dsGheKhachDat);
    });

    // Cài đặt sự kiện khi reload trang
    window.addEventListener("beforeunload", clearGhe);

    return () => {
      clearGhe();
      window.removeEventListener("beforeunload", clearGhe);
    };
  }, [id]);

  const clearGhe = function (event) {
    connection.invoke("huyDat", userLogin.taiKhoan, id);
  };

  const { thongTinPhim, danhSachGhe } = chiTietPhongVe;

  const renderSeats = () => {
    return danhSachGhe?.map((ghe, index) => {
      let classGheVip = ghe.loaiGhe === "Vip" ? "gheVip" : "";
      let classGheDaDat = ghe.daDat ? "gheDaDat" : "";
      let classGheDangDat = "";
      let indexGheDangDat = danhSachGheDangDat?.findIndex(
        (gheDangDat) => gheDangDat.maGhe === ghe.maGhe
      );

      let classGheKhachDat = "";
      let indexGheKD = danhSachGheKhachDat.findIndex(
        (gheKD) => gheKD.maGhe === ghe.maGhe
      );
      if (indexGheKD !== -1) {
        classGheKhachDat = "gheKhachDat";
      }

      let classGheDaDuocDat = "";
      if (userLogin.taiKhoan === ghe.taiKhoanNguoiDat) {
        classGheDaDuocDat = "gheDaDuocDat";
      }

      if (indexGheDangDat !== -1) {
        classGheDangDat = "gheDangDat";
      }

      return (
        <Fragment key={index}>
          <button
            onClick={() => {
              dispatch({ type: actions.DAT_VE, payload: ghe });
            }}
            disabled={ghe.daDat || classGheKhachDat !== ""}
            className={`ghe ${classGheVip} ${classGheDaDat} ${classGheDangDat} ${classGheDaDuocDat} ${classGheKhachDat}`}
          >
            {ghe.daDat ? (
              classGheDaDuocDat !== "" ? (
                <UserOutlined />
              ) : (
                <CloseOutlined />
              )
            ) : classGheKhachDat !== "" ? (
              <SmileOutlined />
            ) : (
              ghe.stt
            )}
          </button>

          {(index + 1) % 16 === 0 && <br />}
        </Fragment>
      );
    });
  };

  return (
    <div className="container min-h-screen" style={{ minHeight: "100vh" }}>
      <div className="grid grid-cols-12">
        <div className="col-span-8">
          <div className="text-center text-2xl my-4">Màn hình</div>
          <div className={`${style["screen"]}`}></div>
          <div>{renderSeats()}</div>
          <div className="mt-5 flex justify-center">
            <table
              className="divide-y divide-gray-200 w-2/3"
              style={{ border: "none" }}
            >
              <thead className="bg-gray-50 p-5">
                <tr>
                  <th>Ghế chưa đặt</th>
                  <th>Ghế đang đặt</th>
                  <th>Ghế vip</th>
                  <th>Ghế đã đặt</th>
                  <th>Ghế người dùng đặt</th>
                  <th>Ghế khách đang đặt</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td>
                    <button className="ghe text-center">
                      <CheckOutlined />
                    </button>
                  </td>
                  <td>
                    <button className="ghe gheDangDat text-center">
                      <CheckOutlined />
                    </button>
                  </td>
                  <td>
                    <button className="ghe gheVip text-center">
                      <CheckOutlined />
                    </button>
                  </td>
                  <td>
                    <button className="ghe gheDaDat text-center">
                      <CheckOutlined />
                    </button>
                  </td>
                  <td>
                    <button className="ghe gheDaDuocDat text-center">
                      <CheckOutlined />
                    </button>
                  </td>
                  <td>
                    <button className="ghe gheKhachDat text-center">
                      <CheckOutlined />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="col-span-4 mt-16">
          <h3 className="text-center text-3xl text-green-700 my-2">
            {danhSachGheDangDat
              .reduce((tongTien, ghe, index) => {
                return (tongTien += ghe.giaVe);
              }, 0)
              .toLocaleString()}{" "}
            VND
          </h3>
          <hr />
          <h3 className="text-xl">{thongTinPhim?.tenPhim}</h3>
          <p className="text-sm my-1">Địa chỉ: {thongTinPhim?.diaChi}</p>
          <p className="my-1">Ngày chiếu: {thongTinPhim?.ngayChieu}</p>
          <p className="my-1">Giờ chiếu: {thongTinPhim?.gioChieu}</p>
          <hr />
          <div className="flex flex-row my-4">
            <div className="w-4/5">
              <span className="text-red-700 text-lg font-bold">Ghế</span>
              {_.sortBy(danhSachGheDangDat, ["stt"])?.map((gheDD, index) => {
                return (
                  <button
                    key={index}
                    className={`text-green-900 text-xl ghe gheDangDat block`}
                  >
                    {gheDD.stt}
                  </button>
                );
              })}
            </div>
            <div className="text-right">
              <span className="text-green-700 text-lg">
                {danhSachGheDangDat
                  .reduce((tongTien, ghe, index) => {
                    return (tongTien += ghe.giaVe);
                  }, 0)
                  .toLocaleString()}{" "}
                VND
              </span>
            </div>
          </div>
          <hr />
          <div className="my-1">
            <i>Email: {userLogin.email}</i>
          </div>
          <div className="my-1">
            <i>Phone: {userLogin.soDT}</i>
          </div>
          <hr />
          <div className="my-2 h-full">
            <Button
              onClick={() => {
                dispatch(datVeAction({ id, danhSachGheDangDat }));
              }}
              type="primary"
              block
              className="bg-green-900 hover:bg-green-700 text-white "
            >
              Đặt vé
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const KetQuaDatVe = (props) => {
  const { thongTinNguoiDung, userLogin } = useSelector(
    (state) => state.CarouselReducer
  );
  const dispatch = useDispatch();

  console.log(thongTinNguoiDung);

  useEffect(() => {
    dispatch(lichSuDatVeAction);
  }, []);

  const renderTicketItem = () => {
    return thongTinNguoiDung?.thongTinDatVe?.map((ticket, index) => {
      return (
        <div key={index} className="p-2 lg:w-1/3 md:w-1/2 w-full">
          <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
            <img
              alt="team"
              className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
              src={ticket.hinhAnh}
            />
            <div className="flex-grow">
              <h2 className="text-gray-900 title-font font-medium">
                {ticket.tenPhim}
              </h2>
              <p className="text-gray-500">
                {moment(ticket.ngayDat).format("hh:mm A ~ DD.MM.YYYY")}
              </p>
              <p>Địa điểm: {_.first(ticket.danhSachGhe).tenHeThongRap}</p>
              <p>
                Tên rạp: {_.first(ticket.danhSachGhe).tenCumRap} - Ghế:{" "}
                {ticket.danhSachGhe.map((ghe, index) => {
                  return <span key={index}>-{ghe.tenGhe}</span>;
                })}
              </p>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div>
      <div classname="p-5">
        <section className="text-gray-600 body-font">
          <div className="container px-5 py-24 mx-auto">
            <div className="flex flex-col text-center w-full mb-20">
              <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
                Lịch sử đặt vé khách hàng
              </h1>
              <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
                Hãy xem thông tin địa chỉ và thời gian để xem phim vui vẻ bạn
                nhé!
              </p>
            </div>
            <div className="flex flex-wrap -m-2">{renderTicketItem()}</div>
          </div>
        </section>
      </div>
    </div>
  );
};

const items = [
  {
    key: "1",
    label: "01 CHỌN GHẾ & THANH TOÁN",
    children: <Checkout />,
  },
  {
    key: "2",
    label: "02 KẾT QUẢ ĐẶT VÉ",
    children: <KetQuaDatVe />,
  },
];

export default function (props) {
  const { tabActive } = useSelector((state) => state.CarouselReducer);
  const dispatch = useDispatch();

  return (
    <div className="px-5">
      <Tabs
        defaultActiveKey="1"
        activeKey={tabActive}
        items={items}
        onChange={(key) => {
          dispatch({ type: actions.CHANGE_TAB_ACTIVE, payload: items.key });
        }}
      />
    </div>
  );
}
