'use client';

import { ArrowUpOutlined, LinkedinFilled } from '@ant-design/icons';
import { Button } from 'antd';
import { useRef, useCallback, useState } from 'react';

import { useAlumniList } from '@modules/sst/alumni-directory/context/AlumniContext';
import LoadingLayout from '@/layouts/LoadingLayout/LoadingLayout';
import AlumniCard from '@modules/sst/alumni-directory/components/AlumniCard';
import AlumniDetailsModal from '@modules/sst/alumni-directory/components/AlumniDetailsModal';
import NoAlumniFound from '@modules/sst/alumni-directory/components/NoAlumniFound';
import tracker from '@lib/tracking';

import styles from './AlumniList.module.scss';

const ActionButtons = (
  { id,
    name,
    linkedInUrl,
    setModalState
  }: { id: string; name: string; linkedInUrl: string; setModalState: (state: { isOpen: boolean; alumniId?: string }) => void }) => {

  const trackEvent = (event: string) => {
    tracker.click({
      click_type: event,
      click_text: event,
      click_source: "alumni_card",
      custom: {
        alumni_id: id,
        alumni_name: name,
      },
    });
  }

  return (
    <div className={styles.actionButtonWrapper}>
      <Button
        icon={<LinkedinFilled />}
        size="large"
        className={styles.linkedinButton}
        onClick={() => {
          trackEvent("linkedin_button");
          window.open(linkedInUrl, '_blank');
        }}
      >
        LinkedIn
      </Button>
      <Button
        icon={<ArrowUpOutlined rotate={45} />}
        iconPosition="end"
        size="large"
        className={styles.viewProfileButton}
        onClick={() => {
          trackEvent("view_profile_button");
          setModalState({ isOpen: true, alumniId: id });
        }}
      >
        View Profile
      </Button>
    </div>
  );
};

export default function AlumniList() {
  const {
    filters,
    alumniList,
    isAlumniListLoading: loading,
    loadMore,
    onFilterChange,
    showFilterLoader,
    alumniListTotalEntries
  } = useAlumniList();
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    alumniId?: string;
  }>({
    isOpen: false
  });
  // Intersection Observer
  const observer = useRef<IntersectionObserver | undefined>(undefined);

  const lastCardRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      if (alumniList?.length >= alumniListTotalEntries) return;

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, alumniList?.length, alumniListTotalEntries, loadMore]
  );

  if (showFilterLoader) {
    return <LoadingLayout />;
  }

  // if (alumniListTotalEntries === 0 && alumniList?.length === 0 && !loading) {
  //   tracker.click({
  //     click_type: 'no_alumni_found',
  //     click_text: 'no_alumni_found',
  //     click_source: 'alumni_directory',
  //     custom: {
  //       filters: filters
  //     }
  //   });
  // }

  if (alumniList?.length === 0 && !loading) {
    return <NoAlumniFound onFilterChange={onFilterChange} />;
  }

  return (
    <>
      <div className={styles.mainContainer}>
        {alumniList && alumniList?.map((item, index) => {
          const isLast = index === alumniList?.length - 1;
          return (
            <div
              ref={isLast ? lastCardRef : null}
              key={item.id}
              className={styles.alumniCard}
            >
              <AlumniCard
                {...item.attributes}
                id={item.id}
              >
                <ActionButtons
                  id={item.id}
                  name={item?.attributes?.name}
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
          alumniId={modalState?.alumniId}
        />
      )}
    </>
  );
}
