"use client";
import { useState } from "react";
import { Row, Col, Divider } from "antd";
import styles from "./page.module.scss"; // นำเข้า styles
import { useTranslation } from "react-i18next";

export default function Test1() {
  const { t } = useTranslation();
  const [shapes, setShapes] = useState([
    { id: 1, className: styles["card--oval"] },
    { id: 2, className: styles["card--square"] },
    { id: 3, className: styles["card--rectangle"] },
    { id: 4, className: styles["card--trapezoid"] },
    { id: 5, className: styles["card--parallelogram"] },
    { id: 6, className: styles["card--circle"] },
  ]);

  const [isPositionSwapped, setIsPositionSwapped] = useState(false);

  const movePosition = () => {
    setIsPositionSwapped((prev) => !prev); // เปลี่ยนสถานะเมื่อคลิก
  };
  // ฟังก์ชันสุ่มตำแหน่งรูปทรง
  const handleShapeClick = () => {
    setShapes((prevShapes) => {
      const shuffledShapes = [...prevShapes];

      // ฟังก์ชันสุ่มตำแหน่งรูปทรง
      for (let i = shuffledShapes.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));
        [shuffledShapes[i], shuffledShapes[randomIndex]] = [
          shuffledShapes[randomIndex],
          shuffledShapes[i],
        ];
      }

      return shuffledShapes;
    });
  };

  // ฟังก์ชันเลื่อนรูปไปทางซ้าย
  const moveShapesLeft = () => {
    setShapes((prevShapes) => {
      const rotatedShapes = [...prevShapes];
      const removedShape = rotatedShapes.shift(); // เอารูปแรกออก
      if (removedShape !== undefined) {
        rotatedShapes.push(removedShape); // เพิ่มรูปที่ถูกเอาออกไปที่ท้าย
      }
      return rotatedShapes;
    });
  };

  // ฟังก์ชันเลื่อนรูปไปทางขวา
  const moveShapesRight = () => {
    setShapes((prevShapes) => {
      const rotatedShapes = [...prevShapes];
      const removedShape = rotatedShapes.pop();
      if (removedShape !== undefined) {
        rotatedShapes.unshift(removedShape);
      }

      return rotatedShapes;
    });
  };

  const firstRowShapes = shapes.slice(0, 3);
  const secondRowShapes = shapes.slice(3);

  return (
    <Row justify="center" style={{ height: "100vh" }}>
      <Col span={24}>
        <Row
          gutter={9}
          align="middle"
          justify={"center"}
          style={{ width: "100%" }}
        >
          {/* Left Arrow Button */}
          <Col
            span={6}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
            onClick={moveShapesLeft} // ใช้ฟังก์ชัน moveShapesLeft เมื่อคลิก
          >
            <div className={styles["card"]}>
              <div className={styles["card--triangle-left"]} />
            </div>

            <button className={styles["moveShapeButton"]}>Move shape</button>
          </Col>

          {/* Center Cards */}
          <Col span={12} style={{ height: "100%" }}>
            <Row
              justify="center"
              align="middle"
              gutter={16}
              style={{ height: "100%" }}
              onClick={movePosition}
            >
              <Col
                span={24}
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  height: "100%",
                }}
              >
                <div
                  className={styles["card"]}
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                    width: "100%",
                  }}
                >
                  <div
                    className={styles["card--triangle"]}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  />
                  <div
                    className={styles["card--triangle-upside-down"]}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  />
                </div>
                <button className={styles["movePositionButton"]}>
                  {t("movePosition")}
                </button>
              </Col>
            </Row>
          </Col>

          {/* Right Arrow Button */}
          <Col
            span={6}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
            onClick={moveShapesRight}
          >
            <div className={styles["card"]}>
              <div className={styles["card--triangle-right"]} />
            </div>
            <button className={styles["moveShapeButton"]}>
              {t("moveShape")}
            </button>
          </Col>
        </Row>

        <Divider />

        {/* First Row of Shapes */}
        <Row
          gutter={9}
          align="middle"
          justify={"center"}
          style={{ width: "100%", marginTop: 20 }}
        >
          {isPositionSwapped ? (
            <>
              <Col
                span={3}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <div className={styles["card--empty"]} />
              </Col>
              {firstRowShapes.map((shape) => (
                <Col
                  key={shape.id}
                  span={6}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                  }}
                >
                  <div className={styles.card}>
                    <div
                      className={shape.className}
                      onClick={handleShapeClick} // เพิ่มการคลิกเพื่อสลับ
                    />
                  </div>
                </Col>
              ))}
              <Col
                span={3}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <div className={styles["card--empty"]} />
              </Col>
            </>
          ) : (
            <>
              <Col
                span={6}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <div className={styles["card--empty"]} />
              </Col>
              {firstRowShapes.map((shape) => (
                <Col
                  key={shape.id}
                  span={6}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                  }}
                >
                  <div className={styles.card}>
                    <div
                      className={shape.className}
                      onClick={handleShapeClick} // เพิ่มการคลิกเพื่อสลับ
                    />
                  </div>
                </Col>
              ))}
            </>
          )}
        </Row>

        {/* Second Row of Shapes */}
        <Row
          gutter={9}
          align="middle"
          justify={"center"}
          style={{ width: "100%", marginTop: 20 }}
        >
          {isPositionSwapped ? (
            <>
              <Col
                span={6}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <div className={styles["card--empty"]} />
              </Col>
              {secondRowShapes.map((shape) => (
                <Col
                  key={shape.id}
                  span={6}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                  }}
                >
                  <div className={styles.card}>
                    <div
                      className={shape.className}
                      onClick={handleShapeClick} // เพิ่มการคลิกเพื่อสลับ
                    />
                  </div>
                </Col>
              ))}
            </>
          ) : (
            <>
              <Col
                span={3}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <div className={styles["card--empty"]} />
              </Col>
              {secondRowShapes.map((shape) => (
                <Col
                  key={shape.id}
                  span={6}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                  }}
                >
                  <div className={styles.card}>
                    <div
                      className={shape.className}
                      onClick={handleShapeClick} // เพิ่มการคลิกเพื่อสลับ
                    />
                  </div>
                </Col>
              ))}
              <Col
                span={3}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <div className={styles["card--empty"]} />
              </Col>
            </>
          )}
        </Row>
      </Col>{" "}
    </Row>
  );
}
