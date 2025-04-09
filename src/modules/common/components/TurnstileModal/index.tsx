import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import TurnstileWidget from '@/utils/turnstile/turnstile';
import styles from './index.module.scss';

interface TurnstileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTokenObtained: (token: string) => Promise<boolean>;
  title?: string;
}

export const TurnstileModal: React.FC<TurnstileModalProps> = ({
  isOpen,
  onClose,
  onTokenObtained,
  title = 'Verify you are human'
}) => {
  const [token, setToken] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [turnstile, setTurnstile] = useState<any>(null);

  const handleSubmit = async () => {
    if (!token) return;
    
    setIsSubmitting(true);
    try {
      const success = await onTokenObtained(token);
      if (success) {
        onClose();
      } else {
        turnstile?.reset();
        setToken(null);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={null}
      title={title}
      width={400}
      centered
      className={styles.modal}
    >
      <div className={styles.content}>
        <TurnstileWidget 
          onTokenObtained={setToken}
          onReset={setTurnstile}
          appearance="always"
        />
        <Button
          type="primary"
          onClick={handleSubmit}
          disabled={!token}
          loading={isSubmitting}
          className={styles.submitButton}
        >
          Submit
        </Button>
      </div>
    </Modal>
  );
}; 