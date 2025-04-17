import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import TurnstileWidget from '@/utils/turnstile/turnstile';
import styles from './index.module.scss';
import { trackingEvents } from '@modules/sst/waitlist/utils/tracking';
import { trackingSources } from '@modules/sst/waitlist/utils/tracking';
import { trackEvent } from '@modules/sst/waitlist/utils/tracking';

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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [turnstile, setTurnstile] = useState<any>(null);


  const trackEventHandler = (
    { clickText, clickSource, custom }: { clickText: string, clickSource: string, custom?: object }
  ) => {
    trackEvent.click({
      clickType: 'click',
      clickText,
      clickSource,
      custom,
    })
  }

  const handleModalClose = () => {
    onClose();
    trackEventHandler({
      clickText: trackingEvents.turnstileModalClose,
      clickSource: trackingSources.waitlistLoginOTPForm,
    })
  }

  const handleSubmit = async () => {
    if (!token) return;
    
    setIsSubmitting(true);
    try {
      const success = await onTokenObtained(token);
      if (success) {
        onClose();
        trackEventHandler({
          clickText: trackingEvents.turnstileModalSubmit,
          clickSource: trackingSources.waitlistLoginOTPForm,
          custom: {
            form_status: 'success',
            token,  
          }
        })
      } else {
        turnstile?.reset();
        setToken(null);
        trackEventHandler({
          clickText: trackingEvents.turnstileModalSubmit,
          clickSource: trackingSources.waitlistLoginOTPForm,
          custom: {
            form_status: 'error', 
            token,
          }
        })
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      open={isOpen}
      onCancel={handleModalClose}
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