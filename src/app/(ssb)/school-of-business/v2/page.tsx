'use client';

import { useEffect, useRef, useState } from 'react';
import Navbar from './components/Navbar';
import RegistrationForm from './components/RegistrationForm';
import styles from './styles.module.scss';

export default function SchoolOfBusinessV2() {
  return (
    <div className={styles.root}>
      {/* <Navbar/> */}
      <RegistrationForm/>
    </div>
  );
} 

