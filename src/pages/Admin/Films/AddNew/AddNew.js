import React from "react";
import { DatePicker, Form, Input, InputNumber, Radio, Switch } from "antd";
import { useState } from "react";
import TextArea from "antd/es/input/TextArea";
import { useFormik } from "formik";
import moment from "moment";
import { useDispatch } from "react-redux";
import { themPhimUploadHinhAction } from "redux/actions/CarouselActions";

const AddNew = () => {
  const [componentSize, setComponentSize] = useState("default");
  const [imgSrc, setImgSrc] = useState("");
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      tenPhim: "",
      trailer: "",
      moTa: "",
      ngayKhoiChieu: "",
      dangChieu: false,
      sapChieu: false,
      hot: false,
      danhGia: 0,
      hinhAnh: {},
    },
    onSubmit: (values) => {
      // Tạo đối tượng formData => Đưa giá trị values từ formik vào formData
      values.maNhom = "GP04";
      let formData = new FormData();
      for (let key in values) {
        if (key !== "hinhAnh") {
          formData.append(key, values[key]);
        } else {
          formData.append("File", values.hinhAnh, values.hinhAnh.name);
        }
      }

      // formData.append("File", formik.hinhAnh, formik.hinhAnh.name);
      // console.log("formData", formData.get("hinhAnh"));

      // Gọi api gửi các giá trị formdata về backend xử lý
      dispatch(themPhimUploadHinhAction(formData));
    },
  });

  const handleChangeDatePicker = (value) => {
    let ngayKhoiChieu = moment(value).format("DD/MM/YYYY");
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

  const handleChangeFile = (e) => {
    // lấy file ra từ e
    let file = e.target.files[0];

    if (
      file.type === "image/jpeg" ||
      file.type === "image/gif" ||
      file.type === "image/jpg" ||
      file.type === "image/gif"
    ) {
      // Tạo đối tượng để đọc file
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        setImgSrc(e.target.result);
      };

      // Đem dữ liệu file lưu vào formik
      formik.setFieldValue("hinhAnh", file);
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
        <Input name="tenPhim" onChange={formik.handleChange} />
      </Form.Item>
      <Form.Item label="Trailer">
        <Input name="trailer" onChange={formik.handleChange} />
      </Form.Item>
      <Form.Item label="Mô tả">
        <TextArea rows={4} name="moTa" onChange={formik.handleChange} />
      </Form.Item>
      <Form.Item label="Ngày khởi chiếu">
        <DatePicker format={"DD/MM/YYYY"} onChange={handleChangeDatePicker} />
      </Form.Item>
      <Form.Item label="Đang chiếu" valuePropName="checked">
        <Switch name="dangChieu" onChange={handleChangeSwitch("dangChieu")} />
      </Form.Item>
      <Form.Item label="Sắp chiếu" valuePropName="checked">
        <Switch name="sapChieu" onChange={handleChangeSwitch("sapChieu")} />
      </Form.Item>
      <Form.Item label="Hot" valuePropName="checked">
        <Switch name="hot" onChange={handleChangeSwitch("hot")} />
      </Form.Item>
      <Form.Item label="Số sao">
        <InputNumber
          onChange={handleChangeInputNumber("danhGia")}
          min={1}
          max={10}
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
          src={imgSrc}
          alt="..."
        />
      </Form.Item>
      <Form.Item label="Tác vụ">
        <button
          type="submit"
          className="p-2 rounded border-none cursor-pointer bg-blue-900 text-white"
        >
          Thêm phim
        </button>
      </Form.Item>
    </Form>
  );
};

export default AddNew;
