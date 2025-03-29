import { Flex } from 'antd';

import Banner from "./_sections/Banner/Banner";
import Filters from "./_sections/Filters/Filters";
import AlumniList from "./_sections/AlumniList/AlumniList";

import styles from "./page.module.scss";

export default function Page() {
  return (
    <>
      <Flex vertical gap={16} align="start" className={styles.container}>
        <Banner />
        {/* Filters */}
        <Filters />
        {/* Alumni List */}
        <AlumniList />
      </Flex>
    </>
  )
}