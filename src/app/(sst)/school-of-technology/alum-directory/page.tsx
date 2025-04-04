'use client';

import Banner from "@modules/sst/alumni-directory/ui/Banner";
import Filters from "@modules/sst/alumni-directory/ui/Filters";
import AlumniList from "@modules/sst/alumni-directory/ui/AlumniList";
import { useAlumniList } from "@modules/sst/alumni-directory/context/AlumniContext";

import LoadingErrorFallback from "@/layouts/LoadingErrorFallback/LoadingErrorFallback";
import LoadingLayout from "@/layouts/LoadingLayout/LoadingLayout";

import styles from "./page.module.scss";
import { Suspense, useEffect } from "react";


export default function Page() {
  const {
    isFilterError,
    isFilterLoading,
    isAlumniListLoading,
    isAlumniListError,
    fetchData
  } = useAlumniList();

  const content = () => {
    if (isFilterLoading && isAlumniListLoading) return <LoadingLayout />;
    else if (isFilterError || isAlumniListError) return <LoadingErrorFallback />;
    else return (
      <>
        <Filters />
        <AlumniList />
      </>
    )
  }

  useEffect(() => {
    fetchData({ pageNumber: 1 });
  }, []);

  return (
    <div className={styles.container}>
      <Banner />
      <Suspense fallback={<LoadingLayout />}>
        {content()}
      </Suspense>
    </div>
  )
}