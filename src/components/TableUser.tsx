import React from "react";
import { Table, Button, Popconfirm, message } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { deleteEmployee } from "@/store/slice/formSlice"; // import action deleteEmployee
import { RootState } from "@/store/store"; // import RootState เพื่อใช้ในการเลือกค่าจาก Redux store
import { useTranslation } from "react-i18next"; // Import the hook for i18n
const UserTable: React.FC<{ onEdit: (employee: any) => void }> = ({
  onEdit,
}) => {
  const dispatch = useDispatch();
  const { t } = useTranslation(); // Use the translation hook
  const employees = useSelector((state: RootState) => state.form.user); // ดึงข้อมูลพนักงานจาก Redux store
  console.log(employees);

  // ฟังก์ชันสำหรับการลบพนักงาน
  const handleDelete = (id: string) => {
    console.log(id);
    // ลบพนักงานจาก Redux store โดยใช้ uuid
    dispatch(deleteEmployee(id)); // ส่ง citizenId ไปยัง action เพื่อทำการลบ
    message.success("Employee deleted successfully!"); // แสดงข้อความสำเร็จ
  };

  // กำหนดคอลัมน์ของตาราง
  const columns = [
    {
      title: t("name"),
      dataIndex: "name",
      render: (text: string, record: any) => (
        <span>
          {record.firstname} {record.lastname}
        </span>
      ),
    },
    {
      title: t("gender"),
      dataIndex: "gender",
      render: (gender: string) => {
        // แสดงผลค่าของ gender เช่น "male", "female", "unsex" โดยแปลเป็นภาษา
        console.log(gender)
        return t(gender); // "male" => "ผู้ชาย", "female" => "ผู้หญิง", "unsex" => "ไม่ระบุ"
      },
    },
    {
      title: t("phone"),
      dataIndex: "phone",
    },
    {
      title: t("nationality"),
      dataIndex: "nationality",
      render: (nationality: string) => {
        console.log('nationality: ', nationality)
        // แสดงผลค่าของ gender เช่น "male", "female", "unsex" โดยแปลเป็นภาษา
        return t(nationality); // "male" => "ผู้ชาย", "female" => "ผู้หญิง", "unsex" => "ไม่ระบุ"
      },
    },
    {
      title: t("manages"),
      key: "manage",
      render: (_: any, record: any) => (
        <span>
          <Button
            icon={<EditOutlined />}
            // ฟังก์ชันแก้ไขคุณสามารถเพิ่มได้ที่นี่
            style={{ marginRight: 8 }}
            onClick={() => onEdit(record)} // ส่งข้อมูลไปที่ฟังก์ชัน handleEdit
          />
          <Popconfirm
            title="Are you sure to delete this employee?"
            onConfirm={() => handleDelete(record.id)} // ส่ง citizenId ไปในฟังก์ชันลบ
            okText="Yes"
            cancelText="No"
          >
            <Button icon={<DeleteOutlined />} danger />
          </Popconfirm>
        </span>
      ),
    },
  ];

  // แปลงข้อมูลพนักงานให้เป็นข้อมูลที่ใช้ในตาราง
  const data = employees.map((employee, index) => ({
    id: employee.id,
    title: employee.title,
    firstname: employee.firstname,
    lastname: employee.lastname,
    birthday: employee.birthday,
    gender: employee.gender,
    phone: employee.phone,
    nationality: employee.nationality,
    citizenId: employee.citizenId, // ใช้สำหรับลบ
    salary: employee.salary,
    passport: employee.passportNo, // ใช้สำหรับแก้ไข
  }));

  return (
    <Table
      columns={columns}
      dataSource={data}
      pagination={{
        pageSize: 5, // จำกัดข้อมูล 5 รายการต่อหน้า
        showQuickJumper: true, // แสดงตัวเลือกไปยังหน้าที่ต้องการ
        showSizeChanger: false, // ปิดการปรับจำนวนข้อมูลต่อหน้า
      }}
      rowKey="id" // ใช้ `id` เป็นคีย์ของแต่ละแถว
    />
  );
};

export default UserTable;
