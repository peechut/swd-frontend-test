"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Input, Button, Row, Col, Select, DatePicker, Radio } from "antd";
import { addEmployee, editEmployee } from "@/store/slice/formSlice"; // import action จาก formSlice
import { RootState } from "@/store/store"; // import RootState เพื่อใช้ในการเลือกค่าจาก Redux store
import dayjs from "dayjs"; // ใช้ dayjs สำหรับการแปลงวันที่
import { v4 as uuidv4 } from "uuid";
import UserTable from "@/components/TableUser";
import { useTranslation } from "react-i18next";

const FormPage: React.FC = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const formState = useSelector((state: RootState) => state.form); // รับค่าจาก state ใน Redux\
  const { t } = useTranslation(); // ใช้สำหรับแปลข้อความ

  const handleEdit = (employee: any) => {
    form.setFieldsValue({
      ...employee,
      birthday: employee.birthday ? dayjs(employee.birthday) : null, // แปลงวันที่
    });
  };

  const handleSubmit = (values: any) => {
    const newEmployee = {
      id: uuidv4(), // สร้าง unique ID ด้วย uuid
      title: values.title,
      firstname: values.firstname,
      lastname: values.lastname,
      birthday: values.birthday ? values.birthday.format("YYYY-MM-DD") : "",
      nationality: values.nationality,
      citizenId: values.citizenId,
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
              label={t("title")}
              name="title"
              labelCol={{ span: 10 }}
              wrapperCol={{ span: 18 }}
              rules={[{ required: true, message: t("pleaseSelectTitle") }]}
            >
              <Select
                defaultValue={formState.title}
                onChange={(value) => form.setFieldsValue({ title: value })}
                placeholder={t("title")}
              >
                <Select.Option value="Mr.">{t("mr")}</Select.Option>
                <Select.Option value="Ms.">{t("ms")}</Select.Option>
                <Select.Option value="Mrs.">{t("mrs")}</Select.Option>
              </Select>
            </Form.Item>
          </Col>

          <Col span={8}>
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

          <Col span={8}>
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
              <DatePicker
                style={{ width: "100%" }}
                placeholder={t("YYMMDD")}
                value={formState.birthday ? dayjs(formState.birthday) : null}
              />
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
                placeholder={"-- Please select --"}
                value={formState.nationality}
                onChange={(value) =>
                  form.setFieldsValue({ nationality: value })
                }
              >
                <Select.Option value="Thai">{t("thai")}</Select.Option>
                <Select.Option value="American">{t("usa")}</Select.Option>
                <Select.Option value="Other">{t("orther")}</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Form.Item label={t("citizenId")} required>
          <Input.Group compact>
            {Array.from({ length: 5 }).map((_, index) => (
              <Form.Item
                key={index}
                name={["citizenId", `part${index + 1}`]}
                rules={[
                  {
                    required: true, // ต้องกรอกข้อมูล
                  },
                  {
                    pattern: /^\d+$/, // ใช้ pattern นี้เพื่อให้กรอกได้เฉพาะตัวเลข
                  },
                ]}
                noStyle
              >
                <Input
                  id={`citizen-part${index + 1}`}
                  maxLength={
                    index === 0
                      ? 1
                      : index === 1
                      ? 4
                      : index === 2
                      ? 5
                      : index === 3
                      ? 2
                      : 1
                  }
                  style={{
                    width:
                      index === 0
                        ? "10%"
                        : index === 1
                        ? "20%"
                        : index === 2
                        ? "25%"
                        : index === 3
                        ? "15%"
                        : "10%",
                    textAlign: "center",
                    margin: index > 0 ? "0 5px" : "0",
                    borderRadius: "4px",
                    border: "1px solid", // ใส่กรอบ
                    borderColor: "transparent", // กรอบปกติเป็นสีโปร่งใส
                  }}
                  onChange={(e) => {
                    const length =
                      index === 0
                        ? 1
                        : index === 1
                        ? 4
                        : index === 2
                        ? 5
                        : index === 3
                        ? 2
                        : 1;

                    if (e.target.value.length === length) {
                      const nextInput = document.getElementById(
                        `citizen-part${index + 2}`
                      );
                      if (nextInput) nextInput.focus();
                    }
                  }}
                  onKeyDown={(e) => {
                    // ป้องกันการพิมพ์ที่ไม่ใช่ตัวเลข
                    if (!/\d/.test(e.key) && e.key !== "Backspace") {
                      e.preventDefault();
                    }

                    // การลบข้อมูล (Backspace)
                    if (e.key === "Backspace" && e.target.value === "") {
                      const prevInput = document.getElementById(
                        `citizen-part${index}`
                      );
                      if (prevInput) {
                        prevInput.focus();
                        prevInput.select();
                      }
                    }
                  }}
                />
                {index < 4 && (
                  <span
                    style={{
                      padding: "0 5px",
                      fontSize: "18px",
                      color: "#000",
                    }}
                  >
                    -
                  </span>
                )}
              </Form.Item>
            ))}
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
            <Radio value="Male">{t("male")}</Radio>
            <Radio value="Female">{t("female")}</Radio>
            <Radio value="Unisex">{t("unsex")}</Radio>
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
          <Button type="default" onClick={handleReset}>
            {t("resetButton")}
          </Button>
          <Button
            type="primary"
            style={{ marginLeft: "10px" }}
            htmlType="submit"
          >
            {t("submitButton")}
          </Button>
        </Form.Item>
      </Form>

      {/* Display saved employees */}
      <UserTable onEdit={handleEdit} />
    </>
  );
};

export default FormPage;
