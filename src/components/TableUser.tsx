import React from "react";
import { Table, Button, message } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteEmployee,
  deleteMultipleEmployees,
  Employee,
  setSelectedRowKeys,
} from "@/store/slice/formSlice"; // import action deleteEmployee
import { RootState } from "@/store/store"; // import RootState เพื่อใช้ในการเลือกค่าจาก Redux store
import { useTranslation } from "react-i18next"; // Import the hook for i18n

interface UserTableProps {
  onEdit: (employee: Employee) => void;
}

const UserTable: React.FC<UserTableProps> = ({ onEdit }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation(); // Use the translation hook
  const employees = useSelector((state: RootState) => state.form.user); // ดึงข้อมูลพนักงานจาก Redux store
  const selectedRowKeys = useSelector(
    (state: RootState) => state.form.selectedRowKeys
  );

  // ฟังก์ชันสำหรับการลบพนักงาน
  const handleDelete = (id: string) => {
    // ลบพนักงานจาก Redux store โดยใช้ uuid
    dispatch(deleteEmployee(id)); // ส่ง citizenId ไปยัง action เพื่อทำการลบ
    message.success("Employee deleted successfully!"); // แสดงข้อความสำเร็จ
  };

  // ฟังก์ชันสำหรับการลบพนักงานหลายคน
  const handleDeleteSelected = () => {
    if (selectedRowKeys.length > 0) {
      dispatch(deleteMultipleEmployees(selectedRowKeys));
      message.success(t("employees_deleted"));
      dispatch(setSelectedRowKeys([])); // เคลียร์รายการที่เลือก
    } else {
      message.warning(t("no_employee_selected"));
    }
  };

  // ฟังก์ชันสำหรับการเลือกและยกเลิกการเลือก
  const handleSelectChange = (keys: React.Key[]) => {
    dispatch(setSelectedRowKeys(keys as string[]));
  };

  // กำหนดคอลัมน์ของตาราง
  const columns = [
    {
      title: t("name"),
      dataIndex: "name",
      render: (text: string, record: Employee) => (
        <span>
          {record.firstname} {record.lastname}
        </span>
      ),
    },
    {
      title: t("gender"),
      dataIndex: "gender",
      render: (gender: string) => {
        console.log(gender);
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
        console.log("nationality: ", nationality);
        return t(nationality); // แสดงผลค่าของ nationality
      },
    },
    {
      title: t("manages"),
      key: "manage",
      render: (record: Employee) => (
        <span>
          <Button
            icon={<EditOutlined />}
            style={{ marginRight: 8 }}
            onClick={() => onEdit(record)} // ส่งข้อมูลไปที่ฟังก์ชัน handleEdit
          />
          <Button
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.id)}
            danger
          />
        </span>
      ),
    },
  ];

  // แปลงข้อมูลพนักงานให้เป็นข้อมูลที่ใช้ในตาราง
  const data = employees.map((employee) => ({
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
    passport: employee.passport, // ใช้สำหรับแก้ไข
  }));

  return (
    <>
      <Button
        type="primary"
        danger
        onClick={handleDeleteSelected}
        style={{ marginBottom: 16 }}
      >
        {t("delete_selected")}
      </Button>
      <Table
        rowSelection={{
          selectedRowKeys,
          onChange: handleSelectChange,
        }} // เพิ่มการเลือกแถว
        columns={columns}
        dataSource={data}
        pagination={{
          pageSize: 5,
          showQuickJumper: true,
          showSizeChanger: false,
        }}
        rowKey="id"
      />
    </>
  );
};

export default UserTable;
