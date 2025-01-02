"use client";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Form, Input, Button, Row, Col, Select, DatePicker, Radio } from "antd";
import { addEmployee, editEmployee, Employee } from "@/store/slice/formSlice"; // import action จาก formSlice

import dayjs from "dayjs"; // ใช้ dayjs สำหรับการแปลงวันที่
import { v4 as uuidv4 } from "uuid";
import UserTable from "@/components/TableUser";
import { useTranslation } from "react-i18next";
import { ChangeEvent, RefObject } from "react";
type CitizenId = {
  part1: string;
  part2: string;
  part3: string;
  part4: string;
  part5: string;
};

type FormValues = {
  id?: string;
  title: string;
  firstname: string;
  lastname: string;
  birthday: dayjs.Dayjs | null;
  nationality: string;
  citizenId: CitizenId;
  gender: string;
  phone: string;
  passport: string;
  salary: string;
  prefix: string;
};
const FormPage: React.FC = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { t } = useTranslation(); // ใช้สำหรับแปลข้อความ

  

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    index: number,
    nextInputRef: RefObject<HTMLInputElement>
  ) => {
    const value = e.target.value;
    if (value.length === e.target.maxLength && nextInputRef.current) {
      nextInputRef.current.focus(); // ไปยัง input ถัดไปเมื่อกรอกข้อมูลครบ
    }
  };

  useEffect(() => {
    // กำหนดค่าเริ่มต้นสำหรับ prefix
    form.setFieldsValue({ prefix: "+66" });
  }, [form]);

  const part2Ref = React.useRef(null);
  const part3Ref = React.useRef(null);
  const part4Ref = React.useRef(null);
  const part5Ref = React.useRef(null);

  const handleEdit = (employee: Employee) => {
    // แยก citizenId เป็นส่วนๆ
    const citizenIdParts = [
      employee.citizenId.substring(0, 1), // part1
      employee.citizenId.substring(1, 5), // part2
      employee.citizenId.substring(5, 10), // part3
      employee.citizenId.substring(10, 12), // part4
      employee.citizenId.substring(12, 13), // part5
    ];
    console.log("employee: ", employee);
    form.setFieldsValue({
      ...employee,
      id: employee.id,
      birthday: employee.birthday ? dayjs(employee.birthday) : null, // แปลงวันที่
      citizenId: {
        part1: citizenIdParts[0],
        part2: citizenIdParts[1],
        part3: citizenIdParts[2],
        part4: citizenIdParts[3],
        part5: citizenIdParts[4],
      },
    });
  };

  const handleSubmit = (values: FormValues) => {
    console.log(values);
    const citizenId = [
      values.citizenId?.part1 || "",
      values.citizenId?.part2 || "",
      values.citizenId?.part3 || "",
      values.citizenId?.part4 || "",
      values.citizenId?.part5 || "",
    ].join("");

    const phoneNumber = `${values.prefix}${values.phone}`;

    const employeeData = {
      id: values.id || uuidv4(), // ใช้ ID เดิมถ้ามี (สำหรับการแก้ไข)
      title: values.title,
      firstname: values.firstname,
      lastname: values.lastname,
      birthday: values.birthday ? values.birthday.format("YYYY-MM-DD") : "",
      nationality: values.nationality,
      citizenId,
      gender: values.gender,
      phone: phoneNumber,
      passport: values.passport,
      salary: values.salary,
    };

    if (values.id) {
      console.log("pass");
      dispatch(editEmployee(employeeData)); // แก้ไขข้อมูล
    } else {
      console.log("fail");
      dispatch(addEmployee(employeeData)); // เพิ่มข้อมูลใหม่
    }

    form.resetFields(); // รีเซ็ตฟอร์มหลังการส่งข้อมูล
  };

  const handleReset = () => {
    form.resetFields();
  };

  const { Option } = Select;

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{ width: 120 }}
        value={form.getFieldValue("prefix")} // ใช้ค่าปัจจุบันจาก form
      >
        <Option value="+66">+66</Option>
        <Option value="+44">+44</Option>
      </Select>
    </Form.Item>
  );

  return (
    <>
      <Form form={form} onFinish={handleSubmit}>
        <Form.Item
          label="ID"
          name="id"
          style={{ display: "none" }}
        >
          <Input type="hidden" />
        </Form.Item>

        <Row>
          <Col span={6}>
            <Form.Item
              label={t("title")}
              name="title"
              labelCol={{ span: 10 }}
              wrapperCol={{ span: 18 }}
              rules={[{ required: true, message: t("pleaseSelectTitle") }]}
            >
              <Select
                onChange={(value) => form.setFieldsValue({ title: value })}
                placeholder={t("title")}
              >
                <Select.Option value="Mr.">{t("mr")}</Select.Option>
                <Select.Option value="Ms.">{t("ms")}</Select.Option>
                <Select.Option value="Mrs.">{t("mrs")}</Select.Option>
              </Select>
            </Form.Item>
          </Col>

          <Col span={9}>
            <Form.Item
              label={t("firstname")}
              name="firstname"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              rules={[{ required: true, message: t("pleaseInputFirstname") }]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col span={9}>
            <Form.Item
              label={t("lastname")}
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
              label={t("birthday")}
              name="birthday"
              rules={[
                { required: true, message: "Please select your birthday!" },
              ]}
            >
              <DatePicker style={{ width: "100%" }} placeholder={t("YYMMDD")} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label={t("nationality")}
              name="nationality"
              rules={[
                { required: true, message: "Please select your nationality!" },
              ]}
            >
              <Select
                placeholder={t("placeholderNationality")}
                onChange={(value) =>
                  form.setFieldsValue({ nationality: value })
                }
              >
                <Select.Option value="Thai">{t("Thai")}</Select.Option>
                <Select.Option value="American">{t("American")}</Select.Option>
                <Select.Option value="Other">{t("Other")}</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Form.Item label="Citizen ID" required>
          <Input.Group compact>
            <Form.Item
              name={["citizenId", "part1"]}
              rules={[
                {
                  pattern: /^\d+$/,
                },
              ]}
              noStyle
            >
              <Input
                id="citizen-part1"
                maxLength={1}
                style={{
                  width: "10%",
                  textAlign: "center",
                  marginRight: "5px",
                }}
                onChange={(e) => handleInputChange(e, 1, part2Ref)}
              />
            </Form.Item>
            <span style={{ padding: "0 5px", fontSize: "18px", color: "#000" }}>
              -
            </span>
            <Form.Item
              name={["citizenId", "part2"]}
              rules={[
                {
                  pattern: /^\d+$/,
                },
              ]}
              noStyle
            >
              <Input
                id="citizen-part2"
                maxLength={4}
                style={{
                  width: "20%",
                  textAlign: "center",
                  marginRight: "5px",
                }}
                ref={part2Ref}
                onChange={(e) => handleInputChange(e, 2, part3Ref)}
              />
            </Form.Item>
            <span style={{ padding: "0 5px", fontSize: "18px", color: "#000" }}>
              -
            </span>
            <Form.Item
              name={["citizenId", "part3"]}
              rules={[
                {
                  pattern: /^\d+$/,
                },
              ]}
              noStyle
            >
              <Input
                id="citizen-part3"
                maxLength={5}
                style={{
                  width: "25%",
                  textAlign: "center",
                  marginRight: "5px",
                }}
                ref={part3Ref}
                onChange={(e) => handleInputChange(e, 3, part4Ref)}
              />
            </Form.Item>
            <span style={{ padding: "0 5px", fontSize: "18px", color: "#000" }}>
              -
            </span>
            <Form.Item
              name={["citizenId", "part4"]}
              rules={[
                {
                  pattern: /^\d+$/,
                },
              ]}
              noStyle
            >
              <Input
                id="citizen-part4"
                maxLength={2}
                style={{
                  width: "15%",
                  textAlign: "center",
                  marginRight: "5px",
                }}
                ref={part4Ref}
                onChange={(e) => handleInputChange(e, 4, part5Ref)}
              />
            </Form.Item>
            <span style={{ padding: "0 5px", fontSize: "18px", color: "#000" }}>
              -
            </span>
            <Form.Item
              name={["citizenId", "part5"]}
              rules={[
                {
                  pattern: /^\d+$/,
                },
              ]}
              noStyle
            >
              <Input
                id="citizen-part5"
                maxLength={1}
                style={{ width: "10%", textAlign: "center" }}
                ref={part5Ref}
              />
            </Form.Item>
          </Input.Group>
        </Form.Item>

        <Form.Item
          label={t("gender")}
          name="gender"
          initialValue="Male" // กำหนดค่าเริ่มต้นเป็น "Male"
        >
          <Radio.Group
            value={form.getFieldValue("gender")}
            onChange={(e) => form.setFieldsValue({ gender: e.target.value })}
          >
            <Radio value="Male">{t("Male")}</Radio>
            <Radio value="Female">{t("Female")}</Radio>
            <Radio value="Unisex">{t("Unsex")}</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          name="phone"
          label={t("phone")}
          rules={[
            { required: true, message: "Please input your phone number!" },
          ]}
        >
          <Input addonBefore={prefixSelector} style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          wrapperCol={{ span: 18 }}
          label={t("passport")}
          name="passport"
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={t("salary")}
          name="salary"
          rules={[
            { required: true, message: "Please input your expected Salary!" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item>
          <Row justify="end">
            <Col>
              <Button type="default" onClick={handleReset}>
                {t("resetButton")}
              </Button>
            </Col>
            <Col>
              <Button
                type="primary"
                style={{ marginLeft: "10px" }}
                htmlType="submit"
              >
                {t("submitButton")}
              </Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>

      {/* Display saved employees */}
      <UserTable onEdit={handleEdit} />
    </>
  );
};

export default FormPage;
