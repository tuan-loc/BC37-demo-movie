import React, { useState } from "react";
import { Button, DatePicker, Form, InputNumber, Select } from "antd";
import { useEffect } from "react";
import requester from "app/api";
import { apiPath } from "app/apiPath";
import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import moment from "moment";
import { useDispatch } from "react-redux";
import { taoLichChieuAction } from "redux/actions/CarouselActions";

const ScheduleCinema = () => {
  const [state, setState] = useState({
    heThongRapChieu: [],
    cumRapChieu: [],
  });
  const params = useParams();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      maPhim: params.id,
      ngayChieuGioChieu: "",
      maRap: "",
      giaVe: "",
    },
    onSubmit: async (values) => {
      dispatch(taoLichChieuAction(values));
    },
  });

  useEffect(async () => {
    try {
      const res = await requester({
        method: "GET",
        url: apiPath.LAY_HE_THONG_RAP,
      });

      setState({ ...state, heThongRapChieu: res.data.content });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleChangeHeThongRap = async (value, option) => {
    try {
      const res = await requester({
        method: "GET",
        url: apiPath.LAY_CUM_RAP,
        params: { maHeThongRap: value },
      });

      setState({ ...state, cumRapChieu: res.data.content });
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeCumRap = (value) => {
    formik.setFieldValue("maRap", value);
  };

  const onOk = (value) => {
    formik.setFieldValue(
      "ngayChieuGioChieu",
      moment(value).format("DD/MM/YYYY hh:mm:ss")
    );
  };

  const onChangeDate = (value) => {
    formik.setFieldValue(
      "ngayChieuGioChieu",
      moment(value).format("DD/MM/YYYY hh:mm:ss")
    );
  };

  const onChangeInputNumber = (value) => {
    formik.setFieldValue("giaVe", value);
  };

  return (
    <Form
      labelCol={{ span: 3 }}
      wrapperCol={{ span: 12 }}
      onSubmitCapture={formik.handleSubmit}
    >
      <h3 className="text-2xl mb-4">T???o l???ch chi???u</h3>
      <Form.Item label="H??? th???ng r???p">
        <Select
          options={state.heThongRapChieu?.map((htr, index) => {
            return { label: htr.tenHeThongRap, value: htr.maHeThongRap };
          })}
          onChange={handleChangeHeThongRap}
          placeholder="Ch???n h??? th???ng r???p"
        />
      </Form.Item>
      <Form.Item label="C???m r???p">
        <Select
          options={state.cumRapChieu?.map((cumRap, index) => {
            return { label: cumRap.tenCumRap, value: cumRap.maCumRap };
          })}
          onChange={handleChangeCumRap}
          placeholder="Ch???n c???m r???p"
        />
      </Form.Item>
      <Form.Item label="Ng??y chi???u gi??? chi???u">
        <DatePicker
          format="DD/MM/YYYY hh:mm:ss"
          onChange={onChangeDate}
          showTime
          onOk={onOk}
        />
      </Form.Item>
      <Form.Item label="Gi?? v??">
        <InputNumber min={75000} max={150000} onChange={onChangeInputNumber} />
      </Form.Item>
      <Form.Item label="Ch???c n??ng">
        <Button htmlType="submit">T???o l???ch chi???u</Button>
      </Form.Item>
    </Form>
  );
};

export default ScheduleCinema;
