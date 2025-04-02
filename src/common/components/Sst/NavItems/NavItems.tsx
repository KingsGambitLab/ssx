
import { Button } from "antd";
import classNames from "classnames";

import styles from './NavItems.module.scss';
import { usePathname } from "next/navigation";


type NavItemsProps = {
  variant?: 'default' | 'hamburger';
  data: {
    label: string;
    href: string;
    isNew?: boolean;
  }[];
}
export default function NavItems({ data, variant = 'default' }: NavItemsProps) {
  const pathname = usePathname();

  const isCurrentItemSelected = (href: string) => {
    return pathname === href;
  }

  return (
    <div className={styles.container} data-variant={variant}>
      <div className={styles.navItemsContainer} data-variant={variant}>
        {data.map((item, index) => (
          <div
            className={styles.navItem}
            key={index}
          >
            <a href={item?.href}
              target="_blank"
              className={classNames(
                styles.navItemText,
                {
                  [styles.selectedNavItemText]: isCurrentItemSelected(item.href)
                }
              )}>
              {item.label}
            </a>
            {
              item.isNew && (
                <div className={styles.newTag}>
                  New
                </div>
              )
            }
          </div>
        ))}
      </div>
      <div className={styles.actionButtons} data-variant={variant}>
        <Button
          size='large'
          color="primary"
          variant="outlined"
          className={styles.loginButton}
          block
          data-variant={variant}
        >
          Login
        </Button>
        <Button
          size='large'
          color="danger"
          variant="solid"
          className={styles.applyNowButton}
          data-variant={variant}
        >
          Apply Now
        </Button>
      </div>
    </div>
  );
}