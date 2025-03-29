import Image from 'next/image';

import { Button, Modal, } from 'antd';
import { ArrowUpOutlined, LinkedinFilled } from '@ant-design/icons';
import AlumniCard from '../AlumniCard/AlumniCard';
import { useDeviceType } from '@/hooks/useDeviceType';

import { getHouseImage, clubIconMapping } from './utils';
import styles from './AlumniDetailsModal.module.scss';

const ActionButtons = () => {
  return (
    <div className={styles.actionButtonWrapper}>
      <Button
        icon={<ArrowUpOutlined rotate={45} />}
        iconPosition="end"
        size="large"
        className={styles.shareButton}
      >
        Share Profile
      </Button>

      <Button
        icon={<LinkedinFilled />}
        size="large"
        type="primary"
        className={styles.connectButton}
      >
        Connect
      </Button>
    </div>
  );
};

export default function AlumniDetailsModal({ isModalOpen, setIsModalOpen, alumniId }: {
  isModalOpen: boolean;
  setIsModalOpen: (isModalOpen: boolean) => void;
  alumniId: number;
}) {
  console.log("isModalOpen", isModalOpen);
  console.log("alumniId", alumniId);

  const { isMobile } = useDeviceType();

  const modalClassNames = {
    mask: styles.antModalMask,
    content: styles.antModalContent,
    body: styles.antModalBody,
    root: styles.antModal,
  };

  const alumniData = {
    id: 1,
    img: 'images/sst/svg/demo-img.svg',
    name: 'Aayush Shrivastava',
    batchYear: '2020',
    city: 'New York',
    state: 'NY',
    school: 'School of Technology',
    linkedin: 'https://www.linkedin.com/in/johndoe',
    house: 'TuSKer',
    clubs: ['⚽️ Sports Club', '🧑🏻‍💻 Open Source Club', '🧑🏻‍💻 Competitive Coding Club', '🎤 Ted Talks Tribe',
      '🎤 Ted Talks Tribe',
      '🎤 Ted Talks Tribe',
      '🎤 Ted Talks Tribe',
      '🎤 Ted Talks Tribe',
      '🎤 Ted Talks Tribe',
      '🎤 Ted Talks Tribe',
      '🎤 Ted Talks Tribe',
    ],
    projects: [
      {
        title: 'Develop SST Website',
        projectLink: 'https://www.google.com',
      },
      {
        title: 'Develop SST Website 2',
        projectLink: 'https://www.google.com',
      },
      {
        title: 'Develop SST Website 3',
        projectLink: 'https://www.google.com',
      },
      {
        title: 'Develop SST Website 2',
        projectLink: 'https://www.google.com',
      },
      {
        title: 'Develop SST Website 2',
        projectLink: 'https://www.google.com',
      },
      {
        title: 'Develop SST Website 2',
        projectLink: 'https://www.google.com',
      },
    ]
  }

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
          <AlumniCard {...alumniData} variant="dark">
            <ActionButtons />
          </AlumniCard>
          {alumniData?.house && (
            <div className={styles.houseDetailsContainer}>
              <div className={styles.houseNameWrapper}>
                <div className={styles.houseMemberText}>
                  House Member
                </div>
                <div className={styles.houseName}>
                  {alumniData.house}
                </div>
              </div>
              {isMobile ? (
                <Image src={getHouseImage(alumniData?.house, 'mobile')} className={styles.houseLogo} alt="house-logo" />
              ) : (
                <Image src={getHouseImage(alumniData?.house, 'desktop')} className={styles.houseLogo} alt="house-logo" />
              )}
            </div>
          )}
        </div>
        <div className={styles.clubsContainer}>
          <div className={styles.clubsHeading}>
            Clubs
          </div>
          <div className={styles.clubsList}>
            {alumniData?.clubs?.map((club) => (
              <div className={styles.clubItem} key={club}>
                {club}
              </div>
            ))}
          </div>
        </div>
        <div className={styles.projectList}>
          <div className={styles.projectListHeading}>
            Projects
          </div>
          <div className={styles.projectListItems}>
            {alumniData?.projects?.map((project) => (
              <div className={styles.projectItem} key={project.title}>
                <div className={styles.projectTitle}>
                  {project.title}
                </div>
                <Button
                  icon={<ArrowUpOutlined rotate={45} />}
                  iconPosition="end"
                  size="large"
                  className={styles.projectLinkButton}
                >
                  KNOW MORE
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  )
}