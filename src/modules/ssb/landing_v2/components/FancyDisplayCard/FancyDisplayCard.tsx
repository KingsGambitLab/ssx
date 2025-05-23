import styles from './FancyDisplayCard.module.scss';

interface FancyDisplayComponentProps {
    headText: string;
    sectionText: string;
}

export default function FancyDisplayComponent({ headText, sectionText }: FancyDisplayComponentProps) {
    return (
        <div className={styles.fancyDisplayCard}>
            <div className={styles.headTextWrapper}>
                <div className={styles.headText}>{headText}</div>
                <div className={styles.headTextUnderline}></div>
            </div>
            <div className={styles.sectionText}>{sectionText}</div>
        </div>
    )
} 