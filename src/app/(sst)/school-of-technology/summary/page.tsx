import styles from "./page.module.scss";

import LoginForm from "@modules/sst/application-form/ui/LoginForm";

export default function Page() {
  return (
    <div className={styles.container}>
      <LoginForm />
    </div>
  );
}
