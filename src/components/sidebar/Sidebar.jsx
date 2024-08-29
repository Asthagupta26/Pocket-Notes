import { useEffect, useState } from 'react';
import GroupTitle from '../groupTitle/GroupTitle'
import Modal from '@mui/material/Modal';
import ModalBox from '../modal/ModalBox';
import { FaPlus } from 'react-icons/fa6';
import styles from './Sidebar.module.css';

const Sidebar = ({ chatIsOpen }) => {
  const [open, setOpen] = useState(false);
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const groupsFromLocalStorage = localStorage.getItem('groups');
    if (groupsFromLocalStorage) {
      setGroups(JSON.parse(groupsFromLocalStorage));
    }
  }, []);

  const classNames = `${styles.sidebar} ${chatIsOpen ? styles.mobileChat : styles.mobileMenu}`;

  return (
    <>
      <div className={classNames}>
        <div className={styles.container}>
          <h2 className={styles.heading}>Pocket Notes</h2>
          <div className={styles.chats}>
            {groups.map((group) => (
              <GroupTitle key={group.id} colour={group.colour} id={group.id}>
                {group.name}
              </GroupTitle>
            ))}
          </div>
          <button onClick={() => setOpen(true)}>
            <FaPlus size={30} />
          </button>
        </div>
      </div>
      <Modal open={open} onClose={() => setOpen(false)} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <ModalBox handleClose={() => setOpen(false)} />
      </Modal>
    </>
  );
};

export default Sidebar;
