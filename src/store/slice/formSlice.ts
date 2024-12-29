// formSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// กำหนดประเภทของข้อมูลพนักงาน
interface Employee {
  title: string;
  firstname: string;
  lastname: string;
  birthday: string; // เพิ่ม birthday
  nationality: string; // เพิ่ม nationality
  citizenId: string;
  gender: string;
  phone: string; // เพิ่ม phone
  salary: string; // เพิ่ม salary
  passport: string; // เพิ่ม passport
}

interface FormState {
  user: Employee[]; // array ของพนักงาน
}

const initialState: FormState = {
  user: JSON.parse(localStorage.getItem("employees") || "[]"), // โหลดข้อมูลจาก localStorage หากมี
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    addEmployee: (state, action: PayloadAction<Employee>) => {
      state.user.push(action.payload); // เพิ่มพนักงานใหม่ลงใน state
      localStorage.setItem("employees", JSON.stringify(state.user)); // อัพเดตข้อมูลใน localStorage
    },
    deleteEmployee: (state, action: PayloadAction<string>) => {
      // ลบพนักงานที่มี citizenId ตรงกับที่ส่งมา
      const updatedEmployees = state.user.filter(
        (emp) => emp.citizenId !== action.payload
      );
      state.user = updatedEmployees; // อัพเดต state ใหม่
      localStorage.setItem("employees", JSON.stringify(updatedEmployees)); // อัพเดตข้อมูลใน localStorage
    },
    editEmployee: (state, action: PayloadAction<Employee>) => {
        // แก้ไขพนักงานที่ตรงกับ firstname และ lastname
        const index = state.user.findIndex(
          (emp) =>
            emp.firstname === action.payload.firstname &&
            emp.lastname === action.payload.lastname
        );
        if (index !== -1) {
          state.user[index] = action.payload; // อัพเดตข้อมูลพนักงานใน state
          localStorage.setItem("employees", JSON.stringify(state.user)); // อัพเดตข้อมูลใน localStorage
        }
      },
  },
});

export const {editEmployee, addEmployee, deleteEmployee } = formSlice.actions;
export default formSlice.reducer;
