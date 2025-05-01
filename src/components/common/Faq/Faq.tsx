"use client";

import React, { useState } from 'react';
import { Typography, Collapse } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import styles from './Faq.module.scss';

const { Title } = Typography;

export interface FaqItem {
  question: string;
  answer: React.ReactNode;
}

interface FaqProps {
  title?: string;
  subtitle?: string;
  items: FaqItem[];
  className?: string;
  footer?: React.ReactNode;
}

const Faq: React.FC<FaqProps> = ({
  title = "FAQS",
  subtitle = "Frequently Asked Questions",
  items,
  className = "",
  footer,
}) => {
  const [activeKey, setActiveKey] = useState<string | string[]>([]);

  const handlePanelChange = (key: string | string[]) => {
    setActiveKey(key);
  };

  // Custom expand icon based on panel state
  const expandIcon = ({ isActive }: { isActive?: boolean }) => {
    return isActive ? (
      <MinusOutlined className={styles.collapseIcon} />
    ) : (
      <PlusOutlined className={styles.collapseIcon} />
    );
  };

  return (
    <div className={`${styles.faqContainer} ${className}`}>
      {title && (
        <Title level={5} className={styles.title}>
          {title}
        </Title>
      )}
      {subtitle && (
        <Title level={2} className={styles.subtitle}>
          {subtitle}
        </Title>
      )}

      <Collapse
        bordered={false}
        expandIcon={expandIcon}
        className={styles.faqCollapse}
        activeKey={activeKey}
        onChange={handlePanelChange}
      >
        {items.map((item, index) => (
          <Collapse.Panel
            key={`${index}`}
            header={item.question}
            className={styles.faqPanel}
          >
            <div className={styles.answerContent}>
              {item.answer}
            </div>
          </Collapse.Panel>
        ))}
      </Collapse>

      {footer}
    </div>
  );
};

export default Faq; 