'use client';

import styles from './page.module.scss';
import NavBar from '@modules/ssb/crt_form/components/NavBar/NavBar';
export default function CRTFormPage() {
    return (
        <div className={styles.container}>
            <NavBar/>
        </div>
    );
}