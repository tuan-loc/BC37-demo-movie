import React, { useEffect } from "react";
import { DatePicker, Form, Input, InputNumber, Radio, Switch } from "antd";
import { useState } from "react";
import TextArea from "antd/es/input/TextArea";
import { useFormik } from "formik";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import {
  capNhatPhimUploadAction,
  layThongTinPhimAction,
} from "redux/actions/CarouselActions";
import { useParams } from "react-router-dom";

const Edit = () => {
  const [componentSize, setComponentSize] = useState("default");
  const [imgSrc, setImgSrc] = useState("");
  const dispatch = useDispatch();
  const { id } = useParams();
  const { thongTinPhim } = useSelector((state) => state.CarouselReducer);

  useEffect(() => {
    dispatch(layThongTinPhimAction(id));
  }, []);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      maPhim: thongTinPhim.maPhim,
      tenPhim: thongTinPhim.tenPhim,
      trailer: thongTinPhim.trailer,
      moTa: thongTinPhim.moTa,
      ngayKhoiChieu: thongTinPhim.ngayKhoiChieu,
      dangChieu: thongTinPhim.dangChieu,
      sapChieu: thongTinPhim.sapChieu,
      hot: thongTinPhim.hot,
      danhGia: thongTinPhim.danhGia,
      hinhAnh: null,
    },
    onSubmit: (values) => {
      // Tạo đối tượng formData => Đưa giá trị values từ formik vào formData
      values.maNhom = "GP04";
      let formData = new FormData();
      for (let key in values) {
        if (key !== "hinhAnh") {
          formData.append(key, values[key]);
        } else {
          if (values.hinhAnh !== null) {
            formData.append("File", values.hinhAnh, values.hinhAnh.name);
          }
        }
      }

      // formData.append("File", formik.hinhAnh, formik.hinhAnh.name);
      // console.log("formData", formData.get("hinhAnh"));

      // Gọi api gửi các giá trị formdata về backend xử lý
      dispatch(capNhatPhimUploadAction(formData));
    },
  });

  const handleChangeDatePicker = (value) => {
    let ngayKhoiChieu = moment(value);
    formik.setFieldValue("ngayKhoiChieu", ngayKhoiChieu);
  };

  const handleChangeSwitch = (name) => {
    return (value) => {
      formik.setFieldValue(name, value);
    };
  };

  const handleChangeInputNumber = (name) => {
    return (value) => {
      formik.setFieldValue(name, value);
    };
  };

  const handleChangeFile = async (e) => {
    // lấy file ra từ e
    let file = e.target.files[0];

    if (
      file.type === "image/jpeg" ||
      file.type === "image/gif" ||
      file.type === "image/jpg" ||
      file.type === "image/gif"
    ) {
      // Đem dữ liệu file lưu vào formik
      await formik.setFieldValue("hinhAnh", file);

      // Tạo đối tượng để đọc file
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        setImgSrc(e.target.result);
      };
    }
  };

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  return (
    <Form
      onSubmitCapture={formik.handleSubmit}
      labelCol={{
        span: 4,
      }}
      wrapperCol={{
        span: 14,
      }}
      layout="horizontal"
      initialValues={{
        size: componentSize,
      }}
      onValuesChange={onFormLayoutChange}
      size={componentSize}
      style={{
        maxWidth: 600,
      }}
    >
      <h3>Thêm mới phim</h3>
      <Form.Item label="Form Size" name="size">
        <Radio.Group>
          <Radio.Button value="small">Small</Radio.Button>
          <Radio.Button value="default">Default</Radio.Button>
          <Radio.Button value="large">Large</Radio.Button>
        </Radio.Group>
      </Form.Item>
      <Form.Item label="Tên phim">
        <Input
          name="tenPhim"
          onChange={formik.handleChange}
          value={formik.values.tenPhim}
        />
      </Form.Item>
      <Form.Item label="Trailer">
        <Input
          name="trailer"
          onChange={formik.handleChange}
          value={formik.values.trailer}
        />
      </Form.Item>
      <Form.Item label="Mô tả">
        <TextArea
          rows={4}
          name="moTa"
          onChange={formik.handleChange}
          value={formik.values.moTa}
        />
      </Form.Item>
      <Form.Item label="Ngày khởi chiếu">
        <DatePicker
          format="DD/MM/YYYY"
          onChange={handleChangeDatePicker}
          value={moment(formik.values.ngayKhoiChieu, "DD/MM/YYYY")}
        />
      </Form.Item>
      <Form.Item label="Đang chiếu" valuePropName="checked">
        <Switch
          name="dangChieu"
          onChange={handleChangeSwitch("dangChieu")}
          checked={formik.values.dangChieu}
        />
      </Form.Item>
      <Form.Item label="Sắp chiếu" valuePropName="checked">
        <Switch
          name="sapChieu"
          onChange={handleChangeSwitch("sapChieu")}
          checked={formik.values.sapChieu}
        />
      </Form.Item>
      <Form.Item label="Hot" valuePropName="checked">
        <Switch
          name="hot"
          onChange={handleChangeSwitch("hot")}
          checked={formik.values.hot}
        />
      </Form.Item>
      <Form.Item label="Số sao">
        <InputNumber
          onChange={handleChangeInputNumber("danhGia")}
          min={1}
          max={10}
          value={formik.values.danhGia}
        />
      </Form.Item>
      <Form.Item label="Hình ảnh">
        <input
          type="file"
          onChange={handleChangeFile}
          accept="image/png, image/jpeg, image/gif"
        />
        <img
          style={{ width: 150, height: 150, marginTop: 15 }}
          src={imgSrc === "" ? thongTinPhim.hinhAnh : imgSrc}
          alt="..."
        />
      </Form.Item>
      <Form.Item label="Tác vụ">
        <button
          type="submit"
          className="p-2 rounded border-none cursor-pointer bg-blue-900 text-white"
        >
          Cập nhật
        </button>
      </Form.Item>
    </Form>
  );
};

export default Edit;
