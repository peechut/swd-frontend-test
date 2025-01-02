"use client";

import React, { useState, useEffect } from "react";
import { Dropdown, Menu, Button } from "antd"; // นำเข้า Button จาก antd
import { I18nextProvider, useTranslation } from "react-i18next";
import { usePathname } from "next/navigation"; // ใช้ usePathname จาก next/navigation
import i18n from "../utils/i18n";
import styles from "./page.module.scss"; // import CSS module
import "./globals.scss"; // นำเข้าไฟล์ CSS ทั่วไป
import ReduxProvider from "@/store/provider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { t } = useTranslation(); // ใช้ hook สำหรับแปลข้อความ
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);
  const pathname = usePathname(); // ใช้ usePathname เพื่อดึง path ปัจจุบัน

  const handleMenuClick = (e: { key: string }) => {
    console.log("e.key:", e.key); // แสดงค่า key
    i18n.changeLanguage(e.key); // เปลี่ยนภาษา
  };

  // สร้างเมนูสำหรับเลือกภาษา
  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="en">English</Menu.Item>
      <Menu.Item key="th">ภาษาไทย</Menu.Item>
    </Menu>
  );

  // ใช้ useEffect เพื่อติดตามการเปลี่ยนแปลงของภาษา
  useEffect(() => {
    const handleLanguageChange = (language: string) => {
      setCurrentLanguage(language);
    };

    i18n.on("languageChanged", handleLanguageChange);

    // Clean up
    return () => {
      i18n.off("languageChanged", handleLanguageChange);
    };
  }, []);

  // ตรวจสอบ path และแสดงข้อความที่เหมาะสม
  const headerText =
    pathname === "/test1"
      ? t("layoutStyle")
      : pathname === "/test2"
      ? t("formTable")
      : ""; // ถ้าอยู่ที่ /test2 ให้แสดงข้อความ 'formTable'

  return (
    <html lang={currentLanguage}>
      <body>
        <ReduxProvider>
          <I18nextProvider i18n={i18n}>
            <header className={styles.header}>
              <div className={styles.headerContent}>
                <span className={styles.headerTitle}>{headerText}</span>{" "}
              </div>
              <Dropdown overlay={menu} trigger={["click"]}>
                <Button className={styles.languageBtn} type="primary">
                  {currentLanguage === "en" ? "English" : "ภาษาไทย"}
                </Button>
              </Dropdown>
            </header>
            <main>{children}</main>
          </I18nextProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
