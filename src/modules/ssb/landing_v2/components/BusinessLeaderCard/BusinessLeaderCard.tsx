import styles from './BusinessLeaderCard.module.scss';
import Image from 'next/image';

interface BusinessLeaderCardProps {
    name: string;
    image: string;
    company_logo: string;
}

export default function BusinessLeaderCard({ name, image, company_logo }: BusinessLeaderCardProps) {
    return (
        <div className={styles.businessLeaderCard}>
            <Image src={image} alt={name} className={styles.image} height={100} width={100} />
            <div className={styles.overlay} />
            <div className={styles.content}>
                <div className={styles.name}>{name}</div>
                <Image src={company_logo} alt="Company Logo" height={30} width={100}className={styles.companyLogo} />
            </div>
        </div>
    )
}
