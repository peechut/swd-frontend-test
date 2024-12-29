// app/page.tsx
'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';
import CustomCard from '../components/Card';
import { Row, Col } from 'antd';

export default function Home() {
  const { t } = useTranslation('common'); // ใช้ namespace "common"

  return (
    <div style={{ padding: '20px' }}>
      <h1>{t('welcome')}</h1>

      <Row gutter={16}>
        <Col span={8}>
          <CustomCard title={t('goToTest1')} path="/test1" />
        </Col>
        <Col span={8}>
          <CustomCard title={t('goToTest2')} path="/test2" />
        </Col>
      </Row>
    </div>
  );
}
