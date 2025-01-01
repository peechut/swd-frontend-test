// utils/i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      name:"Name",
      layoutStyle: "Layout & style",
      title: "Title",
      firstname: "Firstname",
      lastname: "Lastname",
      birthday: "Birthday",
      nationality: "Nationality",
      citizenId: "Citizen ID",
      gender: "Gender",
      phone: "Mobile Phone",
      passport: "Passport No.",
      salary: "Expected Salary",
      reset: "Reset",
      submit: "Submit",
      mr: "Mr.",
      ms: "Ms.",
      mrs: "Mrs.",
      pleaseSelectTitle: "Please select a title!",
      pleaseInputFirstname: "Please input your firstname!",
      pleaseInputLastname: "Please input your lastname!",
      resetButton: "Reset",
      submitButton: "submit",
      Male: "Male",
      Female: "Female",
      Unsex: "Unsex",
      Thai: "Thai",
      American: "American",
      Other: "Other",
      titlePlaceholder: "title",
      YYMMDD: "YYYY-MM-DD",
      placeholderNationality: "-- Please select --",
      manages:"Manages"
    },
  },
  th: {
    translation: {
      name:"ชื่อ",
      layoutStyle: "การจัดการหน้าเว็ป",
      title: "คำนำหน้า",
      firstname: "ชื่อ",
      lastname: "นามสกุล",
      birthday: "วันเกิด",
      nationality: "สัญชาติ",
      citizenId: "เลขประจำตัวประชาชน",
      gender: "เพศ",
      phone: "เบอร์โทรศัพท์",
      passport: "หนังสือเดินทาง",
      salary: "เงินเดือนที่คาดหวัง",
      reset: "ล้างข้อมูล",
      submit: "ส่งข้อมูล",
      mr: "นาย",
      ms: "นางสาว",
      mrs: "นาง",
      pleaseSelectTitle: "กรุณาเลือกคำนำหน้า!",
      pleaseInputFirstname: "กรุณากรอกชื่อ!",
      pleaseInputLastname: "กรุณากรอกนามสกุล!",
      resetButton: "ล้างข้อมูล",
      submitButton: "ส่งข้อมูล",
      Male: "ผู้ชาย",
      Female: "ผู้หญิง",
      Unsex: "ไม่ระบุ",
      Thai: "ไทย",
      American: "อเมริกา",
      Other: "อื่นๆ",
      YYMMDD: "ปี-เดือน-วัน",
      placeholderNationality: "-- กรุณาเลือก --",
      manages:"จัดการ"
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en", // กำหนดภาษาหลัก
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
