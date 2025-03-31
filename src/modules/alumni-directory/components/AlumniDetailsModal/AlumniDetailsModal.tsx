import { ArrowUpOutlined, LinkedinFilled } from '@ant-design/icons';
import { Button, Modal, Popover } from 'antd';
import Image from 'next/image';
import useSWR from 'swr';


import { useDeviceType } from '@/hooks/useDeviceType';
import { ENDPOINTS } from '../../apis/endPoints';
import { getAlumniData } from '../../apis';
import AlumniCard from '../AlumniCard/AlumniCard';
import ShareProfile from '../ShareProfile/ShareProfile';
import { AlumniDataResponse } from '../../types';
import { getHouseImage } from './utils';

import styles from './AlumniDetailsModal.module.scss';

type ActionButtonsProps = {
  linkedinUrl: string;
  name: string;
  batchYear: number;
  state: string;
};

const ActionButtons = ({ linkedinUrl, name, batchYear, state }: ActionButtonsProps) => {
  return (
    <div className={styles.actionButtonWrapper}>
      <Popover
        content={<ShareProfile name={name} batchYear={batchYear} state={state} />}
        trigger="click"
        arrow={false}
        autoAdjustOverflow={false}
      >
        <Button
          icon={<ArrowUpOutlined rotate={45} />}
          iconPosition="end"
          size="large"
          className={styles.shareButton}
        >
          Share Profile
        </Button>
      </Popover>

      <Button
        icon={<LinkedinFilled />}
        size="large"
        type="primary"
        className={styles.connectButton}
        onClick={() => window.open(linkedinUrl, '_blank')}
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
  const { isMobile } = useDeviceType();
  const { data, isLoading, error } = useSWR<AlumniDataResponse>(
    `${ENDPOINTS.ALL_ALUMNI}/${alumniId}`,
    () => getAlumniData(alumniId)
  );

  console.log("alumniData", data);
  const modalClassNames = {
    mask: styles.antModalMask,
    content: styles.antModalContent,
    body: styles.antModalBody,
    root: styles.antModal,
  };

  // const alumniData = {
  //   id: 1,
  //   img: 'images/sst/svg/demo-img.svg',
  //   name: 'Aayush Shrivastava',
  //   batchYear: 2020,
  //   city: 'New York',
  //   state: 'NY',
  //   school: 'School of Technology',
  //   linkedin: 'https://www.linkedin.com/in/johndoe',
  //   house: 'TuSKer',
  //   clubs: [
  //     '⚽️ Sports Club',
  //     '🧑🏻‍💻 Open Source Club',
  //     '🧑🏻‍💻 Competitive Coding Club',
  //     '🎤 Ted Talks Tribe',
  //     '🎤 Ted Talks Tribe',
  //     '🎤 Ted Talks Tribe',
  //     '🎤 Ted Talks Tribe',
  //     '🎤 Ted Talks Tribe',
  //     '🎤 Ted Talks Tribe',
  //     '🎤 Ted Talks Tribe',
  //     '🎤 Ted Talks Tribe',
  //   ],
  //   projects: [
  //     {
  //       title: 'Develop SST Website',
  //       projectLink: 'https://www.google.com',
  //     },
  //     {
  //       title: 'Develop SST Website 2',
  //       projectLink: 'https://www.google.com',
  //     },
  //     {
  //       title: 'Develop SST Website 3',
  //       projectLink: 'https://www.google.com',
  //     },
  //     {
  //       title: 'Develop SST Website 2',
  //       projectLink: 'https://www.google.com',
  //     },
  //     {
  //       title: 'Develop SST Website 2',
  //       projectLink: 'https://www.google.com',
  //     },
  //     {
  //       title: 'Develop SST Website 2',
  //       projectLink: 'https://www.google.com',
  //     },
  //   ],
  // };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const alumniData = data?.data?.[0]?.attributes;

  return (
    <Modal
      open={isModalOpen}
      footer={null}
      title={null}
      onCancel={() => setIsModalOpen(false)}
      rootClassName={styles.modalContainer}
      classNames={modalClassNames}
    >
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
                <div className={styles.houseName}>{alumniData.house}</div>
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
                  {club}
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
                    onClick={() => window.open(project?.projectLink || '', '_blank')}
                  >
                    KNOW MORE
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}