import styles from './DisplayCard.module.scss';

interface DisplayCardProps {
    headText: string;
    sectionText: string;
}

export default function DisplayCard({ headText, sectionText }: DisplayCardProps) {
    return (
        <div className={styles.displayCard}>
            <div className={styles.headText}>{headText}</div>
            <div className={styles.sectionText}>{sectionText}</div>
        </div>
    )
}