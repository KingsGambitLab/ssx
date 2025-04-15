import React from 'react';
import styles from './index.module.scss';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps }) => {
  return (
    <div className={styles.progressContainer}>
      <div className={styles.steps}>
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div 
            key={index} 
            className={`${styles.step} ${index === currentStep - 1 ? styles.active : ''}`} 
          />
        ))}
      </div>
    </div>
  );
}; 