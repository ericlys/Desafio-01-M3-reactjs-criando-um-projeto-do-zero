import { IconType } from 'react-icons';
import { FiCalendar, FiClock, FiUser } from 'react-icons/fi';

import styles from './info.module.scss';

interface InfoProps {
  icon?: 'calendar' | 'user' | 'clock';
  text: string;
}

export default function Info({ icon, text }: InfoProps): JSX.Element {
  let Ficon: IconType;

  switch (icon) {
    case 'calendar':
      Ficon = FiCalendar;
      break;
    case 'user':
      Ficon = FiUser;
      break;
    case 'clock':
      Ficon = FiClock;
      break;
    default:
      break;
  }

  return (
    <div className={styles.Container}>
      <Ficon />
      <span>{text}</span>
    </div>
  );
}
