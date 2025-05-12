import InstructorCard from "../InstructorCard/InstructorCard";
import styles from './InstructorSection.module.scss';
import vidit_profile from '../../../../../../public/images/ssb/Vidit.webp';
import mckinsey_logo from '../../../../../../public/images/ssb/mckinsey.webp';

export default function InstructorSection() {
    return (
        <div className={styles.instructorSection}>
            <InstructorCard name="Vidit Jain" designation="Engagement Manager" profile_image={vidit_profile.src} company_image={mckinsey_logo.src} />
            <InstructorCard name="Vidit Jain" designation="Engagement Manager" profile_image={vidit_profile.src} company_image={mckinsey_logo.src} />
            <InstructorCard name="Vidit Jain" designation="Engagement Manager" profile_image={vidit_profile.src} company_image={mckinsey_logo.src} />
            <InstructorCard name="Vidit Jain" designation="Engagement Manager" profile_image={vidit_profile.src} company_image={mckinsey_logo.src} />
            <InstructorCard name="Vidit Jain" designation="Engagement Manager" profile_image={vidit_profile.src} company_image={mckinsey_logo.src} />
            <InstructorCard name="Vidit Jain" designation="Engagement Manager" profile_image={vidit_profile.src} company_image={mckinsey_logo.src} />
            
        </div>
    )
}