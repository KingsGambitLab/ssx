import classNames from 'classnames';

import styles from './Header.module.scss';

type HeaderProps = {
  rootClassName?: string;
  children: React.ReactNode;
}
export default function Header(
  { rootClassName = '', children }: HeaderProps
) {
  return (
    <div className={classNames(
      styles.container,
      rootClassName
    )}>
      {children}
    </div >
  )
}
