// utils/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
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
      resetButton:"Reset",
      submitButton:"submit",
      male:"Male",
      female:"Female",
      unsex:"Unsex",
      thai:"Thai",
      usa:"America",
      other:"Other"
    }
  },
  th: {
    translation: {
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
      resetButton:"ล้างข้อมูล",
      submitButton:"ส่งข้อมูล",
      male:"ผู้ชาย",
      female:"ผู้หญิง",
      unsex:"ไม่ระบุ",
      thai:"ไทย",
      usa:"อเมริกา",
      other:"อื่นๆ"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // กำหนดภาษาหลัก
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
