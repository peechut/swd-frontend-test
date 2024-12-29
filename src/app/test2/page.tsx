"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Input, Button, Row, Col, Select, DatePicker, Radio } from "antd";
import { addEmployee } from "@/store/slice/formSlice"; // import action จาก formSlice
import { RootState } from "@/store/store"; // import RootState เพื่อใช้ในการเลือกค่าจาก Redux store
import dayjs from "dayjs"; // ใช้ dayjs สำหรับการแปลงวันที่
import { v4 as uuidv4 } from 'uuid';
import UserTable from "@/components/TableUser";
const FormPage: React.FC = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const formState = useSelector((state: RootState) => state.form); // รับค่าจาก state ใน Redux

  const handleSubmit = (values: any) => {
    const newEmployee = {
      id: uuidv4(), // สร้าง unique ID ด้วย uuid
      title: values.title,
      firstname: values.firstname,
      lastname: values.lastname,
      birthday: values.birthday ? values.birthday.format("YYYY-MM-DD") : "",
      nationality: values.nationality,
      citizenId: values.citizen_id,
      gender: values.gender,
      phone: values.phone,
      passportNo: values.passport,
      salary: values.salary,
    };

    dispatch(addEmployee(newEmployee)); // เรียกใช้ action เพื่อเพิ่มพนักงาน
    form.resetFields(); // รีเซ็ตฟอร์มหลังจากการส่งข้อมูล
  };

  const handleReset = () => {
    form.resetFields();
  };

  const { Option } = Select;

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 120 }} defaultValue="66">
        <Option value="66">+66</Option>
      </Select>
    </Form.Item>
  );

  return (
    <>
      <Form form={form} onFinish={handleSubmit}>
        <Row>
          <Col span={4}>
            <Form.Item
              label="Title"
              name="title"
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 18 }}
              rules={[{ required: true, message: "Please select a title!" }]}
            >
              <Select
                defaultValue={formState.title}
                onChange={(value) => form.setFieldsValue({ title: value })}
              >
                <Select.Option value="Mr.">Mr.</Select.Option>
                <Select.Option value="Ms.">Ms.</Select.Option>
                <Select.Option value="Mrs.">Mrs.</Select.Option>
              </Select>
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              label="Firstname"
              name="firstname"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              rules={[
                { required: true, message: "Please input your firstname!" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              label="Lastname"
              name="lastname"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              rules={[
                { required: true, message: "Please input your lastname!" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={12}>
            <Form.Item
              label="Birthday"
              name="birthday"
              rules={[
                { required: true, message: "Please select your birthday!" },
              ]}
            >
              <DatePicker
                style={{ width: "100%" }}
                value={formState.birthday ? dayjs(formState.birthday) : null}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Nationality"
              name="nationality"
              rules={[
                { required: true, message: "Please select your nationality!" },
              ]}
            >
              <Select
                value={formState.nationality}
                onChange={(value) =>
                  form.setFieldsValue({ nationality: value })
                }
              >
                <Select.Option value="Thai">Thai</Select.Option>
                <Select.Option value="American">American</Select.Option>
                <Select.Option value="Other">Other</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Form.Item label="Citizen ID" name="citizen_id">
          <Input />
        </Form.Item>

        <Form.Item
          label="Gender"
          name="gender"
          initialValue="Male" // กำหนดค่าเริ่มต้นเป็น "Male"
        >
          <Radio.Group
            value={form.getFieldValue("gender")}
            onChange={(e) => form.setFieldsValue({ gender: e.target.value })}
          >
            <Radio value="Male">Male</Radio>
            <Radio value="Female">Female</Radio>
            <Radio value="Unisex">Unisex</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          name="phone"
          label="mobile phone"
          rules={[
            { required: true, message: "Please input your phone number!" },
          ]}
        >
          <Input addonBefore={prefixSelector} style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item label="Passport No." name="passport">
          <Input />
        </Form.Item>

        <Form.Item
          label="Expected Salary"
          name="salary"
          rules={[
            { required: true, message: "Please input your expected Salary!" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item>
          <Button type="default" onClick={handleReset}>
            Reset
          </Button>
          <Button
            type="primary"
            style={{ marginLeft: "10px" }}
            htmlType="submit"
          >
            Submit
          </Button>
        </Form.Item>
      </Form>

      {/* Display saved employees */}
      <UserTable />
    </>
  );
};

export default FormPage;
