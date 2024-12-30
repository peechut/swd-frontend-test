import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// กำหนดประเภทของข้อมูลพนักงาน
interface Employee {
  id: string; // ใช้ id ในการอ้างอิง
  title: string;
  firstname: string;
  lastname: string;
  birthday: string;
  nationality: string;
  citizenId: string;
  gender: string;
  phone: string;
  salary: string;
  passport: string;
}

interface FormState {
  user: Employee[];
  editingEmployee: Employee | null; // เก็บพนักงานที่กำลังถูกแก้ไข
}

// โหลดข้อมูลจาก localStorage
const initialState: FormState = {
  user: JSON.parse(localStorage.getItem("employees") || "[]"),
  editingEmployee: null,
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    addEmployee: (state, action: PayloadAction<Employee>) => {
      state.user.push(action.payload);
      // อัปเดต localStorage
      localStorage.setItem("employees", JSON.stringify(state.user));
    },
    deleteEmployee: (state, action: PayloadAction<string>) => {
      // ลบพนักงานที่ id ตรงกับ action.payload
      state.user = state.user.filter((emp) => emp.id !== action.payload);
      // อัปเดต localStorage
      localStorage.setItem("employees", JSON.stringify(state.user));
    },
    editEmployee: (state, action: PayloadAction<Employee>) => {
      // ค้นหาพนักงานที่ต้องการแก้ไข
      const index = state.user.findIndex((emp) => emp.id === action.payload.id);
      if (index !== -1) {
        state.user[index] = action.payload; // อัปเดตข้อมูลใน state
        // อัปเดต localStorage ด้วยข้อมูลใหม่
        localStorage.setItem("employees", JSON.stringify(state.user));
      }
    },
    setEditingEmployee: (state, action: PayloadAction<Employee | null>) => {
      // ตั้งค่าพนักงานที่กำลังแก้ไข
      state.editingEmployee = action.payload;
    },
  },
});

// Export actions และ reducer
export const { addEmployee, deleteEmployee, editEmployee, setEditingEmployee } =
  formSlice.actions;
export default formSlice.reducer;
