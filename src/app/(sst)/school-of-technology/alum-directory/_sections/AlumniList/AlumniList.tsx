'use client';

import { useState, useCallback } from 'react';
import AlumniCard from '../../_components/AlumniCard/AlumniCard';
import { Button } from 'antd';
import { ArrowUpOutlined, LinkedinFilled } from '@ant-design/icons';

import AlumniDetailsModal from '../../_components/AlumniDetailsModal/AlumniDetailsModal';
import styles from './AlumniList.module.scss';

export default function AlumniList() {
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    alumniId?: number;
  }>({
    isOpen: false
  });

  const handleOpenModal = useCallback((id: number) => {
    setModalState({ isOpen: true, alumniId: id });
  }, []);

  const handleCloseModal = useCallback(() => {
    setModalState({ isOpen: false });
  }, []);

  const data = [
    {
      id: 1,
      img: 'images/sst/svg/demo-img.svg',
      name: 'Aayush Shrivastava',
      batchYear: '2020',
      city: 'New York',
      state: 'NY',
      school: 'School of Technology',
      linkedin: 'https://www.linkedin.com/in/johndoe',
    },
    {
      id: 2,
      img: 'images/sst/svg/demo-img.svg',
      name: 'Aayush Shrivastava',
      batchYear: '2020',
      city: 'New York',
      state: 'NY',
      school: 'School of Technology',
      linkedin: 'https://www.linkedin.com/in/johndoe',
    },
    {
      id: 3,
      img: 'images/sst/svg/demo-img.svg',
      name: 'Aayush Shrivastava',
      batchYear: '2020',
      city: 'New York',
      state: 'NY',
      school: 'School of Technology',
      linkedin: 'https://www.linkedin.com/in/johndoe',
    },
    {
      id: 4,
      img: 'images/sst/svg/demo-img.svg',
      name: 'John Doe 3',
      batchYear: '2020',
      city: 'New York',
      state: 'NY',
      school: 'School of Technology',
      linkedin: 'https://www.linkedin.com/in/johndoe',
    },
    {
      id: 5,
      img: 'images/sst/svg/demo-img.svg',
      name: 'John Doe 1',
      batchYear: '2020',
      city: 'New York',
      state: 'NY',
      school: 'School of Technology',
      linkedin: 'https://www.linkedin.com/in/johndoe',
    },
    {
      id: 6,
      img: 'images/sst/svg/demo-img.svg',
      name: 'John Doe 2',
      batchYear: '2020',
      city: 'New York',
      state: 'NY',
      school: 'School of Technology',
      linkedin: 'https://www.linkedin.com/in/johndoe',
    },
    {
      id: 7,
      img: 'images/sst/svg/demo-img.svg',
      name: 'John Doe 3',
      batchYear: '2020',
      city: 'New York',
      state: 'NY',
      school: 'School of Technology',
      linkedin: 'https://www.linkedin.com/in/johndoe',
    },
    {
      id: 8,
      img: 'images/sst/svg/demo-img.svg',
      name: 'John Doe 1',
      batchYear: '2020',
      city: 'New York',
      state: 'NY',
      school: 'School of Technology',
      linkedin: 'https://www.linkedin.com/in/johndoe',
    },
    {
      id: 9,
      img: 'images/sst/svg/demo-img.svg',
      name: 'John Doe 2',
      batchYear: '2020',
      city: 'New York',
      state: 'NY',
      school: 'School of Technology',
      linkedin: 'https://www.linkedin.com/in/johndoe',
    }
  ]

  const ActionButtons = ({ id }: { id: number }) => {
    return (
      <div className={styles.actionButtonWrapper}>
        <Button
          icon={<LinkedinFilled />}
          size="large"
          variant="outlined"
          className={styles.linkedinButton}
        >
          LinkedIn
        </Button>
        <Button
          icon={<ArrowUpOutlined rotate={45} />}
          type="default"
          iconPosition="end"
          size="large"
          variant="outlined"
          className={styles.viewProfileButton}
          onClick={() => { handleOpenModal(id); }}
        >
          View Profile
        </Button>
      </div>
    );
  };

  return (
    <>
      <div className={styles.mainContainer}>
        {data.map((item) => (
          <AlumniCard
            key={item?.id}
            {...item}
          >
            <ActionButtons id={item?.id} />
          </AlumniCard>
        ))}
      </div>

      {modalState?.alumniId && (
        <AlumniDetailsModal
          isModalOpen={modalState.isOpen}
          setIsModalOpen={handleCloseModal}
          alumniId={modalState.alumniId}
        />
      )}
    </>
  );
}