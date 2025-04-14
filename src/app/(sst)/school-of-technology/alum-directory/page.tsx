"use client";

import { useEffect } from "react";
import { useAlumniList } from "@modules/sst/alumni-directory/context/AlumniContext";
import AlumniList from "@modules/sst/alumni-directory/ui/AlumniList";
import Banner from "@modules/sst/alumni-directory/ui/Banner";
import Filters from "@modules/sst/alumni-directory/ui/Filters";
import SstBottomNavbar from "@components/Sst/BottomNavbar";

import styles from "./page.module.scss";

export default function Page() {
  const { fetchAllAlumni } = useAlumniList();

  useEffect(() => {
    fetchAllAlumni({ pageNumber: 1 });
  }, []);

  return (
    <div className={styles.container}>
      <Banner />
      <Filters />
      <AlumniList />
      <SstBottomNavbar />
    </div>
  );
}
