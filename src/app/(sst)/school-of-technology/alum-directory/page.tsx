'use client';
import Banner from "@/modules/alumni-directory/sections/Banner/Banner";
import Filters from "@/modules/alumni-directory/sections/Filters/Filters";
import AlumniList from "@/modules/alumni-directory/sections/AlumniList/AlumniList";
import { useAlumniList } from "@/hooks/useAlumniList";

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