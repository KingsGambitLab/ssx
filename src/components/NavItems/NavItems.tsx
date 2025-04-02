
import classNames from "classnames";
import { usePathname } from "next/navigation";
import Link from "next/link";

import styles from './NavItems.module.scss';

type NavItemsProps = {
  rootClassName?: string;
  newTagClassName?: string;
  navItemClassName?: string;
  data: {
    label: string;
    href: string;
    isNew?: boolean;
  }[];
}
export default function NavItems({
  data,
  rootClassName = '',
  newTagClassName = '',
  navItemClassName = '',
}: NavItemsProps) {
  const pathname = usePathname();

  return (
    <div className={classNames(styles.container, rootClassName)}>
      <div className={styles.navItemsContainer}>
        {data.map((item, index) => {
          const isSelected = pathname === item?.href;
          return (
            <div
              className={styles.navItem}
              key={index}
            >
              <Link
                prefetch={false}
                href={item?.href}
                target="_blank"
                className={classNames(
                  styles.navItemText,
                  navItemClassName,
                  {
                    [styles.selectedNavItemText]: isSelected
                  }
                )}

              >
                {item.label}
              </Link>
              {
                item.isNew && (
                  <div className={classNames(styles.newTag, newTagClassName)}>
                    New
                  </div>
                )
              }
            </div>
          )
        })}
      </div>
    </div>
  );
}
