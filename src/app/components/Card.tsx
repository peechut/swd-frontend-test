// app/components/Card.tsx
import React from 'react';
import { Card } from 'antd';
import Link from 'next/link';

type CardProps = {
  title: string;
  path: string;
};

const CustomCard: React.FC<CardProps> = ({ title, path }) => {
  return (
    <Link href={path}>
      <Card
        hoverable
        style={{ width: 240 }}
        cover={<img alt={title} src="https://via.placeholder.com/240x135.png" />}
      >
        <Card.Meta title={title} />
      </Card>
    </Link>
  );
};

export default CustomCard;
