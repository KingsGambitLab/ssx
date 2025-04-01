'use client';

import { ArrowUpOutlined, LinkedinFilled } from '@ant-design/icons';
import { Button } from 'antd';
import { useRef, useCallback, useState } from 'react';

import LoadingLayout from '@/layouts/LoadingLayout/LoadingLayout';

import { useAlumniList } from '@/modules/alumni-directory/context/AlumniContext';
import AlumniCard from '@/modules/alumni-directory/components/AlumniCard';
import AlumniDetailsModal from '@/modules/alumni-directory/components/AlumniDetailsModal';
import NoAlumniFound from '@/modules/alumni-directory/components/NoAlumniFound';

import styles from './AlumniList.module.scss';

const ActionButtons = ({ id, linkedInUrl, setModalState }: { id: string; linkedInUrl: string; setModalState: (state: { isOpen: boolean; alumniId?: string }) => void }) => {
  return (
    <div className={styles.actionButtonWrapper}>
      <Button
        icon={<LinkedinFilled />}
        size="large"
        className={styles.linkedinButton}
        onClick={() => window.open(linkedInUrl, '_blank')}
      >
        LinkedIn
      </Button>
      <Button
        icon={<ArrowUpOutlined rotate={45} />}
        size="large"
        className={styles.viewProfileButton}
        onClick={() => setModalState({ isOpen: true, alumniId: id })}
      >
        View Profile
      </Button>
    </div>
  );
};

export default function AlumniList() {
  const {
    alumniList,
    isAlumniListLoading: loading,
    fetchMoreData,
    loadMore,
    onFilterChange,
    showFilterLoader
  } = useAlumniList();

  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    alumniId?: string;
  }>({
    isOpen: false,
  });

  // Intersection Observer
  const observer = useRef<IntersectionObserver | undefined>(undefined);

  const lastCardRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && fetchMoreData) {
          loadMore();
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, fetchMoreData, loadMore]
  );

  if (showFilterLoader) {
    return <LoadingLayout />;
  }

  if (alumniList.length === 0 && !loading) {
    return <NoAlumniFound onFilterChange={onFilterChange} />;
  }

  return (
    <>
      <div className={styles.mainContainer}>
        {alumniList.map((item, index) => {
          const isLast = index === alumniList.length - 1;

          return (
            <div
              ref={isLast ? lastCardRef : null}
              key={item.id}
            >
              <AlumniCard
                {...item.attributes}
                id={item.id}
              >
                <ActionButtons
                  id={item.id}
                  linkedInUrl={item.attributes.linkedin}
                  setModalState={setModalState}
                />
              </AlumniCard>
            </div>
          );
        })}
      </div>

      {loading && !showFilterLoader && <LoadingLayout />}

      {modalState?.alumniId && (
        <AlumniDetailsModal
          isModalOpen={modalState.isOpen}
          setIsModalOpen={() => setModalState({ isOpen: false })}
          alumniId={modalState.alumniId}
        />
      )}
    </>
  );
}
