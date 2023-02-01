import React, { useEffect } from "react";
import HomeCarousel from "templates/HomeTemplate/Layout/HomeCarousel/HomeCarousel";
import HomeMenu from "templates/HomeTemplate/Layout/HomeMenu/HomeMenu";
import { useSelector, useDispatch } from "react-redux";
import {
  getMoviesAction,
  layDanhSachHeThongRapAction,
} from "redux/actions/CarouselActions";
import MultipleRows from "components/RSlick/MultipleRowSlick";

const Home = (props) => {
  const { arrFilm } = useSelector((state) => state.CarouselReducer);
  const { heThongRapChieu } = useSelector((state) => state.CarouselReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMoviesAction());
    dispatch(layDanhSachHeThongRapAction);
  }, []);

  return (
    <div>
      <HomeCarousel />

      <div className="container my-24">
        <h1 className="text-center mb-12">Movie List</h1>
        <MultipleRows arrFilm={arrFilm} />
      </div>

      <HomeMenu heThongRapChieu={heThongRapChieu} />
    </div>
  );
};

export default Home;
