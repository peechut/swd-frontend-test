import { Card } from "antd";
import Link from "next/link";
type CardProps = {
  title: string;
  path: string;
  body: string;
};

const CustomCard: React.FC<CardProps> = ({ title, body, path }) => {
  return (
    <Link href={path}>
      <Card title={title} bordered={false} style={{ width: 300 }}>
        
        {body}
      </Card>
    </Link>
  );
};

export default CustomCard;
