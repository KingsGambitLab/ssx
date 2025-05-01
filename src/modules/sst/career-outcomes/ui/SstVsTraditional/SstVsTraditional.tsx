import React from 'react';
import { Table } from 'antd';
import Section from '@components/common/Section';
import styles from './SstVsTraditional.module.scss';
import { comparisonData, tableColumns } from './data';

const SstVsTraditional: React.FC = () => {
  const columns = tableColumns(styles);

  return (
    <Section section_class={styles.sstVsTraditionalSection}>
      <div className={styles.headerContainer}>
        <div className={styles.sectionTitle}>
          Tech is evolving faster than ever
        </div>
        <div className={styles.sectionDescription}>
          From GenAI to full-stack automation, what the industry demands today wasn't even part of most curriculums five years ago. 
          But traditional colleges are bound by rigid policies, outdated syllabi, and slow curriculum change cycles.
        </div>
        <div className={styles.sectionDescriptionSecondary}>
          But we’re not bound by traditional degree structures, we do what others can’t: teach for the future, not the past.
        </div>
      </div>
      
      <div className={styles.tableContainer}>
        <Table 
          dataSource={comparisonData} 
          columns={columns} 
          pagination={false}
          rowClassName={styles.tableRow}
          className={styles.comparisonTable}
        />
      </div>
    </Section>
  );
};

export default SstVsTraditional; 