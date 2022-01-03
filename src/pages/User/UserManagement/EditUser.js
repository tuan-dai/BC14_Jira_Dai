import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Input } from "antd";
import { useFormik } from "formik";
import { editUser, searchUser } from "../../../redux/actions/User";
import { EditFilled } from "@ant-design/icons/lib/icons";

export default function EditUser(props) {
  const [componentSize, setComponentSize] = useState('default');
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  const id = props.match.params.id;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(searchUser(id));
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const userInfo = useSelector((state) => state.getListUser_Reducer.userInfo);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: userInfo?.userId,
      name: userInfo?.name,
      phoneNumber: userInfo?.phoneNumber,
      email: userInfo?.email,
      passWord: "",
    },
    onSubmit: (values) => dispatch(editUser(values, props.history)),
  });

  const { handleChange, handleSubmit, values } = formik;

  const layout = {
    labelCol: {
      xs: { span: 24 }, sm: { span: 14 }, md: { span: 8 }, lg: { span: 8 }
    },
    wrapperCol: {
      xs: { span: 24 }, sm: { span: 14 }, md: { span: 8 }, lg: { span: 8 }
    },
  };
  return (
    <div className="edit-user p-5 w-full">
      <div className="flex items-center gap-3 mb-4">
        <EditFilled className="text-xl" />
        <span className="text-3xl font-medium">Edit User</span>
      </div>
      <div className="form__edituser md:-ml-48">
        <Form
          {...layout}
          onSubmitCapture={handleSubmit}
          initialValues={{ size: componentSize }}
          onValuesChange={onFormLayoutChange}
          size={componentSize}>
          <Form.Item label="Name">
            <Input name="name" value={values.name} onChange={handleChange} />
          </Form.Item>
          <Form.Item label="Id">
            <Input
              name="id"
              disabled={true}
              value={values.id}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item label="Phone number">
            <Input
              name="phoneNumber"
              value={values.phoneNumber}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item label="Email">
            <Input name="email" value={values.email} onChange={handleChange} />
          </Form.Item>

          <Form.Item label="Password">
            <Input.Password
              name="passWord"
              value={values.passWord}
              onChange={handleChange}
            />
          </Form.Item>

          <Form.Item label='Action:'>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
