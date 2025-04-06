import { useEffect, useRef } from 'react';
import Image from 'next/image';
import useSWR from 'swr';

import { ArrowUpOutlined, LinkedinFilled } from '@ant-design/icons';
import { Button, Modal, Popover } from 'antd';

import { useDeviceType } from '@hooks/useDeviceType';

import LoadingErrorFallback from '@/layouts/LoadingErrorFallback/LoadingErrorFallback';
import LoadingLayout from '@/layouts/LoadingLayout/LoadingLayout';

import CaseUtil from '@lib/caseUtil';

import { getAlumniData } from '../../api';
import { ENDPOINTS } from '../../api/endpoints';
import { AlumniDataResponse } from '../../types';
import { pageTrackingEvents, pageTrackingSources, trackEvent } from '../../utils';

import AlumniCard from '../AlumniCard';
import ShareProfile from '../ShareProfile/ShareProfile';
import { clubEmojiMap, getHouseImage } from './utils';

import styles from './AlumniDetailsModal.module.scss';

type ActionButtonsProps = {
  id: string;
  linkedinUrl: string;
  name: string;
  batchYear: number;
  state: string;
};

const ActionButtons = ({
  id,
  linkedinUrl,
  name,
  batchYear,
  state,
}: ActionButtonsProps) => {
  const trackEventHandler = (event: string) => {
    trackEvent.click({
      clickType: event,
      clickText: event,
      clickSource: pageTrackingSources.alumniDetailsModal,
      custom: {
        alumni_id: id,
        alumni_name: name,
      },
    });
  };

  return (
    <div className={styles.actionButtonWrapper}>
      <Popover
        content={<ShareProfile id={id} name={name} batchYear={batchYear} state={state} />}
        trigger="click"
        arrow={false}
        autoAdjustOverflow={false}
      >
        <Button
          icon={<ArrowUpOutlined rotate={45} />}
          iconPosition="end"
          size="large"
          className={styles.shareButton}
          onClick={() => {
            trackEventHandler(pageTrackingEvents.shareButton);
          }}
        >
          Share Profile
        </Button>
      </Popover>

      <Button
        icon={<LinkedinFilled />}
        size="large"
        type="primary"
        className={styles.connectButton}
        onClick={() => {
          trackEventHandler(pageTrackingEvents.linkedinButton);
          window.open(linkedinUrl, '_blank');
        }}
      >
        Connect
      </Button>
    </div>
  );
};

type AlumniDetailsModalProps = {
  isModalOpen: boolean;
  setIsModalOpen: (isModalOpen: boolean) => void;
  alumniId: string;
};

export default function AlumniDetailsModal({
  isModalOpen,
  setIsModalOpen,
  alumniId,
}: AlumniDetailsModalProps) {
  const { isMobile } = useDeviceType();

  const { data, isLoading, error } = useSWR<AlumniDataResponse>(
    `${ENDPOINTS.ALL_ALUMNI}/${alumniId}`,
    () => getAlumniData(alumniId)
  );

  const alumniData = data?.data?.[0]?.attributes;

  const modalClassNames = {
    mask: styles.antModalMask,
    content: styles.antModalContent,
    body: styles.antModalBody,
    root: styles.antModal,
  };

  const trackEventHandler = ({
    clickType,
    custom,
    method = 'click',
  }: {
    clickType: string;
    custom?: object;
    method?: 'click' | 'view';
  }) => {
    trackEvent[method]({
      clickType,
      clickText: clickType,
      clickSource: pageTrackingSources.alumniDetailsModal,
      custom: {
        alumni_id: alumniId,
        alumni_name: alumniData?.name,
        ...custom,
      },
    });
  };

  useEffect(() => {
    if (isModalOpen) {
      trackEventHandler({
        clickType: pageTrackingEvents.alumniDetailsModalOpened,
        method: 'view',
      });
    }
  }, [isModalOpen, alumniId, alumniData?.name]);

  return (
    <Modal
      open={isModalOpen}
      footer={null}
      title={null}
      onCancel={() => {
        trackEventHandler({ clickType: pageTrackingEvents.alumniDetailsModalClosed });
        setIsModalOpen(false);
      }}
      rootClassName={styles.modalContainer}
      classNames={modalClassNames}
    >
      {isLoading && <LoadingLayout className={styles.loadingContainer} />}
      {error && <LoadingErrorFallback className={styles.errorContainer} variant="dark" />}

      {!isLoading && !error && (
        <div className={styles.modalContent}>
          <div className={styles.modalHeader}>
            <AlumniCard
              name={alumniData?.name || ''}
              image={alumniData?.image || ''}
              batchYear={alumniData?.batchYear || 0}
              city={alumniData?.city || ''}
              state={alumniData?.state || ''}
              school={alumniData?.school || ''}
              linkedin={alumniData?.linkedinProfile || ''}
              variant="dark"
            >
              <ActionButtons
                id={alumniId}
                linkedinUrl={alumniData?.linkedinProfile || ''}
                name={alumniData?.name || ''}
                batchYear={alumniData?.batchYear || 0}
                state={alumniData?.state || ''}
              />
            </AlumniCard>

            {alumniData?.house && (
              <div className={styles.houseDetailsContainer}>
                <div className={styles.houseNameWrapper}>
                  <div className={styles.houseMemberText}>House Member</div>
                  <div className={styles.houseName}>
                    {CaseUtil.toCase('titleCase', alumniData.house || '') as string}
                  </div>
                </div>
                <Image
                  src={getHouseImage(alumniData.house || '', isMobile ? 'mobile' : 'desktop')}
                  className={styles.houseLogo}
                  alt="house-logo"
                />
              </div>
            )}
          </div>

          {alumniData?.clubs && alumniData?.clubs?.length > 0 && (
            <div className={styles.clubsContainer}>
              <div className={styles.clubsHeading}>Clubs</div>
              <div className={styles.clubsList}>
                {alumniData.clubs.map((club) => (
                  <div className={styles.clubItem} key={club}>
                    {
                      clubEmojiMap[club.toLowerCase()] && (
                        <div className={styles.clubEmoji}>{clubEmojiMap[club.toLowerCase()]}</div>
                      )
                    }
                    <div className={styles.clubName}>{club}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {alumniData?.projects?.length && alumniData?.projects?.length > 0 && (
            <div className={styles.projectList}>
              <div className={styles.projectListHeading}>Projects</div>
              <div className={styles.projectListItems}>
                {alumniData.projects.map((project) => (
                  <div className={styles.projectItem} key={project.title}>
                    <div className={styles.projectTitle}>{project.title}</div>
                    <Button
                      icon={<ArrowUpOutlined rotate={45} />}
                      iconPosition="end"
                      size="large"
                      className={styles.projectLinkButton}
                      onClick={() => {
                        trackEventHandler({
                          clickType: pageTrackingEvents.projectLinkButton,
                          custom: {
                            project_name: project.title,
                            project_link: project.projectLink,
                          },
                        })
                        window.open(project.projectLink || '', '_blank');
                      }}
                    >
                      KNOW MORE
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </Modal>
  );
}
