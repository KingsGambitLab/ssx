'use client';

import Banner from "@modules/sst/alumni-directory/ui/Banner";
import Filters from "@modules/sst/alumni-directory/ui/Filters";
import AlumniList from "@modules/sst/alumni-directory/ui/AlumniList";
import { useAlumniList } from "@modules/sst/alumni-directory/context/AlumniContext";

import LoadingErrorFallback from "@/layouts/LoadingErrorFallback/LoadingErrorFallback";
import LoadingLayout from "@/layouts/LoadingLayout/LoadingLayout";

import styles from "./page.module.scss";


export default function Page() {
  const {
    isFilterError,
    isFilterLoading,
    isAlumniListLoading,
    isAlumniListError
  } = useAlumniList();

  // console.log('isFilterError', isFilterError);
  // console.log('isAlumniListError', isAlumniListError);
  // console.log('isFilterLoading', isFilterLoading);
  // console.log('isAlumniListLoading', isAlumniListLoading);

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
  return (
    <div className={styles.container}>
      <Banner />
      {content()}
    </div>
  )
}