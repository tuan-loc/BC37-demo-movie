import { Outlet } from "react-router-dom";
import Footer from "./Layout/Footer/Footer";
import Header from "./Layout/Header/Header";

export const HomeTemplate = (props) => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};
