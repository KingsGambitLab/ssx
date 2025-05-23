import PageLayout from "@modules/sst/application-form/ui/PageLayout";

import LoginForm from "@modules/sst/application-form/ui/LoginForm";
import BannerSection from "@modules/sst/info/ui/BannerSection";

import styles from "./page.module.scss";


export default function Page() {
  return (
    <div className={styles.container}>
      <main className={styles.mainContainer}>
        <section className={styles.leftContainer}>
         <BannerSection />
         <PageLayout />
        </section>
        <aside className={styles.rightContainer}>
          <LoginForm />
        </aside>
      </main>
    </div>
  );
}
