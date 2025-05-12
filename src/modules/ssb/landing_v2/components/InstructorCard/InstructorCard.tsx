import styles from './InstructorCard.module.scss';
import Image from 'next/image';

interface InstructorCardProps {
    name: string;
    designation: string;
    profile_image: string;
    company_image: string;
}

export default function InstructorCard({ name, designation, profile_image, company_image }: InstructorCardProps) {
    return (
        <div className={styles.instructorCard}>
            <Image 
                src={profile_image} 
                alt={name} 
                className={styles.profileImage}
                width={242}
                height={216}
            />
            
            <div className={styles.instructorInfo}>
                <div className={styles.instructorName}>{name}</div>
                <div className={styles.instructorDesignation}>{designation}</div>

                <Image 
                src={company_image} 
                alt={name} 
                className={styles.companyImage}
                width={90}
                height={32}
            />
            </div>
            
            
            
        </div>
    );
}
