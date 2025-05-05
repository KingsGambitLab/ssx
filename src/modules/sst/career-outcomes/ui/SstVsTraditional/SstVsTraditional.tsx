'use client';

import React from 'react';
import Image from 'next/image';
import { Button, Table } from 'antd';

import Section from '@components/common/Section';

import { comparisonData, tableColumns } from './data';
import { DegreePageLink } from '@modules/sst/career-outcomes/utils/data';
import { pageTrackingSources, trackEvent } from '@modules/sst/career-outcomes/utils/tracking';

import ArrowUpRight from '@public/images/common/svg/arrow-up-right.svg';
import CertificateIcon from '@public/images/sst/svg/certificate-icon.svg';

import styles from './SstVsTraditional.module.scss';


const SstVsTraditional: React.FC = () => {
  const columns = tableColumns({
    parameterColumn: styles.parameterColumn,
    sstColumn: styles.sstColumn,
    traditionalColumn: styles.traditionalColumn,
    ...styles
  });

  return (
    <Section section_class={styles.sstVsTraditionalSection} id="sst-vs-traditional">
      <div className={styles.container}>
        <div className={styles.headerContainer}>
          <div className={styles.sectionTitle}>
            Tech is evolving faster than ever
          </div>
          <div className={styles.sectionDescription}>
            From GenAI to full-stack automation, what the industry demands today wasn't even part of most curriculums five years ago. 
            But traditional colleges are bound by rigid policies, outdated syllabi, and slow curriculum change cycles.
          </div>
          <div className={styles.sectionDescriptionSecondary}>
            But we're not bound by traditional degree structures, we do what others can't: teach for the future, not the past.
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

        <div className={styles.footer}>
          <div className={styles.footerText}>
            <Image src={CertificateIcon.src} alt='certificate' height={80} width={80} className={styles.certificateIcon}/>    
            <div className={styles.footerTextTitle}>
              Know about Diverse Degree Programmes at SST
            </div>
          </div>

          <Button
            type="primary"
            size="large"
            iconPosition='end'
            icon={<img src={ArrowUpRight.src} alt='arrow-up-right' />}
            onClick={() => {
              trackEvent.click({
                clickType: 'click',
                clickText: 'Degree Programmes',
                clickSource: pageTrackingSources.sstVsTraditional,
                custom: {
                  link: DegreePageLink,
                  text: 'Degree Programmes',
                }
              });
              window.open(DegreePageLink, '_blank');
            }}
           className={styles.footerButton}
          >
            Degree Programmes
          </Button>

        </div>
     </div>
    </Section>
  );
};

export default SstVsTraditional; 