import Banner from "@/modules/alumni-directory/sections/Banner/Banner";
import Filters from "@/modules/alumni-directory/sections/Filters/Filters";
import AlumniList from "@/modules/alumni-directory/sections/AlumniList/AlumniList";

import styles from "./page.module.scss";

export default function Page() {

  return (
    <div className={styles.container}>
      <Banner />
      <Filters />
      <AlumniList />
    </div>
  )
}