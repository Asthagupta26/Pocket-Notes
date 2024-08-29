import styles from './IntroBanner.module.css';
import backgroundImage from '../../assets/background.png';
import { RiLockFill } from 'react-icons/ri';

const IntroBanner = () => (
  <div className={`${styles.banner} ${styles.mobileBanner}`}>
    <div className={styles.textContainer}>
      <img src={backgroundImage} alt="background" />
      <div className={styles.title}>Pocket Notes</div>
      <p>
      Send and receive messages without keeping your phone online.<br/>
      Use Pocket Notes on up to 4 linked devices and 1 mobile phone.
       
      </p>
    </div>
    <div className={styles.encryptionInfo}>
      <RiLockFill /> End-to-end encrypted
    </div>
  </div>
);

export default IntroBanner;
