import requester from "app/api";
import { apiPath } from "app/apiPath";
import actions from "redux/types/type";

export const getCarouselAction = async (next) => {
  try {
    const res = await requester({
      method: "GET",
      url: apiPath.BANNERS,
    });
    next({ type: actions.SET_BANNERS, payload: res.data.content });
  } catch (error) {
    console.log(error);
  }
};

export const getMoviesAction =
  (page = 1) =>
  async (next) => {
    try {
      const res = await requester({
        method: "GET",
        url: apiPath.MOVIES,
        params: {
          maNhom: "GP04",
          soTrang: page,
          soPhanTuTrenTrang: 12,
        },
      });
      next({ type: actions.SET_MOVIES, payload: res.data.content });
    } catch (error) {
      console.log(error);
    }
  };

export const layDanhSachPhimAction =
  (tenPhim = "") =>
  async (next) => {
    try {
      const res = await requester({
        method: "GET",
        url: apiPath.LAY_DANH_SACH_PHIM,
        params: {
          maNhom: "GP04",
          tenPhim,
        },
      });
      next({ type: actions.SET_MOVIES, payload: res.data.content });
    } catch (error) {
      console.log(error);
    }
  };

export const layDanhSachHeThongRapAction = async (next) => {
  try {
    const res = await requester({
      method: "GET",
      url: apiPath.CINEMAS_SCHEDULE,
      params: {
        maNhom: "GP04",
      },
    });
    next({ type: actions.SET_HE_THONG_RAP_CHIEU, payload: res.data.content });
  } catch (error) {
    console.log(error);
  }
};

export const layThongTinLichChieuPhimAction = (maPhim) => async (next) => {
  try {
    const res = await requester({
      method: "GET",
      url: apiPath.INFO_SCHEDULES,
      params: {
        maPhim,
      },
    });
    next({ type: actions.SET_CHI_TIET_PHIM, payload: res.data.content });
  } catch (error) {
    console.log(error);
  }
};

export const dangNhapAction = (thongTinDangNhap) => async (next) => {
  try {
    const res = await requester({
      method: "POST",
      url: apiPath.USER_LOGIN,
      data: thongTinDangNhap,
    });
    console.log(res);

    if (res.data.statusCode === 200) {
      next({ type: actions.USER_LOGIN, payload: res.data.content });
    }
  } catch (error) {
    console.log(error);
  }
};

export const layChiTietPhongVeAction = (MaLichChieu) => async (next) => {
  try {
    const res = await requester({
      method: "GET",
      url: apiPath.BOOKING_TICKET,
      params: {
        MaLichChieu,
      },
    });

    if (res.data.statusCode === 200) {
      next({ type: actions.BOOKING_TICKET, payload: res.data.content });
    }
  } catch (error) {
    console.log(error);
  }
};

export const datVeAction = (thongTinDatVe) => async (next) => {
  try {
    next({ type: actions.DISPLAY_LOADING });

    const res = await requester({
      method: "POST",
      url: apiPath.DAT_VE,
      data: thongTinDatVe,
    });
    next({ payload: res.data.content });

    // Đặt vé thành công gọi api load lại phòng vé
    await next(layChiTietPhongVeAction(thongTinDatVe.maLichChieu));
    await next({ type: actions.DAT_VE_HOAN_TAT });

    await next({ type: actions.HIDE_LOADING });
    await next({ type: actions.CHUYEN_TAB });
  } catch (error) {
    next({ type: actions.HIDE_LOADING });

    console.log(error);
  }
};

export const lichSuDatVeAction = async (next) => {
  try {
    const res = await requester({
      method: "POST",
      url: apiPath.THONG_TIN_NGUOI_DUNG,
    });
    next({ type: actions.THONG_TIN_NGUOI_DUNG, payload: res.data.content });
  } catch (error) {
    console.log(error);
  }
};

export const datGheAction = (ghe) => async (dispatch) => {
  try {
    // Đưa thông tin lên reducer
    await dispatch({
      type: actions.DAT_VE,
      payload: ghe,
    });

    // Call api về backend
  } catch (error) {
    console.log(error);
  }
};

export const themPhimUploadHinhAction = (formData) => async (next) => {
  try {
    await requester({
      method: "POST",
      url: apiPath.THEM_PHIM_UPLOAD_HINH,
      data: formData,
    });
  } catch (error) {
    console.log(error);
  }
};

export const layThongTinPhimAction = (maPhim) => async (next) => {
  try {
    const res = await requester({
      method: "GET",
      url: apiPath.LAY_THONG_TIN_PHIM,
      params: { maPhim },
    });
    next({ type: actions.LAY_THONG_TIN_PHIM, payload: res.data.content });
  } catch (error) {
    console.log(error);
  }
};

export const capNhatPhimUploadAction = (formData) => async (next) => {
  try {
    await requester({
      method: "POST",
      url: apiPath.CAP_NHAT_PHIM,
      data: formData,
    });
  } catch (error) {
    console.log(error);
  }
};

export const xoaPhimAction = (maPhim) => async (next) => {
  try {
    await requester({
      method: "DELETE",
      url: apiPath.XOA_PHIM,
      params: {
        maPhim,
      },
    });
    alert("Xóa phim thành công");
    next(getMoviesAction());
  } catch (error) {
    console.log(error);
  }
};

export const taoLichChieuAction = (thongTinLichChieu) => async (next) => {
  try {
    await requester({
      method: "POST",
      url: apiPath.TAO_LICH_CHIEU,
      data: thongTinLichChieu,
    });
  } catch (error) {
    console.log(error);
  }
};
