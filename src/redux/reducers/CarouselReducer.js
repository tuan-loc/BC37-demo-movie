import actions from "redux/types/type";

let user = {};
if (localStorage.getItem("USER_LOGIN")) {
  user = JSON.parse(localStorage.getItem("USER_LOGIN"));
}

const stateDefault = {
  arrImg: [],
  arrFilm: [],
  dangChieu: true,
  sapChieu: true,
  arrFilmDefault: [],
  heThongRapChieu: [],
  filmDetail: {},
  userLogin: user,
  chiTietPhongVe: {},
  danhSachGheDangDat: [],
  thongTinNguoiDung: {},
  isLoading: false,
  tabActive: "1",
  danhSachGheKhachDat: [],
  thongTinPhim: {},
};

export const CarouselReducer = (state = stateDefault, { type, payload }) => {
  switch (type) {
    case actions.SET_BANNERS:
      return { ...state, arrImg: payload };

    case actions.SET_MOVIES: {
      state.arrFilm = payload.items;
      state.arrFilmDefault = state.arrFilm;
      return { ...state };
    }

    case actions.SET_FILM_DANG_CHIEU: {
      state.dangChieu = !state.dangChieu;
      state.arrFilm = state.arrFilmDefault?.filter(
        (film) => film.dangChieu === state.dangChieu
      );
      return { ...state };
    }

    case actions.SET_FILM_SAP_CHIEU: {
      state.sapChieu = !state.sapChieu;
      state.arrFilm = state.arrFilmDefault?.filter(
        (film) => film.sapChieu === state.sapChieu
      );
      return { ...state };
    }

    case actions.SET_HE_THONG_RAP_CHIEU: {
      state.heThongRapChieu = payload;
      return { ...state };
    }

    case actions.SET_CHI_TIET_PHIM: {
      state.filmDetail = payload;
      return { ...state };
    }

    case actions.USER_LOGIN: {
      localStorage.setItem("USER_LOGIN", JSON.stringify(payload));
      localStorage.setItem("TOKEN", payload.accessToken);
      return { ...state, userLogin: payload };
    }

    case actions.BOOKING_TICKET: {
      state.chiTietPhongVe = payload;
      return { ...state };
    }

    case actions.DAT_VE: {
      const danhSachGheCapNhat = [...state.danhSachGheDangDat];
      let index = danhSachGheCapNhat.findIndex(
        (ghe) => ghe.maGhe === payload.maGhe
      );
      if (index !== -1) {
        danhSachGheCapNhat.splice(index, 1);
      } else {
        danhSachGheCapNhat.push(payload);
      }
      return { ...state, danhSachGheDangDat: danhSachGheCapNhat };
    }

    case actions.THONG_TIN_NGUOI_DUNG: {
      return { ...state, thongTinNguoiDung: payload };
    }

    case actions.DISPLAY_LOADING: {
      return { ...state, isLoading: true };
    }

    case actions.HIDE_LOADING: {
      return { ...state, isLoading: false };
    }

    case actions.DAT_VE_HOAN_TAT: {
      return { ...state, danhSachGheDangDat: [] };
    }

    case actions.CHUYEN_TAB: {
      return { ...state, tabActive: "2" };
    }

    case actions.CHANGE_TAB_ACTIVE: {
      return { ...state, tabActive: payload };
    }

    case actions.LAY_THONG_TIN_PHIM: {
      return { ...state, thongTinPhim: payload };
    }

    default:
      return { ...state };
  }
};
