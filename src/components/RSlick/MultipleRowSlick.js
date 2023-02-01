import Film from "components/Film/Film";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
import actions from "redux/types/type";
import styleSlick from "./MultipleRowSlick.module.css";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} ${styleSlick["slick-prev"]}`}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} ${styleSlick["slick-next"]}`}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    />
  );
}

const MultipleRows = (props) => {
  const dispatch = useDispatch();
  const { dangChieu, sapChieu } = useSelector((state) => state.CarouselReducer);

  let activeClassDC = dangChieu ? "active_film" : "none_active_film";
  let activeClassSC = sapChieu ? "active_film" : "none_active_film";

  const renderFilms = () => {
    return props.arrFilm?.map((film, index) => {
      return (
        <div className={`${styleSlick["width-item"]}`} key={index}>
          <Film film={film} />
        </div>
      );
    });
  };

  const settings = {
    className: "center variable-width",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 3,
    speed: 500,
    rows: 1,
    slidesPerRow: 2,
    variableWidth: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <div>
      <button
        onClick={() => {
          dispatch({ type: actions.SET_FILM_DANG_CHIEU });
        }}
        className={`px-8 py-3 font-semibold rounded bg-violet-700 text-gray-100 mr-3 border-none cursor-pointer ${styleSlick[activeClassDC]}`}
      >
        PHIM ĐANG CHIẾU
      </button>
      <button
        onClick={() => {
          dispatch({ type: actions.SET_FILM_SAP_CHIEU });
        }}
        className={`px-8 py-3 font-semibold rounded bg-violet-700 text-gray-100 border-none cursor-pointer ${styleSlick[activeClassSC]}`}
      >
        PHIM SẮP CHIẾU
      </button>
      <Slider {...settings}>{renderFilms()}</Slider>
    </div>
  );
};

export default MultipleRows;
