'use client';

import { useCallback, useRef, useState } from 'react';

import { ArrowUpOutlined, LinkedinFilled } from '@ant-design/icons';
import { Button } from 'antd';

import { useAlumniList } from '@modules/sst/alumni-directory/context/AlumniContext';
import AlumniCard from '@modules/sst/alumni-directory/components/AlumniCard';
import NoAlumniFound from '@modules/sst/alumni-directory/components/NoAlumniFound';
import {
  pageTrackingEvents,
  pageTrackingSources,
  trackEvent,
} from '@modules/sst/alumni-directory/utils';

import LoadingLayout from '@/layouts/LoadingLayout/LoadingLayout';

import styles from './AlumniList.module.scss';

import dynamic from 'next/dynamic';

const AlumniDetailsModal = dynamic(
  () => import('@modules/sst/alumni-directory/components/AlumniDetailsModal'),
  {
    ssr: false,
  }
);

const ActionButtons = ({
  id,
  name,
  linkedInUrl,
  setModalState,
}: {
  id: string;
  name: string;
  linkedInUrl: string;
  setModalState: (state: { isOpen: boolean; alumniId?: string }) => void;
}) => {
  const handleTrackEvent = (event: string) => {
    trackEvent.click({
      clickType: event,
      clickText: event,
      clickSource: pageTrackingSources.alumniCard,
      custom: {
        alumni_id: id,
        alumni_name: name,
      },
    });
  };

  return (
    <div className={styles.actionButtonWrapper}>
      <Button
        icon={<LinkedinFilled />}
        size="large"
        className={styles.linkedinButton}
        onClick={() => {
          handleTrackEvent(pageTrackingEvents.linkedinButton);
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
          handleTrackEvent(pageTrackingEvents.viewProfileButton);
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
    alumniList,
    isAlumniListLoading: loading,
    loadMore,
    onFilterChange,
    showFilterLoader,
    alumniListTotalEntries,
  } = useAlumniList();

  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    alumniId?: string;
  }>({ isOpen: false });

  const observer = useRef<IntersectionObserver | undefined>(undefined);

  const lastCardRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      if (alumniList?.length >= (alumniListTotalEntries ?? 0)) return;

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, alumniList?.length, alumniListTotalEntries, loadMore]
  );

  if (showFilterLoader) return <LoadingLayout />;
  if (alumniList?.length === 0 && !loading)
    return <NoAlumniFound onFilterChange={onFilterChange} />;

  return (
    <>
      <div className={styles.mainContainer}>
        {alumniList?.map((item, index) => {
          const isLast = index === alumniList.length - 1;
          return (
            <div
              key={item.id}
              ref={isLast ? lastCardRef : null}
              className={styles.alumniCard}
            >
              <AlumniCard {...item.attributes} id={item.id}>
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
          alumniId={modalState.alumniId}
        />
      )}
    </>
  );
}
