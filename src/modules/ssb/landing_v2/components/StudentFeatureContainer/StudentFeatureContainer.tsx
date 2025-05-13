import styles from './StudentFeatureContainer.module.scss';

export default function StudentFeatureContainer() {
    return (
        <div className={styles.studentFeatureContainer}>
            <div className={styles.studentFeatureContainerTitle}>
                <div className={styles.studentFeatureContainerTitleText1}>
                    STUDENT FEATURES
                </div>
                <div className={styles.studentFeatureContainerTitleText2}>
                    <div className={styles.studentFeatureContainerTitleText2Text1}>Life Beyond the Classroom</div>
                    <div className={styles.studentFeatureContainerTitleText2Text2}>Engage in a lively campus featuring an Innovation Lab, Turf arena, and collaborative co-working spaces</div>
                </div>

            </div>
            <div className={styles.studentFeatureContainerImageGrid}>

            </div>
        </div>
    )
}   