import { ArrowUpOutlined, LinkedinFilled } from '@ant-design/icons';
import { Button, Modal, Popover } from 'antd';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import useSWR from 'swr';

import { useDeviceType } from '@hooks/useDeviceType';
import LoadingLayout from '@/layouts/LoadingLayout/LoadingLayout';
import LoadingErrorFallback from '@/layouts/LoadingErrorFallback/LoadingErrorFallback';

import CaseUtil from '@lib/caseUtil';
import tracker from '@lib/tracking';

import { ENDPOINTS } from '../../api/endpoints';
import { getAlumniData } from '../../api';
import { AlumniDataResponse } from '../../types';
import { getHouseImage } from './utils';
import AlumniCard from '../AlumniCard';
import ShareProfile from '../ShareProfile/ShareProfile';

import styles from './AlumniDetailsModal.module.scss';

type ActionButtonsProps = {
  id: string;
  linkedinUrl: string;
  name: string;
  batchYear: number;
  state: string;
};

const ActionButtons = ({ id, linkedinUrl, name, batchYear, state }: ActionButtonsProps) => {
  const trackEvent = (event: string) => {
    tracker.click({
      click_type: event,
      click_text: event,
      click_source: "alumni_details_modal",
      custom: {
        alumni_id: id,
        alumni_name: name,
      },
    });
  }
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
            trackEvent("share_button");
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
          trackEvent("linkedin_connect_button");
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

export default function AlumniDetailsModal({ isModalOpen, setIsModalOpen, alumniId }: AlumniDetailsModalProps) {
  const hasTracked = useRef(false);
  const { isMobile } = useDeviceType();
  const { data, isLoading, error } = useSWR<AlumniDataResponse>(
    `${ENDPOINTS.ALL_ALUMNI}/${alumniId}`,
    () => getAlumniData(alumniId)
  );

  const modalClassNames = {
    mask: styles.antModalMask,
    content: styles.antModalContent,
    body: styles.antModalBody,
    root: styles.antModal,
  };

  const alumniData = data?.data?.[0]?.attributes;

  const trackEvent = ({ click_type, properties, method = 'click' }: {
    click_type: string;
    properties?: object;
    method?: 'click' | 'view';
  }) => {
    tracker[method]({
      click_type,
      click_text: click_type,
      click_source: "alumni_card",
      custom: {
        alumni_id: alumniId,
        alumni_name: alumniData?.name,
        ...properties,
      },
    });
  }

  const modalContent = () => {
    if (isLoading) return <LoadingLayout className={styles.loadingContainer} />;
    else if (error) return <LoadingErrorFallback className={styles.errorContainer} variant="dark" />;
    else if (alumniData) return (
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
                  {CaseUtil.toCase('titleCase', alumniData?.house || '') as string}
                </div>
              </div>
              <Image
                src={getHouseImage(alumniData?.house || '', isMobile ? 'mobile' : 'desktop')}
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
              {alumniData?.clubs?.map((club) => (
                <div className={styles.clubItem} key={club}>
                  <div className={styles.clubName}>{club}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {alumniData?.projects && alumniData?.projects?.length > 0 && (
          <div className={styles.projectList}>
            <div className={styles.projectListHeading}>Projects</div>
            <div className={styles.projectListItems}>
              {alumniData?.projects?.map((project) => (
                <div className={styles.projectItem} key={project?.title}>
                  <div className={styles.projectTitle}>{project?.title}</div>
                  <Button
                    icon={<ArrowUpOutlined rotate={45} />}
                    iconPosition="end"
                    size="large"
                    className={styles.projectLinkButton}
                    onClick={() => {
                      trackEvent({
                        click_type: "project_link_button",
                        properties: {
                          project_name: project?.title,
                          project_link: project?.projectLink,
                        },
                      });
                      window.open(project?.projectLink || '', '_blank');
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
    )
    else return null;
  };

  useEffect(() => {
    if (isModalOpen && !hasTracked.current) {
      hasTracked.current = true;
      tracker.view({
        click_type: "alumni_details_modal_opened",
        click_text: "alumni_details_modal_opened",
        click_source: "alumni_card",
        custom: {
          alumni_id: alumniId,
          alumni_name: alumniData?.name,
        },
      });
    }
  }, [isModalOpen, alumniId, alumniData?.name]);

  return (
    <Modal
      open={isModalOpen}
      footer={null}
      title={null}
      onCancel={() => {
        trackEvent({ click_type: "alumni_details_modal_closed" });
        setIsModalOpen(false);
      }}
      rootClassName={styles.modalContainer}
      classNames={modalClassNames}
    >
      {modalContent()}
    </Modal>
  );
}
