// app/page.tsx
'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';
import CustomCard from '../components/Card';
import { Row, Col } from 'antd';

export default function Home() {
  const { t } = useTranslation(); 

  return (
    <div style={{ padding: '20px' }}>
      <Row gutter={16} justify={'center'} align={'middle'}>
        <Col span={8}>
          <CustomCard title={t('test1')} body={t('layoutStyle')} path="/test1" />
        </Col>
        <Col span={8}>
          <CustomCard title={t('test2')} body={t('formTable')} path="/test2" />
        </Col>
      </Row>
    </div>
  );
}
