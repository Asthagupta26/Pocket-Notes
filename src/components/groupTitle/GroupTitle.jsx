import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './GroupTitle.module.css';
import { useShort } from '../../useShort';

const GroupTitle = ({ id: propId, children: name, colour }) => {
  const [isActive, setIsActive] = useState(false);
  const { id: paramId } = useParams();
  const navigate = useNavigate();
  const shortName = useShort(name);

  useEffect(() => {
    setIsActive(paramId === propId);
  }, [paramId, propId]);

  const navigateHandler = () => {
    navigate(`/notes/${propId}`);
  };

  const containerStyle = isActive ? { backgroundColor: '#2F2F2F2B' } : {};
  const bubbleStyle = { backgroundColor: colour };

  return (
    <div
      className={styles.chatHeading}
      onClick={navigateHandler}
      style={containerStyle}
    >
      <span className={styles.bubble} style={bubbleStyle}>
        {shortName.toUpperCase()}
      </span>
      <span className={styles.heading}>{name}</span>
    </div>
  );
};

export default GroupTitle;
