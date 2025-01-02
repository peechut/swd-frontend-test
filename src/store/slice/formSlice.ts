import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// กำหนดประเภทของข้อมูลพนักงาน
export type Employee = {
  id: string; // ใช้ id ในการอ้างอิง
  title: string;
  firstname: string;
  lastname: string;
  birthday: string;
  nationality: string;
  citizenId: string; // citizenId is a string (combined from parts)
  gender: string;
  phone: string;
  salary: string;
  passport: string;
};
interface FormState {
  user: Employee[];
  mode: "add" | "edit"; // กำหนดโหมดเป็น "add" หรือ "edit"
  selectedRowKeys: string[]; // เพิ่มเพื่อเก็บ selectedRowKeys
}

// โหลดข้อมูลจาก localStorage
const initialState: FormState = {
  user: JSON.parse(localStorage.getItem("employees") || "[]"),
  mode: "add",
  selectedRowKeys: [], // ค่าเริ่มต้นเป็นอาร์เรย์ว่าง
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setSelectedRowKeys: (state, action: PayloadAction<string[]>) => {
      state.selectedRowKeys = action.payload;
    },
    addEmployee: (state, action: PayloadAction<Employee>) => {
      console.log(action.payload);
      state.user.push(action.payload);
      // อัปเดต localStorage
      localStorage.setItem("employees", JSON.stringify(state.user));
    },
    deleteEmployee: (state, action: PayloadAction<string>) => {
      state.user = state.user.filter((emp) => emp.id !== action.payload);
      localStorage.setItem("employees", JSON.stringify(state.user));
    },
    editEmployee: (state, action: PayloadAction<Employee>) => {
      const index = state.user.findIndex((emp) => emp.id === action.payload.id);
      if (index !== -1) {
        state.user[index] = action.payload;
        localStorage.setItem("employees", JSON.stringify(state.user));
      }
    },
    deleteMultipleEmployees: (state, action: PayloadAction<string[]>) => {
      state.user = state.user.filter((emp) => !action.payload.includes(emp.id));
      localStorage.setItem("employees", JSON.stringify(state.user));
    },
  },
});

// Export actions และ reducer
export const {  addEmployee,
  deleteEmployee,
  deleteMultipleEmployees,
  editEmployee,
  setSelectedRowKeys, } = formSlice.actions;
export default formSlice.reducer;
