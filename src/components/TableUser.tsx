import React from "react";
import { Table, Button, Popconfirm, message } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { deleteEmployee } from "@/store/slice/formSlice"; // import action deleteEmployee
import { RootState } from "@/store/store"; // import RootState เพื่อใช้ในการเลือกค่าจาก Redux store

const UserTable: React.FC = () => {
  const dispatch = useDispatch();
  const employees = useSelector((state: RootState) => state.form.user); // ดึงข้อมูลพนักงานจาก Redux store

  // ฟังก์ชันสำหรับการลบพนักงาน
  const handleDelete = (citizenId: string) => {
    // ลบพนักงานจาก Redux store โดยใช้ citizenId
    dispatch(deleteEmployee(citizenId)); // ส่ง citizenId ไปยัง action เพื่อทำการลบ
    message.success("Employee deleted successfully!"); // แสดงข้อความสำเร็จ
  };

  // กำหนดคอลัมน์ของตาราง
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text: string, record: any) => (
        <span>{record.firstname} {record.lastname}</span>
      ),
    },
    {
      title: "Gender",
      dataIndex: "gender",
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: "Nationality",
      dataIndex: "nationality",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: any) => (
        <span>
          <Button
            icon={<EditOutlined />}
            // ฟังก์ชันแก้ไขคุณสามารถเพิ่มได้ที่นี่
            style={{ marginRight: 8 }}
          />
          <Popconfirm
            title="Are you sure to delete this employee?"
            onConfirm={() => handleDelete(record.citizenId)} // ส่ง citizenId ไปในฟังก์ชันลบ
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
    key: index,
    firstname: employee.firstname,
    lastname: employee.lastname,
    gender: employee.gender,
    phone: employee.phone,
    nationality: employee.nationality,
    citizenId: employee.citizenId, // ใช้สำหรับลบ
  }));

  return (
    <Table
      columns={columns}
      dataSource={data}
      pagination={false}
    />
  );
};

export default UserTable;
