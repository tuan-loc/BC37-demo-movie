import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Footer from "templates/HomeTemplate/Layout/Footer/Footer";
import Header from "templates/HomeTemplate/Layout/Header/Header";

const CheckoutTemplate = (props) => {
  const { userLogin } = useSelector((state) => state.CarouselReducer);

  if (localStorage.getItem("TOKEN") !== userLogin.accessToken) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default CheckoutTemplate;
