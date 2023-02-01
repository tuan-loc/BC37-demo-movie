import { Carousel } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCarouselAction } from "redux/actions/CarouselActions";

const contentStyle = {
  height: "700px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};

const HomeCarousel = (props) => {
  const { arrImg } = useSelector((state) => state.CarouselReducer);
  const dispatch = useDispatch();

  // Sẽ tự kích hoạt khi component load ra
  useEffect(() => {
    dispatch(getCarouselAction);
  }, []);

  const renderImg = () => {
    return arrImg.map((item, index) => {
      return (
        <div key={index} style={contentStyle}>
          <img
            className="w-full object-cover"
            style={{ height: "700px" }}
            src={item.hinhAnh}
            alt={item.hinhAnh}
          />
        </div>
      );
    });
  };

  return <Carousel effect="fade">{renderImg()}</Carousel>;
};

export default HomeCarousel;
