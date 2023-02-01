import logo from "./logo.svg";
import "./App.css";
import DemoGrid from "TailWindComponent/DemoGrid";
import PaddingMarginDemo from "TailWindComponent/PaddingMarginDemo";
import WidthHeightDemo from "TailWindComponent/WidthHeightDemo";
import FlexDemo from "TailWindComponent/FlexDemo";
import TextBackgroundDemo from "TailWindComponent/TextBackgroundDemo";
import ResponsiveDemo from "TailWindComponent/ResponsiveDemo";
import CustomCss from "TailWindComponent/CustomCss";
import BaiTapLayoutTailWindCss from "TailWindComponent/BaiTapLayoutTailWindCss";
import JoinDemo from "Lodash/JoinDemo";
import LastFirstLodash from "Lodash/LastFirstLodash";
import ChunkDemo from "Lodash/ChunkDemo";
import FillLodash from "Lodash/FillLodash";
import SortLodash from "Lodash/SortLodash";
import Include from "Lodash/Include";
import UniqLodash from "Lodash/UniqLodash";
import FlattenLodash from "Lodash/FlattenLodash";
import CompareObject from "Lodash/CompareObject";
import BaiTapTongHop from "BaiTapTongHop/BaiTapTongHop";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomeTemplate } from "templates/HomeTemplate/HomeTemplate";
import Home from "pages/Home/Home";
import Contact from "pages/Contact/Contact";
import News from "pages/News/News";
import Detail from "pages/Detail/Detail";
import Checkout from "pages/Checkout/Checkout";
import Login from "pages/Login/Login";
import { Suspense, lazy } from "react";
import UserTemplate from "templates/UserTemplate/UserTemplate";
import CheckoutTemplate from "./templates/CheckoutTemplate/CheckoutTemplate";
import Loading from "components/Loading/Loading";
import AdminTemplate from "templates/AdminTemplate/AdminTemplate";
import Films from "pages/Admin/Films/Films";
import AddNew from "pages/Admin/Films/AddNew/AddNew";
import Edit from "pages/Admin/Films/Edit/Edit";
import ScheduleCinema from "pages/Admin/ScheduleCinema/ScheduleCinema";

const CheckoutTemplateLazy = lazy(() =>
  import("./templates/CheckoutTemplate/CheckoutTemplate")
);

function App() {
  return (
    <Suspense fallback={<h1>LOADING ...</h1>}>
      <BrowserRouter>
        <Loading />
        <Routes>
          {/* <DemoGrid /> */}
          {/* <PaddingMarginDemo /> */}
          {/* <WidthHeightDemo /> */}
          {/* <FlexDemo /> */}
          {/* <TextBackgroundDemo /> */}
          {/* <ResponsiveDemo /> */}
          {/* <CustomCss /> */}
          {/* <BaiTapLayoutTailWindCss /> */}
          {/* <JoinDemo /> */}
          {/* <LastFirstLodash /> */}
          {/* <ChunkDemo /> */}
          {/* <FillLodash /> */}
          {/* <SortLodash /> */}
          {/* <Include /> */}
          {/* <UniqLodash /> */}
          {/* <FlattenLodash /> */}
          {/* <CompareObject /> */}
          {/* <BaiTapTongHop /> */}
          <Route path="/" exact element={<HomeTemplate />}>
            <Route path="/" exact element={<Home />} />
            <Route path="/contact" exact element={<Contact />} />
            <Route path="/news" exact element={<News />} />
            <Route path="/detail/:id" exact element={<Detail />} />
          </Route>

          <Route path="/checkout" exact element={<CheckoutTemplateLazy />}>
            <Route path="/checkout/:id" exact element={<Checkout />} />
          </Route>

          {/* <Route exact path="/checkout" element={<CheckoutTemplate />}>
            <Route path="/checkout/:id" exact element={<Checkout />} />
          </Route> */}

          <Route path="/" exact element={<UserTemplate />}>
            <Route path="/login" exact element={<Login />} />
          </Route>

          <Route path="/admin" exact element={<AdminTemplate />}>
            <Route path="/admin/films" exact element={<Films />} />
            <Route path="/admin/films/addnew" exact element={<AddNew />} />
            <Route path="/admin/films/edit/:id" exact element={<Edit />} />
            <Route
              path="/admin/films/schedule-cinema/:id"
              exact
              element={<ScheduleCinema />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
