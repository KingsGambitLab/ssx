import React, { ReactNode } from 'react';
import styles from './Section.module.scss';

interface SectionProps {
  children: ReactNode;
  section_class?: string;
  id?: string;
}

const Section: React.FC<SectionProps> = ({
  children,
  section_class = '',
  id,
}) => {
  return (
    <section 
      className={`${styles.section} ${section_class}`} 
      id={id}
    >
      <div className='sr-container'>
        {children}
      </div>
    </section>
  );
};

export default Section; 
